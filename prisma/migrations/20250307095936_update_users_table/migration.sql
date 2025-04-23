/*
  Warnings:

  - You are about to drop the column `emailVerified` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `emailVerified`,
    ADD COLUMN `email_verified` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `college` VARCHAR(191) NULL,
    MODIFY `date_of_birth` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `middleName` VARCHAR(191) NULL,
    MODIFY `sex` VARCHAR(191) NULL,
    MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'Active';
