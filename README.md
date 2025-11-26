# GOALDEMY ⚽

Aplicación full stack para la gestión de equipos y jugadores de la Champions League 2024.

## Descripción

GOALDEMY es una aplicación completa que permite a los usuarios autenticados gestionar información sobre equipos de fútbol y sus jugadores. La aplicación cuenta con:

##
## 🚀 Cómo Inicializar el Proyecto
##

### Paso 1: Backend

```bash
# Navegar al backend
cd back

# Instalar dependencias
npm install

# Ejecutar servidor
node server.js
```

**El backend estará corriendo en:** `http://localhost:2025`

### Paso 2: Frontend (en otra terminal)

```bash
# Navegar al frontend
cd front

# Instalar dependencias
npm install

# Ejecutar aplicación
npm run dev
```

**El frontend estará corriendo en:** `http://localhost:5173`

### ✅ ¡Listo!
Abre tu navegador en `http://localhost:5173` y comienza a usar GOALDEMY.


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


## Notas

- Los datos de equipos y jugadores provienen de una base de datos real de la Champions League 2024
- Las imágenes de jugadores se cargan desde FotMob API
- El proyecto sigue las prácticas enseñadas por el profesor en el ejemplo proporcionado
