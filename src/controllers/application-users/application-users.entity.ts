import {BaseGridEntity} from '../../controller-types/base-grid/base-grid.entity';
import {Column, Entity, OneToMany, OneToOne} from 'typeorm';
import {ApplicationUsersInfoEntity} from '../application-users-info/application-users-info.entity';
import {UsersOrdersEntity} from '../users-orders/users-orders.entity';

@Entity()
export class ApplicationUsersEntity extends BaseGridEntity {

    @Column({
        unique: true,
    })
    login: string;

    @Column({
        unique: true,
    })
    email: string;

    @Column()
    password: string;

    @OneToOne(type => ApplicationUsersInfoEntity, type => type.account)
    info: Promise<ApplicationUsersInfoEntity>;

    @OneToMany(type => UsersOrdersEntity, type => type.user)
    orders: Promise<UsersOrdersEntity[]>;

    public getDisplayName(): string {
        return this.login;
    }

}
