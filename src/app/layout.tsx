import type { Metadata } from 'next'
import './old.css'
import Providers from './Providers'
import TopBar from '@/components/TopBar/TopBar'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { Toaster } from 'sonner'

export const metadata:Metadata={
  title:{default:'FreshCart - Fresh Groceries Delivered',template:'%s | FreshCart'},
  description:'Shop fresh groceries, pantry essentials, and everyday favorites with fast delivery.',
}

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="en"><body><Providers><div id="root"><TopBar/><Header/><main className="layout__main">{children}</main><Footer/></div><Toaster richColors position="top-right"/></Providers></body></html>
}
