import {BaseGridDefinitions} from '../../controller-types/base-grid/base-grid.definitions';
import {ApplicationUsersInfoEntity} from './application-users-info.entity';
import {EPropertyType} from '../../controller-types/base-grid/dto/property-description.dto';

export const Definition: BaseGridDefinitions<ApplicationUsersInfoEntity> = {

    allowAdding: true,

    allowEdit: true,

    allowRemove: true,

    onView: ['name', 'surname', 'streetName', 'account'],

    viewHeaderTitle: entity => `Użytkownik ${entity.name} ${entity.surname}`,

    viewHeaderDescription: null,

    onEdit: ['id', 'streetName', 'account'],

    onAdd: ['name', 'surname', 'streetName', 'account'],

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
            displayName: 'Imię',
            value: null,
            type: EPropertyType.Text,
            validator: {
                isRequired: true,
                maxLength: null,
                minLength: null,
            },
        },
        surname: {
            displayName: 'Nazwisko',
            value: null,
            type: EPropertyType.Text,
            validator: {
                isRequired: true,
                maxLength: null,
                minLength: null,
            },
        },
        streetName: {
            displayName: 'Nazwa ulicy',
            value: null,
            type: EPropertyType.Text,
            validator: {
                isRequired: true,
                maxLength: null,
                minLength: null,
            },
        },
        account: {
            displayName: 'Konto',
            value: null,
            type: EPropertyType.Autocomplete,
            onFilteredOptionData: 'application-users/onFilteredOptionData',
            validator: {
                isRequired: true,
                maxLength: null,
                minLength: null,
            },
        },
    },

    additionalPropertyDescription: null,

};
