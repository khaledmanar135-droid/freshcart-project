'use server'

import * as authActions from '@/features/auth/server/auth.actions'
import * as accountActions from '@/features/account/server/account.actions'

export async function signup(data) { return authActions.signup(data) }
export async function signin() { return authActions.signin() }
export async function forgotPassword(data) { return authActions.forgotPassword(data) }
export async function verifyResetCode(data) { return authActions.verifyResetCode(data) }
export async function resetPassword(data) { return authActions.resetPassword(data) }
export async function getAllUsers() { return authActions.getAllUsers() }
export async function updatePassword(data) { return accountActions.updatePassword(data) }
export async function updateMe(data) { return accountActions.updateMe(data) }
