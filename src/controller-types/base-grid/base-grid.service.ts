import {$Values, Intersection, NonFunctionKeys, Omit} from 'utility-types';
import {DeepPartial, Repository} from 'typeorm';
import {BaseGridDefinitions, BasePropertyDescriptionDto} from './base-grid.definitions';
import {BaseGridEntity} from './base-grid.entity';
import {EPropertyType, PropertyDescriptionDto} from './dto/property-description.dto';
import {GridDefinitionDto} from './dto/grid-definition.dto';
import {PaginatorStateDto} from './dto/paginator-state.dto';
import {GridDataDto} from './dto/grid-data.dto';
import {ActionListItemDto} from './dto/action-list-item.dto';
import {FilteredOptionDataDto} from './dto/filtered-option-data.dto';
import * as dateFormat from 'dateformat';

export class BaseGridService<BaseEntity extends BaseGridEntity,
    EditDto extends object & Partial<BaseEntity> & Pick<BaseEntity, 'id'> = BaseEntity,
    AddDto extends object & Partial<Omit<BaseEntity, 'id'>> = Omit<BaseEntity, 'id'>> {

    protected constructor(
        protected readonly _repository: Repository<BaseEntity>,
        protected readonly _definitions: BaseGridDefinitions<BaseEntity, EditDto, AddDto>,
    ) {
    }

    /**
     * Gets filtered data for grid
     * @param paginatorState Current paginator state to update
     */
    protected async filterGridData(paginatorState: PaginatorStateDto): Promise<BaseEntity[]> {

        // Creating paginator
        if (Object.keys(paginatorState).length === 0) {
            paginatorState.currentPage = 1;
            paginatorState.currentPageSize = 5;
            paginatorState.pageSizeOptions = [5, 10, 15];
        }

        // Getting data
        const [allData, allRecords] = await this._repository.findAndCount({
            skip: (paginatorState.currentPage - 1) * paginatorState.currentPageSize,
            take: paginatorState.currentPageSize,
        });

        // Edit paginator
        paginatorState.totalPages = Math.ceil(allRecords / paginatorState.currentPageSize) || 1;

        // Update total records
        paginatorState.totalRecords = allRecords;

        // Return statement
        return allData;

    }

    /**
     * Gets grid data
     * @param paginatorState Current paginator state
     */
    public async getData(paginatorState: PaginatorStateDto): Promise<GridDataDto> {

        // Getting data
        const allData = await this.filterGridData(paginatorState);

        // Creating grid data
        return Object.assign<PaginatorStateDto, { items: ActionListItemDto[] }>(
            paginatorState,
            {
                items: await Promise.all(allData.map(async v => ({
                    id: v.id,
                    headerTitle: this._definitions.viewHeaderTitle instanceof Function
                        ? await this._definitions.viewHeaderTitle(v)
                        : this._definitions.viewHeaderTitle,
                    headerDescription: this._definitions.viewHeaderDescription instanceof Function
                        ? await this._definitions.viewHeaderDescription(v)
                        : this._definitions.viewHeaderDescription,
                    editable: this._definitions.allowEdit instanceof Function
                        ? await this._definitions.allowEdit(v, paginatorState)
                        : this._definitions.allowEdit,
                    deletable: this._definitions.allowRemove instanceof Function
                        ? await this._definitions.allowRemove(v, paginatorState)
                        : this._definitions.allowRemove,
                    details: await Promise.all(this._definitions.onView.map(async key => {

                        // Getting description and value
                        const description: BasePropertyDescriptionDto = this._definitions.entityPropertyDescription[key];
                        const value: $Values<Pick<BaseEntity, NonFunctionKeys<BaseEntity>>> = v[key];

                        // Parsing value
                        let parsedValues: string[];
                        if (description.type === EPropertyType.Autocomplete) {
                            const data: BaseEntity | undefined = await value as any;
                            parsedValues = data ? [await data.getDisplayName()] : [];
                        } else if (description.type === EPropertyType.Chips) {
                            const data: BaseEntity[] | undefined = await value as any;
                            parsedValues = await Promise.all((data || [])
                                .map(async p => await p.getDisplayName()),
                            );
                        } else if (value === null || value === undefined || String(value) === '') {
                            parsedValues = [];
                        } else if (description.type === EPropertyType.Date) {
                            parsedValues = [dateFormat(new Date(value as any as string), 'dd.mm.yyyy')];
                        } else if (description.type === EPropertyType.Time) {
                            parsedValues = [dateFormat(new Date(value as any as string), 'HH:MM')];
                        } else if (description.type === EPropertyType.Boolean) {
                            parsedValues = [value ? 'tak' : 'nie'];
                        } else {
                            parsedValues = [String(value)];
                        }

                        // Return model details
                        return {
                            displayName: description.displayName,
                            values: parsedValues,
                            subDetails: [],
                        };

                    })),
                }))),
            },
        );

    }

    /**
     * Gets grid definitions
     */
    public async getDefinition(): Promise<GridDefinitionDto> {

        // Getting only properties which appear in base entity
        const commonKeys: Array<NonFunctionKeys<Intersection<BaseEntity, AddDto>>> = this._definitions.onAdd
            .filter(key => Object.keys(this._definitions.entityPropertyDescription).includes(key as string)) as any;

        // Creating definitions
        return {
            allowAdding: this._definitions.allowAdding,
            addConfiguration: commonKeys
                .map(key => Object.assign<{}, BasePropertyDescriptionDto, Pick<PropertyDescriptionDto, 'name'>>(
                    {},
                    this._definitions.entityPropertyDescription[key],
                    {name: key as string},
                )),
        };

    }

    /**
     * Gets edit item configuration
     * @param itemId Item id to get configuration
     */
    public async getEditItemConfiguration(itemId: string): Promise<PropertyDescriptionDto[]> {

        // Getting model
        const model: BaseEntity = await this._repository.findOne(itemId);

        // Getting only properties which appear in base entity
        const commonKeys: Array<NonFunctionKeys<Intersection<BaseEntity, EditDto>>> = this._definitions.onEdit
            .filter(key => Object.keys(this._definitions.entityPropertyDescription).includes(key as string)) as any;

        // Return base configuration
        return await Promise.all(commonKeys.map(async key => {

            // Getting description and value
            const description: BasePropertyDescriptionDto = this._definitions.entityPropertyDescription[key];
            const value: $Values<Pick<BaseEntity, NonFunctionKeys<BaseEntity>>> = model[key];

            // Parsing value
            let parsedValue: any;
            if (description.type === EPropertyType.Autocomplete) {
                const data: BaseEntity | undefined = await value as any;
                const filteredOption: FilteredOptionDataDto = data
                    ? {value: {id: data.id}, displayName: await data.getDisplayName()}
                    : undefined;
                parsedValue = filteredOption || null;
            } else if (description.type === EPropertyType.Chips) {
                const data: BaseEntity[] | undefined = await value as any;
                parsedValue = await Promise.all((data || [])
                    .map(async (p): Promise<FilteredOptionDataDto> => ({
                        value: {id: p.id},
                        displayName: await p.getDisplayName()
                    })),
                );
            } else {
                parsedValue = model[key];
            }

            // Return as property
            return Object.assign<{}, BasePropertyDescriptionDto, Pick<PropertyDescriptionDto, 'name' | 'value'>>(
                {},
                description,
                {
                    name: key as string,
                    value: parsedValue,
                },
            );

        }));

    }

    /**
     * Updates base entity based on given data
     * @param entityToUpdate Entity model to update
     * @param dataSource Data based on which entity will be updated
     * @param keysToUpdate Property keys from entity to update
     */
    protected _updateBaseEntity(
        entityToUpdate: BaseEntity | DeepPartial<BaseEntity>,
        dataSource: DeepPartial<BaseEntity>,
        keysToUpdate: Array<NonFunctionKeys<BaseEntity>>,
    ): void {

        // Getting only properties which appear in base entity and map with description
        const commonProperties: Record<NonFunctionKeys<Partial<BaseEntity>>, BasePropertyDescriptionDto> = keysToUpdate
            .filter(key => Object.keys(this._definitions.entityPropertyDescription).includes(key as string))
            .reduce((p, c) => Object.assign(p, {[c]: this._definitions.entityPropertyDescription[c as string]}), {}) as any;

        // Copying values
        Object.keys(commonProperties).forEach(propertyKey => {

            // Getting description
            const description: BasePropertyDescriptionDto = this._definitions.entityPropertyDescription[propertyKey];

            // Parsing value
            if (description.type === EPropertyType.Autocomplete) {
                entityToUpdate[propertyKey] = (dataSource[propertyKey] as unknown as FilteredOptionDataDto).value;
            } else if (description.type === EPropertyType.Chips) {
                entityToUpdate[propertyKey] = (dataSource[propertyKey] as unknown as FilteredOptionDataDto[]).map(i => i.value);
            } else {
                entityToUpdate[propertyKey] = (dataSource as unknown as BaseEntity)[propertyKey];
            }

        });

        // Parse to promise all relations
        Object.keys(commonProperties)
            .map(v => Object.assign <{}, BasePropertyDescriptionDto, Pick<PropertyDescriptionDto, 'name'>>(
                {}, this._definitions.entityPropertyDescription[v], {name: v},
            ))
            .filter(v => v.type === EPropertyType.Chips || v.type === EPropertyType.Autocomplete)
            .forEach(v => entityToUpdate[v.name] = Promise.resolve(entityToUpdate[v.name]));

    }

    /**
     * Edits item
     * @param item Item to edit
     */
    public async editItem(item: EditDto): Promise<boolean> {

        // Getting model
        const model: DeepPartial<BaseEntity> = await this._repository.findOne(item.id) as any;

        // Copying values
        this._updateBaseEntity(
            model, item, this._definitions.onEdit as Array<NonFunctionKeys<BaseEntity>>
        );

        // Update in database
        return this._repository.save(model)
            .then(r => true)
            .catch(r => false);

    }

    /**
     * Adds item
     * @param item Item to add
     */
    public async addItem(item: AddDto): Promise<boolean> {

        // Creating model
        const model: BaseEntity = this._repository.create();

        // Copying values
        this._updateBaseEntity(
            model, item, this._definitions.onAdd as any as Array<NonFunctionKeys<BaseEntity>>
        );

        // Update in database
        return this._repository.save(model as any as DeepPartial<BaseEntity>)
            .then(r => true)
            .catch(r => false);

    }

    /**
     * Removes item from repository
     * @param itemId Item id to delete
     */
    public async removeItem(itemId: string): Promise<boolean> {

        // Removing entity
        const entity: BaseEntity = await this._repository.findOne(itemId);
        return this._repository.remove(entity)
            .then(r => true)
            .catch(r => false);

    }

    /**
     * Provides data for autocomplete and chips
     * @param searchPhrase
     */
    public async onFilteredOptionData(searchPhrase: string): Promise<FilteredOptionDataDto[]> {

        // Getting all data
        const data: Array<Promise<FilteredOptionDataDto>> = (await this._repository.find()).map(async v => ({
            value: {id: v.id},
            displayName: await v.getDisplayName(),
        }));

        // Resolving all display names
        const parsedData: FilteredOptionDataDto[] = await Promise.all(data);

        // Returning filtered data
        return parsedData.filter(v => v.displayName.toLowerCase().indexOf(searchPhrase.toLowerCase()) >= 0);

    }

}
