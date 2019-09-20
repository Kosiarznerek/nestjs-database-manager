import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ApplicationUsersInfoService} from './application-users-info.service';
import {ApplicationUsersInfoController} from './application-users-info.controller';
import {ApplicationUsersInfoEntity} from './application-users-info.entity';

@Module({
    imports: [TypeOrmModule.forFeature([
        ApplicationUsersInfoEntity,
    ])],
    providers: [ApplicationUsersInfoService],
    controllers: [ApplicationUsersInfoController],
})
export class ApplicationUsersInfoModule {
}
