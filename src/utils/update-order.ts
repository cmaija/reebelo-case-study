import { Order, OrderStatus } from "@prisma/client"
import prisma from "../../lib/prisma"
import { updateProductQuantities } from "./update-product"
import { Item } from "@/context/Cart.context"
import { OrderProductItem } from "@/app/admin/orders/EditOrderProductsModal"

interface OrderDetails {
  id: number
  firstName: string
  lastName: string
  email: string
  address1: string
  address2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phoneNumber: string
  status: OrderStatus
  shippedAt?: Date
}

export async function updateOrder(orderParams: OrderDetails) {
  let order: Order
  const { id, ...rest } = orderParams
  if (orderParams.status === "SHIPPED") {
    rest.shippedAt = new Date()
  }
  try {
    order = await prisma.order.update({
      where: {
        id,
      },
      data: {
        ...rest,
      },
    })
  } catch (error) {
    throw new Error(
      `Error updating order, error: ${(error as unknown as Error).message}`
    )
  }
  return { message: "Order updated successfully", order }
}

export async function updateOrderProducts(
  products: (OrderProductItem & { unitsDifference: number })[]
) {
  let result
  let productsToUpdate: Item[] = []
  try {
    for (let product of products) {
      if (product.units === 0) {
        result = await prisma.productsOnOrders.delete({
          where: { id: product.orderProductId },
        })
      }
      result = await prisma.productsOnOrders.update({
        where: { id: product.orderProductId },
        data: {
          productCount: product.units,
        },
      })

      productsToUpdate.push({
        product: product.product,
        units: product.unitsDifference,
      })
    }

    await updateProductQuantities(productsToUpdate)
  } catch (error) {
    throw new Error(
      `Error updating products in order, error: ${
        (error as unknown as Error).message
      }`
    )
  }
  return { message: "Order updated successfully", result }
}
