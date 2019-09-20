import {Injectable} from '@nestjs/common';
import {BaseGridService} from '../../controller-types/base-grid/base-grid.service';
import {UsersOrdersEntity} from './users-orders.entity';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {Definition} from './users-orders.definition';

@Injectable()
export class UsersOrdersService extends BaseGridService<UsersOrdersEntity> {

    constructor(
        @InjectRepository(UsersOrdersEntity)
        private readonly _systemUsersRepository: Repository<UsersOrdersEntity>,
    ) {
        super(_systemUsersRepository, Definition);
    }

}
