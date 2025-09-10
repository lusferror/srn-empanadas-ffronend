# srn-empanadas-ffronend

Proyecto fullstack para la gestión de empanadas chilenas (Fiestas Patrias).

## Archivos de variables de entorno
Recuerda que los archivos `.env` deben ser copiados manualmente a cada entorno (por ejemplo, desde `.env.example` a `.env` en las carpetas `backend/` y/o `frontend/`). Estos archivos no se crean automáticamente al levantar los contenedores.

## Estructura del Proyecto
- **backend/**: API REST Node.js + MySQL
- **frontend/**: CodeIgniter + JavaScript
- **docker-compose.yml**: Orquestación de servicios

## Requisitos Previos
- Docker y Docker Compose
- Git

## Instalación y Ejecución Rápida
1. Clona este repositorio y entra a la carpeta raíz:
	```sh
	git clone <URL-del-repo>
	cd gestion_empanadas_chilenas
	```
2. Levanta los servicios backend y base de datos:
	```sh
	docker-compose up --build
	```
	Esto creará la base de datos y levantará el backend en `localhost:3000`.
3. Inicializa la base de datos (opcional si ya está poblada):
	- Puedes ejecutar el script `backend/db_init.sql` en el contenedor MySQL para crear la tabla y datos de ejemplo.
4. Instala CodeIgniter en la carpeta `frontend` (si no está instalado):
	- Descarga CodeIgniter 3.x desde https://codeigniter.com/download y descomprime el contenido en `frontend/`.
	- Asegúrate de que los archivos `application/` y `system/` estén presentes.
	- Los archivos de configuración y vistas ya están preparados.
5. Levanta el frontend (PHP/Apache):
	```sh
	docker build -t empanadas-frontend ./frontend
	docker run -d -p 8080:80 --name empanadas-frontend --link empanadas-backend:backend empanadas-frontend
	```
	O usa un contenedor PHP/Apache a tu elección.
6. Accede a la app en tu navegador: [http://localhost:8080](http://localhost:8080)

## Pruebas Backend
1. Entra a la carpeta backend:
	```sh
	cd backend
	npm install
	npm test
	```
	Se ejecutarán pruebas unitarias con Jest y Supertest.

## Endpoints API
- `GET /api/empanadas` - Lista todas las empanadas
- `POST /api/empanada` - Crea una nueva empanada
- `PUT /api/empanada/:id` - Actualiza una empanada
- `DELETE /api/empanada/:id` - Elimina una empanada

## Notas
- El frontend consume la API del backend usando JavaScript puro/AJAX.
- Puedes modificar la configuración de la base de datos en `docker-compose.yml` y `backend/src/db/pool.js`.
- El script SQL de ejemplo está en `backend/db_init.sql`.

## Autor
[Tu Nombre]
