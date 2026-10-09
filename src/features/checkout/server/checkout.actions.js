'use server'

import { request } from '@/lib/request.action'

export async function createCashOrder(cartId, shippingAddress) {
  return request(`/orders/${cartId}`, { method: 'POST', body: JSON.stringify({ shippingAddress }) })
}

export async function createCheckoutSession(cartId, shippingAddress, returnUrl) {
  return request(`/orders/checkout-session/${cartId}?url=${encodeURIComponent(returnUrl)}`, { method: 'POST', body: JSON.stringify({ shippingAddress }) })
}
