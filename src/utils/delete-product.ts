import prisma from "../../lib/prisma"

export const deleteProduct = async (id: number) => {
  await prisma.productsOnOrders.deleteMany({
    where: {
      productId: id,
    },
  })
  const order = await prisma.product.delete({
    where: {
      id,
    },
  })
  return order
}
