import {Controller} from '@nestjs/common';
import {BaseGridController} from '../../controller-types/base-grid/base-grid.controller';
import {ApplicationUsersInfoEntity} from './application-users-info.entity';
import {ApplicationUsersInfoService} from './application-users-info.service';

@Controller('application-users-info')
export class ApplicationUsersInfoController extends BaseGridController<ApplicationUsersInfoEntity, ApplicationUsersInfoService> {

    constructor(
        private readonly _applicationUsersInfoService: ApplicationUsersInfoService,
    ) {
        super(_applicationUsersInfoService);
    }

}
