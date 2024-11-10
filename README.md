# Proyecto E-commerce Backend

Este proyecto es el backend de una plataforma de e-commerce, construido con Node.js utilizando el framework NestJS. Ofrece funcionalidades para gestionar productos, usuarios, órdenes de compra, autenticación y autorización. También incluye almacenamiento de archivos en la nube mediante Cloudinary.

## Tecnologías Utilizadas

- **NestJS**: Framework para construir aplicaciones escalables de backend.
- **TypeScript**: Lenguaje para escribir código tipado que facilita la mantenibilidad.
- **TypeORM**: ORM para manejar las conexiones y consultas a la base de datos.
- **PostgreSQL**: Base de datos relacional utilizada para almacenar la información.
- **Swagger**: Documentación interactiva de la API generada automáticamente.
- **Cloudinary**: Servicio de almacenamiento en la nube para gestionar archivos multimedia.
- **JWT (JSON Web Token)**: Utilizado para autenticación y autorización de usuarios.

## Funcionalidades

1. **Gestión de Productos (CRUD)**: Crear, leer, actualizar y eliminar productos almacenados en la base de datos.
2. **Autenticación y Registro de Usuarios**: Registro de nuevos usuarios y autenticación con validación de credenciales mediante JWT.
3. **Gestión de Roles**: Sistema de roles de usuario (`user` y `admin`) para manejar permisos y accesos.
4. **Gestión de Archivos en la Nube**: Almacenamiento y manejo de archivos en la nube mediante la API de Cloudinary.
5. **Gestión de Órdenes de Compra**: Creación y manejo de órdenes de compra.
6. **Autorización**: Rutas protegidas que requieren un token de autenticación para acceder.
