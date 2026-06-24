/*
  Warnings:

  - You are about to drop the column `city` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `competitionId` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `groupId` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `matchDate` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `round` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `venue` on the `Match` table. All the data in the column will be lost.
  - The `stage` column on the `Match` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `code` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `flagUrl` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `groupId` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the `Competition` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Group` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Standing` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[apiId]` on the table `Match` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[apiId]` on the table `Team` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `apiId` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `utcDate` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Match` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `apiId` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_competitionId_fkey";

-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_competitionId_fkey";

-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Standing" DROP CONSTRAINT "Standing_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Standing" DROP CONSTRAINT "Standing_teamId_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_groupId_fkey";

-- DropIndex
DROP INDEX "Team_code_key";

-- AlterTable
ALTER TABLE "Match" DROP COLUMN "city",
DROP COLUMN "competitionId",
DROP COLUMN "groupId",
DROP COLUMN "matchDate",
DROP COLUMN "round",
DROP COLUMN "venue",
ADD COLUMN     "apiId" INTEGER NOT NULL,
ADD COLUMN     "awayHalf" INTEGER,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "duration" TEXT,
ADD COLUMN     "group" TEXT,
ADD COLUMN     "homeHalf" INTEGER,
ADD COLUMN     "lastUpdated" TIMESTAMP(3),
ADD COLUMN     "matchday" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "utcDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "winner" TEXT,
DROP COLUMN "stage",
ADD COLUMN     "stage" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "code",
DROP COLUMN "flagUrl",
DROP COLUMN "groupId",
ADD COLUMN     "apiId" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "crest" TEXT,
ADD COLUMN     "shortName" TEXT,
ADD COLUMN     "tla" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Competition";

-- DropTable
DROP TABLE "Group";

-- DropTable
DROP TABLE "Standing";

-- DropEnum
DROP TYPE "MatchStage";

-- DropEnum
DROP TYPE "MatchStatus";

-- CreateIndex
CREATE UNIQUE INDEX "Match_apiId_key" ON "Match"("apiId");

-- CreateIndex
CREATE UNIQUE INDEX "Team_apiId_key" ON "Team"("apiId");
