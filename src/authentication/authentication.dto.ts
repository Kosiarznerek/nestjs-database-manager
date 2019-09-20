import {IsString} from 'class-validator';

export class AuthenticationDto {

    @IsString()
    login: string;

    @IsString()
    password: string;

}
