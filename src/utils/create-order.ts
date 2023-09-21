import { Order } from "@prisma/client"
import prisma from "../../lib/prisma"

interface OrderDetails {
  address1: string
  address2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phoneNumber: string
}
export async function createOrder(order: OrderDetails) {
  const result = await prisma.order.create({
    data: order,
  })

  return result
}
