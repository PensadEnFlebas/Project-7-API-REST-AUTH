# 📚 NBAfantasy API

Una RESTful API desarrollada con Node.js, Express y MongoDB qpara gestionar datos de jugadores, equipos y estadísticas de la **NBA**, ideal para crear ligas fantasy o aplicaciones relacionadas con baloncesto profesional.

---

## 📁 Estructura del proyecto

```text
nbafantasy/
├── assets/ → Imágenes de jugadores, equipos y avatares de usuarios.
├── src/
│ ├── api/
│ │ ├── controllers/ → Lógica de negocio de cada recurso
│ │ ├── models/ → Esquemas de Mongoose
│ │ └── routes/ → Endpoints de la API
│ ├── config/ → Configuración del servidor, Cloudinary y entorno
│ ├── data/ → base de datos para alimentar semilla
│ ├── middlewares/ → gestión de permisos y subida de imágenes
│ ├── db/ → Conexión a MongoDB
│ └──  utils/
│ │ ├── eliminations/ → función de eliminación de archivos de Cloudinary
│ │ └── seeds/ → Scripts para poblar la base de datos inicial de jugadores (recomendado no subir a Git)
├── .env → Variables de entorno (no subir a Git)
├── index.js → Punto de entrada del servidor
├── package.json → Dependencias y scripts
└── README.md → Documentación del proyecto
```

---

## 🚀 Tecnologías usadas

- **Node.js** Entorno de ejecución para JavaScript en servidor
- **Express.js** Framework para construir la API REST.
- **MongoDB Atlas** para la base de datos NoSQL en la nube.
- **Mongoose** ODM para interactuar con MongoDB.
- **Dotenv** para la gestión de variables de entorno.
- **Nodemon** para desarrollo en caliente.
- **bcrypt** para hashear y proteger contraseñas de usuarios.
- **JWT (JSON Web Tokens)** para autenticación y manejo seguro de sesiones.
- **Multer** middleware para gestionar la subida de archivos desde formularios.
- **Cloudinary** servicio en la nube para almacenar y gestionar imágenes de forma eficiente.
- **Insomnia** cliente HTTP para testear endpoints de forma rápida y visual.

---

## 🔐 Autenticación y seguridad

Se utiliza **bcrypt** para encriptar las contraseñas de los usuarios y garantizar que no se almacenen en texto plano.

La autenticación se gestiona mediante **JSON Web Tokens (JWT)**, asegurando que solo usuarios autenticados puedan acceder a rutas protegidas.

Los **middlewares de autenticación** verifican la validez del _token_ y el _rol del usuario_ (usuario o administrador) para controlar el acceso a recursos y acciones sensibles, como modificar roles o eliminar usuarios.

Los usuarios solo pueden crearse con rol user por defecto a través del **registro**, y el primer admin se crea directamente en la base de datos.

Los administradores pueden promover usuarios a admin y eliminar usuarios, mientras que los usuarios pueden eliminar su propia cuenta.

---

## 📁 Subida de imágenes

Este proyecto permite subir imágenes de los jugadores, de los escudos de los equipos creados por los usuarios y de los avatares de los usuarios a **Cloudinary** gracias a **multer** y **multer-storage-cloudinary**.

- Las imágenes se almacenan en carpetas independientes: **NBAfantasyPLAYERS**, **NBAfantasyTEAMS** y **NBAfantasyUSERS** en tu cuenta de Cloudinary.

- Al actualizar o eliminar una imagen, la imagen previa se borra automáticamente de **Cloudinary**.

---

## 📦 Requisitos para el entorno

