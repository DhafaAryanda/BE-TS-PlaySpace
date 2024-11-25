/*
  Warnings:

  - Added the required column `user_id` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `payments` ADD COLUMN `user_id` VARCHAR(191) NOT NULL;
