import { cache } from "react"
import prisma from "../../lib/prisma"
import { Item } from "@/context/Cart.context"
import { normalizeProduct } from "./get-product"
import { Order, OrderStatus, ProductsOnOrders } from "@prisma/client"

interface NormalizedOrders {
  id: number
  name: string
  email: string
  address: string
  productCount: number
  products: Item[]
  status: OrderStatus
}

function generateName(firstName: string, lastName: string) {
  return `${firstName} ${lastName}`
}

function generateAddress(item: ProductsOnOrders & { order: Order }) {
  return `${item.order.address1}, ${
    item.order.address2 && item.order.address2 + ","
  } ${item.order.city}, ${item.order.postalCode}`
}

export const revalidate = 60 // revalidate the data at most every minute

export const getOrders = cache(async (): Promise<NormalizedOrders[]> => {
  const items = await prisma.productsOnOrders.findMany({
    include: {
      order: true,
      product: true,
    },
  })

  let orders = items
    ? items.reduce((acc: NormalizedOrders[], item) => {
        if (acc[item.orderId]) {
          acc[item.orderId].products.push({
            product: normalizeProduct(item.product),
            units: item.productCount,
          })
        } else {
          acc[item.orderId] = {
            id: item.orderId,
            name: generateName(item.order.firstName, item.order.lastName),
            email: item.order.email,
            address: generateAddress(item),
            productCount: item.productCount,
            status: item.order.status,
            products: [
              {
                product: normalizeProduct(item.product),
                units: item.productCount,
              },
            ],
          }
        }
        return acc
      }, [])
    : []

  console.log(orders)
  return orders
})
