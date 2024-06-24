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

Iniciar modo producción

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

## Documentación de la API

### Endpoint `/api/user`

**Descripción:** Este endpoint nos sirve para realizar login y registrar usuarios en la plataforma.

1. **GET** `/api/user`

   - **Descripción:** Nos permite obtener todos los usuarios registrados en la plataforma.
   - **Requisitos:** Se debe estar autenticado con un usuario con rol `librarian` o `admin`
   - **Response Body:** (JSON ejemplo)
     - status: 200 (OK)
     ```
     [
       {
         "id": 1,
         "username": "admin_user",
         "email": "admin@example.com",
         "name": "Admin",
         "lastname": "User",
         "role": "admin"
       },
       {
         "id": 2,
         "username": "john_doe",
         "email": "john.doe@example.com",
         "name": "John",
         "lastname": "Doe",
         "role": "client"
       },
       {
         "id": 3,
         "username": "jane_smith",
         "email": "jane.smith@example.com",
         "name": "Jane",
         "lastname": "Smith",
         "role": "librarian"
       }
     ]
     ```

2. **POST** `/api/user/login`

   - Descripción: Nos permite autenticarnos en la plataforma y obtener un `token` ademas de información del usuario
   - Request Body: (JSON ejemplo)
     ```
     {
       "username": "user_test",
       "password": "usertest"
     }
     ```
   - Response Body: (JSON ejemplo)
     - Status: 200
     ```
     {
       "token": "token_generado_por_jwt",
       "id": 1,
       "username": "user_test",
       "email": "user_test@example.com",
       "name": "User",
       "lastname": "Test",
       "role": "admin"
     }
     ```

3. **POST** `/api/user/register`

   - **Requisitos:** Estar autenticado con un usuario `librarian` o `admin`
   - **Descripción:** Nos permite registrar nuevos usuarios a la plataforma para habilitar el inicio de sesión, esta es una ruta protegida por lo que los usuarios con rol `client` no podrán tener acceso, ademas de que el rol `librarian` solo podrá crear usuarios de rol `client`
   - **Nota:** Dentro del parámetro `role` puede ir solo alguna de estas opciones: `client`, `librarian` o `admin`
   - **Request Body:** (JSON ejemplo)
     ```
     {
       "username": "user_client",
       "email": "user_client@example.com",
       "name": "User",
       "lastname": "Client",
       "password": "nueva_contraseña",
       "role": "client"
     }
     ```
   - **Response Body:** (JSON ejemplo)
     - Status: 201
     ```
     {
       "id": 5,
       "username": "user_client",
       "email": "user_client@example.com",
       "name": "User",
       "lastname": "Client",
       "role": "client"
     }
     ```

### Endpoint `/api/role`

**Descripción:** Este endpoint nos permite recuperar los roles disponibles que existen para la creación de usuarios.

1. **GET** `/api/role`

   - **Requisitos:** Estar autenticado con un usuario `librarian` o `admin`
   - **Response Body:** (JSON ejemplo)
     - status: 200
     ```
     [
       {
         "id": 1,
         "name": "admin"
       },
       {
         "id": 2,
         "name": "client"
       },
       {
         "id": 3,
         "name": "librarian"
       }
     ]
     ```

2. **GET** `/api/role/:id`
   - **Requisitos:** Estar autenticado con un usuario `librarian` o `admin`
   - **Parámetros:**
     - **id:** Debe ser un número
   - **Response Body:** (JSON ejemplo)
     - status: 200
     ```
     {
       "id": 1,
       "name": "admin"
     }
     ```

### Endpoint `/api/book`

**Descripción:** Nos permite traernos la información de los libros registrados en la plataforma como también información y estado de estos mismos, también podemos crear y añadir nuevos libros e información

1. **GET** `/api/book`

   - **Descripción:** Nos trae todos los libros registrados en la plataforma.
   - **Response Body:** (JSON ejemplo)
     - status: 200
     ```
     [
       {
         "id": 1,
         "name": "One Hundred Years of Solitude",
         "author": "Gabriel Garcia Marquez",
         "editorial": "HarperCollins",
         "isbn": "1234567890",
         "genres": [
           "Fiction"
         ]
       },
       {
         "id": 2,
         "name": "Pride and Prejudice",
         "author": "Jane Austen",
         "editorial": "Penguin Books",
         "isbn": "2345678901",
         "genres": [
           "Fiction"
         ]
       }
     ]
     ```

