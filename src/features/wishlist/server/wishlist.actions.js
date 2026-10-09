'use server'
import { request } from '@/lib/request.action'
export async function addToWishlist(productId){return request('/wishlist',{method:'POST',body:JSON.stringify({productId})})}
export async function removeFromWishlist(productId){return request(`/wishlist/${productId}`,{method:'DELETE'})}
export async function getWishlist(){return request('/wishlist')}

