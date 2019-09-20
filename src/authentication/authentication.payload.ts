import {IsArray, IsInt, IsString} from 'class-validator';
import {AuthorizationEnum} from '../authorization/authorization.enum';

export class AuthenticationPayload {

    @IsString()
    username: string;

    @IsInt()
    sub: number;

    @IsArray()
    roles: AuthorizationEnum[];

}
