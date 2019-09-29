import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ProductsPhotosService} from './products-photos.service';
import {ProductsPhotosController} from './products-photos.controller';
import {ProductsPhotosEntity} from './products-photos.entity';

@Module({
    imports: [TypeOrmModule.forFeature([
        ProductsPhotosEntity,
    ])],
    providers: [ProductsPhotosService],
    controllers: [ProductsPhotosController],
})
export class ProductsPhotosModule {
}
