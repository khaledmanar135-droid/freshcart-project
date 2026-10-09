import type { MetadataRoute } from 'next'
export default function sitemap():MetadataRoute.Sitemap{
  const base=process.env.DOMAIN || 'http://localhost:3000'
  return ['','products','categories','brands','login','register'].map(path=>({url:`${base}/${path}`}))
}
