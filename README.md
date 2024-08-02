# Olympus Athlete Server

![Olympus Athlete](https://link-to-your-logo.com/logo.png)

El servidor de **Olympus Athlete** es el backend que impulsa la plataforma web diseñada para ayudar a los usuarios a crear y gestionar rutinas de entrenamiento personalizadas. Esta aplicación, construida con Express.js, maneja la lógica de negocio y la interacción con la base de datos MySQL utilizando Sequelize como ORM.

## Características Principales

- **Gestión de Usuarios:** Registro, inicio de sesión, y manejo de perfiles de usuario.
- **Rutinas Personalizadas:** Creación, actualización y gestión de rutinas de entrenamiento.
- **Desafíos y Objetivos Semanales:** Implementación de desafíos y establecimiento de objetivos semanales para mantener a los usuarios motivados.
- **Progreso del Usuario:** Seguimiento del progreso del usuario a través de métricas y registros.
- **Seguridad:** Medidas de protección como HTTPS y almacenamiento en caché para asegurar la privacidad y la integridad de los datos.
- **Administración:** Herramientas para que los gestores puedan administrar la plataforma, incluyendo la sección 'Descubrir' con rutinas y desafíos.

## Tecnologías Utilizadas

- **Express.js:** Framework para construir aplicaciones web y APIs.
- **Sequelize:** ORM para interactuar con la base de datos MySQL.
- **Cloudinary:** Servicio para la gestión y almacenamiento de archivos multimedia.
- **JWT (JSON Web Tokens):** Para la autenticación y autorización de usuarios.

## Estructura del Proyecto

El servidor está estructurado en módulos para mantener un código limpio y organizado:

- **Modelos:** Definición de los modelos de datos utilizando Sequelize.
- **Controladores:** Lógica de negocio y manejo de las solicitudes HTTP.
- **Rutas:** Definición de las rutas y endpoints de la API.
- **Middleware:** Funciones de middleware para autenticación, validación y gestión de archivos.
- **Configuración:** Archivos de configuración para el entorno de desarrollo y producción.

## Instalación y Uso

Para instalar y ejecutar el servidor localmente:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/leinerdavidhc/olympus-athlete-server.git
   cd olympus-athlete-server
