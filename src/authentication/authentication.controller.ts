import {Body, Controller, Post} from '@nestjs/common';
import {BaseGridController} from '../controller-types/base-grid/base-grid.controller';
import {AuthenticationEntity} from './authentication.entity';
import {AuthenticationService} from './authentication.service';
import {AuthenticationDto} from './authentication.dto';

@Controller('authentication')
export class AuthenticationController extends BaseGridController<AuthenticationEntity, AuthenticationService> {

    constructor(
        private readonly _authenticationService: AuthenticationService,
    ) {
        super(_authenticationService);
    }

    /**
     * Signs in user and returns access_token
     * @param model Sign in model
     */
    @Post()
    public async signIn(@Body() model: AuthenticationDto): Promise<string> {
        return this._authenticationService.signIn(model);
    }

}
