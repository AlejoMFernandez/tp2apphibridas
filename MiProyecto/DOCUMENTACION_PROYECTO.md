# GOALDEMY - Documentación del Proyecto
## Segundo Parcial - Desarrollo de Aplicación Completa

---

## 1. Introducción

**GOALDEMY** es una aplicación full stack desarrollada para gestionar equipos y jugadores de la Champions League 2024. La aplicación permite a usuarios autenticados realizar operaciones CRUD sobre equipos y visualizar información detallada de jugadores.

### Objetivo del Proyecto

Desarrollar una aplicación completa que cumpla con los siguientes requisitos:
- Sistema de autenticación con JWT
- Backend con arquitectura de capas (Router, Controller, Service, Middleware)
- Frontend con React utilizando Context API y React Router
- Base de datos MongoDB
- Validación de datos en frontend y backend

---

## 2. Arquitectura de la Aplicación

### Estructura General

```
GOALDEMY/
├── back/           # Backend API REST
│   ├── api/        # Controladores y rutas de la API
│   ├── services/   # Lógica de negocio
│   ├── middleware/ # Middlewares de validación
│   ├── schemas/    # Esquemas de validación
│   └── server.js   # Punto de entrada
│
└── front/          # Frontend React
    ├── src/
    │   ├── components/   # Componentes reutilizables
    │   ├── contexts/     # Context API
    │   ├── services/     # Servicios API
    │   ├── pages/        # Páginas de la app
    │   └── main.jsx      # Punto de entrada
    └── package.json
```

### Arquitectura Backend

El backend sigue una arquitectura de **capas separadas**:

1. **Capa de Rutas (Router)**
   - Define los endpoints de la API
   - Aplica middlewares de validación
   - Asocia rutas con controladores

2. **Capa de Controladores (Controller)**
   - Maneja las peticiones HTTP
   - Extrae datos de req.body, req.params, req.query
   - Llama a los servicios
   - Envía respuestas HTTP

3. **Capa de Servicios (Service)**
   - Contiene la lógica de negocio
   - Interactúa con la base de datos
   - Procesa y transforma datos

4. **Capa de Middleware**
   - Valida tokens JWT
   - Valida esquemas de datos
   - Maneja errores

### Arquitectura Frontend

El frontend utiliza **React 19** con las siguientes características:

- **React Router DOM**: Navegación entre páginas
- **Context API**: Estado global de autenticación
- **Hooks personalizados**: useToken, useUsuario, useLogin, useLogout
- **Componentes funcionales**: Todos los componentes son funcionales
- **Servicios API**: Capa de abstracción para llamadas al backend

---

## 3. Entidades del Sistema

### 3.1 Usuario

**Campos:**
- `_id`: ObjectId (MongoDB)
- `email`: String (único, requerido)
- `password`: String (encriptado con bcrypt)
- `username`: String (opcional)
- `createdAt`: Date

**Funcionalidad:**
- Autenticación con JWT
- Registro con validación de contraseña
- Inicio de sesión

### 3.2 Team (Equipo)

**Campos:**
- `_id`: ObjectId
- `name`: String (nombre completo)
- `shortName`: String (nombre corto)
- `logo`: String (URL del logo)
- `stadium`: String (estadio)
- `country`: String (país)
- `founded`: Number (año de fundación)
- `squad`: Array (plantilla de jugadores)
- `eliminado`: Boolean (soft delete)

**Operaciones:**
- Crear equipo
- Listar equipos
- Ver detalle de equipo
- Editar equipo
- Eliminar equipo (soft delete)

### 3.3 Player (Jugador)

**Campos:**
- `id`: Number (ID del jugador)
- `name`: String (nombre)
- `cname`: String (nombre corto)
- `role`: String (rol en el equipo)
- `nationality`: String (nacionalidad)
- `age`: Number (edad)
- `height`: String (altura)
- `foot`: String (pie hábil)
- `club`: String (equipo)
- `posicion`: String (posición en el campo)

**Operaciones:**
- Listar jugadores
- Filtrar por equipo
- Ver detalle de jugador

---

## 4. Autenticación y Autorización con JWT

### 4.1 Flujo de Registro

1. **Cliente**: Envía datos de registro (email, password, passwordConfirm)
2. **Middleware de Validación**: Valida con Yup
   - Email válido
   - Password: 8-16 caracteres, 1 número, 1 mayúscula, 1 especial (@$!%*?&)
   - Passwords coinciden
3. **Service**: 
   - Verifica que el email no exista
   - Encripta password con bcrypt (10 rounds)
   - Guarda usuario en MongoDB
