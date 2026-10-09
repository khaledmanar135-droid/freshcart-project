'use server'
import { request } from '@/lib/request.action'
export async function getCategories(params={}){const q=new URLSearchParams(params).toString();return request(`/categories${q?`?${q}`:''}`)}
export async function getCategory(id){return request(`/categories/${id}`)}

