import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AuthenticationService} from './authentication.service';
import {AuthenticationController} from './authentication.controller';
import {AuthenticationEntity} from './authentication.entity';
import {jwtConstants} from '../authentication/authentication.constans';
import {JwtModule} from '@nestjs/jwt';
import {AuthenticationStrategy} from '../authentication/authentication.strategy';

@Module({
    imports: [
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '60s'},
        }),
        TypeOrmModule.forFeature([
            AuthenticationEntity,
        ]),
    ],
    providers: [AuthenticationService, AuthenticationStrategy],
    controllers: [AuthenticationController],
    exports: [AuthenticationService],
})
export class AuthenticationModule {
}
