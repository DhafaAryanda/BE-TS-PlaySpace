/*
  Warnings:

  - You are about to drop the column `created_at` on the `benefit` table. All the data in the column will be lost.
  - You are about to drop the column `facility_id` on the `benefit` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `benefit` table. All the data in the column will be lost.
  - You are about to drop the column `booking_date` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `end_time` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `facility_id` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `start_time` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `total_price` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `facilities` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `facilities` table. All the data in the column will be lost.
  - You are about to drop the column `owner_id` on the `facilities` table. All the data in the column will be lost.
  - You are about to drop the column `price_per_hour` on the `facilities` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `facilities` table. All the data in the column will be lost.
  - You are about to drop the column `booking_id` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `payment_amount` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `payment_date` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `payment_method` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `tokens` table. All the data in the column will be lost.
  - You are about to drop the column `expired_at` on the `tokens` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `tokens` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `email_verified_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `reset_password_token` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[bookingId]` on the table `payments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `facilityId` to the `Benefit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Benefit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bookingDate` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `facilityId` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `facilities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `facilities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pricePerHour` to the `facilities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `facilities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bookingId` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentAmount` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentDate` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethod` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `benefit` DROP FOREIGN KEY `Benefit_facility_id_fkey`;

-- DropForeignKey
ALTER TABLE `bookings` DROP FOREIGN KEY `bookings_facility_id_fkey`;

-- DropForeignKey
ALTER TABLE `bookings` DROP FOREIGN KEY `bookings_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `facilities` DROP FOREIGN KEY `facilities_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `facilities` DROP FOREIGN KEY `facilities_owner_id_fkey`;

-- DropForeignKey
ALTER TABLE `payments` DROP FOREIGN KEY `payments_booking_id_fkey`;

-- DropForeignKey
ALTER TABLE `tokens` DROP FOREIGN KEY `tokens_user_id_fkey`;

-- DropIndex
DROP INDEX `payments_booking_id_key` ON `payments`;

-- AlterTable
ALTER TABLE `benefit` DROP COLUMN `created_at`,
    DROP COLUMN `facility_id`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `facilityId` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `bookings` DROP COLUMN `booking_date`,
    DROP COLUMN `created_at`,
    DROP COLUMN `end_time`,
    DROP COLUMN `facility_id`,
    DROP COLUMN `start_time`,
    DROP COLUMN `total_price`,
    DROP COLUMN `updated_at`,
    DROP COLUMN `user_id`,
    ADD COLUMN `bookingDate` DATETIME(3) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `endTime` DATETIME(3) NOT NULL,
    ADD COLUMN `facilityId` VARCHAR(191) NOT NULL,
    ADD COLUMN `startTime` DATETIME(3) NOT NULL,
    ADD COLUMN `totalPrice` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `categories` DROP COLUMN `created_at`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `facilities` DROP COLUMN `category_id`,
    DROP COLUMN `created_at`,
    DROP COLUMN `owner_id`,
    DROP COLUMN `price_per_hour`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `categoryId` VARCHAR(191) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `ownerId` VARCHAR(191) NOT NULL,
    ADD COLUMN `pricePerHour` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `payments` DROP COLUMN `booking_id`,
    DROP COLUMN `created_at`,
    DROP COLUMN `payment_amount`,
    DROP COLUMN `payment_date`,
    DROP COLUMN `payment_method`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `bookingId` VARCHAR(191) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `paymentAmount` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `paymentDate` DATETIME(3) NOT NULL,
    ADD COLUMN `paymentMethod` ENUM('BANK_TRANSFER', 'E_WALLET') NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `tokens` DROP COLUMN `created_at`,
    DROP COLUMN `expired_at`,
    DROP COLUMN `user_id`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `created_at`,
    DROP COLUMN `email_verified_at`,
    DROP COLUMN `reset_password_token`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `emailVerifiedAt` DATETIME(3) NULL,
    ADD COLUMN `resetPasswordToken` VARCHAR(255) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `payments_bookingId_key` ON `payments`(`bookingId`);

-- AddForeignKey
ALTER TABLE `facilities` ADD CONSTRAINT `facilities_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `facilities` ADD CONSTRAINT `facilities_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Benefit` ADD CONSTRAINT `Benefit_facilityId_fkey` FOREIGN KEY (`facilityId`) REFERENCES `facilities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_facilityId_fkey` FOREIGN KEY (`facilityId`) REFERENCES `facilities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `bookings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tokens` ADD CONSTRAINT `tokens_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
