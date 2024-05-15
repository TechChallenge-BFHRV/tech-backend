/*
  Warnings:

  - Added the required column `type` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `step` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('FINALIZADA', 'PRONTO', 'RECEBIDO', 'EM_PREPARACAO');

-- CreateEnum
CREATE TYPE "Step" AS ENUM ('INICIO', 'LANCHE', 'ACOMPANHAMENTO', 'BEBIDA', 'SOBREMESA');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('LANCHE', 'ACOMPANHAMENTO', 'BEBIDA', 'SOBREMESA');

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "type" "Type" NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL,
DROP COLUMN "step",
ADD COLUMN     "step" "Step" NOT NULL;
