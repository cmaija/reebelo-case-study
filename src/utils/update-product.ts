import { Product } from "@/lib/interfaces"
import prisma from "../../lib/prisma"
import { Item } from "@/context/Cart.context"
import { OrderProductItem } from "@/app/admin/orders/EditOrderProductsModal"

export async function updateProductQuantities(
  items: Item[] | OrderProductItem[]
) {
  let result
  for (let item of items) {
    result = await prisma.product.update({
      where: { id: item.product.id },
      data: { unitsInStock: { decrement: item.units } },
    })
  }
}

export async function updateProduct(product: Product) {
  let result
  try {
    result = await prisma.product.update({
      where: { id: product.id },
      data: product,
    })
  } catch (error) {
    throw new Error(
      `Error updating product, error: ${(error as unknown as Error).message}`
    )
  }
  return result
}
