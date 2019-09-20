import {BaseGridEntity} from '../../controller-types/base-grid/base-grid.entity';
import {Column, Entity, ManyToMany, ManyToOne} from 'typeorm';
import {ApplicationUsersEntity} from '../application-users/application-users.entity';
import {ProductsEntity} from '../products/products.entity';
import {ApplicationUsersInfoEntity} from '../application-users-info/application-users-info.entity';
import * as dateFormat from 'dateformat';

@Entity()
export class UsersOrdersEntity extends BaseGridEntity {

    @Column({
        type: 'timestamp',
    })
    purchaseDate: Date;

    @ManyToOne(type => ApplicationUsersEntity, type => type.orders)
    user: Promise<ApplicationUsersEntity>;

    @Column({
        nullable: true,
    })
    comments: string;

    @ManyToMany(type => ProductsEntity, type => type.orders)
    products: Promise<ProductsEntity[]>;

    @Column()
    isDelivered: boolean;

    public async getDisplayName(): Promise<string> {

        // Getting user info
        const user: ApplicationUsersEntity = await this.user;
        const usersInfo: ApplicationUsersInfoEntity = await user.info;

        // Format date
        const date: string = dateFormat(this.purchaseDate, 'dd.mm.yyyy');

        // Counting products
        const productsCount: number = (await this.products).length;

        // Return
        return `${usersInfo.name} ${usersInfo.surname} zamówił/a dnia ${date} ${productsCount} produktów.`;

    }

}
