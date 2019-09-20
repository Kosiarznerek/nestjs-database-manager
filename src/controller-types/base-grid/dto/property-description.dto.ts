import {IsBoolean, IsDefined, IsEnum, IsOptional, IsString, ValidateIf, ValidateNested} from 'class-validator';
import {PropertyValidatorDto} from './property-validator.dto';
import {Type} from 'class-transformer';

export enum EPropertyType {
    Text = 'text',
    Password = 'password',
    Number = 'number',
    Email = 'email',
    Date = 'date',
    Boolean = 'boolean',
    Hidden = 'hidden',
    Autocomplete = 'autocomplete',
    Chips = 'chips',
}

export class PropertyDescriptionDto {

    @IsString()
    readonly name: string;

    @IsString()
    readonly displayName: string;

    readonly value: any;

    @IsDefined()
    @IsEnum(EPropertyType)
    readonly type: EPropertyType;

    @ValidateNested()
    @Type(() => PropertyValidatorDto)
    readonly validator: PropertyValidatorDto;

    @IsOptional()
    @IsString()
    readonly onChange?: string;

    @IsOptional()
    @IsBoolean()
    readonly isDisabled?: boolean;

    @ValidateIf(o => o.type === EPropertyType.Chips || o.type === EPropertyType.Autocomplete)
    @IsString()
    readonly onFilteredOptionData?: string;

}
