import { cache } from "react"
import prisma from "../../lib/prisma"
import { Order } from "@prisma/client"

export const revalidate = 60 // revalidate the data at most every minute

export type SortParams = {
  [key: string]: "asc" | "desc"
}

export const getOrders = cache(
  async (
    take: number,
    skip?: number,
    sortBy?: SortParams
  ): Promise<Order[]> => {
    let sortParams = sortBy || { id: "desc" }
    const items = await prisma.order.findMany({
      orderBy: sortParams,
      take,
      skip,
    })

    return items
  }
)
