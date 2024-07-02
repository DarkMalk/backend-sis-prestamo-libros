-- Crear base de datos
-- Cambiar el nombre de la base de datos si es necesario, dependiendo el entorno (desarrollo, producción y pruebas)
CREATE DATABASE `biblioteca`;
USE `biblioteca`;

-- Crear tablas y relaciones
CREATE TABLE `role` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` ENUM ('admin', 'client', 'librarian') NOT NULL
);

CREATE TABLE `user` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(80) UNIQUE NOT NULL,
  `email` varchar(120) UNIQUE NOT NULL,
  `name` varchar(80) NOT NULL,
  `lastname` varchar(80) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` int NOT NULL,
  FOREIGN KEY (`role`) REFERENCES `role` (`id`)
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
  `author` int NOT NULL,
  `isbn` varchar(80) NOT NULL,
  `editorial` varchar(80) NOT NULL,
  FOREIGN KEY (`author`) REFERENCES `author` (`id`)
);

CREATE TABLE `state_book` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` ENUM ('good', 'details', 'bad') NOT NULL
);

CREATE TABLE state_book_disponibility (
	`id` int PRIMARY KEY AUTO_INCREMENT,
  `name` ENUM ('available', 'taken') NOT NULL
);

CREATE TABLE `book_info` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `id_book` int,
  `serial` varchar(80) NOT NULL,
  `state` int NOT NULL,
  `desc_state` varchar(80) NOT NULL,
  `disponibility` int NOT NULL,
  FOREIGN KEY (`id_book`) REFERENCES `book` (`id`),
  FOREIGN KEY (`state`) REFERENCES `state_book` (`id`),
  FOREIGN KEY (`disponibility`) REFERENCES `state_book_disponibility` (`id`)
);

CREATE TABLE `book_genre` (
  `id_genre` int,
  `id_book` int,
  PRIMARY KEY (`id_genre`, `id_book`),
  FOREIGN KEY (`id_genre`) REFERENCES `genre` (`id`),
  FOREIGN KEY (`id_book`) REFERENCES `book` (`id`)
);

CREATE TABLE `state_loan` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` ENUM ('active', 'returned', 'expired') NOT NULL
);

CREATE TABLE `loan` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `id_book` int NOT NULL,
  `start_date` date NOT NULL,
  `finish_date` date NOT NULL,
  `state` int,
  FOREIGN KEY (`id_user`) REFERENCES `user` (`id`),
  FOREIGN KEY (`id_book`) REFERENCES `book` (`id`),
  FOREIGN KEY (`state`) REFERENCES `state_loan` (`id`)
);

CREATE TABLE `state_fine` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` ENUM ('pending', 'paid') NOT NULL
);

CREATE TABLE `fine` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `value` int DEFAULT 3000,
  `state` int,
  FOREIGN KEY (`state`) REFERENCES `state_fine` (`id`)
);

CREATE TABLE `user_fine` (
  `id_user` int,
  `id_fine` int,
  PRIMARY KEY (`id_user`, `id_fine`),
  FOREIGN KEY (`id_user`) REFERENCES `user` (`id`),
  FOREIGN KEY (`id_fine`) REFERENCES `fine` (`id`)
);

-- Datos para la tabla `role`
INSERT INTO `role` (`name`) VALUES 
('admin'), 
('client'), 
('librarian');

-- Datos para la tabla `user` (user: admin_user | pass: usertest)
INSERT INTO `user` (`username`, `email`, `name`, `lastname`, `password`, `role`) VALUES 
('admin_user', 'admin@example.com', 'Admin', 'User', '$2b$10$sDWEBRb1TXpJ6PtVKr67HuYL9HHr/i4gvKw8OERpGLHSTTyckx.wu', 1);

-- Datos para la tabla `state_book`
INSERT INTO `state_book` (`name`) VALUES 
('good'), 
('details'), 
('bad');

-- Datos para la tabla `state_loan`
INSERT INTO `state_loan` (`name`) VALUES 
('active'), 
('returned'), 
('expired');

-- Datos para la tabla `state_fine`
INSERT INTO `state_fine` (`name`) VALUES 
('pending'), 
('paid');
