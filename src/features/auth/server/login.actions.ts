'use server'
import {cookies} from 'next/headers';
export interface ILogin{
  password:string,
  email:string
}

const BASE_URL = process.env.BASE_URL || 'https://ecommerce.routemisr.com/api/v1';

export async function SignIn(payload:ILogin){

   const response =await fetch(`${BASE_URL}/auth/signin`,{
    method:'POST',
    body:JSON.stringify(payload),
    headers:{
      "content-type":'application/json'
    }
   })
   const data =await response.json()


    const cookie =await cookies()
    cookie.set('userToken',data.token,{
      httpOnly:true,
    })


   return response.ok

}


// localstorage    
// session storage 
// cookies   server - client expire