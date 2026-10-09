import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async  function proxy(request:NextRequest){


   const  token = await getToken({
        req:request,
        secret:process.env.NEXTAUTH_SECRET,
        secureCookie:process.env.NODE_ENV === 'production'
    })


    if(token){
        if(request.nextUrl.pathname == '/login' ||request.nextUrl.pathname == '/register' ){
           return NextResponse.redirect(new URL('/',request.url))        
        }else{
            return NextResponse.next()   
        }
    }else{
      return NextResponse.next()
    }

}


export const config ={
    matcher:['/login','/register']
}

