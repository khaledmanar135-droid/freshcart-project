'use server'
import * as actions from '@/features/wishlist/server/wishlist.actions'

export async function addToWishlist(productId) { return actions.addToWishlist(productId) }
export async function removeFromWishlist(productId) { return actions.removeFromWishlist(productId) }
export async function getWishlist() { return actions.getWishlist() }
