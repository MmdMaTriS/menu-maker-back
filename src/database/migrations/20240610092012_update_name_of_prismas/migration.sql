/*
  Warnings:

  - You are about to drop the `Ventors` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "VendorStatusEnum" AS ENUM ('ACTIVE', 'DISABLED', 'SUSPEND');

-- DropForeignKey
ALTER TABLE "Store" DROP CONSTRAINT "Store_ventor_id_fkey";

-- DropForeignKey
ALTER TABLE "SuspendList" DROP CONSTRAINT "SuspendList_ventor_suspend_id_fkey";

-- DropTable
DROP TABLE "Ventors";

-- DropEnum
DROP TYPE "VentorStatusEnum";

-- CreateTable
CREATE TABLE "Vendors" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "mobile" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT,
    "national_id" TEXT,
    "status" "VendorStatusEnum" NOT NULL DEFAULT 'DISABLED',

    CONSTRAINT "Vendors_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_ventor_id_fkey" FOREIGN KEY ("ventor_id") REFERENCES "Vendors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuspendList" ADD CONSTRAINT "SuspendList_ventor_suspend_id_fkey" FOREIGN KEY ("ventor_suspend_id") REFERENCES "Vendors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
