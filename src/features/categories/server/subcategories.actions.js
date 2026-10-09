'use server'
import { request } from '@/lib/request.action'
export async function getSubCategories(){return request('/subcategories')}
export async function getSubCategory(id){return request(`/subcategories/${id}`)}
export async function getSubCategoriesOnCategory(categoryId){return request(`/categories/${categoryId}/subcategories`)}

