'use server'

import { request } from '@/lib/request.action'

export async function getUserOrders(userId) {
  return request(`/orders/user/${userId}`)
}

export async function getAllOrders(params = {}) {
  const q = new URLSearchParams(params).toString()
  return request(`/orders${q ? `?${q}` : ''}`)
}
