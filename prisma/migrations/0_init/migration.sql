-- CreateTable
CREATE TABLE `ViveroEspecie` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipoId` INTEGER NOT NULL,
    `estadoId` INTEGER NOT NULL,
    `categoriaId` INTEGER NOT NULL,
    `comun` VARCHAR(45) NOT NULL,
    `cientifico` VARCHAR(100) NOT NULL,

    INDEX `fkViveroEspecieCategoria_idx`(`categoriaId`),
    INDEX `fkViveroEspecieEstado_idx`(`estadoId`),
    INDEX `fkViveroEspecieTipo_idx`(`tipoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ViveroEspecieCategoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Departamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `departamento` VARCHAR(45) NOT NULL,
    `nombre` VARCHAR(45) NOT NULL,
    `longitud` DECIMAL(10, 7) NOT NULL,
    `latitud` DECIMAL(10, 7) NOT NULL,

    UNIQUE INDEX `departamento_UNIQUE`(`departamento`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Municipio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `departamentoId` INTEGER NOT NULL,
    `municipio` VARCHAR(45) NOT NULL,
    `nombre` VARCHAR(45) NOT NULL,
    `longitud` DECIMAL(10, 7) NOT NULL,
    `latitud` DECIMAL(10, 7) NOT NULL,

    INDEX `FK_municipio_departamento_idx`(`departamentoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vivero` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `municipioId` INTEGER NOT NULL,
    `nombre` VARCHAR(100) NOT NULL,
    `meta` INTEGER NOT NULL,
    `latitud` DECIMAL(10, 7) NOT NULL,
    `longitud` DECIMAL(10, 7) NOT NULL,
    `estaActivo` TINYINT NOT NULL DEFAULT 1,
    `direccion` VARCHAR(255) NULL,
    `enlace` VARCHAR(50) NULL,
    `telEnlace` VARCHAR(20) NULL,
    `responsable` VARCHAR(50) NULL,
    `telResponsable` VARCHAR(20) NULL,
    `googleMap` VARCHAR(50) NULL,

    INDEX `fkViveroMunicipio_idx`(`municipioId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ViveroEspecieEstado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ViveroEspecieTipo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ViveroEspecie` ADD CONSTRAINT `fkViveroEspecieCategoria` FOREIGN KEY (`categoriaId`) REFERENCES `ViveroEspecieCategoria`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ViveroEspecie` ADD CONSTRAINT `fkViveroEspecieEstado` FOREIGN KEY (`estadoId`) REFERENCES `ViveroEspecieEstado`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ViveroEspecie` ADD CONSTRAINT `fkViveroEspecieTipo` FOREIGN KEY (`tipoId`) REFERENCES `ViveroEspecieTipo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Municipio` ADD CONSTRAINT `FK_municipio_departamento` FOREIGN KEY (`departamentoId`) REFERENCES `Departamento`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Vivero` ADD CONSTRAINT `fkViveroMunicipio` FOREIGN KEY (`municipioId`) REFERENCES `Municipio`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

