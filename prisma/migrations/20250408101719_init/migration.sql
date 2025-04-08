-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uniqueId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `photoUrl` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Users_uniqueId_key`(`uniqueId`),
    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Projects` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `projectUniqueId` VARCHAR(191) NOT NULL,
    `ownerUniqueId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `devices` INTEGER NOT NULL,
    `input` INTEGER NOT NULL,
    `output` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Devices` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `deviceUniqueId` VARCHAR(191) NOT NULL,
    `projectUniqueId` VARCHAR(191) NOT NULL,
    `deviceName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Devices_deviceUniqueId_key`(`deviceUniqueId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Data` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dataUniqueId` VARCHAR(191) NOT NULL,
    `deviceUniqueId` VARCHAR(191) NOT NULL,
    `ProjectUniqueId` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `deviceName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Data_dataUniqueId_key`(`dataUniqueId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
