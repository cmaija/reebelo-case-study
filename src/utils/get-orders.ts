import { cache } from "react"
import prisma from "../../lib/prisma"
import { Order } from "@prisma/client"

export const revalidate = 60 // revalidate the data at most every minute

export type SortParams = {
  [key: string]: "asc" | "desc"
}
export const getNextOrders = cache(
  async (cursor: any, sortBy?: SortParams): Promise<Order[]> => {
    let sortParams = sortBy || { id: "desc" }
    let cursorKey = Object.keys(sortParams)[0]
    let args = {
      orderBy: sortParams,
      take: 10,
      cursor: {
        [cursorKey]: cursor,
      } as any,
      skip: 1,
    }
    const items = await prisma.order.findMany(args)

    return items
  }
)
export const getLastOrders = cache(
  async (cursor: any, sortBy?: SortParams): Promise<Order[]> => {
    let sortParams = sortBy || { id: "desc" }
    let cursorKey = Object.keys(sortParams)[0]
    let args = {
      orderBy: sortParams,
      take: -10,
      cursor: {
        [cursorKey]: cursor,
      } as any,
      skip: 1,
    }
    const items = await prisma.order.findMany(args)

    return items
  }
)

export const getOrders = cache(
  async (sortBy?: SortParams): Promise<Order[]> => {
    let sortParams = sortBy || { id: "desc" }

    const items = await prisma.order.findMany({
      orderBy: sortParams,
      take: 10,
    })

    return items
  }
)
