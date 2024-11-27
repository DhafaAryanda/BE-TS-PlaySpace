/*
  Warnings:

  - Added the required column `thumbnail` to the `facilities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `facilities` ADD COLUMN `thumbnail` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `avatar` VARCHAR(255) NULL;
