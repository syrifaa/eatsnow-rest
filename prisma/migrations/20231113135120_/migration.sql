/*
  Warnings:

  - You are about to alter the column `desc` on the `voucher` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.

*/
-- AlterTable
ALTER TABLE `voucher` MODIFY `desc` INTEGER NOT NULL;
