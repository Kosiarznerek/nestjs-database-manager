import {Injectable} from '@nestjs/common';
import {ProductsPhotosEntity} from './products-photos.entity';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {Definition} from './products-photos.definition';
import {BaseFilesService} from '../../controller-types/base-files/base-files.service';

@Injectable()
export class ProductsPhotosService extends BaseFilesService<ProductsPhotosEntity> {

    constructor(
        @InjectRepository(ProductsPhotosEntity)
        private readonly _productsPhotosEntityRepository: Repository<ProductsPhotosEntity>,
    ) {
        super(_productsPhotosEntityRepository, Definition);
    }

}
