import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserMenuModule} from './controllers/user-menu/user-menu.module';
import {AboutProgramModule} from './controllers/about-program/about-program.module';
import {ApplicationUsersModule} from './controllers/application-users/application-users.module';
import {ApplicationUsersInfoModule} from './controllers/application-users-info/application-users-info.module';
import {ProductsModule} from './controllers/products/products.module';
import {UsersOrdersModule} from './controllers/users-orders/users-orders.module';
import {AuthenticationModule} from './authentication/authentication.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        UserMenuModule,
        AboutProgramModule,
        ApplicationUsersModule,
        ApplicationUsersInfoModule,
        ProductsModule,
        UsersOrdersModule,
        AuthenticationModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
