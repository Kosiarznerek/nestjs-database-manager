import {Injectable} from '@nestjs/common';
import {BaseGridService} from '../../controller-types/base-grid/base-grid.service';
import {ApplicationUsersInfoEntity} from './application-users-info.entity';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {Definition} from './application-users-info.definition';

@Injectable()
export class ApplicationUsersInfoService extends BaseGridService<ApplicationUsersInfoEntity> {

    constructor(
        @InjectRepository(ApplicationUsersInfoEntity)
        private readonly _applicationUsersInfoRepository: Repository<ApplicationUsersInfoEntity>,
    ) {
        super(_applicationUsersInfoRepository, Definition);
    }

}
