import {IsBoolean, IsDefined, IsEnum, IsOptional, IsString, ValidateIf, ValidateNested} from 'class-validator';
import {PropertyValidatorDto} from './property-validator.dto';
import {Type} from 'class-transformer';

/**
 * Available property (form input) types
 */
export enum EPropertyType {
    Text = 'text',
    Password = 'password',
    Number = 'number',
    Email = 'email',
    Date = 'date',
    Time = 'time',
    Boolean = 'boolean',
    Hidden = 'hidden',
    Autocomplete = 'autocomplete',
    Chips = 'chips',
}

/**
 * Description of one property (form input)
 */
export class PropertyDescriptionDto {

    /**
     * Name of input to be send as to API
     */
    @IsString()
    readonly name: string;

    /**
     * Name displayed for user above the input
     */
    @IsString()
    readonly displayName: string;

    /**
     * Current value of input
     */
    readonly value: any;

    /**
     * Type of input
     */
    @IsDefined()
    @IsEnum(EPropertyType)
    readonly type: EPropertyType;

    /**
     * Frontend validators data
     */
    @ValidateNested()
    @Type(() => PropertyValidatorDto)
    readonly validator: PropertyValidatorDto;

    /**
     * Link to action executed when value changes
     */
    @IsOptional()
    @IsString()
    readonly onChange?: string;

    /**
     * Is readonly?
     */
    @IsOptional()
    @IsBoolean()
    readonly isDisabled?: boolean;

    /**
     * Link to data provider for chips and autocomplete
     */
    @ValidateIf(o => o.type === EPropertyType.Chips || o.type === EPropertyType.Autocomplete)
    @IsString()
    readonly onFilteredOptionData?: string;

}
