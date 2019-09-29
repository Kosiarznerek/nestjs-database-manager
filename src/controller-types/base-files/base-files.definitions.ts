import {IsBoolean, IsInt, IsString} from 'class-validator';
import {BaseFilesEntity} from './base-files.entity';

/**
 * Files definitions
 */
export class BaseFilesDefinitions<FileEntity extends BaseFilesEntity> {

    /**
     * Where to save files
     */
    @IsString()
    saveFilePath: string;

    /**
     * Should upload be allowed
     */
    @IsBoolean()
    allowUpload: boolean;

    /**
     * Should download be allowed
     */
    @IsBoolean()
    allowDownload: boolean | ((entity: FileEntity) => Promise<boolean> | boolean);

    /**
     * Should delete files be allowed
     */
    @IsBoolean()
    allowDelete: boolean | ((entity: FileEntity) => Promise<boolean> | boolean);

    /**
     * Which file types are allowed (eg. pdf, mp3)
     * Empty array means all
     */
    @IsString({each: true})
    acceptFileTypes: string[];

    /**
     * Max size of uploaded file
     * Null means no limit
     */
    @IsInt()
    maxFileSize: number;

    /**
     * Default max items per page
     */
    @IsInt()
    defaultCurrentPageSize: number;

    /**
     * Default pagination limits available
     */
    @IsInt()
    defaultPageSizeOptions: number[];

}
