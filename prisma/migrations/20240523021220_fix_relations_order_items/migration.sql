/*
  Warnings:

  - You are about to drop the column `orderItemsId` on the `Item` table. All the data in the column will be lost.
  - Added the required column `itemId` to the `OrderItems` table without a default value. This is not possible if the table is not empty.
  - Made the column `orderId` on table `OrderItems` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_orderItemsId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItems" DROP CONSTRAINT "OrderItems_orderId_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "orderItemsId";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "createdAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "OrderItems" ADD COLUMN     "itemId" INTEGER NOT NULL,
ALTER COLUMN "orderId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
