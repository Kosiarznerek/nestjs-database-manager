import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AuthenticationService} from './authentication.service';
import {AuthenticationController} from './authentication.controller';
import {AuthenticationEntity} from './authentication.entity';
import {authenticationConstants} from './authentication.constants';
import {JwtModule} from '@nestjs/jwt';
import {AuthenticationStrategy} from './authentication.strategy';
import {EmailSenderService} from '../email-sender/email-sender.service';

@Module({
    imports: [
        JwtModule.register({
            secret: authenticationConstants.secret,
            signOptions: {expiresIn: authenticationConstants.expiresIn},
        }),
        TypeOrmModule.forFeature([
            AuthenticationEntity,
        ]),
    ],
    providers: [
        AuthenticationService,
        AuthenticationStrategy,
        EmailSenderService,
    ],
    controllers: [AuthenticationController],
    exports: [AuthenticationService],
})
export class AuthenticationModule {
}
