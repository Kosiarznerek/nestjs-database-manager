import {ValidateNested} from 'class-validator';
import {PaginatorStateDto} from './paginator-state.dto';
import {ActionListItemDto} from './action-list-item.dto';
import {Type} from 'class-transformer';

/**
 * Grid data returned to Database Manager Frontend to display table
 */
export class GridDataDto extends PaginatorStateDto {

    @ValidateNested({each: true})
    @Type(() => ActionListItemDto)
    items: ActionListItemDto[];

}
