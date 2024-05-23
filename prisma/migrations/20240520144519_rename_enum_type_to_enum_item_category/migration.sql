/*
  Warnings:

  - You are about to drop the column `type` on the `Item` table. All the data in the column will be lost.
  - Added the required column `category` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ItemCategory" AS ENUM ('LANCHE', 'ACOMPANHAMENTO', 'BEBIDA', 'SOBREMESA');

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "type",
ADD COLUMN     "category" "ItemCategory" NOT NULL;

-- DropEnum
DROP TYPE "Type";
