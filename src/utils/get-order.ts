import { cache } from "react"
import prisma from "../../lib/prisma"
import { Product } from "@prisma/client"
import { Product as NormalizedProduct } from "@/lib/interfaces"

export const revalidate = 3600 // revalidate the data at most every hour

export const getOrder = cache(async (id: number) => {
  const order = await prisma.order.findUnique({
    where: {
      id,
    },
  })
  return order
})

export const getOrderProducts = cache(async (id: number) => {
  const products = await prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      products: { include: { product: true } },
    },
  })
  return products
})
