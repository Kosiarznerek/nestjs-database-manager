import {Injectable, InternalServerErrorException, UnauthorizedException} from '@nestjs/common';
import {BaseGridService} from '../controller-types/base-grid/base-grid.service';
import {AuthenticationEntity} from './authentication.entity';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {Definition} from './authentication.definition';
import {AuthenticationDto} from './dto/authentication.dto';
import {AuthenticationPayload} from './authentication.payload';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {AuthorizationEnum} from '../authorization/authorization.enum';
import {AuthenticationToken} from './authentication.token';
import {authenticationConstants} from './authentication.constants';
import {ResetPasswordDto} from './dto/reset-password.dto';
import {EPropertyType, PropertyDescriptionDto} from '../controller-types/base-grid/dto/property-description.dto';
import {BasePropertyDescriptionDto} from '../controller-types/base-grid/base-grid.definitions';
import {EmailSenderService} from '../email-sender/email-sender.service';
import {Omit} from 'utility-types';

@Injectable()
export class AuthenticationService extends BaseGridService<AuthenticationEntity> {

    constructor(
        @InjectRepository(AuthenticationEntity)
        private readonly _authenticationRepository: Repository<AuthenticationEntity>,
        private readonly _jwtService: JwtService,
        private readonly _emailSenderService: EmailSenderService,
    ) {
        super(_authenticationRepository, Definition);
    }

    /**
     * Checks if Database Admin user exists based on given payload
     * @param payload User's payload
     */
    public async databaseAdminExists(payload: AuthenticationPayload): Promise<boolean> {

        // Getting user
        const users: number = await this._authenticationRepository.count({
            where: {id: payload.sub},
        });

        // Return statement
        return users === 1;

    }

    /**
     * Gets controls configuration to sign in Database Admin
     */
    public async getSignInDatabaseAdminConfiguration(): Promise<PropertyDescriptionDto[]> {

        // Creating configuration for each property in model
        const descriptionModel: Record<keyof AuthenticationDto, BasePropertyDescriptionDto> = {
            login: {
                displayName: 'Login',
                value: null,
                type: EPropertyType.Text,
                validator: {
                    isRequired: true,
                    maxLength: null,
                    minLength: null,
                },
            },
            password: {
                displayName: 'Hasło',
                value: null,
                type: EPropertyType.Password,
                validator: {
                    isRequired: true,
                    maxLength: null,
                    minLength: null,
                },
            },
        };

        // Return only properties with assigned names
        return Object.keys(descriptionModel)
            .map(key => Object.assign({name: key}, descriptionModel[key]));

    }

    /**
     * Signs in user to application
     * @param model User sign in model
     */
    public async signInDatabaseAdmin(model: AuthenticationDto): Promise<AuthenticationToken> {

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

            // Creating payload
            const payload: AuthenticationPayload = {
                username: model.login,
                sub: user.id,
                role: AuthorizationEnum.DatabaseAdmin,
            };

            // Generating user token
            const accessToken: string = this._jwtService.sign(payload);
            const expireDate: string = new Date(new Date().setSeconds(authenticationConstants.expiresIn)).toISOString();

            // Return token
            return {accessToken, expireDate};

        }

        // Unauthorised
        throw new UnauthorizedException();

    }

    /**
     * Gets controls configuration to resets Database Admin password
     */
    public async getResetDatabaseAdminPasswordConfiguration(): Promise<PropertyDescriptionDto[]> {

        // Creating configuration for each property in model
        const descriptionModel: Record<keyof ResetPasswordDto, BasePropertyDescriptionDto> = {
            login: {
                displayName: 'Login',
                value: null,
                type: EPropertyType.Text,
                validator: {
                    isRequired: true,
                    maxLength: null,
                    minLength: null,
                },
            },
            email: {
                displayName: 'Adres email',
                value: null,
                type: EPropertyType.Email,
                validator: {
                    isRequired: true,
                    maxLength: null,
                    minLength: null,
                },
            },
        };

        // Return only properties with assigned names
        return Object.keys(descriptionModel)
            .map(key => Object.assign({name: key}, descriptionModel[key]));

    }

    /**
     * Resets Database Admin password
     * Checks login and email, sets token as expired (if user is signed in),
     * then set random password and sends it to the user
     * @param model
     */
    public async resetDatabaseAdminPassword(model: ResetPasswordDto): Promise<boolean> {

        // Getting user
        const usersMath: AuthenticationEntity[] = await this._authenticationRepository.find({
            where: {
                login: model.login,
                email: model.email,
            },
        });

        // User not found
        if (usersMath.length !== 1) {
            return false;
        }

        // Extracting user
        const [user] = usersMath;

        // Delete and insert same user with random password
        // to set token as unauthenticated, because each time validate method
        // is being called in .strategy user is being checked via Id
        await this._authenticationRepository.remove(user);
        user.id = undefined;
        user.setRandomPassword();
        const newPassword = user.password; // get password before hashing
        await this._authenticationRepository.save(user);

        // Send email to user with new password
        const success = await this._emailSenderService.sendEmail({
            to: user.email,
            subject: 'Zresetowano hasło do konta Database Manager',
            text: `Nowe hasło to: ${newPassword}`,
        });

        // Error
        if (!success) {
            throw new InternalServerErrorException('Unable to send mail with new password');
        }

        // Return
        return true;

    }

    /**
     * Gets configuration to add database admin account
     */
    public async getAddDatabaseAdminAccountConfiguration(): Promise<PropertyDescriptionDto[]> {

        // Getting definitions
        const definitions = await this.getDefinition();

        // Return
        return definitions.addConfiguration;

    }

    /**
     * Adds first database admin account
     * Should be used to create first account
     * @param model
     */
    public async addFirstDatabaseAdminAccount(model: Omit<AuthenticationEntity, 'id'>): Promise<boolean> {

        // Counting current accounts
        const count: number = await this._repository.count();

        // Some account are created
        if (count > 0) {
            return false;
        }

        // Adding account
        return this.addItem(model);

    }

}
