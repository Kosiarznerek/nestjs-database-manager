import {Injectable} from '@nestjs/common';
import {BaseGridService} from '../../controller-types/base-grid/base-grid.service';
import {ApplicationUsersEntity} from './application-users.entity';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {Definition} from './application-users.definition';

@Injectable()
export class ApplicationUsersService extends BaseGridService<ApplicationUsersEntity> {

    constructor(
        @InjectRepository(ApplicationUsersEntity)
        private readonly _applicationUsersRepository: Repository<ApplicationUsersEntity>,
    ) {
        super(_applicationUsersRepository, Definition);
    }

}
