'use server'
import { getServerSession } from "next-auth"
import { authOption } from "@/next-auth/authOption"
import { Order } from "@/interface/order.interface"

export async function getUserOrders(): Promise<Order[] | null> {
  const session = await getServerSession(authOption)
  if (!session?.user?.id) return null

  const res = await fetch(`${process.env.BASE_URL}/orders/user/${session.user.id}`, {
    cache: 'no-store',
  })
  if (!res.ok) return []

  const data: Order[] = await res.json()
  return data.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
}
