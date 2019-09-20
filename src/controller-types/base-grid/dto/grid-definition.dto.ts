import {IsArray, IsBoolean, ValidateNested} from 'class-validator';
import {PropertyDescriptionDto} from './property-description.dto';
import {Type} from 'class-transformer';

/**
 * Table definition
 */
export class GridDefinitionDto {

    /**
     * Is user able to add new items to table ?
     */
    @IsBoolean()
    allowAdding: boolean;

    /**
     * Which controls should be displayed when adding new item?
     */
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => PropertyDescriptionDto)
    addConfiguration: PropertyDescriptionDto[];

}
