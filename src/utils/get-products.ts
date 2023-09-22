import { cache } from "react"
import prisma from "../../lib/prisma"
import { normalizeProduct } from "./get-product"

export const revalidate = 3600 // revalidate the data at most every hour

export const getProducts = cache(async () => {
  const items = await prisma.product.findMany({
    where: {
      unitsInStock: {
        gt: 0,
      },
    },
  })
  let normalizedItems = items.map((item) => normalizeProduct(item))
  return normalizedItems
})
