import {Omit, NonFunctionKeys} from 'utility-types';
import {ArrayContains, ArrayNotContains, ArrayUnique, IsBoolean, IsDefined, IsInstance, IsString} from 'class-validator';
import {BaseGridEntity} from './base-grid.entity';
import {EPropertyType, PropertyDescriptionDto} from './dto/property-description.dto';
import {PaginatorStateDto} from './dto/paginator-state.dto';

export type BasePropertyDescriptionDto = Omit<PropertyDescriptionDto, 'name'>;

export class BaseGridDefinitions<BaseEntity extends BaseGridEntity,
    EditDto extends object & Partial<BaseEntity> & Pick<BaseEntity, 'id'> = BaseEntity,
    AddDto extends object & Partial<Omit<BaseEntity, 'id'>> = Omit<BaseEntity, 'id'>> {

    @IsBoolean()
    readonly allowAdding: boolean;

    @IsDefined()
    readonly allowEdit: boolean | ((entity: BaseEntity, paginatorState: PaginatorStateDto) => Promise<boolean> | boolean);

    @IsDefined()
    readonly allowRemove: boolean | ((entity: BaseEntity, paginatorState: PaginatorStateDto) => Promise<boolean> | boolean);

    @IsString({each: true})
    @ArrayUnique()
    readonly onView: Array<NonFunctionKeys<BaseEntity>>;

    @IsDefined()
    readonly viewHeaderTitle: string | ((entity: BaseEntity) => Promise<string> | string);

    @IsDefined()
    readonly viewHeaderDescription: string | ((entity: BaseEntity) => Promise<string> | string);

    @IsString({each: true})
    @ArrayUnique()
    @ArrayContains(['id'])
    readonly onEdit: ['id', ...Array<NonFunctionKeys<EditDto>>];

    @IsString({each: true})
    @ArrayUnique()
    @ArrayNotContains(['id'])
    readonly onAdd: Array<NonFunctionKeys<AddDto>>;

    @IsInstance(Object)
    readonly entityPropertyDescription: Record<NonFunctionKeys<BaseEntity>, BasePropertyDescriptionDto> &
        Record<'id', BasePropertyDescriptionDto & { type: EPropertyType.Hidden | EPropertyType.Number, isDisabled: true }>;

    @IsInstance(Object)
    readonly additionalPropertyDescription: Record<Exclude<NonFunctionKeys<EditDto> |
        NonFunctionKeys<AddDto>, NonFunctionKeys<BaseEntity>>, BasePropertyDescriptionDto>;

}
