import {Injectable} from '@nestjs/common';
import {BaseGridService} from '../../controller-types/base-grid/base-grid.service';
import {ProductsEntity} from './products.entity';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {Definition} from './products.definition';

@Injectable()
export class ProductsService extends BaseGridService<ProductsEntity> {

    constructor(
        @InjectRepository(ProductsEntity)
        private readonly _systemUsersRepository: Repository<ProductsEntity>,
    ) {
        super(_systemUsersRepository, Definition);
    }

}
