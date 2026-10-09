'use server'
import { request } from './request.action'
export async function addToCart(productId){return request('/cart',{method:'POST',body:JSON.stringify({productId})})}
export async function getCart(){return request('/cart')}
export async function updateCartItem(productId,count){return request(`/cart/${productId}`,{method:'PUT',body:JSON.stringify({count})})}
export async function removeCartItem(productId){return request(`/cart/${productId}`,{method:'DELETE'})}
export async function clearCart(){return request('/cart',{method:'DELETE'})}
export async function applyCoupon(code){return request('/cart/applyCoupon',{method:'PUT',body:JSON.stringify({coupon:code})})}
