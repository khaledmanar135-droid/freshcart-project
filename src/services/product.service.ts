export async function getProducts(){
     try{
        const response =await  fetch(`${process.env.BASE_URL}/products`)
       if(!response.ok){
         throw new Error('Error occured!')
       }

        const data =await response.json();

        return data

    }catch(error){
      return error
    }
}