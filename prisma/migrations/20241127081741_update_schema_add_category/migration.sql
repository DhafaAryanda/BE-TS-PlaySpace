/*
  Warnings:

  - You are about to drop the column `category` on the `facilities` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `facilities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `facilities` DROP COLUMN `category`,
    ADD COLUMN `category_id` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `categories` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `icon` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `facilities` ADD CONSTRAINT `facilities_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
