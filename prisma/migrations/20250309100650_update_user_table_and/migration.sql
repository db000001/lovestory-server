/*
  Warnings:

  - You are about to drop the `users_tbl` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `users_tbl`;

-- CreateTable
CREATE TABLE `user_tbl` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `middle_name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `sex` VARCHAR(191) NULL,
    `college` VARCHAR(191) NULL,
    `avatar` VARCHAR(191) NULL,
    `birthday` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `email_verified` BOOLEAN NOT NULL DEFAULT false,
    `verification_token` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'Active',
    `refresh_token` VARCHAR(191) NULL,
    `join_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `user_tbl_email_key`(`email`),
    UNIQUE INDEX `user_tbl_refresh_token_key`(`refresh_token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `college_tbl` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email_domain` VARCHAR(191) NOT NULL,
    `college` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
