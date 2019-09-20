import {BaseGridEntity} from '../../controller-types/base-grid/base-grid.entity';
import {Column, Entity, JoinColumn, OneToOne} from 'typeorm';
import {ApplicationUsersEntity} from '../application-users/application-users.entity';

@Entity()
export class ApplicationUsersInfoEntity extends BaseGridEntity {

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    streetName: string;

    @OneToOne(type => ApplicationUsersEntity, type => type.info)
    @JoinColumn()
    account: Promise<ApplicationUsersEntity>;

    public getDisplayName(): string {
        return `${this.name} ${this.surname}`;
    }

}
