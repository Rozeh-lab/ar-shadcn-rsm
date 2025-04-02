/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `extraInfo` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `publishedAt` on the `Content` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_productOrderId_fkey";

-- DropIndex
DROP INDEX "Content_url_key";

-- AlterTable
ALTER TABLE "Content" DROP COLUMN "createdAt",
DROP COLUMN "extraInfo",
DROP COLUMN "publishedAt",
ALTER COLUMN "productOrderId" DROP NOT NULL;
