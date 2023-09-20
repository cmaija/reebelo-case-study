import { Prisma } from "@prisma/client"
import prisma from "../../lib/prisma"

interface CreateProductParams {
  title: string
  description?: string
  shortDescription?: string
  sku: string
  unitsInStock: number
  price: number
}

export const createProduct = async (params: Prisma.ProductCreateInput) => {}
