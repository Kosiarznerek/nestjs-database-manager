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

    /**
     * Hash password before inserting new user
     */
    @BeforeInsert()
    private async hashPassword(): Promise<void> {
        this.password = await bcrypt.hash(this.password, 15);
    }

    /**
     * Set user random password
     */
    public setRandomPassword(): void {
        // tslint:disable-next-line:no-bitwise
        const random = () => (((1 + Math.random()) * 0x10000) | 0).toString(16);
        this.password = `${random()}${random()}`;
    }

}
