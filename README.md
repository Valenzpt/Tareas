# Tareas

Aplicacion de tareas del usuario en linea, creado utilizando Node.js, Express, Sequelize, MSSQL y Vue3.

## Requisitos Previos
-Node.js y npm
-MSSQL

## Estructura del proyecto
 -   `/cliente`: Contiene el código fuente del frontend desarrollado con vue3 para interactuar con la API.
 -   `/tarea-servicio`: Contiene el código fuente del microservicio en backend para las operaciones CRUD de las tareas.
 -   `/usuario-servicio`: Contiene el código fuente del microservicio en backend para los usuarios registro y login.
 -   `/compartido`: Contiene la configuración de la base de datos con sequelize compartida para ambos microservicios. 
 -   `base de datos.sql`: Contiene el archivo SQL para la creación de la base de datos.

## Instalación

1. **Clonar el repositorio**
    git clone https://github.com/Valenzpt/Tareas

2. **Configurar la base de datos**
    En MSSQL, abrir el archido base de datos.sql y ejecutar
    Editar `compartido/dbconfig` con sus respectivas configuraciones de servidor de base de datos

3. **Instalar dependencias**
 -  en la raíz del proyecto 
    npm install

 -  cd tarea-servicio
    npm install

 -  cd ../usuario-servicio
    npm install

 -  cd ../cliente
    npm install   

4. **Ejecutar el proyecto**
    cd ../tarea-servicio
    npm run dev

    cd ../usuario-servicio
    npm run dev

    cd ../cliente
    npm run dev
