import {Controller, Get, UseGuards} from '@nestjs/common';
import {MenuItemDto} from './dto/menu-item.dto';
import {UserMenuService} from './user-menu.service';
import {AuthGuard} from '@nestjs/passport';
import {AuthorizationGuard} from '../../authorization/authorization.guard';

@Controller('user-menu')
export class UserMenuController {

    constructor(
        private _userMenuService: UserMenuService,
    ) {
    }

    /**
     * Gets user menu items
     */
    @Get()
    @UseGuards(AuthGuard('jwt'), AuthorizationGuard)
    public async getMenuItems(): Promise<MenuItemDto[]> {
        return this._userMenuService.getMenuItems();
    }

}
