'use server'

import { request } from '@/lib/request.action'

export async function updatePassword(data) {
  return request('/users/changeMyPassword', { method: 'PUT', body: JSON.stringify(data) })
}

export async function updateMe(data) {
  return request('/users/updateMe', { method: 'PUT', body: JSON.stringify(data) })
}
