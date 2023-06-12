/*
  Warnings:

  - You are about to drop the column `subType` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `trait` on the `Player` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "subType",
DROP COLUMN "trait";
