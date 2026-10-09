import {NextAuthOptions} from 'next-auth';
import { jwtDecode } from "jwt-decode";
import Credentials from 'next-auth/providers/credentials'
export const authOption:NextAuthOptions ={
    providers:[
        Credentials({
            name:'login',
            credentials:{
                email:{label:'Email',type:'email',placeholder:'Enter your email'},
                password:{label:'Passsword',type:'password',placeholder:'Enter your password'},
            },
           async  authorize(credentials){
              
        //Call Api
             const response =await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signin`,{
              method:'POST',
             body:JSON.stringify({
                email:credentials?.email,
                password:credentials?.password
             }),
             headers:{
               "content-type":'application/json'
               }
             })
             
             if(!response.ok){
                throw new Error(response.statusText)
             }

            const data =await response.json()
            const decoded = jwtDecode<{ id: string }>(data.token)
            return {
                id:decoded.id,
                email:data.user.email,
                name:data.user.name,
                token:data.token
            }
            }
        })
    ],
    pages:{
        signIn:'/Login'
    },
     
    callbacks:{

        jwt({token,user}){
        
            if(user){
                token.id = user.id,
                token.token = user.token
            }
               
            return token
        },

        // usesession()
        session({session,token}){
              if(token){
                session.user.id = String(token.id)
                session.user.token = String(token.token)
              }

            return session
        }
    }

}

// login succsess
// server
// client