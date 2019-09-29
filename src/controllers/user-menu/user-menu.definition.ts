import {Assign, Omit} from 'utility-types';
import {EControllerType, MenuItemDto} from './dto/menu-item.dto';

export type TSimpleMenuItem = Assign<Omit<MenuItemDto, 'routerLink'>, { children: TSimpleMenuItem[] }>;

export const Definition: TSimpleMenuItem[] = [
    {
        displayName: 'Database manager',
        description: null,
        routePath: 'database-manager',
        controllerType: EControllerType.Empty,
        controllerSource: null,
        children: [
            {
                displayName: 'Szczegóły programu',
                description: 'Tu znajdziesz wszystkie wersje paczek wykorzystywanych na serwerze.',
                routePath: 'about-program',
                controllerType: EControllerType.Details,
                controllerSource: 'about-program',
                children: [],
            },
            {
                displayName: 'Użytkownicy baz danych',
                description: `
                Tu znajdują się wszyscy użytkownicy mający dostęp do zarządzania bazą
                danych za pośrednictwem systemu "Database Manager".
                `,
                routePath: 'authentication',
                controllerType: EControllerType.Grid,
                controllerSource: 'authentication',
                children: [],
            },
        ],
    },
    {
        displayName: 'Użytkownicy aplikacji',
        description: null,
        routePath: 'application-users',
        controllerType: EControllerType.Empty,
        controllerSource: null,
        children: [
            {
                displayName: 'Konta',
                description: `
                Tu znajdują się wszyscy użytkownicy aplikacji.
                `,
                routePath: 'accounts',
                controllerType: EControllerType.Grid,
                controllerSource: 'application-users',
                children: [],
            },
            {
                displayName: 'Informacje szczegółowe',
                description: `
                Tu znajdują się dodatkowe informacje użytkowników aplikacji.
                `,
                routePath: 'information',
                controllerType: EControllerType.Grid,
                controllerSource: 'application-users-info',
                children: [],
            },
        ],
    },
    {
        displayName: 'Produkty',
        description: null,
        routePath: 'products',
        controllerType: EControllerType.Empty,
        controllerSource: null,
        children: [
            {
                displayName: 'Zarządzanie',
                description: `
                Tu znajdują się dostępne w sklepie produkty.
                `,
                routePath: 'management',
                controllerType: EControllerType.Grid,
                controllerSource: 'products',
                children: [],
            },
            {
                displayName: 'Zdjęcia',
                description: `
                Tu znajduje baza danych zdjęć do produktów
                `,
                routePath: 'photos',
                controllerType: EControllerType.Files,
                controllerSource: 'products-photos',
                children: [],
            },
        ],
    },
    {
        displayName: 'Zamówienia użytkowników',
        description: `
        Tu znajdują się zamówienia złożone przez użytkowników.
        `,
        routePath: 'users-orders',
        controllerType: EControllerType.Grid,
        controllerSource: 'users-orders',
        children: [],
    },
];
