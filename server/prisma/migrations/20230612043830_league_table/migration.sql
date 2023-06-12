/*
  Warnings:

  - You are about to drop the column `league` on the `Player` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "league",
ADD COLUMN     "leagueId" TEXT;

-- CreateTable
CREATE TABLE "League" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "League_pkey" PRIMARY KEY ("id")
);
