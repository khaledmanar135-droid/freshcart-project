'use server'
import { request } from '@/lib/request.action'
export async function getBrands(params={}){const q=new URLSearchParams(params).toString();return request(`/brands${q?`?${q}`:''}`)}
export async function getBrand(id){return request(`/brands/${id}`)}

