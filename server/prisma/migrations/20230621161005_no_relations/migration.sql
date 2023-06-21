/*
  Warnings:

  - You are about to drop the column `leagueId` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `teamId` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `traitId1` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `traitId2` on the `Player` table. All the data in the column will be lost.
  - The `localID` column on the `Player` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `primaryPosition` column on the `Player` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `pitcherRole` column on the `Player` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `power` column on the `Player` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `contact` column on the `Player` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `speed` column on the `Player` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `fielding` column on the `Player` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `arm` column on the `Player` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `velocity` column on the `Player` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `junk` column on the `Player` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `accuracy` column on the `Player` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `age` column on the `Player` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `gender` column on the `Player` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `throws` column on the `Player` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `bats` column on the `Player` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `secondaryPosition` column on the `Player` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `jerseyNumber` column on the `Player` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `careerStart` column on the `Player` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `careerEnd` column on the `Player` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `fourSeamFastball` column on the `Player` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `twoSeamFastball` column on the `Player` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `screwball` column on the `Player` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `changeup` column on the `Player` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `forkball` column on the `Player` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `curveball` column on the `Player` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `slider` column on the `Player` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `cutFastball` column on the `Player` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `windup` column on the `Player` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `pitchAngle` column on the `Player` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `salary` column on the `Player` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `League` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Team` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Trait` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "leagueId",
DROP COLUMN "rating",
DROP COLUMN "teamId",
DROP COLUMN "traitId1",
DROP COLUMN "traitId2",
ADD COLUMN     "league" TEXT,
ADD COLUMN     "team" TEXT,
ADD COLUMN     "trait1" TEXT,
ADD COLUMN     "trait2" TEXT,
DROP COLUMN "localID",
ADD COLUMN     "localID" INTEGER,
DROP COLUMN "primaryPosition",
ADD COLUMN     "primaryPosition" INTEGER,
DROP COLUMN "pitcherRole",
ADD COLUMN     "pitcherRole" INTEGER,
DROP COLUMN "power",
ADD COLUMN     "power" INTEGER,
DROP COLUMN "contact",
ADD COLUMN     "contact" INTEGER,
DROP COLUMN "speed",
ADD COLUMN     "speed" INTEGER,
DROP COLUMN "fielding",
ADD COLUMN     "fielding" INTEGER,
DROP COLUMN "arm",
ADD COLUMN     "arm" INTEGER,
DROP COLUMN "velocity",
ADD COLUMN     "velocity" INTEGER,
DROP COLUMN "junk",
ADD COLUMN     "junk" INTEGER,
DROP COLUMN "accuracy",
ADD COLUMN     "accuracy" INTEGER,
DROP COLUMN "age",
ADD COLUMN     "age" INTEGER,
DROP COLUMN "gender",
ADD COLUMN     "gender" INTEGER,
DROP COLUMN "throws",
ADD COLUMN     "throws" INTEGER,
DROP COLUMN "bats",
ADD COLUMN     "bats" INTEGER,
DROP COLUMN "secondaryPosition",
ADD COLUMN     "secondaryPosition" INTEGER,
DROP COLUMN "jerseyNumber",
ADD COLUMN     "jerseyNumber" INTEGER,
DROP COLUMN "careerStart",
ADD COLUMN     "careerStart" INTEGER,
DROP COLUMN "careerEnd",
ADD COLUMN     "careerEnd" INTEGER,
DROP COLUMN "fourSeamFastball",
ADD COLUMN     "fourSeamFastball" INTEGER,
DROP COLUMN "twoSeamFastball",
ADD COLUMN     "twoSeamFastball" INTEGER,
DROP COLUMN "screwball",
ADD COLUMN     "screwball" INTEGER,
DROP COLUMN "changeup",
ADD COLUMN     "changeup" INTEGER,
DROP COLUMN "forkball",
ADD COLUMN     "forkball" INTEGER,
DROP COLUMN "curveball",
ADD COLUMN     "curveball" INTEGER,
DROP COLUMN "slider",
ADD COLUMN     "slider" INTEGER,
DROP COLUMN "cutFastball",
ADD COLUMN     "cutFastball" INTEGER,
DROP COLUMN "windup",
ADD COLUMN     "windup" INTEGER,
DROP COLUMN "pitchAngle",
ADD COLUMN     "pitchAngle" INTEGER,
DROP COLUMN "salary",
ADD COLUMN     "salary" INTEGER;

-- DropTable
DROP TABLE "League";

-- DropTable
DROP TABLE "Team";

-- DropTable
DROP TABLE "Trait";
