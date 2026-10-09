export async function getCategories(){
    try{
        const response =await  fetch(`${process.env.BASE_URL}/categories`)
       if(!response.ok){
         throw new Error('Error occured!')
       }

        const data =await response.json();

        return data

    }catch(error){
      return error
    }
}