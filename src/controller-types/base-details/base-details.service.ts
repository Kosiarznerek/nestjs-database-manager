import {DetailsDataDto} from './dto/details-data.dto';

/**
 * Each controller type of base-details must extends this class
 */
export class BaseDetailsService {

    /**
     * Returns base-details items
     */
    public async getData(): Promise<DetailsDataDto[]> {
        return [];
    }

}
