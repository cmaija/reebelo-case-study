import prisma from "../../lib/prisma"
import { Item } from "@/context/Cart.context"

export async function updateProductQuantities(items: Item[]) {
  let result
  for (let item of items) {
    result = await prisma.product.update({
      where: { id: item.product.id },
      data: { unitsInStock: { decrement: item.units } },
    })
  }
}
