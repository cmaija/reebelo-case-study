import { cache } from "react"
import prisma from "../../lib/prisma"
import { normalizeProduct } from "./get-product"

export const revalidate = 3600 // revalidate the data at most every hour

export const getInStockProducts = cache(async () => {
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

export type SortParams = {
  [key: string]: "asc" | "desc"
}

export const getAllProducts = cache(
  async (take: number, skip?: number, sortBy?: SortParams) => {
    let sortParams = sortBy || { id: "desc" }
    const items = await prisma.product.findMany({
      orderBy: sortParams,
      take,
      skip,
    })

    return items
  }
)
