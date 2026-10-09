'use client'

import NextLink from 'next/link'
import { useParams as useNextParams, usePathname, useRouter, useSearchParams } from 'next/navigation'

function makeHref(to,params,search){
  let href=to || '/'
  if(params){
    Object.entries(params).forEach(([key,value])=>{
      href=href.replace(`$${key}`,String(value))
    })
  }
  if(search && Object.keys(search).length){
    const values=new URLSearchParams()
    Object.entries(search).forEach(([key,value])=>{
      if(value!==undefined && value!==null && value!=='') values.set(key,String(value))
    })
    const query=values.toString()
    if(query) href+=`?${query}`
  }
  return href
}

export function Link({to,href,params,search,children,...props}){
  return <NextLink href={makeHref(href || to,params,search)} {...props}>{children}</NextLink>
}

export function useNavigate(){
  const router=useRouter()
  return ({to,params,search,replace}={})=>{
    const href=makeHref(to,params,search)
    if(replace) router.replace(href)
    else router.push(href)
  }
}

export function useParams(){
  return useNextParams()
}

export function useSearch(){
  const params=useSearchParams()
  return Object.fromEntries(params.entries())
}

export function useRouterState({select}){
  const pathname=usePathname()
  const state={location:{pathname}}
  return select?select(state):state
}

export function useLocation(){
  return {pathname:usePathname(),state:null}
}
