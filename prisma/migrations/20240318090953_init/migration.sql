-- CreateTable
CREATE TABLE `urls` (
    `orginalUrl` VARCHAR(255) NOT NULL,
    `shortUrl` VARCHAR(191) NOT NULL,
    `counter` INTEGER NULL DEFAULT 0,

    UNIQUE INDEX `urls_orginalUrl_key`(`orginalUrl`),
    PRIMARY KEY (`shortUrl`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
