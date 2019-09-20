import {NonFunctionKeys, Omit} from 'utility-types';
import {
    ArrayContains,
    ArrayNotContains,
    ArrayUnique,
    IsBoolean,
    IsDefined,
    IsInstance,
    IsString
} from 'class-validator';
import {BaseGridEntity} from './base-grid.entity';
import {EPropertyType, PropertyDescriptionDto} from './dto/property-description.dto';
import {PaginatorStateDto} from './dto/paginator-state.dto';

export type BasePropertyDescriptionDto = Omit<PropertyDescriptionDto, 'name'>;

/**
 * Table definitions
 */
export class BaseGridDefinitions<BaseEntity extends BaseGridEntity,
    EditDto extends object & Partial<BaseEntity> & Pick<BaseEntity, 'id'> = BaseEntity,
    AddDto extends object & Partial<Omit<BaseEntity, 'id'>> = Omit<BaseEntity, 'id'>> {

    /**
     * Should be allowed to add new items to table?
     */
    @IsBoolean()
    readonly allowAdding: boolean;

    /**
     * Should be allowed to edit items in table?
     * Optionally can pass a function which will execute for each item / entity / table row
     */
    @IsDefined()
    readonly allowEdit: boolean | ((entity: BaseEntity, paginatorState: PaginatorStateDto) => Promise<boolean> | boolean);

    /**
     * Should be allowed to remove items from table?
     * Optionally can pass a function which will execute for each item / entity / table row
     */
    @IsDefined()
    readonly allowRemove: boolean | ((entity: BaseEntity, paginatorState: PaginatorStateDto) => Promise<boolean> | boolean);

    /**
     * Which properties from entity should be displayed in table
     */
    @IsString({each: true})
    @ArrayUnique()
    readonly onView: Array<NonFunctionKeys<BaseEntity>>;

    /**
     * Item header
     * Optionally can pass a function to provide unique title for each item
     */
    @IsDefined()
    readonly viewHeaderTitle: string | ((entity: BaseEntity) => Promise<string> | string);

    /**
     * Subtitle of item
     * Optionally can pass a function to provide unique subtitle for each item
     */
    @IsDefined()
    readonly viewHeaderDescription: string | ((entity: BaseEntity) => Promise<string> | string);

    /**
     * Which properties from entity should be editable?
     */
    @IsString({each: true})
    @ArrayUnique()
    @ArrayContains(['id'])
    readonly onEdit: ['id', ...Array<NonFunctionKeys<EditDto>>];

    /**
     * Which properties from entity should be filled by user while adding new data to table?
     */
    @IsString({each: true})
    @ArrayUnique()
    @ArrayNotContains(['id'])
    readonly onAdd: Array<NonFunctionKeys<AddDto>>;

    /**
     * Description of each property from entity
     * Required to generate form inputs
     */
    @IsInstance(Object)
    readonly entityPropertyDescription: Record<NonFunctionKeys<BaseEntity>, BasePropertyDescriptionDto> &
        Record<'id', BasePropertyDescriptionDto & { type: EPropertyType.Hidden | EPropertyType.Number, isDisabled: true }>;

    /**
     * Additional properties description
     * These which not appear on entity but are in AddDto or EditDto
     * Can be interpreted as additional data
     */
    @IsInstance(Object)
    readonly additionalPropertyDescription: Record<Exclude<NonFunctionKeys<EditDto> |
        NonFunctionKeys<AddDto>, NonFunctionKeys<BaseEntity>>, BasePropertyDescriptionDto>;

}
