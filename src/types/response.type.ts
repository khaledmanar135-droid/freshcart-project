
import { Category } from '@/features/categories/types/category.type';
import { Iproduct } from '@/features/products/types/product.type';
import { ListResponse } from '@/types/listingresponse.type';

export type categoryResponse = ListResponse<Category>;
export type productResponse = ListResponse<Iproduct>;

