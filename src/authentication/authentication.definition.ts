import {BaseGridDefinitions} from '../controller-types/base-grid/base-grid.definitions';
import {AuthenticationEntity} from './authentication.entity';
import {EPropertyType} from '../controller-types/base-grid/dto/property-description.dto';

export const Definition: BaseGridDefinitions<AuthenticationEntity> = {

    allowAdding: true,

    allowEdit: true,

    allowRemove: (entity, paginatorState) => paginatorState.totalRecords > 1,

    onView: ['login', 'email'],

    viewHeaderTitle: entity => `Użytkownik o loginie ${entity.login}`,

    viewHeaderDescription: null,

    onEdit: ['id', 'login', 'email'], // disable update password to avoid hashing again

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
    },

    additionalPropertyDescription: null,

};
