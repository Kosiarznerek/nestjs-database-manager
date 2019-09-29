/**
 * Files definition
 */
import {IsBoolean, IsInt, IsString} from 'class-validator';

export class FilesDefinitionDto {

    /**
     * Should upload be allowed
     */
    @IsBoolean()
    allowUpload: boolean;

    /**
     * Which file types are allowed (eg. pdf, mp3)
     */
    @IsString({each: true})
    acceptFileTypes: string[];

    /**
     * Max size of uploaded file
     */
    @IsInt()
    maxFileSize: number;

}
