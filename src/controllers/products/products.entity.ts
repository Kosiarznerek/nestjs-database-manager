import {BaseGridEntity} from '../../controller-types/base-grid/base-grid.entity';
import {Column, Entity, JoinTable, ManyToMany, ManyToOne} from 'typeorm';
import {UsersOrdersEntity} from '../users-orders/users-orders.entity';
import {ProductsPhotosEntity} from '../products-photos/products-photos.entity';

@Entity()
export class ProductsEntity extends BaseGridEntity {

    @Column()
    name: string;

    @Column()
    expireDate: Date;

    @ManyToMany(type => UsersOrdersEntity, type => type.products)
    @JoinTable()
    orders: Promise<UsersOrdersEntity[]>;

    @ManyToMany(type => ProductsPhotosEntity, type => type.products)
    @JoinTable()
    photos: Promise<ProductsPhotosEntity[]>;

    @ManyToOne(type => ProductsPhotosEntity, type => type.productThumbnails)
    photoThumbnail: Promise<ProductsPhotosEntity>;

    public getDisplayName(): string {
        return this.name;
    }

}
