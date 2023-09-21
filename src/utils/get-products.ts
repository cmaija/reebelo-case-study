import { cache } from "react"
import prisma from "../../lib/prisma"

export const revalidate = 3600 // revalidate the data at most every hour

export const getProducts = cache(async () => {
  const items = await prisma.product.findMany()
  let normalizedItems = items.map((item) => ({
    ...item,
    price: item.price.toNumber(),
  }))
  return normalizedItems
})
