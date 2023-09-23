import { Prisma, Product } from "@prisma/client"
import prisma from "../../lib/prisma"

interface CreateProductParams {
  title: string
  description?: string
  shortDescription?: string
  sku: string
  unitsInStock: string
  price: string
}

export const createProduct = async (params: CreateProductParams) => {
  let product: Product
  let productDTO = {
    ...params,
    price: parseInt(params.price),
    unitsInStock: parseInt(params.unitsInStock),
  }
  try {
    product = await prisma.product.create({
      data: productDTO,
    })
    return { message: "Product created successfully", id: product.id }
  } catch (error) {
    throw new Error(
      `Error creating product, error: ${(error as unknown as Error).message}`
    )
  }
}
