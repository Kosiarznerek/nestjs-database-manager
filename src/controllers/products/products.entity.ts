import {BaseGridEntity} from '../../controller-types/base-grid/base-grid.entity';
import {Column, Entity, JoinTable, ManyToMany} from 'typeorm';
import {UsersOrdersEntity} from '../users-orders/users-orders.entity';

@Entity()
export class ProductsEntity extends BaseGridEntity {

    @Column()
    name: string;

    @Column()
    expireDate: Date;

    @ManyToMany(type => UsersOrdersEntity, type => type.products)
    @JoinTable()
    orders: Promise<UsersOrdersEntity[]>;

    public getDisplayName(): string {
        return this.name;
    }

}
