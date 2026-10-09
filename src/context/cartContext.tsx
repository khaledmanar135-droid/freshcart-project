
"use client"
import { getCart } from '@/services/cartAction/getLogedCart.action';
import {createContext, ReactNode, SetStateAction, useEffect, useState} from 'react';

type contextType={
    cartNumber:number,
    setCartNumber:React.Dispatch<SetStateAction<number>>
}


export const cartContext =createContext<contextType>({
    cartNumber:0,
    setCartNumber:()=>undefined
})

export function CartContextProvider({children}:{children:ReactNode}){

    const [cartNumber,setCartNumber] = useState<number>(0)

    async function getCartProducts(){
       try{
         const response = await getCart()
          if(response.status == 'success'){
              setCartNumber(response.numOfCartItems)
          }
       }catch{
         setCartNumber(0)
       }
    }


    useEffect(()=>{
     getCartProducts()
    },[])


    return <cartContext.Provider value={{cartNumber,setCartNumber}}>
        {children}
    </cartContext.Provider>

}