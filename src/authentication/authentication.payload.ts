import {IsEnum, IsInt, IsString} from 'class-validator';
import {AuthorizationEnum} from '../authorization/authorization.enum';

export class AuthenticationPayload {

    @IsString()
    username: string;

    @IsInt()
    sub: number;

    @IsEnum(AuthorizationEnum)
    role: AuthorizationEnum;

}
