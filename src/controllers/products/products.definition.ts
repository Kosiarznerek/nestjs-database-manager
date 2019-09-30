import {BaseGridDefinitions} from '../../controller-types/base-grid/base-grid.definitions';
import {ProductsEntity} from './products.entity';
import {EPropertyType} from '../../controller-types/base-grid/dto/property-description.dto';

export const Definition: BaseGridDefinitions<ProductsEntity> = {

    allowAdding: true,

    allowEdit: true,

    allowRemove: true,

    onView: ['name', 'expireDate', 'expireTime', 'orders'],

    viewHeaderTitle: entity => `Produkt ${entity.name}`,

    viewHeaderDescription: async entity => {
        const ordersAmount: number = (await entity.orders).length;
        return `Zamówiono ${ordersAmount}`;
    },

    onEdit: ['id', 'name', 'expireDate', 'expireTime', 'photos', 'photoThumbnail'],

    onAdd: ['name', 'expireDate', 'expireTime', 'photos', 'photoThumbnail'],

    entityPropertyDescription: {
        id: {
            displayName: 'Identyfikator',
            value: null,
            type: EPropertyType.Number,
            validator: {
                isRequired: true,
                maxLength: null,
                minLength: null,
            },
            isDisabled: true,
        },
        name: {
            displayName: 'Nazwa produktu',
            value: null,
            type: EPropertyType.Text,
            validator: {
                isRequired: true,
                maxLength: null,
                minLength: 3,
            },
        },
        expireDate: {
            displayName: 'Data ważności',
            value: null,
            type: EPropertyType.Date,
            validator: {
                isRequired: true,
                maxLength: null,
                minLength: null,
            },
        },
        expireTime: {
            displayName: 'Godzina ważności',
            value: null,
            type: EPropertyType.Time,
            validator: {
                isRequired: true,
                maxLength: null,
                minLength: null,
            },
        },
        orders: {
            displayName: 'Złożone zamówienia',
            value: null,
            type: EPropertyType.Chips,
            onFilteredOptionData: 'users-orders/onFilteredOptionData',
            validator: {
                isRequired: true,
                maxLength: null,
                minLength: null,
            },
        },
        photos: {
            displayName: 'Zdjęcia',
            value: null,
            type: EPropertyType.Chips,
            onFilteredOptionData: 'products-photos/onFilteredOptionData',
            validator: {
                isRequired: true,
                maxLength: null,
                minLength: null,
            },
        },
        photoThumbnail: {
            displayName: 'Miniaturka',
            value: null,
            type: EPropertyType.Autocomplete,
            onFilteredOptionData: 'products-photos/onFilteredOptionData',
            validator: {
                isRequired: true,
                maxLength: null,
                minLength: null,
            },
        },
    },

    additionalPropertyDescription: null,

};
