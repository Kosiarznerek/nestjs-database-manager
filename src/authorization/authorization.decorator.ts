import {SetMetadata} from '@nestjs/common';
import {AuthorizationEnum} from './authorization.enum';
import {AuthorizationMetadataKey} from './authorization.metadata.key';

/**
 * Decorator used to set roles for controller routes
 */
export const Authorization = (...roles: AuthorizationEnum[]) =>
    SetMetadata(AuthorizationMetadataKey, roles);
