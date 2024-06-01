/*
  Warnings:

  - You are about to drop the column `admin_id` on the `LoginDevices` table. All the data in the column will be lost.
  - You are about to drop the column `ventor_id` on the `LoginDevices` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "LoginDevices" DROP CONSTRAINT "LoginDevices_admin_id_fkey";

-- DropForeignKey
ALTER TABLE "LoginDevices" DROP CONSTRAINT "LoginDevices_user_id_fkey";

-- DropForeignKey
ALTER TABLE "LoginDevices" DROP CONSTRAINT "LoginDevices_ventor_id_fkey";

-- AlterTable
ALTER TABLE "LoginDevices" DROP COLUMN "admin_id",
DROP COLUMN "ventor_id";
