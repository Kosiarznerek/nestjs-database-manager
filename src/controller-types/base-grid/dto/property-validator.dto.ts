import {IsBoolean, IsInt, IsOptional} from 'class-validator';

/**
 * Frontend validator for input
 */
export class PropertyValidatorDto {

    /**
     * Is required
     */
    @IsBoolean()
    readonly isRequired: boolean;

    /**
     * Minimum length (eg. for text controls)
     */
    @IsOptional()
    @IsInt()
    readonly minLength?: number;

    /**
     * Maximum length (eg. for numeric controls)
     */
    @IsOptional()
    @IsInt()
    readonly maxLength?: number;

}
