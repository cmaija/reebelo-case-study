import prisma from "../../lib/prisma"

export const deleteOrder = async (id: number) => {
  await prisma.productsOnOrders.deleteMany({
    where: {
      orderId: id,
    },
  })
  const order = await prisma.order.delete({
    where: {
      id,
    },
  })
  return order
}
