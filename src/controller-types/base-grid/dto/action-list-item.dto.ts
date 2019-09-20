import {DetailsDataDto} from '../../base-details/dto/details-data.dto';
import {IsBoolean, IsInt, IsString, ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';

export class ActionListItemDto {

    @IsInt()
    readonly id: number;

    @IsString()
    readonly headerTitle: string;

    @IsString()
    readonly headerDescription: string;

    @IsBoolean()
    readonly editable: boolean;

    @IsBoolean()
    readonly deletable: boolean;

    @ValidateNested({each: true})
    @Type(() => DetailsDataDto)
    readonly details: DetailsDataDto[];

}
