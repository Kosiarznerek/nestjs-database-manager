import {IsArray, IsBoolean, ValidateNested} from 'class-validator';
import {PropertyDescriptionDto} from './property-description.dto';
import {Type} from 'class-transformer';

export class GridDefinitionDto {

    @IsBoolean()
    allowAdding: boolean; // is user able to add to grid?

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => PropertyDescriptionDto)
    addConfiguration: PropertyDescriptionDto[]; // which controls should be displayed when adding new item?

}
