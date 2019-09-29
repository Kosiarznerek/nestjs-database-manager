import {Controller} from '@nestjs/common';
import {ProductsPhotosEntity} from './products-photos.entity';
import {ProductsPhotosService} from './products-photos.service';
import {BaseFilesController} from '../../controller-types/base-files/base-files.controller';

@Controller('products-photos')
export class ProductsPhotosController extends BaseFilesController<ProductsPhotosEntity, ProductsPhotosService> {

    constructor(
        private readonly _productsPhotosService: ProductsPhotosService,
    ) {
        super(_productsPhotosService);
    }

}
