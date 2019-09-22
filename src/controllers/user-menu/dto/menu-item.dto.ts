import {IsEnum, IsOptional, IsString, ValidateIf, ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';

// Controller types
export enum EControllerType {
    Grid = 'grid',
    Details = 'details',
    Files = 'files',
    Empty = 'empty',
}

// Menu item
export class MenuItemDto {

    @IsString()
    displayName: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    routePath: string;

    @IsString()
    routerLink: string;

    @IsEnum(EControllerType)
    controllerType: EControllerType;

    @ValidateIf(o => o.controllerType !== EControllerType.Empty)
    @IsString()
    controllerSource: string | null;

    @ValidateNested({each: true})
    @Type(() => MenuItemDto)
    children: MenuItemDto[];

}
