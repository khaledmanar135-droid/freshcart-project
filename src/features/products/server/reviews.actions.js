'use server'
import { request } from '@/lib/request.action'
export async function getProductReviews(productId,params={}){const q=new URLSearchParams(params).toString();return request(`/products/${productId}/reviews${q?`?${q}`:''}`)}
export async function createProductReview(productId,data){return request(`/products/${productId}/reviews`,{method:'POST',body:JSON.stringify(data)})}
export async function getAllReviews(){return request('/reviews')}
export async function getReview(id){return request(`/reviews/${id}`)}
export async function updateReview(id,data){return request(`/reviews/${id}`,{method:'PUT',body:JSON.stringify(data)})}
export async function deleteReview(id){return request(`/reviews/${id}`,{method:'DELETE'})}