Tener **[Node.js](https://nodejs.org/)** instalado

Tener una cuenta en **[MongoDB Atlas](https://cloud.mongodb.com/)** (si se quiere conectar a la base de datos remota)

Recomendado: tener instalado **[Insomnia](https://insomnia.rest/)** o **[Postman](https://www.postman.com/)** para testear las rutas

---

## 🔧 Instalación y uso

Primero clona el repositorio:

```sh
git clone https://github.com/PensadEnFlebas/Project-7-API-REST-AUTH
cd Project-7-API-REST-AUTH
```

Instala las dependencias:

```sh
npm install
```

Crea un archivo .env en la raíz del proyecto:

```sh
PORT=3000   # opcional
DB_URL=mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/nbafantasy
🔐 Variables para autenticación JWT
JWT_SECRET=tu_clave_secreta_para_tokens
☁️ Variables de Cloudinary
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
CLOUDINARY_CLOUD_NAME=tu_nombre_de_cloud
```

Ejecuta el servidor en modo desarrollo:

```sh
npm run dev
```

🌱 Poblar la base de datos
Utiliza los scripts de seeds para insertar datos iniciales:

```sh
npm run playersSeed
```

## 📡 Endpoints principales

**Autenticación**
MÉTODO | RUTA | DESCRIPCIÓN
| ------ | ------ | ------ |
POST | /api/v1/auth/register | Registro de nuevos usuarios |
POST | /api/v1/auth/login | Autenticación de acceso a usuarios ya registrados |

**Usuarios**
MÉTODO | RUTA | PERMISOS | DESCRIPCIÓN
| ------ | ------ | ------ | ------ |
GET | /api/v1/users | Admin | Lista todos los usuarios |
GET | /api/v1/users/:id | Admin | Obtiene un usuario por su ID |
PUT | /api/v1/users/:id | User | Actualiza un usuario existente |
PATCH | /api/v1/users/:id/remove-data-from-user-array | User | Borra elementos de los arrays |
PATCH | /api/v1/users/:id/role | Admin | Cambia el rol de un usuario |
DELETE | /api/v1/users/:id | User | Elimina un usuario (usuarios solo a sí mismos) |

**Jugadores**
MÉTODO | RUTA | PERMISOS | DESCRIPCIÓN
| ------ | ------ | ------ | ------ |
GET | /api/v1/players | User | Lista todos los jugadores |
GET | /api/v1/players/:id | User | Obtiene un jugador por su ID |
POST | /api/v1/players | Admin | Crea un nuevo jugador |
PUT | /api/v1/players/:id | Admin | Actualiza un jugador existente |
PATCH | /api/v1/players/:id/remove-data-from-player-array | Admin | Borra elementos de los arrays |
DELETE | /api/v1/players/:id | Admin | Elimina un jugador |

**Equipos**
MÉTODO | RUTA | PERMISOS | DESCRIPCIÓN
| ------ | ------ | ------ | ------ |
GET | /api/v1/teams | User | Lista todos los equipos |
GET | /api/v1/teams/:id | User | Obtiene un equipo por su ID |
POST | /api/v1/teams | User | Crea un nuevo equipo |
PUT | /api/v1/teams/:id | User | Actualiza un equipo existente |
PATCH | /api/v1/teams/:id/remove-data-from-team-array | User | Borra elementos de los arrays |
DELETE | /api/v1/teams/:id | User | Elimina un equipo |

## 🖼️ Gestión de imágenes

Las fotos de jugadores de la semilla se almacenan en la carpeta /assets como backup por si hay algún error con la ruta de la imagen en **Cloudinary**. Al crear o actualizar un recurso basado en esa semilla, la propiedad "imgURL" debe tener un valor como:

```sh
"imgURL": "/assets/players/trae_young.png"
```

Las imágenes de jugadores creados por el usuario, los avatares de los usuarios y los escudos de los equipos creados a través de los endpoints se gestionan mediante **Cloudinary**, usando el middleware de _Multer_.

Al enviar una petición POST o PUT a los endpoints correspondientes _players, teams o users_, puedes adjuntar una imagen como archivo en el campo imgURL (jugadores), avatarURL (usuarios) o shieldURL (equipos). Esta imagen será automáticamente subida a Cloudinary y se almacenará su URL pública en la base de datos (y eliminada cuando se modifica o borra desde un formulario).

✅ Recomendaciones

> Añade validaciones a los modelos para asegurar consistencia.
> No subas el archivo .env al repositorio.
> Usa populate() para mostrar referencias relacionadas en las respuestas (jugadores de un equipo, etc)

## 📬 Autor

```bash
Creado por Juanma "Goblin" Martínez como proyecto 7 de Rock-The-Code.
```
