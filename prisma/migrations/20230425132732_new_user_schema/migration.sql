/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `nickname` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User_email_key` ON `User`;

-- DropIndex
DROP INDEX `User_nickname_key` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `email`,
    DROP COLUMN `nickname`,
    ADD COLUMN `username` VARCHAR(191) NOT NULL,
    MODIFY `role` ENUM('VISITOR', 'ADMIN') NOT NULL DEFAULT 'VISITOR';

-- CreateIndex
CREATE UNIQUE INDEX `User_username_key` ON `User`(`username`);
