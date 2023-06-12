/*
  Warnings:

  - You are about to drop the column `chemistry1` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `chemistry2` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `secondaryPosition` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `trait1` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `trait2` on the `Player` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "chemistry1",
DROP COLUMN "chemistry2",
DROP COLUMN "secondaryPosition",
DROP COLUMN "trait1",
DROP COLUMN "trait2",
ADD COLUMN     "secondaryPositio" TEXT,
ADD COLUMN     "traitId1" TEXT,
ADD COLUMN     "traitId2" TEXT;

-- CreateTable
CREATE TABLE "Trait" (
    "id" SERIAL NOT NULL,
    "type" TEXT,
    "chemistry" TEXT,

    CONSTRAINT "Trait_pkey" PRIMARY KEY ("id")
);
