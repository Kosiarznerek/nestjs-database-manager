import {Body, Controller, Post} from '@nestjs/common';
import {BaseGridController} from '../controller-types/base-grid/base-grid.controller';
import {AuthenticationEntity} from './authentication.entity';
import {AuthenticationService} from './authentication.service';
import {AuthenticationDto} from './authentication.dto';
import {AuthorizationEnum} from '../authorization/authorization.enum';
import {AuthenticationToken} from './authentication.token';

@Controller('authentication')
export class AuthenticationController extends BaseGridController<AuthenticationEntity, AuthenticationService> {

    constructor(
        private readonly _authenticationService: AuthenticationService,
    ) {
        super(_authenticationService);
    }

    /**
     * Signs in user as database administrator and returns access_token
     * @param model Sign in model
     */
    @Post(AuthorizationEnum.DatabaseAdmin)
    public async signInDatabaseAdmin(@Body() model: AuthenticationDto): Promise<AuthenticationToken> {
        return this._authenticationService.signIn(model, [AuthorizationEnum.DatabaseAdmin]);
    }

    /**
     * Signs in user as application and returns access_token
     * @param model Sign in model
     */
    @Post(AuthorizationEnum.ApplicationUser)
    public async signInApplicationUser(@Body() model: AuthenticationDto): Promise<AuthenticationToken> {
        return this._authenticationService.signIn(model, [AuthorizationEnum.ApplicationUser]);
    }

}
