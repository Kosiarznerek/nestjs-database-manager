import {Like, Repository} from 'typeorm';
import {BaseFilesDefinitions} from './base-files.definitions';
import {BaseFilesEntity} from './base-files.entity';
import {FilesDefinitionDto} from './dto/files-definition.dto';
import {PaginatorStateDto} from '../base-grid/dto/paginator-state.dto';
import {Assign} from 'utility-types';
import {FileInformationDto} from './dto/file-information.dto';
import {mkdir, readFile, unlink, writeFile} from 'fs';
import {Readable} from 'stream';
import {FilteredOptionDataDto} from '../base-grid/dto/filtered-option-data.dto';
import {Express} from 'express';

export class BaseFilesService<BaseEntity extends BaseFilesEntity> {

    protected constructor(
        protected readonly _repository: Repository<BaseEntity>,
        protected readonly _definitions: BaseFilesDefinitions<BaseEntity>,
    ) {
    }

    /**
     * Gets definition for files
     */
    public async getFilesUploadDefinition(): Promise<FilesDefinitionDto> {

        return {
            allowUpload: this._definitions.allowUpload,
            acceptFileTypes: this._definitions.acceptFileTypes,
            maxFileSize: this._definitions.maxFileSize,
        };

    }

    /**
     * Gets files information
     * @param paginatorState Current paginator state
     * @param searchPhrase Search phrase
     */
    public async getFilesInformation(
        paginatorState: PaginatorStateDto, searchPhrase: string,
    ): Promise<Assign<PaginatorStateDto, { values: FileInformationDto[] }>> {

        // Creating paginator
        if (Object.keys(paginatorState).length === 0) {
            paginatorState.currentPage = 1;
            paginatorState.currentPageSize = this._definitions.defaultCurrentPageSize;
            paginatorState.pageSizeOptions = this._definitions.defaultPageSizeOptions;
        }

        // Getting data
        const [allData, allRecords] = await this._repository.findAndCount({
            where: {name: Like(`%${searchPhrase || ''}%`)},
            skip: (paginatorState.currentPage - 1) * paginatorState.currentPageSize,
            take: paginatorState.currentPageSize,
        });

        // Edit paginator
        paginatorState.totalPages = Math.ceil(allRecords / paginatorState.currentPageSize) || 1;

        // Update total records
        paginatorState.totalRecords = allRecords;

        // Return statement
        return Object.assign<PaginatorStateDto, { values: FileInformationDto[] }>(
            paginatorState,
            {
                values: await Promise.all(allData.map(async v => ({
                    id: v.id,
                    name: v.name,
                    deletable: typeof this._definitions.allowDelete === 'boolean'
                        ? this._definitions.allowDelete
                        : await this._definitions.allowDelete(v),
                    downloadable: typeof this._definitions.allowDownload === 'boolean'
                        ? this._definitions.allowDownload
                        : await this._definitions.allowDownload(v),
                }))),
            },
        );

    }

    /**
     * Renames file
     * @param id File id
     * @param name File new name
     */
    public async renameFile(id: number, name: string): Promise<boolean> {

        // Getting file
        const file: BaseEntity = await this._repository.findOne(id);

        // Update name
        file.name = name;

        // Update in database
        return this._repository.save(file as any)
            .then(r => true)
            .catch(r => false);

    }

    /**
     * Deletes file
     * @param id File id to delete
     */
    public async deleteFile(id: number): Promise<boolean> {

        // Deleting not allowed
        if (typeof this._definitions.allowDelete === 'boolean' && !this._definitions.allowDelete) {
            return false;
        }

        // Getting file model
        const model: BaseEntity = await this._repository.findOne(id);

        // Deleting not allowed
        if (
            typeof this._definitions.allowDelete === 'function' &&
            (await this._definitions.allowDelete(model)) === false
        ) {
            return false;
        }

        // Remove from db
        const removedFromDb: boolean = await this._repository.remove(model)
            .then(r => true)
            .catch(() => false);

        // No success
        if (!removedFromDb) {
            return false;
        }

        // Remove from folder
        await new Promise((resolve, reject) => unlink(
            `__uploads__/${this._definitions.saveFilePath}/${model.id}.${model.extension}`,
            err => err ? reject() : resolve(),
        )).then(r => true).catch(() => false);

        // Return success
        return true;

    }

