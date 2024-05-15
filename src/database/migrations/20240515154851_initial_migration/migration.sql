-- CreateEnum
CREATE TYPE "VentorStatusEnum" AS ENUM ('ACTIVE', 'DISABLED', 'SUSPEND');

-- CreateEnum
CREATE TYPE "UserStatusEnum" AS ENUM ('ACTIVE', 'DISABLED', 'SUSPEND');

-- CreateEnum
CREATE TYPE "StoreStatusEnum" AS ENUM ('PENDING', 'ACTIVE', 'DISABLED', 'SUSPEND');

-- CreateEnum
CREATE TYPE "ShopItemStatusEnum" AS ENUM ('PENDING', 'ACTIVE', 'DISABLED', 'ENDED');

-- CreateEnum
CREATE TYPE "AdminRoleEnum" AS ENUM ('MANAGER', 'ADMIN', 'SUPPORT');

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "mobile" TEXT NOT NULL,
    "email" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "status" "UserStatusEnum" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ventors" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "mobile" TEXT NOT NULL,
    "email" TEXT,
    "national_id" TEXT,
    "status" "VentorStatusEnum" NOT NULL DEFAULT 'DISABLED',

    CONSTRAINT "Ventors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admins" (
    "id" TEXT NOT NULL,
    "role" "AdminRoleEnum" NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "mobile" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Store" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "open_at" TIMESTAMP(3),
    "close_at" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "address" TEXT,
    "zip_code" TEXT,
    "phone" TEXT[],
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "ventor_id" TEXT NOT NULL,
    "status" "StoreStatusEnum" NOT NULL DEFAULT 'PENDING',
    "imagesId" INTEGER,
    "store_type" TEXT,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShopItem" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "category_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "preparation_time" DOUBLE PRECISION,
    "price" DOUBLE PRECISION,
    "price_format" TEXT NOT NULL,
    "storeId" INTEGER,
    "remaining" INTEGER,
    "status" "ShopItemStatusEnum" NOT NULL,
    "discount" INTEGER,

    CONSTRAINT "ShopItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShopItemTopping" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "shop_item_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "price_format" TEXT NOT NULL,
    "discount" INTEGER,
    "remaining" INTEGER,
    "status" "ShopItemStatusEnum" NOT NULL,

    CONSTRAINT "ShopItemTopping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShopItemCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShopItemCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShopItemImages" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "mime_type" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "image_key" TEXT NOT NULL,
    "thumbnail_path" TEXT NOT NULL,
    "medium_path" TEXT NOT NULL,
    "orginal_path" TEXT NOT NULL,
    "uploaded_by_id" TEXT NOT NULL,
    "shop_item_id" INTEGER,
    "shop_item_topping_id" INTEGER,

    CONSTRAINT "ShopItemImages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoginDevices" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "expired_at" TIMESTAMP(3) NOT NULL,
    "access_token" TEXT NOT NULL,
    "ip_address" TEXT NOT NULL,
    "user_agent" TEXT NOT NULL,
    "user_id" TEXT,
    "ventor_id" TEXT,
    "admin_id" TEXT,

    CONSTRAINT "LoginDevices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SuspendList" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "reason" TEXT NOT NULL,
    "unsuspend_at" TIMESTAMP(3),
    "user_suspend_id" TEXT,
    "ventor_suspend_id" TEXT,

    CONSTRAINT "SuspendList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_StoreToUsers" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_mobile_key" ON "Users"("mobile");

-- CreateIndex
CREATE UNIQUE INDEX "Admins_mobile_key" ON "Admins"("mobile");

-- CreateIndex
CREATE UNIQUE INDEX "_StoreToUsers_AB_unique" ON "_StoreToUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_StoreToUsers_B_index" ON "_StoreToUsers"("B");

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_ventor_id_fkey" FOREIGN KEY ("ventor_id") REFERENCES "Ventors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShopItem" ADD CONSTRAINT "ShopItem_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "ShopItemCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShopItem" ADD CONSTRAINT "ShopItem_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShopItemTopping" ADD CONSTRAINT "ShopItemTopping_shop_item_id_fkey" FOREIGN KEY ("shop_item_id") REFERENCES "ShopItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShopItemImages" ADD CONSTRAINT "ShopItemImages_shop_item_id_fkey" FOREIGN KEY ("shop_item_id") REFERENCES "ShopItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShopItemImages" ADD CONSTRAINT "ShopItemImages_shop_item_topping_id_fkey" FOREIGN KEY ("shop_item_topping_id") REFERENCES "ShopItemTopping"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoginDevices" ADD CONSTRAINT "LoginDevices_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoginDevices" ADD CONSTRAINT "LoginDevices_ventor_id_fkey" FOREIGN KEY ("ventor_id") REFERENCES "Ventors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoginDevices" ADD CONSTRAINT "LoginDevices_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "Admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuspendList" ADD CONSTRAINT "SuspendList_user_suspend_id_fkey" FOREIGN KEY ("user_suspend_id") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuspendList" ADD CONSTRAINT "SuspendList_ventor_suspend_id_fkey" FOREIGN KEY ("ventor_suspend_id") REFERENCES "Ventors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StoreToUsers" ADD CONSTRAINT "_StoreToUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StoreToUsers" ADD CONSTRAINT "_StoreToUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
