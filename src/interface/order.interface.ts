import { CartProduct } from "./cartProduct.interface"

export interface Order {
  _id: string
  id: number
  shippingAddress?: { details: string; phone: string; city: string }
  taxPrice: number
  shippingPrice: number
  totalOrderPrice: number
  paymentMethodType: 'cash' | 'card'
  isPaid: boolean
  isDelivered: boolean
  createdAt: string
  cartItems: CartProduct[]
}
