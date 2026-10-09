'use server'

import { getMyToken } from '@/features/auth/server/token.actions'

const BASE_URL = process.env.BASE_URL || 'https://ecommerce.routemisr.com/api/v1';

export async function request(path:string,options:RequestInit={}){
  const token=await getMyToken()
  const response=await fetch(`${BASE_URL}${path}`,{
    ...options,
    cache:'no-store',
    headers:{
      'content-type':'application/json',
      ...(token?{token:String(token)}:{}),
      ...options.headers,
    },
  })
  const data=await response.json()
  if(!response.ok) throw new Error(data.message || 'Error occured!')
  return {data}
}
