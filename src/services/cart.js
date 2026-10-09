'use server'
import * as actions from '@/features/cart/server/cart.actions'

export async function addToCart(productId) { return actions.addToCart(productId) }
export async function getCart() { return actions.getCart() }
export async function updateCartItem(productId, count) { return actions.updateCartItem(productId, count) }
export async function removeCartItem(productId) { return actions.removeCartItem(productId) }
export async function clearCart() { return actions.clearCart() }
export async function applyCoupon(code) { return actions.applyCoupon(code) }
