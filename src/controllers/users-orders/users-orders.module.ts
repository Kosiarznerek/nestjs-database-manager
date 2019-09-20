import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsersOrdersService} from './users-orders.service';
import {UsersOrdersController} from './users-orders.controller';
import {UsersOrdersEntity} from './users-orders.entity';

@Module({
    imports: [TypeOrmModule.forFeature([
        UsersOrdersEntity,
    ])],
    providers: [UsersOrdersService],
    controllers: [UsersOrdersController],
})
export class UsersOrdersModule {
}
