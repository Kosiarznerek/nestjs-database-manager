import {BaseFilesDefinitions} from '../../controller-types/base-files/base-files.definitions';
import {ProductsPhotosEntity} from './products-photos.entity';

export const Definition: BaseFilesDefinitions<ProductsPhotosEntity> = {

    saveFilePath: 'product-photos',

    allowUpload: true,

    allowDownload: false,

    allowDelete: entity => Promise.all([
        entity.productThumbnails,
        entity.products,
    ]).then(([productThumbnails, products]) =>
        productThumbnails.length === 0 && products.length === 0,
    ),

    acceptFileTypes: ['jpg', 'png'],

    maxFileSize: null,

    defaultCurrentPageSize: 20,

    defaultPageSizeOptions: [20, 50, 100],

};
