# GOALDEMY ⚽

Aplicación full stack para la gestión de equipos y jugadores de la Champions League 2024.

## Descripción

GOALDEMY es una aplicación completa que permite a los usuarios autenticados gestionar información sobre equipos de fútbol y sus jugadores. La aplicación cuenta con:

- **Autenticación y Registro**: Sistema completo de registro e inicio de sesión con JWT
- **Gestión de Teams**: CRUD completo para equipos de fútbol
- **Gestión de Players**: Visualización y gestión de jugadores
- **Arquitectura Full Stack**: Backend con Node.js/Express y Frontend con React

## Tecnologías Utilizadas

### Backend
- Node.js
- Express 5.1.0
- MongoDB con Mongoose
- JWT (jsonwebtoken) para autenticación
- Bcrypt para encriptación de contraseñas
- Yup para validación de datos
- CORS

### Frontend
- React 19
- React Router DOM 7
- Vite como build tool
- CSS moderno

## Estructura del Proyecto

```
MiProyecto/
├── back/                       # Backend API REST
│   ├── api/
│   │   ├── controllers/        # Controladores de la API
│   │   │   ├── controller.api.usuarios.js
│   │   │   ├── controller.api.teams.js
│   │   │   └── controller.api.players.js
│   │   └── routes/            # Rutas de la API
│   │       ├── usuarios.routes.js
│   │       ├── teams.api.routes.js
│   │       └── players.api.routes.js
│   ├── services/              # Lógica de negocio
│   │   ├── usuarios.service.js
│   │   ├── token.service.js
│   │   ├── teams.service.js
│   │   └── players.service.js
│   ├── middleware/            # Middlewares
│   │   ├── token.validate.middleware.js
│   │   └── usuarios.validate.middleware.js
│   ├── schemas/               # Esquemas de validación
│   │   └── usuarios.js
│   ├── server.js             # Punto de entrada
│   └── package.json
│
└── front/                     # Frontend React
    ├── src/
    │   ├── components/        # Componentes reutilizables
    │   │   ├── Layout.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── contexts/          # Context API
    │   │   └── session.context.jsx
    │   ├── services/          # Servicios para consumo de API
    │   │   ├── api.service.js
    │   │   ├── auth.services.js
    │   │   ├── teams.service.js
    │   │   └── players.service.js
    │   ├── pages/             # Páginas de la aplicación
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Home.jsx
    │   │   ├── TeamDetail.jsx
    │   │   ├── Players.jsx
    │   │   └── PlayerDetail.jsx
    │   ├── main.jsx          # Punto de entrada
    │   └── App.jsx
    └── package.json

```

## Instalación y Configuración

### Backend

1. Navegar a la carpeta del backend:
```bash
cd back
```

2. Instalar dependencias:
```bash
npm install
```

3. Ejecutar en modo desarrollo:
```bash
npm run dev
```

El backend estará corriendo en `http://localhost:2025`

### Frontend

1. Navegar a la carpeta del frontend:
```bash
cd front
```

2. Instalar dependencias:
```bash
npm install
```

3. Ejecutar en modo desarrollo:
```bash
npm run dev
```

El frontend estará corriendo en `http://localhost:5173`

## Arquitectura de la Aplicación

### Backend - API REST

La API sigue una arquitectura de capas:

1. **Router**: Define las rutas y aplica middlewares
2. **Controller**: Maneja las peticiones HTTP y respuestas
3. **Service**: Contiene la lógica de negocio y conexión a BD
4. **Middleware**: Valida tokens JWT y datos de entrada

### Autenticación y Autorización con JWT

#### Proceso de Registro:
1. Usuario envía email, password y confirmación
2. Se valida el schema con Yup (8-16 caracteres, 1 número, 1 mayúscula, 1 especial)
3. Se encripta la contraseña con bcrypt (10 rounds)
4. Se guarda el usuario en MongoDB
5. Se retorna el usuario sin la contraseña

#### Proceso de Login:
1. Usuario envía email y password
2. Se busca el usuario en la BD
3. Se compara la contraseña con bcrypt
4. Se genera un token JWT (válido por 2 horas)
5. Se guarda el token en la colección "tokens"
6. Se retorna el usuario con el token

