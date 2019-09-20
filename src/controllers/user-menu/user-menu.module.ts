import {Module} from '@nestjs/common';
import {UserMenuController} from './user-menu.controller';
import {UserMenuService} from './user-menu.service';

@Module({
    controllers: [UserMenuController],
    providers: [UserMenuService],
})
export class UserMenuModule {
}
