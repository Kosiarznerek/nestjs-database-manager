import {Controller} from '@nestjs/common';
import {BaseDetailsController} from '../../controller-types/base-details/base-details.controller';
import {AboutProgramService} from './about-program.service';

@Controller('about-program')
export class AboutProgramController extends BaseDetailsController<AboutProgramService> {

    constructor(
        private _aboutProgramService: AboutProgramService,
    ) {
        super(_aboutProgramService);
    }

}
