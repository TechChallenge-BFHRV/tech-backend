/*
  Warnings:

  - The values [INICIO,LANCHE,ACOMPANHAMENTO,BEBIDA,SOBREMESA] on the enum `Step` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Step_new" AS ENUM ('START', 'MEAL', 'DRINK', 'DESERT', 'CHECKOUT', 'PAYMENT_REQUEST', 'COMPLETED');
ALTER TABLE "Order" ALTER COLUMN "step" TYPE "Step_new" USING ("step"::text::"Step_new");
ALTER TYPE "Step" RENAME TO "Step_old";
ALTER TYPE "Step_new" RENAME TO "Step";
DROP TYPE "Step_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_customerId_fkey";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "totalPrice" DROP NOT NULL,
ALTER COLUMN "customerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
