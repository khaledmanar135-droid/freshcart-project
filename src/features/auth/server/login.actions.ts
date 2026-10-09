'use server'
import {cookies} from 'next/headers';
export interface ILogin{
  password:string,
  email:string
}

export async function SignIn(payload:ILogin){

   const response =await fetch(`${process.env.BASE_URL}/auth/signin`,{
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