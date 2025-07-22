/*
  Warnings:

  - The primary key for the `Agency` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `AgencyUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `address` to the `Agency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Agency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Agency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `Agency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Agency` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AgencyUser" DROP CONSTRAINT "AgencyUser_agencyId_fkey";

-- DropForeignKey
ALTER TABLE "AgencyUser" DROP CONSTRAINT "AgencyUser_userId_fkey";

-- AlterTable
ALTER TABLE "Agency" DROP CONSTRAINT "Agency_pkey",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "cnss" TEXT,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "ice" TEXT,
ADD COLUMN     "if" TEXT,
ADD COLUMN     "logo" TEXT,
ADD COLUMN     "ownerId" TEXT NOT NULL,
ADD COLUMN     "patente" TEXT,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "rc" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Agency_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Agency_id_seq";

-- AlterTable
ALTER TABLE "AgencyUser" DROP CONSTRAINT "AgencyUser_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "agencyId" SET DATA TYPE TEXT,
ADD CONSTRAINT "AgencyUser_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "AgencyUser_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'owner',
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "Agency" ADD CONSTRAINT "Agency_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgencyUser" ADD CONSTRAINT "AgencyUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgencyUser" ADD CONSTRAINT "AgencyUser_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
