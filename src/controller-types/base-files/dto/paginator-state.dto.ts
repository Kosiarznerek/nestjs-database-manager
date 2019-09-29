import {ArrayNotEmpty, ArrayUnique, IsArray, IsInt, IsOptional} from 'class-validator';

/**
 * Table paginator state
 * Used to display data in table in group of 5, 10, ... items
 */
export class PaginatorStateDto {

    /**
     * Number of total pages available
     */
    @IsInt()
    @IsOptional()
    totalPages: number;

    /**
     * Current page number
     */
    @IsInt()
    @IsOptional()
    currentPage: number;

    /**
     * Items visible on one page
     */
    @IsInt()
    @IsOptional()
    currentPageSize: number;

    /**
     * Number of total record in table
     */
    @IsInt()
    @IsOptional()
    totalRecords: number;

    /**
     * Available page sizes for user
     */
    @IsArray()
    @ArrayUnique()
    @ArrayNotEmpty()
    @IsOptional()
    pageSizeOptions: number[];

}
