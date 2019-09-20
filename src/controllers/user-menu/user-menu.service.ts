import {Injectable} from '@nestjs/common';
import {MenuItemDto} from './dto/menu-item.dto';
import {Definition, TSimpleMenuItem} from './user-menu.definition';

@Injectable()
export class UserMenuService {

    public async getMenuItems(): Promise<MenuItemDto[]> {

        // Return statement
        return Definition.map(v => this._addRouterLink(v));

    }

    /**
     * Converts simple menu item to normal
     * @param menuItem Menu item to parse
     * @param parent? Parent node
     */
    private _addRouterLink(menuItem: TSimpleMenuItem, parent?: MenuItemDto): MenuItemDto {

        // Clone as converted
        const converted: MenuItemDto = menuItem as MenuItemDto;

        // Adding routePath
        converted.routerLink = parent
            ? `${parent.routerLink}/${converted.routePath}`
            : `${converted.routePath}`;

        // Converting children
        converted.children = converted.children
            .map(c => this._addRouterLink(c, converted));

        // Return
        return converted;

    }

}