2. **GET** `/api/book/:id`

   - **Descripción:** Este endpoint nos permite traernos los datos de disponibilidad y estado de los libros relacionados al endpoint anterior.
   - **Parámetros:**
     - **id:** Debe ser un número, relacionado al `id` del endpoint anterior `GET /api/book`
   - **Response Body:** (JSON ejemplo)
     - status: 200
     ```
     [
       {
         "id": 1,
         "name": "One Hundred Years of Solitude",
         "serial": "A123",
         "state": "good",
         "desc_state": "Good condition",
         "disponibility": "available"
       },
       {
         "id": 2,
         "name": "One Hundred Years of Solitude",
         "serial": "A124",
         "state": "details",
         "desc_state": "Some wear and tear",
         "disponibility": "taken"
       }
     ]
     ```

3. **POST** `/api/book`

   - **Descripción:** Nos permite crear y añadir un nuevo libro a la plataforma.
   - **Requisitos:** Debe estar autenticado con un usuario con rol `admin`
   - **Parámetros:**
     - **name:** este debe ser un `texto` y esta relacionado con el nombre del libro
     - **author:** debe ser un `número` y esta relacionado al identificador del autor
     - **isbn:** debe ser un `texto` y es un identificador único para cada libro o producto editorial
     - **editorial:** debe ser un `texto` y es el nombre de la editorial del libro
     - **genres:** debe ser un `arreglo de números` el cual contenga los identificadores de los géneros asociados al libro
   - **Request Body:** (JSON ejemplo)
     ```
     {
       "name": "El nombre de la rosa",
       "author": 1,
       "isbn": "978-0-15-600131-1",
       "editorial": "Editorial Planeta",
       "genres": [1, 2, 3, 4]
     }
     ```
   - **Response Body:** (JSON ejemplo)
     - status: 201 (created)
     ```
     {
       "id": 9,
       "name": "El nombre de la rosa",
       "author": "Gabriel Garcia Marquez",
       "editorial": "Editorial Planeta",
       "isbn": "978-0-15-600131-1",
       "genres": [
         "Fiction",
         "Non-Fiction",
         "Science Fiction",
         "Fantasy"
       ]
     }
     ```

4. **POST** `/api/book/:id`
   - **Descripción:** Nos permite crear y añadir nueva información, disponibilidad y estado de los libros registrados
   - **Requisitos:** Debe estar autenticado con un usuario con rol `admin`
   - **Parámetros:**
     - id: Este debe ser un `número` que este relacionado a un libro registrado en la plataforma, verificar con el endpoint `GET /api/book`
   - **Request Body:** (JSON ejemplo)
     ```
     {
       "serial": "A1235",
       "state": "bad",
       "disponibility": "available",
       "desc_state": "Cover is very damaged"
     }
     ```
   - **Response Body:** (JSON ejemplo)
     - status: 201 (created)
     ```
     {
       "id": 5,
       "name": "One Hundred Years of Solitude",
       "serial": "A1235",
       "state": "bad",
       "desc_state": "Cover is very damaged",
       "disponibility": "available"
     }
     ```

### Endpoint `/api/genre`

**Descripción:** Este endpoint nos permite obtener y registrar los géneros de libros en la plataforma.

1. **GET** `/api/genre`

   - **Descripción:** Nos permite obtener un array con todos los géneros registrados en la plataforma.
   - **Response Body:** (JSON ejemplo)
     - status: 200 (OK)
     ```
     [
       {
         "id": 1,
         "name": "Fiction"
       },
       {
         "id": 2,
         "name": "Non-Fiction"
       },
       {
         "id": 3,
         "name": "Science Fiction"
       }
     ]
     ```

2. **POST** `/api/genre`
   - **Descripción:** Nos registrar nuevos géneros en la plataforma.
   - **Requisitos:** Debe estar autenticado con un usuario con rol de `admin`
   - **Request Body:** (JSON ejemplo)
     ```
     {
       "name": "Fiction"
     }
     ```
   - **Response Body:** (JSON ejemplo)
     - status: 201 (created)
     ```
     {
       "id": 1,
       "name": "Fiction"
     }
     ```

### Endpoint `/api/author`

**Descripción:** Este endpoint nos permite obtener y registrar los autores de libros en la plataforma.

1.  **GET** `/api/author`

    - **Descripción:** Nos permite obtener un array con todos los autores registrados en la plataforma.
    - **Response Body:** (JSON ejemplo)
      - status: 200 (OK)
      ```
      [
        {
          "id": 1,
          "name": "Gabriel Garcia Marquez",
          "nationality": "Colombian"
        },
        {
          "id": 2,
          "name": "Jane Austen",
          "nationality": "British"
        }
      ]
      ```

2.  **POST** `/api/author`

    - **Descripción:** Nos registrar nuevos autores en la plataforma.
    - **Requisitos:** Debe estar autenticado con un usuario con rol de `admin`
    - **Request Body:** (JSON ejemplo)
      ```
      {
        "name": "Mark Twain",
        "nationality": "American"
      }
      ```
    - **Response Body:** (JSON ejemplo)
      - status: 201 (created)
      ```
      {
        "id": 3,
        "name": "Mark Twain",
        "nationality": "American"
      }
      ```

