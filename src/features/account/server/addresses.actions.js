'use server'
import { request } from '@/lib/request.action'
export async function addAddress(data){return request('/addresses',{method:'POST',body:JSON.stringify(data)})}
export async function removeAddress(id){return request(`/addresses/${id}`,{method:'DELETE'})}
export async function getAddress(id){return request(`/addresses/${id}`)}
export async function getAddresses(){return request('/addresses')}

