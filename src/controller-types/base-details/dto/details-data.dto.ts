import {IsString, ValidateIf, ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';

/**
 * Details object return to Database Manager Frontend
 */
export class DetailsDataDto {

    /**
     * Name to display eg. "Project name"
     */
    @IsString()
    displayName: string;

    /**
     * Values to display eg. "My new project"
     */
    @ValidateIf(o => o.values !== null)
    @IsString({each: true})
    values: string[] | null;

    /**
     * Sub details objects
     */
    @ValidateNested({each: true})
    @Type(() => DetailsDataDto)
    subDetails: DetailsDataDto[];

}