### Endpoint `/api/loan`

**Description:** Este endpoint nos permite obtener y crear nuevos prestamos de los libros en la plataforma.

1. **GET** `/api/loan`

   - **Requisitos:** Debemos estar autenticados, dependiendo el rol tendremos acceso a diferente información.
   - **Descripción:** Nos permite obtener un array con los prestamos registrados en la plataforma, si estamos con un usuario con rol `client` nos traerá solo los prestamos relacionados a este usuario, en cambio los roles `librarian` y `admin`, obtendrán los prestamos de todos los usuarios registrados.
   - **Response Body:**
     - status: 200 (OK)
     ```
     [
       {
         "id": 1,
         "book_name": "One Hundred Years of Solitude",
         "username": "john_doe",
         "serial": "A124",
         "start_date": "2024-06-16T04:00:00.000Z",
         "finish_date": "2024-06-18T04:00:00.000Z",
         "state": "returned"
       },
       {
         "id": 2,
         "book_name": "One Hundred Years of Solitude",
         "username": "admin_user",
         "serial": "A124",
         "start_date": "2024-06-19T04:00:00.000Z",
         "finish_date": "2024-06-24T04:00:00.000Z",
         "state": "active"
       }
     ]
     ```

2. **POST** `/api/loan`

   - **Descripción:** Nos permite crear nuevos prestamos de libros en la plataforma, siempre y cuando el libro se encuentre disponible.
   - **Requisitos:** Se debe estar autenticado con un usuario con rol `librarian` o `admin`
   - **Request Body:** (JSON ejemplo)
     ```
     {
       "id_user": 1,
       "id_book": 1,
       "id_book_info" 1,
       "start_date": "2024-06-02",
       "finish_date": "2024-06-10",
     }
     ```
   - **Response Body:** (JSON ejemplo)
     - status: 201 (created)
     ```
     {
       "id": 1,
       "book_name": "One Hundred Years of Solitude",
       "username": "admin_user",
       "serial": "A124",
       "start_date": "2024-06-02T04:00:00.000Z",
       "finish_date": "2024-06-10T04:00:00.000Z",
       "state": "active"
     }
     ```

3. **PUT** `/api/loan/:id`
   - **Descripción:** con este método nos permite actualizar el estado del prestamo y del libro relacionado a este, al utilizarlo cambiamos el estado a `returned` y el libro con estado `available`.
   - **Requisitos:** Debe estar autenticado con un usuario con rol `librarian` y `admin`
   - **Parámetros:**
     - id: Debe ser de tipo `número`, y esta relacionado al identificador del prestamo
   - **Response Body:** (JSON ejemplo)
     - status: 200 (OK)
     ```
     {
       "id": 1,
       "book_name": "One Hundred Years of Solitude",
       "username": "admin_user",
       "serial": "A124",
       "start_date": "2024-06-02T04:00:00.000Z",
       "finish_date": "2024-06-10T04:00:00.000Z",
       "state": "returned"
     }
     ```

### Endpoint `/api/fine`

**Descripción:** Nos permite obtener y cambiar el estado a pagado las deudas de los libros no devueltos a fecha.

**NOTA:** El backend ejecuta una tarea `cron` todos los días a las 00:00, la cual verificara si todos los prestamos con la fecha y hora al momento de ejecutar esta tarea, y creara un deuda (fine) si es que corresponde.

1. **GET** `/api/fine`

   - **Descripción:** Nos permite traer todas las deudas registradas en la plataforma, independiente si están activas o ya fueron pagadas.
   - **Requisitos:** Se debe autenticar con un usuario independiente de su rol, en el caso del usuario `client` solo recuperara las deudas pertenecientes a el, y para el resto `librarian` o `admin` obtendrán las deudas generales (todas)
   - **Response Body:** (JSON ejemplo)
     - status: 200 (OK)
     ```
     [
       {
         "id": 1,
         "value": 3000,
         "state": "pending",
         "username": "john_doe",
         "email": "john.doe@example.com"
       },
       {
         "id": 2,
         "value": 3000,
         "state": "paid",
         "username": "jane_smith",
         "email": "jane.smith@example.com"
       }
     ]
     ```

2. **PUT** `/api/fine/paid/:id`
   - **Descripción:** Nos permite registrar una deuda como pagada.
   - **Requisitos:** Se debe estar autenticado con un usuario con rol `librarian` o `admin`
   - **Parámetros:**
     - id: Debe ser un `número` el cual esta relacionado con el identificador de las deudas.
   - **Response Body:** (JSON ejemplo)
     - status: 200 (OK)
     ```
     {
       "id": 1,
       "value": 3000,
       "state": "paid",
       "username": "john_doe",
       "email": "john.doe@example.com"
     }
     ```
