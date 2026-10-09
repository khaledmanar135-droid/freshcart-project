"use server"
import { getMyToken } from "@/Utilities/getMyToken.utilities"

export async function getCart(){
    const token = await getMyToken()

    if(!token){
        return null
    }

    const response =await  fetch(`${process.env.BASE_URL}/cart`,{
        method:'GET',
        headers:{
            token:String(token),
            'content-type':'application/json'
        },
     })

     const payload =await  response.json()

     return payload
}