    /**
     * Gets file buffer
     * @param id File id to get
     */
    public async getFileBuffer(id: number): Promise<{ entity: BaseEntity, buffer: Buffer }> {

        // Download not allowed
        if (typeof this._definitions.allowDownload === 'boolean' && !this._definitions.allowDownload) {
            return null;
        }

        // Getting file model
        const entity: BaseEntity = await this._repository.findOne(id);

        // Download not allowed
        if (
            typeof this._definitions.allowDownload === 'function' &&
            (await this._definitions.allowDownload(entity)) === false
        ) {
            return null;
        }

        // Getting file
        const buffer: Buffer = await new Promise((resolve, reject) => readFile(
            `__uploads__/${this._definitions.saveFilePath}/${entity.id}.${entity.extension}`,
            (err, data) => err ? reject() : resolve(data),
        )).catch(() => null);

        // Unable to get file
        if (!buffer) {
            return null;
        }

        // Return file
        return {entity, buffer};

    }

    /**
     * Converts buffer to readable stream
     * @param buffer
     */
    public bufferToReadableStream(buffer: Buffer): Readable {
        const stream = new Readable();
        stream.push(buffer);
        stream.push(null);
        return stream;
    }

    /**
     * Uploads file
     * @param file File to upload
     */
    public async uploadFile(file: Express.Multer.File): Promise<boolean> {

        // Checking permissions
        if (!this._definitions.allowUpload) {
            return false;
        }

        // Getting file extension
        const fileExtension: string = (/[.]/.exec(file.originalname))
            ? /[^.]+$/.exec(file.originalname)[0]
            : null;

        // File extension not detected
        if (!fileExtension) {
            return false;
        }

        // Getting file name
        const fileName: string = file.originalname.split(`.${fileExtension}`)[0];

        // Check if extension is correct
        const {acceptFileTypes} = this._definitions;
        if (acceptFileTypes.length > 0 && !acceptFileTypes.includes(fileExtension)) {
            return false;
        }

        // Insert to database
        const model: BaseEntity = this._repository.create();
        model.name = fileName;
        model.extension = fileExtension;
        model.contentType = file.mimetype;
        const modelSaved: boolean = await this._repository.save(model as any)
            .then(r => true)
            .catch(() => false);

        // Model was not saved
        if (!modelSaved) {
            return false;
        }

        // Create dictionary
        await new Promise((resolve, reject) => mkdir(
            `__uploads__/${this._definitions.saveFilePath}`,
            {recursive: true},
            err => err ? reject() : resolve(),
        ));

        // Save file
        const fileSaved: boolean = await new Promise((resolve, reject) => writeFile(
            `__uploads__/${this._definitions.saveFilePath}/${model.id}.${fileExtension}`,
            file.buffer,
            err => err ? reject() : resolve(),
        )).then(r => true).catch(r => false);

        // File not saved
        if (!fileSaved) {
            await this._repository.remove(model);
            return false;
        }

        // Success
        return true;

    }

    /**
     * Provides data for autocomplete and chips
     * @param searchPhrase
     */
    public async onFilteredOptionData(searchPhrase: string): Promise<FilteredOptionDataDto[]> {

        // Getting all data
        const data: Array<Promise<FilteredOptionDataDto>> = (await this._repository.find()).map(async v => ({
            value: {id: v.id},
            displayName: await v.getDisplayName(),
        }));

        // Resolving all display names
        const parsedData: FilteredOptionDataDto[] = await Promise.all(data);

        // Returning filtered data
        return parsedData.filter(v => v.displayName.toLowerCase().indexOf(searchPhrase.toLowerCase()) >= 0);

    }

}
