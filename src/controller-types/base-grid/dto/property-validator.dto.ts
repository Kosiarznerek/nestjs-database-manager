import {IsBoolean, IsInt, IsOptional} from 'class-validator';

export class PropertyValidatorDto {

    @IsBoolean()
    readonly isRequired: boolean;

    @IsOptional()
    @IsInt()
    readonly minLength?: number;

    @IsOptional()
    @IsInt()
    readonly maxLength?: number;

}
