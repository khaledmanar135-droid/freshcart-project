'use server'
import * as actions from '@/features/products/server/reviews.actions'
export async function getProductReviews(productId, params = {}) { return actions.getProductReviews(productId, params) }
export async function createProductReview(productId, data) { return actions.createProductReview(productId, data) }
export async function getAllReviews() { return actions.getAllReviews() }
