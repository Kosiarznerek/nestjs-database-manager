import {Controller} from '@nestjs/common';
import {BaseGridController} from '../../controller-types/base-grid/base-grid.controller';
import {ApplicationUsersEntity} from './application-users.entity';
import {ApplicationUsersService} from './application-users.service';

@Controller('application-users')
export class ApplicationUsersController extends BaseGridController<ApplicationUsersEntity, ApplicationUsersService> {

    constructor(
        private readonly _applicationUsersService: ApplicationUsersService,
    ) {
        super(_applicationUsersService);
    }

}
