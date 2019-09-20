import {BeforeInsert, Column, Entity} from 'typeorm';
import {BaseGridEntity} from '../controller-types/base-grid/base-grid.entity';
import * as bcrypt from 'bcrypt';

@Entity()
export class AuthenticationEntity extends BaseGridEntity {

    @Column({
        unique: true,
    })
    login: string;

    @Column({
        unique: true,
    })
    email: string;

    @Column({
        update: false, // disable update to avoid hashing password again
    })
    password: string;

    public getDisplayName(): string {
        return this.login;
    }

    @BeforeInsert()
    private async hashPassword(): Promise<void> {
        this.password = await bcrypt.hash(this.password, 15);
    }

}
