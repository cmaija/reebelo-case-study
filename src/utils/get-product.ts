import { cache } from "react"
import prisma from "../../lib/prisma"
import { Product } from "@prisma/client"
import { Product as NormalizedProduct } from "@/lib/interfaces"

export const revalidate = 3600 // revalidate the data at most every hour

export function normalizeProduct(product: Product): NormalizedProduct {
  return { ...product, price: product?.price.toNumber() || 0 }
}
export const getProduct = cache(async (id: number) => {
  const item = await prisma.product.findUnique({
    where: {
      id,
    },
  })
  return item && normalizeProduct(item)
})
