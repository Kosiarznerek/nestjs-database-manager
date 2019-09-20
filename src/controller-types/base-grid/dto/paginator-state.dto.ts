import {IsInt, IsArray, IsOptional, ArrayUnique, ArrayNotEmpty} from 'class-validator';

export class PaginatorStateDto {

    @IsInt()
    @IsOptional()
    totalPages: number;

    @IsInt()
    @IsOptional()
    currentPage: number;

    @IsInt()
    @IsOptional()
    currentPageSize: number;

    @IsInt()
    @IsOptional()
    totalRecords: number;

    @IsArray()
    @ArrayUnique()
    @ArrayNotEmpty()
    @IsOptional()
    pageSizeOptions: number[];

}
