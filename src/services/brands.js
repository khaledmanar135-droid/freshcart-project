'use server'
import * as actions from '@/features/brands/server/brands.actions'
export async function getBrands(params = {}) { return actions.getBrands(params) }
export async function getBrand(id) { return actions.getBrand(id) }
