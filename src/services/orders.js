'use server'
import * as checkoutActions from '@/features/checkout/server/checkout.actions'
import * as ordersActions from '@/features/orders/server/orders.actions'

export async function createCashOrder(cartId, shippingAddress) { return checkoutActions.createCashOrder(cartId, shippingAddress) }
export async function createCheckoutSession(cartId, shippingAddress, returnUrl) { return checkoutActions.createCheckoutSession(cartId, shippingAddress, returnUrl) }
export async function getUserOrders(userId) { return ordersActions.getUserOrders(userId) }
export async function getAllOrders(params = {}) { return ordersActions.getAllOrders(params) }
