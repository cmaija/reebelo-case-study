/*
  Warnings:

  - The values [RECIEVED] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `ProductsOnOrders` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('RECEIVED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED');
ALTER TABLE "Order" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Order" ALTER COLUMN "status" TYPE "OrderStatus_new" USING ("status"::text::"OrderStatus_new");
ALTER TABLE "ProductsOnOrders" ALTER COLUMN "status" TYPE "OrderStatus_new" USING ("status"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "OrderStatus_old";
ALTER TABLE "Order" ALTER COLUMN "status" SET DEFAULT 'RECEIVED';
COMMIT;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "trackingCompany" VARCHAR(255),
ADD COLUMN     "trackingNumber" VARCHAR(255),
ALTER COLUMN "status" SET DEFAULT 'RECEIVED';

-- AlterTable
ALTER TABLE "ProductsOnOrders" DROP CONSTRAINT "ProductsOnOrders_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ProductsOnOrders_pkey" PRIMARY KEY ("id");
