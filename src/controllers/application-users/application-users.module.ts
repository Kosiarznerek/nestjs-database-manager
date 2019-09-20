import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ApplicationUsersService} from './application-users.service';
import {ApplicationUsersController} from './application-users.controller';
import {ApplicationUsersEntity} from './application-users.entity';

@Module({
    imports: [TypeOrmModule.forFeature([
        ApplicationUsersEntity,
    ])],
    providers: [ApplicationUsersService],
    controllers: [ApplicationUsersController],
})
export class ApplicationUsersModule {
}
