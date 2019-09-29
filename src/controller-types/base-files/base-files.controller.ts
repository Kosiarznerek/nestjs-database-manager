import {BaseFilesService} from './base-files.service';
import {BaseFilesEntity} from './base-files.entity';
import {Body, Delete, Get, Param, Post, Put, Query, Res, UploadedFiles, UseGuards, UseInterceptors} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {AuthorizationGuard} from '../../authorization/authorization.guard';
import {FilesDefinitionDto} from './dto/files-definition.dto';
import {Assign} from 'utility-types';
import {PaginatorStateDto} from './dto/paginator-state.dto';
import {FileInformationDto} from './dto/file-information.dto';
import {Authorization} from '../../authorization/authorization.decorator';
import {AuthorizationEnum} from '../../authorization/authorization.enum';
import {FilesInterceptor} from '@nestjs/platform-express';
import {Response} from 'express';
import {FilteredOptionDataDto} from '../base-grid/dto/filtered-option-data.dto';

export class BaseFilesController<BaseEntity extends BaseFilesEntity, FilesService extends BaseFilesService<BaseEntity>> {

    protected constructor(
        private readonly _filesService: FilesService,
    ) {
    }

    /**
     * Gets definition for files
     */
    @Get('getFilesUploadDefinition')
    @Authorization(AuthorizationEnum.DatabaseAdmin)
    @UseGuards(AuthGuard('jwt'), AuthorizationGuard)
    public getFilesUploadDefinition(): Promise<FilesDefinitionDto> {
        return this._filesService.getFilesUploadDefinition();
    }

    /**
     * Gets files information
     * @param paginatorState Current paginator state
     * @param searchPhrase Search phrase
     */
    @Post('getFilesInformation')
    @Authorization(AuthorizationEnum.DatabaseAdmin)
    @UseGuards(AuthGuard('jwt'), AuthorizationGuard)
    public getFilesInformation(
        @Body() paginatorState: PaginatorStateDto, @Query('searchPhrase') searchPhrase: string,
    ): Promise<Assign<PaginatorStateDto, { values: FileInformationDto[] }>> {
        return this._filesService.getFilesInformation(paginatorState, searchPhrase);
    }

    /**
     * Renames file
     * @param id File id
     * @param name File new name
     */
    @Put('renameFile/:id')
    @Authorization(AuthorizationEnum.DatabaseAdmin)
    @UseGuards(AuthGuard('jwt'), AuthorizationGuard)
    public renameFile(@Param('id') id: number, @Query('name') name: string): Promise<boolean> {
        return this._filesService.renameFile(id, name);
    }

    /**
     * Deletes file
     * @param id File id to delete
     */
    @Delete('deleteFile/:id')
    @Authorization(AuthorizationEnum.DatabaseAdmin)
    @UseGuards(AuthGuard('jwt'), AuthorizationGuard)
    public deleteFile(@Param('id') id: number): Promise<boolean> {
        return this._filesService.deleteFile(id);
    }

    /**
     * Downloads file
     * @param id File id to download
     * @param res Response
     */
    @Get('downloadFile/:id')
    @Authorization(AuthorizationEnum.DatabaseAdmin)
    @UseGuards(AuthGuard('jwt'), AuthorizationGuard)
    public async downloadFile(@Param('id') id: number, @Res() res: Response) {
        const {entity, buffer} = await this._filesService.getFileBuffer(id);
        const stream = this._filesService.bufferToReadableStream(buffer);
        res.set({
            'Content-Type': entity.contentType,
            'Content-Length': buffer.length,
        });
        stream.pipe(res);
    }

    /**
     * Uploads file
     * @param files Files to upload
     */
    @Post('uploadFile')
    @Authorization(AuthorizationEnum.DatabaseAdmin)
    @UseGuards(AuthGuard('jwt'), AuthorizationGuard)
    @UseInterceptors(FilesInterceptor('file'))
    public uploadFile(@UploadedFiles() files: Express.Multer.File[]): Promise<boolean> {
        const [file] = files;
        return this._filesService.uploadFile(file);
    }

    /**
     * Provides data for autocomplete and chips
     * @param searchPhrase Phrase to search
     */
    @Post('onFilteredOptionData')
    @Authorization(AuthorizationEnum.DatabaseAdmin)
    @UseGuards(AuthGuard('jwt'), AuthorizationGuard)
    public onFilteredOptionData(@Query('searchPhrase') searchPhrase: string): Promise<FilteredOptionDataDto[]> {
        return this._filesService.onFilteredOptionData(searchPhrase);
    }

}
