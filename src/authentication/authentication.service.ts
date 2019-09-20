import {Injectable, UnauthorizedException} from '@nestjs/common';
import {BaseGridService} from '../controller-types/base-grid/base-grid.service';
import {AuthenticationEntity} from './authentication.entity';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {Definition} from './authentication.definition';
import {AuthenticationDto} from './authentication.dto';
import {AuthenticationPayload} from './authentication.payload';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService extends BaseGridService<AuthenticationEntity> {

    constructor(
        @InjectRepository(AuthenticationEntity)
        private readonly _authenticationRepository: Repository<AuthenticationEntity>,
        private readonly _jwtService: JwtService,
    ) {
        super(_authenticationRepository, Definition);
    }

    public async signIn(model: AuthenticationDto): Promise<string> {

        // Getting user
        const users: AuthenticationEntity[] = await this._authenticationRepository.find({
            where: {login: model.login},
        });

        // User not found
        if (users.length !== 1) {
            throw new UnauthorizedException();
        }

        // Extracting user
        const [user] = users;

        // Checking raw password with hash
        if (await bcrypt.compare(model.password, user.password)) {
            const payload: AuthenticationPayload = {username: model.login, sub: user.id};
            return this._jwtService.sign(payload);
        }

        // Unauthorised
        throw new UnauthorizedException();

    }

    /**
     * Checks if user exists based on given payload
     * @param payload User's payload
     */
    public async userExists(payload: AuthenticationPayload): Promise<boolean> {

        // Getting user
        const users: number = await this._authenticationRepository.count({
            where: {id: payload.sub},
        });

        // Return statement
        return users === 1;

    }

}
