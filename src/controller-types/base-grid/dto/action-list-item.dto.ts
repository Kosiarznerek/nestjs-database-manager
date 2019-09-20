import {DetailsDataDto} from '../../base-details/dto/details-data.dto';
import {IsBoolean, IsInt, IsString, ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';

/**
 * Table item (row) in Database Manager Frontend
 */
export class ActionListItemDto {

    /**
     * Item id
     */
    @IsInt()
    readonly id: number;

    /**
     * Item main title
     */
    @IsString()
    readonly headerTitle: string;

    /**
     * Item subtitle
     */
    @IsString()
    readonly headerDescription: string;

    /**
     * Is item editable
     */
    @IsBoolean()
    readonly editable: boolean;

    /**
     * Is item deletable
     */
    @IsBoolean()
    readonly deletable: boolean;

    /**
     * Item details
     */
    @ValidateNested({each: true})
    @Type(() => DetailsDataDto)
    readonly details: DetailsDataDto[];

}
