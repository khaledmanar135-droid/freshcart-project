"use server"
import { getMyToken } from "@/Utilities/getMyToken.utilities"

export async function RemoveCart(){
    const token = await getMyToken()
    if(!token){
        throw new Error('logi first please!')
    }

    const response =await  fetch(`${process.env.BASE_URL}/cart`,{
        method:'DELETE',
        headers:{
            token:String(token),
            'content-type':'application/json'
        }
     })

     const payload =await  response.json()

     return payload
}