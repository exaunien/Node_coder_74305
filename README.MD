├── public/
│   ├── css/
│   │   ├── normalize.css
│   │   └── styles.css
│   ├── img/
│   ├── js/
│   │   └── realTimeProducts.js
├── db.js
├── views/
│   ├── 404.hbs
│   ├── home.hbs
│   ├── realTimeProducts.hbs
│   └── layouts/
│       └── main.hbs
├── routes/
│   └── home.router.js
├── sockets/
│   ├── productsData.js
├── utils.js
├── server.js
├── README.md
└── package.json

## Descripción

Aplicación de servidor para gestionar productos en tiempo real utilizando Node.js, Express, Handlebars y Socket.io.
Tiene un product Manager llamado db.js que permite la gestión de productos y una interfaz web para visualizarlos en tiempo real.

## Instalación

1. Clona el repositorio.
2. Ejecuta `npm install` para instalar las dependencias.

## Uso

- Inicia el servidor con `npm run dev`.
- Accede a la aplicación en `http://localhost:8000`.

## Estructura de carpetas

El proyecto está organizado en carpetas para separar los archivos públicos, vistas, rutas, sockets y utilidades.

## Funcionalidades

- Visualización de productos en tiempo real.
- Actualización dinámica de la lista de productos.
- Manejo de errores personalizados (404).

## Dependencias principales

- express
- express-handlebars
- socket.io

## Autor

Jorge Albariño - Comisión 74305
