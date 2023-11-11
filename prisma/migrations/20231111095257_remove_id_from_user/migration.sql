/*
  Warnings:

  - The primary key for the `user_premium` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user_premium` table. All the data in the column will be lost.
  - The primary key for the `user_voucher` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `user_voucher` DROP FOREIGN KEY `user_voucher_user_id_fkey`;

-- AlterTable
ALTER TABLE `user_premium` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`email`);

-- AlterTable
ALTER TABLE `user_voucher` DROP PRIMARY KEY,
    MODIFY `user_id` VARCHAR(255) NOT NULL,
    ADD PRIMARY KEY (`user_id`, `voucher_id`);

-- AddForeignKey
ALTER TABLE `user_voucher` ADD CONSTRAINT `user_voucher_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user_premium`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;
