# **Backend Sistema de Prestamo de Libros**

Proyecto de backend con **Node.JS, Express y TypeScript**, Ademas como motor de base de datos se utilizo **MySQL**.

## Requisitos

- [Node.JS](https://nodejs.org/en)
- [MySQL](https://www.mysql.com/)

## Como empezar

Clonar repositorio en equipo local

```
git clone https://github.com/DarkMalk/backend-sis-prestamo-libros.git
```

Ingresar al proyecto (carpeta)

```
cd backend-sis-prestamo-libros
```

Instalar dependencias

```
pnpm install
```

**NOTA:** Reemplazar por el manejador de paquetes que utilices, `npm` o `yarn`.

### Creación de base de datos MySQL

Para la creación de las tablas necesarias para este proyecto en la base de datos `MySQL` podemos utilizar el archivo de referencia en la carpeta `files/create_db.sql`, que contiene todas las operaciones necesarias para empezar a funcionar con el proyecto.

```
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
  `count` int NOT NULL,
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

-- Datos para la tabla `user` (user: admin_user | pass: usertest)
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
```

### Configuración de variables de entorno

Existen 3 modos para iniciar este proyecto los cuales corresponden a:

1. development
2. production
3. test

para cada uno de estos se debe configurar las variables de entorno con sus respectivos nombres

```
touch development.env
touch production.env
touch test.env
```

Estos archivos deben tener la siguiente información que es requerida para que funcione el proyecto, esto se puede tomar de ejemplo el archivo del repositorio `.env.example`.

**NOTA:** la variable de entorno `PORT` es opcional ya que por defecto tomara el puerto `3000` si es que no le pasamos un número de puerto.

_Ejemplo:_

```
# PORT for listen server
PORT=3000

# DB
HOST="localhost"
USERNAME="root"
PASSWORD="root"
DATABASE="biblioteca"

# JsonWebToken
JSONWEBTOKEN_SECRET="test"
```

### Comandos para iniciar proyecto.

Inciar modo producción

```
pnpm start
```

Iniciar modo desarrollo

```
pnpm run dev
```

Iniciar modo test

```
pnpm run test
```

**NOTA:** reemplazar el manejador de paquetes por `npm` o `yarn` si es necesario, en este caso se muestra con pnpm.

## Model Database

<iframe width="800" height="600" src='https://dbdiagram.io/e/661d7fab03593b6b610d90b5/6650f729f84ecd1d22178eb8'> </iframe>
