import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ProductsService} from './products.service';
import {ProductsController} from './products.controller';
import {ProductsEntity} from './products.entity';

@Module({
    imports: [TypeOrmModule.forFeature([
        ProductsEntity,
    ])],
    providers: [ProductsService],
    controllers: [ProductsController],
})
export class ProductsModule {
}
