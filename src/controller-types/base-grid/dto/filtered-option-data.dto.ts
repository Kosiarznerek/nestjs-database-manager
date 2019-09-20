import {IsInstance, IsString} from 'class-validator';
import {BaseGridEntity} from '../base-grid.entity';

// Filtered option data (used in autocomplete and chips)
export abstract class FilteredOptionDataDto {

    @IsInstance(Object)
    readonly value: Pick<BaseGridEntity, 'id'>;

    @IsString()
    readonly displayName: string;

}