4. **Respuesta**: Usuario sin contraseña

### 4.2 Flujo de Login

1. **Cliente**: Envía email y password
2. **Service**:
   - Busca usuario por email
   - Compara password con bcrypt.compare()
   - Genera token JWT con jsonwebtoken
   - Guarda token en colección "tokens"
3. **Respuesta**: Usuario + token JWT

### 4.3 Protección de Rutas

**Middleware `validateToken`:**

```javascript
1. Extrae header Authorization
2. Verifica formato: "Bearer <token>"
3. Verifica token con jwt.verify()
4. Verifica que el token exista en la BD
5. Verifica que no haya expirado
6. Adjunta usuario a req.usuario
7. Llama next()
```

**Todas las rutas de teams y players están protegidas.**

### 4.4 Persistencia de Sesión

- Token se guarda en `localStorage`
- Usuario se guarda en `localStorage`
- Context API mantiene el estado sincronizado
- ProtectedRoute verifica token antes de renderizar

---

## 5. Validación de Datos

### 5.1 Backend (Yup)

**Schema de Usuario:**
```javascript
{
  email: string().email().required(),
  password: string()
    .min(8).max(16)
    .matches(/[0-9]/)      // Al menos 1 número
    .matches(/[A-Z]/)      // Al menos 1 mayúscula
    .matches(/[@$!%*?&]/), // Al menos 1 especial
  passwordConfirm: oneOf([ref("password")])
}
```

### 5.2 Frontend

- Validación de campos requeridos con HTML5
- Validación de formato de email
- Mensajes de error del backend
- Feedback visual en formularios

---

## 6. Base de Datos MongoDB

**Conexión:** `mongodb+srv://admin:admin123@goaldemy.jaqeums.mongodb.net`

**Base de datos:** `data`

### Colecciones:

#### usuarios
```json
{
  "_id": ObjectId,
  "email": "usuario@mail.com",
  "password": "$2b$10$...",
  "username": "Usuario",
  "createdAt": ISODate
}
```

#### tokens
```json
{
  "_id": ObjectId,
  "usuarioId": ObjectId,
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### teamsANDplayers
```json
{
  "_id": ObjectId,
  "id": 9825,
  "name": "Real Madrid",
  "shortName": "Real Madrid",
  "logo": "https://...",
  "squad": [
    {
      "title": "Porteros",
      "members": [
        {
          "id": 447939,
          "name": "Thibaut Courtois",
          "age": 32,
          ...
        }
      ]
    }
  ]
}
```

---

## 7. Endpoints de la API

### Autenticación

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | /api/usuarios | Registro de usuario | No |
| POST | /api/usuarios/login | Inicio de sesión | No |

### Teams

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | /api/teams | Listar equipos | Sí |
| GET | /api/teams/:id | Obtener equipo | Sí |
| POST | /api/teams | Crear equipo | Sí |
| PATCH | /api/teams/:id | Editar equipo | Sí |
| DELETE | /api/teams/:id | Eliminar equipo | Sí |
| PUT | /api/teams/:id | Reemplazar equipo | Sí |

### Players

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | /api/players | Listar jugadores | Sí |
| GET | /api/players?club=X | Filtrar por club | Sí |
| GET | /api/players/:id | Obtener jugador | Sí |

---

## 8. Tecnologías Utilizadas

### Backend
- **Node.js**: Runtime de JavaScript
- **Express 5.1.0**: Framework web
- **MongoDB**: Base de datos NoSQL
- **JWT**: Autenticación con tokens
- **Bcrypt**: Encriptación de contraseñas
- **Yup**: Validación de esquemas
- **CORS**: Control de acceso

### Frontend
- **React 19**: Librería UI
- **React Router DOM 7**: Enrutamiento
- **Vite**: Build tool
- **Context API**: Estado global
- **Fetch API**: Peticiones HTTP
- **CSS3**: Estilos

### DevOps
- **Nodemon**: Desarrollo backend
- **ESLint**: Linting
- **Git**: Control de versiones

---

## 9. Capturas de Pantalla

### Página de Login
![Login](capturas/login.png)
- Formulario de inicio de sesión
- Validación de campos
- Link a registro

### Página de Registro
![Registro](capturas/registro.png)
- Formulario de registro
- Validación de contraseña
- Mensajes de error

### Home - Lista de Teams
![Teams](capturas/teams.png)
- Grid de equipos
- Logo, nombre y datos
- Acciones: Ver, Editar, Eliminar

### Detalle de Team
![Team Detail](capturas/team-detail.png)
- Información completa del equipo
- Plantilla organizada por posición
- Lista de jugadores

### Lista de Players
![Players](capturas/players.png)
- Grid de jugadores
- Imagen del jugador
- Filtro por equipo
- Información básica

### Detalle de Player
![Player Detail](capturas/player-detail.png)
- Imagen grande del jugador
- Estadísticas completas
- Información del club

---

## 10. Funcionalidades Implementadas

### ✅ Autenticación
- [x] Registro de usuarios
- [x] Validación robusta de contraseñas
- [x] Encriptación con bcrypt
- [x] Login con JWT
- [x] Persistencia de sesión
- [x] Protección de rutas

### ✅ Gestión de Teams
- [x] Listar todos los equipos
- [x] Ver detalle de equipo
- [x] Crear nuevo equipo
- [x] Editar equipo
- [x] Eliminar equipo (soft delete)
- [x] Validación de datos

### ✅ Gestión de Players
- [x] Listar todos los jugadores
- [x] Filtrar por equipo
- [x] Ver detalle de jugador
- [x] Imágenes de jugadores

### ✅ Interfaz de Usuario
- [x] Diseño responsive
- [x] Navegación intuitiva
- [x] Feedback visual
- [x] Manejo de errores
- [x] Loading states

---

## 11. Seguridad Implementada

1. **Contraseñas Encriptadas**
   - Bcrypt con 10 rounds
   - Nunca se almacenan en texto plano
   - Nunca se envían en las respuestas

2. **Tokens JWT**
   - Firmados con clave secreta
   - Expiración de 2 horas
   - Almacenados en la BD
   - Validados en cada petición

3. **Validación de Datos**
   - Backend: Yup schemas
   - Frontend: HTML5 + custom
   - Sanitización de inputs

4. **CORS**
   - Origen específico permitido
   - Métodos HTTP controlados

5. **Middleware de Autorización**
   - Todas las rutas privadas protegidas
   - Verificación de token en cada request
   - Manejo de errores de autorización

---

## 12. Instrucciones de Instalación

### Requisitos Previos
- Node.js 18+
- npm o yarn
- MongoDB (cuenta en MongoDB Atlas)

### Instalación Backend

```bash
cd MiProyecto/back
npm install
npm run dev
```

El servidor correrá en `http://localhost:2025`

