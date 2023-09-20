import { cache } from 'react'
import prisma from '../../lib/prisma'
 
export const revalidate = 3600 // revalidate the data at most every hour
 
export const getProduct = cache(async (id: number) => {
  const item = await prisma.product.findUnique({ where: {
    id
  }})
  return item
})