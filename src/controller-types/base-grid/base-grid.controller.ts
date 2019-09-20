import {Omit} from 'utility-types';
import {Body, Delete, Get, Post, Query, UseGuards} from '@nestjs/common';
import {BaseGridService} from './base-grid.service';
import {PropertyDescriptionDto} from './dto/property-description.dto';
import {BaseGridEntity} from './base-grid.entity';
import {GridDefinitionDto} from './dto/grid-definition.dto';
import {PaginatorStateDto} from './dto/paginator-state.dto';
import {GridDataDto} from './dto/grid-data.dto';
import {FilteredOptionDataDto} from './dto/filtered-option-data.dto';
import {AuthGuard} from '@nestjs/passport';

export class BaseGridController<BaseEntity extends BaseGridEntity,
    GridService extends BaseGridService<BaseEntity, EditDto, AddDto>,
    EditDto extends object & Partial<BaseEntity> & Pick<BaseEntity, 'id'> = BaseEntity,
    AddDto extends object & Partial<Omit<BaseEntity, 'id'>> = Omit<BaseEntity, 'id'>,
    > {

    protected constructor(
        private readonly _gridService: GridService,
    ) {
    }

    /**
     * Gets data for grid
     * @param paginatorState
     */
    @Post('getData')
    @UseGuards(AuthGuard('jwt'))
    public getData(@Body() paginatorState: PaginatorStateDto): Promise<GridDataDto> {
        return this._gridService.getData(paginatorState);
    }

    /**
     * Gets grid definitions
     */
    @Get('getDefinition')
    @UseGuards(AuthGuard('jwt'))
    public getDefinition(): Promise<GridDefinitionDto> {
        return this._gridService.getDefinition();
    }

    /**
     * Gets edit item configuration
     * @param itemId Item id to get configuration
     */
    @Get('getEditItemConfiguration')
    @UseGuards(AuthGuard('jwt'))
    public getEditItemConfiguration(@Query('itemId') itemId: string): Promise<PropertyDescriptionDto[]> {
        return this._gridService.getEditItemConfiguration(itemId);
    }

    /**
     * Edits item
     * @param item Item to add
     */
    @Post('editItem')
    @UseGuards(AuthGuard('jwt'))
    public editItem(@Body() item: EditDto): Promise<boolean> {
        return this._gridService.editItem(item);
    }

    /**
     * Adds item
     * @param item Item to add
     */
    @Post('addItem')
    @UseGuards(AuthGuard('jwt'))
    public addItem(@Body() item: AddDto): Promise<boolean> {
        return this._gridService.addItem(item);
    }

    /**
     * Removes repository with given id
     * @param itemId Item id to remove
     */
    @Delete('removeItem')
    @UseGuards(AuthGuard('jwt'))
    public removeItem(@Query('itemId') itemId: string): Promise<boolean> {
        return this._gridService.removeItem(itemId);
    }

    /**
     * Provides data for autocomplete and chips
     * @param searchPhrase Phrase to search
     */
    @Post('onFilteredOptionData')
    @UseGuards(AuthGuard('jwt'))
    public onFilteredOptionData(@Query('searchPhrase') searchPhrase: string): Promise<FilteredOptionDataDto[]> {
        return this._gridService.onFilteredOptionData(searchPhrase);
    }

}
