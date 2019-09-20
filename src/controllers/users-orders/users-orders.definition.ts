import {BaseGridDefinitions} from '../../controller-types/base-grid/base-grid.definitions';
import {UsersOrdersEntity} from './users-orders.entity';
import {EPropertyType} from '../../controller-types/base-grid/dto/property-description.dto';

export const Definition: BaseGridDefinitions<UsersOrdersEntity> = {

    allowAdding: true,

    allowEdit: true,

    allowRemove: true,

    onView: ['user', 'purchaseDate', 'comments', 'products', 'isDelivered'],

    viewHeaderTitle: entity => `Zamówienie nr. ${entity.id}`,

    viewHeaderDescription: null,

    onEdit: ['id', 'user', 'isDelivered', 'products'],

    onAdd: ['user', 'products', 'comments'],

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
        purchaseDate: {
            displayName: 'Data zakupu',
            value: null,
            type: EPropertyType.Date,
            validator: {
                isRequired: true,
                maxLength: null,
                minLength: null,
            },
        },
        user: {
            displayName: 'Użytkownik',
            value: null,
            type: EPropertyType.Autocomplete,
            onFilteredOptionData: 'application-users/onFilteredOptionData',
            validator: {
                isRequired: true,
                maxLength: null,
                minLength: null,
            },
        },
        comments: {
            displayName: 'Uwagi do zamówienia',
            value: null,
            type: EPropertyType.Text,
            validator: {
                isRequired: false,
                maxLength: null,
                minLength: null,
            },
        },
        products: {
            displayName: 'Zakupione produkty',
            value: null,
            type: EPropertyType.Chips,
            onFilteredOptionData: 'products/onFilteredOptionData',
            validator: {
                isRequired: true,
                maxLength: null,
                minLength: null,
            },
        },
        isDelivered: {
            displayName: 'Dostarczono do klienta',
            value: null,
            type: EPropertyType.Boolean,
            validator: {
                isRequired: true,
                maxLength: null,
                minLength: null,
            },
        },
    },

    additionalPropertyDescription: null,

};
