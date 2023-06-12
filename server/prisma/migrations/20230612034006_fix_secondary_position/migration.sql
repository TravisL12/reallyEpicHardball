/*
  Warnings:

  - You are about to drop the column `secondaryPositio` on the `Player` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "secondaryPositio",
ADD COLUMN     "secondaryPosition" TEXT;
