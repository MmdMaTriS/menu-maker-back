/*
  Warnings:

  - Added the required column `password` to the `Admins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Ventors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admins" ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Ventors" ADD COLUMN     "password" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "OTPList" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "code" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "ip_address" TEXT NOT NULL,
    "user_agent" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "OTPList_pkey" PRIMARY KEY ("id")
);
