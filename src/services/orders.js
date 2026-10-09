'use server'
import { request } from './request.action'
export async function createCashOrder(cartId,shippingAddress){return request(`/orders/${cartId}`,{method:'POST',body:JSON.stringify({shippingAddress})})}
export async function createCheckoutSession(cartId,shippingAddress,returnUrl){return request(`/orders/checkout-session/${cartId}?url=${encodeURIComponent(returnUrl)}`,{method:'POST',body:JSON.stringify({shippingAddress})})}
export async function getUserOrders(userId){return request(`/orders/user/${userId}`)}
export async function getAllOrders(params={}){const q=new URLSearchParams(params).toString();return request(`/orders${q?`?${q}`:''}`)}
