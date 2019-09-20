import {Omit, Assign} from 'utility-types';
import {EControllerType, MenuItemDto} from './dto/menu-item.dto';

export type TSimpleMenuItem = Assign<Omit<MenuItemDto, 'routerLink'>, { children: TSimpleMenuItem[] }>;

export const Definition: TSimpleMenuItem[] = [
    {
        displayName: 'Dashboard',
        description: 'Prace na dashboardem w toku...',
        routePath: 'dashboard',
        controllerType: EControllerType.Dashboard,
        controllerSource: null,
        children: [],
    },
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
        description: `
        Tu znajdują się wszyscy użytkownicy aplikacji.
        `,
        routePath: 'application-users',
        controllerType: EControllerType.Grid,
        controllerSource: 'application-users',
        children: [],
    },
    {
        displayName: 'Użytkownicy aplikacji - informacje',
        description: `
        Tu znajdują się dodatkowe informacje użytkowników aplikacji.
        `,
        routePath: 'application-users-info',
        controllerType: EControllerType.Grid,
        controllerSource: 'application-users-info',
        children: [],
    },
    {
        displayName: 'Produkty',
        description: `
        Tu znajdują się dostępne w sklepie produkty.
        `,
        routePath: 'products',
        controllerType: EControllerType.Grid,
        controllerSource: 'products',
        children: [],
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
