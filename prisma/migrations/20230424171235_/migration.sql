-- CreateTable
CREATE TABLE `Dinosaur` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `name` VARCHAR(191) NOT NULL,
    `height` DOUBLE NOT NULL,
    `length` DOUBLE NOT NULL,
    `weight` DOUBLE NOT NULL,
    `era` ENUM('TRIASSIC', 'JURASSIC', 'CRETACEOUS') NOT NULL,
    `diet` ENUM('CARNIVORE', 'HERBIVORE', 'OMNIVORE') NOT NULL,
    `description` TEXT NOT NULL,
    `image` LONGBLOB NOT NULL,

    UNIQUE INDEX `Dinosaur_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
