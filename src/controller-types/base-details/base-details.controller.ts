import {DetailsDataDto} from './dto/details-data.dto';
import {BaseDetailsService} from './base-details.service';
import {Get, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';

/**
 * Each controller type of base-details must extends this class
 */
export class BaseDetailsController<DetailsService extends BaseDetailsService> {

    protected constructor(
        private readonly _detailsService: DetailsService,
    ) {
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    public async getData(): Promise<DetailsDataDto[]> {
        return this._detailsService.getData();
    }

}
