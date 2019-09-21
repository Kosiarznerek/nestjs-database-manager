import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {authenticationConstants} from './authentication.constants';
import {AuthenticationPayload} from './authentication.payload';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class AuthenticationStrategy extends PassportStrategy(Strategy) {

    constructor(
        private readonly _authenticationService: AuthenticationService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: authenticationConstants.secret,
        });
    }

    public async validate(payload: AuthenticationPayload): Promise<AuthenticationPayload> {

        // Throw exception if user not exists in database any more
        if (!(await this._authenticationService.databaseAdminExists(payload))) {
            throw new UnauthorizedException();
        }

        // Return payload
        return payload;

    }

}
