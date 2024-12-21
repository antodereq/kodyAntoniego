CREATE DATABASE carsDle;
USE carsDle;


CREATE TABLE IF NOT EXISTS `marki` (
    `id` int AUTO_INCREMENT NOT NULL UNIQUE,
    `marka` varchar(50) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `kraje` (
    `id` int AUTO_INCREMENT NOT NULL UNIQUE,
    `kraj` varchar(100) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `nadwozia` (
    `id` int AUTO_INCREMENT NOT NULL UNIQUE,
    `nadwozie` varchar(50) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `skrzynie` (
    `id` int AUTO_INCREMENT NOT NULL UNIQUE,
    `skrzynia` varchar(50) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `napedy` (
    `id` int AUTO_INCREMENT NOT NULL UNIQUE,
    `naped` varchar(4) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `samochody` (
    `id` int AUTO_INCREMENT NOT NULL UNIQUE,
    `marka_id` int NOT NULL,
    `model` varchar(100) NOT NULL,
    `naped_id` int NOT NULL,
    `nadwozie_id` int NOT NULL,
    `skrzynia_id` int NOT NULL,
    `kraj_id` int NOT NULL,
    `rocznik` int NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT FOREIGN KEY (`marka_id`) REFERENCES `marki`(`id`),
    CONSTRAINT FOREIGN KEY (`naped_id`) REFERENCES `napedy`(`id`),
    CONSTRAINT FOREIGN KEY (`nadwozie_id`) REFERENCES `nadwozia`(`id`),
    CONSTRAINT FOREIGN KEY (`skrzynia_id`) REFERENCES `skrzynie`(`id`),
    CONSTRAINT FOREIGN KEY (`kraj_id`) REFERENCES `kraje`(`id`)
);

INSERT INTO marki (marka) VALUES 
('Lamborghini'),
('Ferrari'),
('Pagani'),
('Porsche'),
('BMW'),
('Audi'),
('Mercedes'),
('Koenigsegg'),
('Bugatti'),
('Nissan'),
('Toyota'),
('Mazda'),
('Honda'),
('Subaru'),
('Mitsubishi'),
('Dodge'),
('Ford'),
('McLaren');

INSERT INTO kraje (kraj) VALUES 
('Wlochy'),
('Niemcy'),
('Szwecja'),
('Francja'),
('Japonia'),
('Ameryka'),
('W.Brytania');

INSERT INTO nadwozia (nadwozie) VALUES 
('Sedan'),
('Coupe'),
('Hatchback'),
('Suv'), 
('Kombi'),
('Roadster'),
('Cabrio'),
('Targa');

INSERT INTO skrzynie (skrzynia) VALUES 
('Manualna'),
('Automatyczna'),
('Sekwencyjna');

INSERT INTO napedy (naped) VALUES 
('RWD'),
('AWD'),
('FWD');


INSERT INTO `samochody` (`marka_id`, `model`, `naped_id`, `nadwozie_id`, `skrzynia_id`, `kraj_id`, `rocznik`) VALUES 
(1, 'Aventador', 2, 2, 2, 1, 2011),
(1, 'Aventador', 2, 6, 2, 1, 2013),
(1, 'Huracan', 2, 2, 2, 1, 2014),
(1, 'Huracan', 2, 6, 2, 1, 2016),
(1, 'Huracan', 1, 2, 2, 1, 2016),
(1, 'Huracan', 1, 6, 2, 1, 2017),
(1, 'Diablo', 2, 2, 1, 1, 2000),
(1, 'Diablo', 1, 2, 1, 1, 1999),
(1, 'Diablo', 2, 6, 1, 1, 1995),
(1, 'Diablo', 1, 6, 1, 1, 1998),
(1, 'Countach', 1, 2, 1, 1, 1974),
(4, 'Carrera GT', 1, 2, 1, 2, 2004),
(4, '918 Spyder', 2, 8, 2, 2, 2015),
(4, '911 GT3 RS', 1, 2, 2, 2, 2006),
(4, '919 Hybrid Evo', 2, 2, 2, 2, 2017),
(10, 'GT-R', 2, 2, 2, 5, 2007),
(10, 'Skyline R34', 2, 2, 1, 5, 1999),
(10, 'Skyline R34', 2, 2, 2, 5, 1999),
(11, 'Supra MK4', 1, 2, 1, 5, 1993),
(11, 'Supra MK4', 1, 2, 2, 5, 1993),
(11, 'Supra MK4', 1, 8, 1, 5, 1993),
(11, 'Supra MK4', 1, 8, 2, 5, 1993);
