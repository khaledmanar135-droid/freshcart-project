'use server'
import { request } from './request.action'
function query(params={}){
  const values=new URLSearchParams()
  Object.entries(params).forEach(([key,value])=>{
    if(Array.isArray(value)) value.forEach(item=>values.append(key,item))
    else if(value!==undefined && value!==null) values.set(key,String(value))
  })
  const result=values.toString()
  return result?`?${result}`:''
}
export async function getProducts(params={}){return request(`/products${query(params)}`)}
export async function getProduct(id){return request(`/products/${id}`)}
