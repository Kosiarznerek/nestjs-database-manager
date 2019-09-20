import {DetailsDataDto} from './dto/details-data.dto';
import {BaseDetailsService} from './base-details.service';
import {Get, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {AuthorizationGuard} from '../../authorization/authorization.guard';
import {Authorization} from '../../authorization/authorization.decorator';
import {AuthorizationEnum} from '../../authorization/authorization.enum';

/**
 * Each controller type of base-details must extends this class
 */
export class BaseDetailsController<DetailsService extends BaseDetailsService> {

    protected constructor(
        private readonly _detailsService: DetailsService,
    ) {
    }

    /**
     * Used to get details to display in Database Manager Frontend
     */
    @Get()
    @Authorization(AuthorizationEnum.DatabaseAdmin)
    @UseGuards(AuthGuard('jwt'), AuthorizationGuard)
    public async getData(): Promise<DetailsDataDto[]> {
        return this._detailsService.getData();
    }

}