### Instalación Frontend

```bash
cd MiProyecto/front
npm install
npm run dev
```

La aplicación correrá en `http://localhost:5173`

### Variables de Entorno

**Backend**: No requiere archivo .env (credenciales hardcoded para el proyecto)

**Frontend**: `.env`
```
VITE_URL_API=http://localhost:2025/api/
```

---

## 13. Pruebas de Funcionalidad

### Test de Registro
1. Ir a `/register`
2. Ingresar email válido
3. Ingresar password: `Password123!`
4. Confirmar password
5. Click en "Registrarse"
6. **Resultado esperado**: Redirección a login

### Test de Login
1. Ir a `/login`
2. Ingresar credenciales registradas
3. Click en "Ingresar"
4. **Resultado esperado**: Redirección a home con lista de teams

### Test de CRUD Teams
1. Ver lista de teams en home
2. Click en "Nuevo Equipo"
3. Llenar formulario
4. **Resultado esperado**: Equipo creado y visible en lista

### Test de Players
1. Click en "Players" en navbar
2. Ver lista de jugadores
3. Ingresar nombre de equipo en filtro
4. Click en un jugador
5. **Resultado esperado**: Ver detalle completo del jugador

---

## 14. Conclusiones

GOALDEMY es una aplicación full stack completa que implementa:

- ✅ **Arquitectura de capas** en el backend
- ✅ **Autenticación segura** con JWT y bcrypt
- ✅ **Validación de datos** en ambos lados
- ✅ **Estado global** con Context API
- ✅ **Enrutamiento protegido** con React Router
- ✅ **Interfaz responsive** y moderna
- ✅ **Consumo de API REST** desde el frontend

El proyecto sigue las **prácticas enseñadas por el profesor** y cumple con todos los requisitos del segundo parcial.

---

## 15. Autor

**Proyecto**: GOALDEMY  
**Curso**: Desarrollo de Aplicaciones Web  
**Fecha**: Noviembre 2024  
**Temática**: Fútbol - Champions League 2024

---

## 16. Repositorio

El código completo está disponible en:
- Carpeta: `c:\xampp\htdocs\ReactTP2\MiProyecto`
- Backend: `MiProyecto/back`
- Frontend: `MiProyecto/front`

---

**Fin de la Documentación**
