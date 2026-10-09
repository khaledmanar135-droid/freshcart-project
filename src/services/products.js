'use server'
import * as actions from '@/features/products/server/products.actions'
export async function getProducts(params = {}) { return actions.getProducts(params) }
export async function getProduct(id) { return actions.getProduct(id) }
