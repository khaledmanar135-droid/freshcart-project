"use server"
import { getMyToken } from "@/Utilities/getMyToken.utilities"

export async function DeleteCartItem(productId:string){
    const token = await getMyToken()
    if(!token){
        throw new Error('logi first please!')
    }

    const response =await  fetch(`${process.env.BASE_URL}/cart/${productId}`,{
        method:'DELETE',
        headers:{
            token:String(token),
            'content-type':'application/json'
        }
     })

     const payload =await  response.json()

     return payload
}