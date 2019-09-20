import {IsInt, IsString} from 'class-validator';

export class AuthenticationPayload {

    @IsString()
    username: string;

    @IsInt()
    sub: number;

}
