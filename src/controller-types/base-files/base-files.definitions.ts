import {IsBoolean, IsInt, IsString} from 'class-validator';

/**
 * Files definitions
 */
export class BaseFilesDefinitions {

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
