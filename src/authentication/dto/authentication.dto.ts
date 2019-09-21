import {IsString} from 'class-validator';

/**
 * Model used to authenticate (sign in) user
 */
export class AuthenticationDto {

    @IsString()
    login: string;

    @IsString()
    password: string;

}
