
import { Category } from './category.interface';
import { Iproduct } from './product.interface';
import { ListResponse } from './listingResponse.interface';

export type categoryResponse = ListResponse<Category>;
export type productResponse = ListResponse<Iproduct>;
