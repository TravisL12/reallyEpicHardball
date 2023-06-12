-- CreateTable
CREATE TABLE "Trait" (
    "id" SERIAL NOT NULL,
    "type" TEXT,
    "chemistry" TEXT,

    CONSTRAINT "Trait_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "League" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "League_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "localID" TEXT,
    "teamId" TEXT,
    "leagueId" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "primaryPosition" TEXT,
    "pitcherRole" TEXT,
    "power" TEXT,
    "contact" TEXT,
    "speed" TEXT,
    "fielding" TEXT,
    "arm" TEXT,
    "velocity" TEXT,
    "junk" TEXT,
    "accuracy" TEXT,
    "age" TEXT,
    "gender" TEXT,
    "throws" TEXT,
    "bats" TEXT,
    "secondaryPosition" TEXT,
    "jerseyNumber" TEXT,
    "rating" TEXT,
    "traitId1" TEXT,
    "traitId2" TEXT,
    "careerStart" TEXT,
    "careerEnd" TEXT,
    "fourSeamFastball" TEXT,
    "twoSeamFastball" TEXT,
    "screwball" TEXT,
    "changeup" TEXT,
    "forkball" TEXT,
    "curveball" TEXT,
    "slider" TEXT,
    "cutFastball" TEXT,
    "windup" TEXT,
    "pitchAngle" TEXT,
    "playerChemistry" TEXT,
    "salary" TEXT,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);
