import {BaseGridDefinitions} from '../../controller-types/base-grid/base-grid.definitions';
import {ApplicationUsersEntity} from './application-users.entity';
import {EPropertyType} from '../../controller-types/base-grid/dto/property-description.dto';

export const Definition: BaseGridDefinitions<ApplicationUsersEntity> = {

    allowAdding: true,

    allowEdit: true,

    allowRemove: true,

    onView: ['login', 'email', 'info'],

    viewHeaderTitle: entity => `Użytkownik o loginie ${entity.login}`,

    viewHeaderDescription: null,

    onEdit: ['id', 'login', 'email'],

    onAdd: ['login', 'email', 'password'],

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
        login: {
            displayName: 'Login',
            value: null,
            type: EPropertyType.Text,
            validator: {
                isRequired: true,
                maxLength: null,
                minLength: null,
            },
        },
        email: {
            displayName: 'Adres email',
            value: null,
            type: EPropertyType.Email,
            validator: {
                isRequired: true,
                maxLength: null,
                minLength: null,
            },
        },
        password: {
            displayName: 'Hasło',
            value: null,
            type: EPropertyType.Password,
            validator: {
                isRequired: true,
                maxLength: null,
                minLength: null,
            },
        },
        info: {
            displayName: 'Szczegółowe informacje',
            value: null,
            type: EPropertyType.Autocomplete,
            onFilteredOptionData: 'application-users-info/onFilteredOptionData',
            validator: {
                isRequired: false,
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
    },

    additionalPropertyDescription: null,

};
