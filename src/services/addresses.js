'use server'
import * as actions from '@/features/account/server/addresses.actions'

export async function addAddress(data) { return actions.addAddress(data) }
export async function removeAddress(id) { return actions.removeAddress(id) }
export async function getAddress(id) { return actions.getAddress(id) }
export async function getAddresses() { return actions.getAddresses() }
