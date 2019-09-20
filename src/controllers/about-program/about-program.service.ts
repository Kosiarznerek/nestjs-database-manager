import {Injectable} from '@nestjs/common';
import {BaseDetailsService} from '../../controller-types/base-details/base-details.service';
import {dependencies} from '../../../package.json';
import {DetailsDataDto} from '../../controller-types/base-details/dto/details-data.dto';

@Injectable()
export class AboutProgramService extends BaseDetailsService {

    public async getData(): Promise<DetailsDataDto[]> {

        // Creating data
        return Object.keys(dependencies).map(packageName => ({
            displayName: packageName,
            values: [dependencies[packageName]],
            subDetails: [],
        }));

    }

}
