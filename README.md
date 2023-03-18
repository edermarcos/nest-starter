<div>
  <h2 align="center">Nest.js Starter</h2>
  <p align="center">
    <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
  </p>
</div>

### About the Project

Aplicacion basica que contiene lo esencial para iniciar un proyecto nuevo.
Este proyecto ha sido creado con Node.js `v18.14.0` y Nest CLI `v9.2`

Basic application that contains the essentials to start a new project. This project has been created with Node.js v18.14.0 and Nest CLI v9.2

### Tech Stack

- [Nest.js](https://nestjs.com/)
- [Docker](https://www.docker.com/)
- [Postgres (DB)](https://www.postgresql.org/)
- [TypeORM (ORM](https://typeorm.io/#/)
- [Passport (Tokens)](http://www.passportjs.org/)
- [Swagger (Documentation)](https://swagger.io/)

### Prerequisites

Como requisitos, se recomienda tener instalado `docker` para poder correr la imagen de la base de datos.
Tambien es una opcion tener `yarn`.

### Installation

- Ejecutar Docker desktop

- Clonar el repositorio
   ```sh
   git clone https://github.com/edermarcos/nest-starter.git
   ```
- Instalar las dependencias
   ```sh
   yarn install
   ```

- Configurar las variables de entorno, renombrar el archivo `.env.example` a `.env` y asignar los valores correspondientes.

- Ejecutar el comando para levantar la imagen de la base de datos
   ```sh
   docker compose up -d
   ```
- Correr el servidor
   ```sh
   yarn start:dev
   ```
- [Opcional] Algunos endpoints pueden contener un seed para poder llenar la tabla y hacer pruebas en desarrollo.
   ```sh
   http://localhost:3000/[endpoint]/seed
   ```

- [Opcional] Se recomienda usar [TablePlus](https://tableplus.com/) para poder visualizar la base de datos.

<p align="right">(<a href="#top">back to top</a>)</p>

## Contact
Eder Marcos - eder.marcos.lara@gmail.com
