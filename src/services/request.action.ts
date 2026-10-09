'use server'

import { getMyToken } from '@/Utilities/getMyToken.utilities'

export async function request(path:string,options:RequestInit={}){
  const token=await getMyToken()
  const response=await fetch(`${process.env.BASE_URL}${path}`,{
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
