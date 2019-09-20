import {IsString, ValidateIf, ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';

export class DetailsDataDto {

    @IsString()
    displayName: string;

    @ValidateIf(o => o.values !== null)
    @IsString({each: true})
    values: string[] | null;

    @ValidateNested({each: true})
    @Type(() => DetailsDataDto)
    subDetails: DetailsDataDto[];

}