#### Protección de Rutas:
- Todas las rutas de teams y players requieren token JWT
- El middleware `validateToken` verifica:
  - Que el header `Authorization` exista
  - Que tenga formato `Bearer <token>`
  - Que el token sea válido
  - Que no haya expirado
  - Que exista en la BD

### Frontend - React

#### Context API:
- `SessionContext`: Maneja el estado global de autenticación
  - Almacena usuario y token en localStorage
  - Provee funciones `onLogin` y `onLogout`
  - Hooks personalizados: `useToken()`, `useUsuario()`, `useLogin()`, `useLogout()`

#### React Router:
- Rutas públicas: `/login`, `/register`
- Rutas protegidas: Todo lo demás (requiere token)
- `ProtectedRoute`: Componente que verifica autenticación

#### Servicios:
- `api.service.js`: Función base para llamadas fetch con token
- `auth.services.js`: Login y registro
- `teams.service.js`: CRUD de equipos
- `players.service.js`: CRUD de jugadores

## Endpoints de la API

### Autenticación

#### Registro de Usuario
```
POST /api/usuarios
Body: {
  "email": "usuario@mail.com",
  "password": "Password123!",
  "passwordConfirm": "Password123!",
  "username": "Usuario" (opcional)
}
```

#### Inicio de Sesión
```
POST /api/usuarios/login
Body: {
  "email": "usuario@mail.com",
  "password": "Password123!"
}
Response: {
  "_id": "...",
  "email": "usuario@mail.com",
  "token": "jwt_token..."
}
```

### Teams (Requieren autenticación)

```
GET    /api/teams              # Listar todos los equipos
GET    /api/teams/:id          # Obtener un equipo por ID
POST   /api/teams              # Crear nuevo equipo
PATCH  /api/teams/:id          # Editar equipo
DELETE /api/teams/:id          # Eliminar equipo (soft delete)
PUT    /api/teams/:id          # Reemplazar equipo completo
```

### Players (Requieren autenticación)

```
GET    /api/players            # Listar todos los jugadores
GET    /api/players/:id        # Obtener jugador por ID
POST   /api/players            # Crear nuevo jugador
PATCH  /api/players/:id        # Editar jugador
DELETE /api/players/:id        # Eliminar jugador
PUT    /api/players/:id        # Reemplazar jugador
```

## Base de Datos

### MongoDB Atlas
- **Conexión**: `mongodb+srv://admin:admin123@goaldemy.jaqeums.mongodb.net`
- **Base de datos**: `data`

### Colecciones:

1. **usuarios**
   - email (único)
   - password (encriptado)
   - username (opcional)
   - createdAt

2. **tokens**
   - usuarioId
   - token
   - Almacena sesiones activas

3. **teamsANDplayers**
   - Equipos con sus plantillas de jugadores
   - squad: array de posiciones con jugadores

## Funcionalidades Principales

### ✅ Sistema de Autenticación
- Registro con validación robusta de contraseñas
- Login con JWT
- Persistencia de sesión en localStorage
- Protección de rutas privadas

### ✅ Gestión de Teams
- Listar todos los equipos
- Ver detalle de equipo con plantilla completa
- Crear nuevos equipos
- Editar información de equipos
- Eliminar equipos (soft delete)

### ✅ Gestión de Players
- Listar todos los jugadores
- Filtrar jugadores por equipo
- Ver detalle completo de jugador
- Imágenes de jugadores desde FotMob

### ✅ Interfaz Responsive
- Diseño moderno y limpio
- Cards para equipos y jugadores
- Navegación intuitiva
- Feedback visual en todas las acciones

## Seguridad

- ✅ Contraseñas encriptadas con bcrypt
- ✅ Tokens JWT con expiración
- ✅ Validación de datos en backend con Yup
- ✅ Middleware de autorización en todas las rutas protegidas
- ✅ CORS configurado para origen específico
- ✅ Validación de formato de token (Bearer)

## Autor

Proyecto desarrollado para el Segundo Parcial - Desarrollo de Aplicación Completa

## Notas

- Los datos de equipos y jugadores provienen de una base de datos real de la Champions League 2024
- Las imágenes de jugadores se cargan desde FotMob API
- El proyecto sigue las prácticas enseñadas por el profesor en el ejemplo proporcionado
