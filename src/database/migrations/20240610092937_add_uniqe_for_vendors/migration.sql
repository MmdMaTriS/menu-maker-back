/*
  Warnings:

  - A unique constraint covering the columns `[mobile]` on the table `Vendors` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Vendors_mobile_key" ON "Vendors"("mobile");
