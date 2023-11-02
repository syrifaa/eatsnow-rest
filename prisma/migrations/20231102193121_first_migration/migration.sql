-- CreateTable
CREATE TABLE `user_premium` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `profile_img` VARCHAR(255) NOT NULL DEFAULT 'profile_img.png',
    `points` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `user_premium_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `voucher` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `desc` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `voucher_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_voucher` (
    `user_id` INTEGER NOT NULL,
    `voucher_id` INTEGER NOT NULL,

    PRIMARY KEY (`user_id`, `voucher_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_voucher` ADD CONSTRAINT `user_voucher_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user_premium`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_voucher` ADD CONSTRAINT `user_voucher_voucher_id_fkey` FOREIGN KEY (`voucher_id`) REFERENCES `voucher`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
