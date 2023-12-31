import { Order } from "@prisma/client"
import prisma from "../../lib/prisma"
import { updateProductQuantities } from "./update-product"
import { Item } from "@/context/Cart.context"

interface OrderDetails {
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
  products: Item[]
}

export async function createOrder(orderParams: OrderDetails) {
  const { products: orderedProducts, ...rest } = orderParams
  let order: Order
  try {
    order = await prisma.order.create({
      data: {
        ...rest,
      },
    })

    let productCount = orderedProducts.reduce((acc, item) => {
      return acc + item.units
    }, 0)

    for (let orderedProduct of orderedProducts) {
      await prisma.productsOnOrders.create({
        data: {
          orderId: order.id,
          productId: orderedProduct.product.id,
          productCount,
          status: order.status,
        },
      })
    }
  } catch (error) {
    throw new Error(
      `Error creating order, error: ${(error as unknown as Error).message}`
    )
  }

  try {
    await updateProductQuantities(orderedProducts)
  } catch (error) {
    throw new Error("Error updating product quantities")
  }

  return { message: "Order created successfully", id: order.id }
}
