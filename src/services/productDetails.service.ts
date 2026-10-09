
export default async function getDetails(productId:string){
   try{
    const response=await  fetch(`${process.env.BASE_URL}/products/${productId}`)
    const data =await  response.json()  
    return data
}catch(error){
    return error
   }
}