import {IsEnum, IsOptional, IsString, ValidateIf, ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';

// Controller types
export enum EControllerType {
    Grid = 'grid',
    Details = 'details',
    Dashboard = 'dashboard',
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

    @ValidateIf(o => o.controllerType !== EControllerType.Empty && o.controllerType !== EControllerType.Dashboard)
    @IsString()
    controllerSource: string | null;

    @ValidateNested({each: true})
    @Type(() => MenuItemDto)
    children: MenuItemDto[];

}
