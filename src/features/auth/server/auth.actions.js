'use server'

import { request } from '@/lib/request.action'

export async function signup(data) {
  return request('/auth/signup', { method: 'POST', body: JSON.stringify(data) })
}

export async function signin() {
  throw new Error('Use NextAuth to sign in')
}

export async function forgotPassword(data) {
  return request('/auth/forgotPasswords', { method: 'POST', body: JSON.stringify(data) })
}

export async function verifyResetCode(data) {
  return request('/auth/verifyResetCode', { method: 'POST', body: JSON.stringify(data) })
}

export async function resetPassword(data) {
  return request('/auth/resetPassword', { method: 'PUT', body: JSON.stringify(data) })
}

export async function getAllUsers() {
  return request('/users')
}
