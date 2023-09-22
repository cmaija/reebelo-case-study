/*
  Warnings:

  - Added the required column `status` to the `ProductsOnOrders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ProductsOnOrders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductsOnOrders" ADD COLUMN     "status" "OrderStatus" NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
