import {IsString} from 'class-validator';

/**
 * Application authentication token return after sign in
 */
export class AuthenticationToken {

    /**
     * Generated access token from passport jwt
     */
    @IsString()
    accessToken: string;

    /**
     * Token expires date as UTC string
     */
    @IsString()
    expireDate: string;

}
