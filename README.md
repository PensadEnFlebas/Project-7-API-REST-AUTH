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
│ ├── config/ → Configuración del servidor y entorno
│ ├── db/ → Conexión a MongoDB
│ └── utils/
│ └── seeds/ → Scripts para poblar la base de datos inicial de jugadores (recomendado no subir a Git)
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
- **Insomnia** cliente HTTP para testear endpoints de forma rápida y visual.

---

## 🔐 Autenticación y seguridad

Se utiliza **bcrypt** para encriptar las contraseñas de los usuarios y garantizar que no se almacenen en texto plano.

La autenticación se gestiona mediante **JSON Web Tokens (JWT)**, asegurando que solo usuarios autenticados puedan acceder a rutas protegidas.

Los **middlewares de autenticación** verifican la validez del _token_ y el _rol del usuario_ (usuario o administrador) para controlar el acceso a recursos y acciones sensibles, como modificar roles o eliminar usuarios.

Los usuarios solo pueden crearse con rol user por defecto, y el primer admin se crea directamente en la base de datos.

Los administradores pueden promover usuarios a admin y eliminar usuarios, mientras que los usuarios pueden eliminar su propia cuenta.

---

## 📦 Requisitos para el entorno

Tener **Node.js** instalado

Tener una cuenta en **MongoDB Atlas** (si se quiere conectar a la base de datos remota)

Recomendado: tener instalado **Insomnia** o **Postman** para testear las rutas

---

## 🔧 Instalación y uso

```bash
Primero **Clona el repositorio**:
git clone https://github.com/PensadEnFlebas/Project-7-API-REST-AUTH
cd Project-7-API-REST-AUTH

Instala las dependencias:
npm install

Crea un archivo .env en la raíz del proyecto:
PORT=3000   # opcional
DB_URL=mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/nbafantasy

Ejecuta el servidor en modo desarrollo:
npm run dev

🌱 Poblar la base de datos
Utiliza los scripts de seeds para insertar datos iniciales:

npm run playersSeed

📡 Endpoints principales

Jugadores
GET /api/players — Lista todos los jugadores.

GET /api/players/:id — Obtiene un jugador por su ID.

POST /api/players — Crea un nuevo jugador.

PUT /api/players/:id — Actualiza un jugador existente.

DELETE /api/players/:id — Elimina un jugador.

Equipos
GET /api/teams — Lista todos los equipos.

GET /api/teams/:id — Obtiene un equipo por su ID.

POST /api/teams — Crea un nuevo equipo.

PUT /api/teams/:id — Actualiza un equipo existente.

DELETE /api/teams/:id — Elimina un equipo.

Usuarios
GET /api/users — Lista todos los usuarios (solo admins).

GET /api/users/:id — Obtiene un usuario por su ID.

POST /api/users — Crea un nuevo usuario (rol siempre user).

PUT /api/users/:id — Actualiza un usuario existente (solo admins o el mismo usuario).

DELETE /api/users/:id — Elimina un usuario (admins pueden eliminar a otros, usuarios solo a sí mismos).

PATCH /api/users/:id/role — Cambia el rol de un usuario (solo admins).

🖼️ Gestión de imágenes
Las fotos de jugadores se almacenan en la carpeta /assets. Al crear o actualizar un recurso, la propiedad "imgURL" debe tener un valor como:

"imgURL": "/assets/players/trae_young.png"

✅ Recomendaciones
Añade validaciones a los modelos para asegurar consistencia.

No subas el archivo .env al repositorio.

Usa populate() para mostrar referencias relacionadas en las respuestas (jugadores de un equipo, etc)

📬 Autor
Creado por Juanma "Goblin" Martínez como proyecto 7 de Rock-The-Code.
```
