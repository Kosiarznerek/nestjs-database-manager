import {IsString} from 'class-validator';

/**
 * Model used to remind (reset) user passwords
 */
export class ResetPasswordDto {

    @IsString()
    login: string;

    @IsString()
    email: string;

}
