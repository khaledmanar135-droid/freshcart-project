'use client'

import { createContext, useContext } from 'react'
import { signOut, useSession } from 'next-auth/react'

const AuthContext=createContext(null)

export function AuthProvider({children}){
  const {data:session,status}=useSession()
  const value={
    token:session?.user?.token || null,
    user:session?.user || null,
    userId:session?.user?.id || null,
    isLoggedIn:status==='authenticated',
    sessionChecked:status!=='loading',
    login:()=>undefined,
    logout:()=>signOut({callbackUrl:'/login'}),
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(){
  const context=useContext(AuthContext)
  if(!context) throw new Error('useAuth must be used inside <AuthProvider>')
  return context
}
