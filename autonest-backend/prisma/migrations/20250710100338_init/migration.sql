/*
  Warnings:

  - You are about to drop the column `agencyId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_agencyId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "agencyId";

-- CreateTable
CREATE TABLE "AgencyUser" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "agencyId" INTEGER NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'employee',
    "invitedBy" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AgencyUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AgencyUser_userId_agencyId_key" ON "AgencyUser"("userId", "agencyId");

-- AddForeignKey
ALTER TABLE "AgencyUser" ADD CONSTRAINT "AgencyUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgencyUser" ADD CONSTRAINT "AgencyUser_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
