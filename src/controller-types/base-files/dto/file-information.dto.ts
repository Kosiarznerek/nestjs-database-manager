import {IsBoolean, IsInt, IsString} from 'class-validator';

/**
 * Contains file information
 */
export class FileInformationDto {

    /**
     * File unique id
     */
    @IsInt()
    id: number;

    /**
     * File name
     */
    @IsString()
    name: string;

    /**
     * Is user able to delete file
     */
    @IsBoolean()
    deletable: boolean;

}
