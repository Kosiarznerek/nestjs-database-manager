import {Controller} from '@nestjs/common';
import {BaseGridController} from '../../controller-types/base-grid/base-grid.controller';
import {ProductsEntity} from './products.entity';
import {ProductsService} from './products.service';

@Controller('products')
export class ProductsController extends BaseGridController<ProductsEntity, ProductsService> {

    constructor(
        private readonly _productsService: ProductsService,
    ) {
        super(_productsService);
    }

}
