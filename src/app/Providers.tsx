'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { ReactNode, useState } from 'react'
import { AuthProvider } from '@/context/AuthContext'

export default function Providers({children}:{children:ReactNode}){
  const [queryClient]=useState(()=>new QueryClient())
  return <SessionProvider><QueryClientProvider client={queryClient}><AuthProvider>{children}</AuthProvider></QueryClientProvider></SessionProvider>
}
