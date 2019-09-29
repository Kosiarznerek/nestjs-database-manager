import {Entity, ManyToMany, OneToMany} from 'typeorm';
import {BaseFilesEntity} from '../../controller-types/base-files/base-files.entity';
import {ProductsEntity} from '../products/products.entity';

@Entity()
export class ProductsPhotosEntity extends BaseFilesEntity {

    @ManyToMany(type => ProductsEntity, type => type.photos)
    products: Promise<ProductsEntity[]>;

    @OneToMany(type => ProductsEntity, type => type.photoThumbnail)
    productThumbnails: Promise<ProductsEntity[]>;

}
