CREATE TABLE `role` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` ENUM ('librarian', 'client') NOT NULL
);

CREATE TABLE `user` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(80) UNIQUE NOT NULL,
  `email` varchar(120) UNIQUE NOT NULL,
  `name` varchar(80) NOT NULL,
  `lastname` varchar(80) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` int NOT NULL
);

CREATE TABLE `author` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  `nationality` varchar(40) NOT NULL
);

CREATE TABLE `genre` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(80) NOT NULL
);

CREATE TABLE `book` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  `genre` int NOT NULL,
  `author` int NOT NULL,
  `isbn` varchar(80) NOT NULL,
  `editorial` int NOT NULL,
  `stock` int NOT NULL
);

CREATE TABLE `state_loan` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` ENUM ('active', 'returned', 'expired') NOT NULL
);

CREATE TABLE `loan` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `id_book` int NOT NULL,
  `id_user` int NOT NULL,
  `start_date` date NOT NULL,
  `finish_date` date NOT NULL,
  `state` int NOT NULL
);

CREATE TABLE `editorial` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(80) NOT NULL
);

ALTER TABLE `user` ADD FOREIGN KEY (`role`) REFERENCES `role` (`id`);

ALTER TABLE `book` ADD FOREIGN KEY (`author`) REFERENCES `author` (`id`);

ALTER TABLE `loan` ADD FOREIGN KEY (`id_user`) REFERENCES `user` (`id`);

ALTER TABLE `loan` ADD FOREIGN KEY (`state`) REFERENCES `state_loan` (`id`);

ALTER TABLE `book` ADD FOREIGN KEY (`genre`) REFERENCES `genre` (`id`);

ALTER TABLE `loan` ADD FOREIGN KEY (`id_book`) REFERENCES `book` (`id`);

ALTER TABLE `book` ADD FOREIGN KEY (`editorial`) REFERENCES `editorial` (`id`);
