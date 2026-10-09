"use server"
import { getMyToken } from "@/Utilities/getMyToken.utilities"

type Checkout={
    city:string,
    phone:string,
    details:string,
    postalCode:string
}

export async function CashOrder(cartId:string,formData:Checkout){
    const token = await getMyToken()
    if(!token){
        throw new Error('logi first please!')
    }

    const response =await  fetch(`${process.env.BASE_URL}/orders/${cartId}`,{
        method:'POST',
        headers:{
             token:String(token),
            'content-type':'application/json'
        },
        body:JSON.stringify({
            shippingAddress:formData
        })
     })

     const payload =await  response.json()

     return payload
}