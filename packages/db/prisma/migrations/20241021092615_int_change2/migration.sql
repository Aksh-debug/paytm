/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `p2pTransfer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `p2pTransfer` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Balance" DROP CONSTRAINT "Balance_userId_fkey";

-- DropForeignKey
ALTER TABLE "OnRampTransaction" DROP CONSTRAINT "OnRampTransaction_userId_fkey";

-- DropForeignKey
ALTER TABLE "p2pTransfer" DROP CONSTRAINT "p2pTransfer_fromUserId_fkey";

-- DropForeignKey
ALTER TABLE "p2pTransfer" DROP CONSTRAINT "p2pTransfer_toUserId_fkey";

-- AlterTable
ALTER TABLE "Balance" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "OnRampTransaction" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "p2pTransfer" DROP CONSTRAINT "p2pTransfer_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "fromUserId" SET DATA TYPE TEXT,
ALTER COLUMN "toUserId" SET DATA TYPE TEXT,
ADD CONSTRAINT "p2pTransfer_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "p2pTransfer" ADD CONSTRAINT "p2pTransfer_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "p2pTransfer" ADD CONSTRAINT "p2pTransfer_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Balance" ADD CONSTRAINT "Balance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnRampTransaction" ADD CONSTRAINT "OnRampTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
