import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Observable} from 'rxjs';
import {AuthenticationPayload} from '../authentication/authentication.payload';
import {Reflector} from '@nestjs/core';
import {AuthorizationEnum} from './authorization.enum';
import {AuthorizationMetadataKey} from './authorization.metadata.key';

@Injectable()
export class AuthorizationGuard implements CanActivate {

    constructor(
        private readonly _reflector: Reflector,
    ) {
    }

    /**
     * Checks if user has roles to resolve API from route
     * @param context
     */
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        // Getting route roles
        const roles = this._reflector.get<AuthorizationEnum[]>(
            AuthorizationMetadataKey,
            context.getHandler(),
        );

        // No roles are required
        if (!roles) {
            return true;
        }

        // Getting user roles
        const request = context.switchToHttp().getRequest();
        const user: AuthenticationPayload = request.user;

        // Return based on user roles
        const hasRole = () => user.roles.some(role => roles.includes(role));
        return user && user.roles && hasRole();

    }

}
