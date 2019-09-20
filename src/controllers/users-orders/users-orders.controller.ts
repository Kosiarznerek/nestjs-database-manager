import {Controller} from '@nestjs/common';
import {BaseGridController} from '../../controller-types/base-grid/base-grid.controller';
import {UsersOrdersEntity} from './users-orders.entity';
import {UsersOrdersService} from './users-orders.service';

@Controller('users-orders')
export class UsersOrdersController extends BaseGridController<UsersOrdersEntity, UsersOrdersService> {

    constructor(
        private readonly _usersOrdersService: UsersOrdersService,
    ) {
        super(_usersOrdersService);
    }

}
