import {Body, Controller, Get, Post} from '@nestjs/common';
import {BaseGridController} from '../controller-types/base-grid/base-grid.controller';
import {AuthenticationEntity} from './authentication.entity';
import {AuthenticationService} from './authentication.service';
import {AuthenticationDto} from './dto/authentication.dto';
import {AuthorizationEnum} from '../authorization/authorization.enum';
import {AuthenticationToken} from './authentication.token';
import {PropertyDescriptionDto} from '../controller-types/base-grid/dto/property-description.dto';
import {ResetPasswordDto} from './dto/reset-password.dto';
import {Omit} from 'utility-types';

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
        return this._authenticationService.signInDatabaseAdmin(model);
    }

    /**
     * Gets controls configuration to reset Database Admin password
     */
    @Get(`${AuthorizationEnum.DatabaseAdmin}/reset-password`)
    public async getResetDatabaseAdminPasswordConfiguration(): Promise<PropertyDescriptionDto[]> {
        return this._authenticationService.getResetDatabaseAdminPasswordConfiguration();
    }

    /**
     * Resets Database Admin password
     * @param model
     */
    @Post(`${AuthorizationEnum.DatabaseAdmin}/reset-password`)
    public async resetDatabaseAdminPassword(@Body() model: ResetPasswordDto): Promise<boolean> {
        return this._authenticationService.resetDatabaseAdminPassword(model);
    }

    /**
     * Gets configuration to add database admin account
     */
    @Get(`${AuthorizationEnum.DatabaseAdmin}/first-account`)
    public async getAddDatabaseAdminAccountConfiguration(): Promise<PropertyDescriptionDto[]> {
        return this._authenticationService.getAddDatabaseAdminAccountConfiguration();
    }

    /**
     * Adds first database admin account
     * Should be used to create first account
     * @param model Entity model
     */
    @Post(`${AuthorizationEnum.DatabaseAdmin}/first-account`)
    public async addFirstDatabaseAdminAccount(@Body() model: Omit<AuthenticationEntity, 'id'>): Promise<boolean> {
        return this._authenticationService.addFirstDatabaseAdminAccount(model);
    }

}
