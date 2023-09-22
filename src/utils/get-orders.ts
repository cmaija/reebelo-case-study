import { cache } from "react"
import prisma from "../../lib/prisma"

interface NormalizedOrders {
  id: number
  name: string
  email: string
  address: string
  productCount: number
}

export const revalidate = 60 // revalidate the data at most every hour

// export const getOrders = cache(async (): Promise<NormalizedOrders[]> => {
//   const items = await prisma.order.findMany({
//     include: {
//       _count: {
//         select: { products: true },
//       },
//     },
//   })
// let normalizedItems = items.map((item) => ({
//   id: item.id,
//   name: generateName(item.firstName, item.lastName),
//   email: item.email,
//   address: generateAddress(item),
//   productCount: item.products.length,
// }))
// })
