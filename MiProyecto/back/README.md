# GOALDEMY Backend

API REST para la gestión de equipos y jugadores de la Champions League 2024.

## Instalación

```bash
npm install
```

## Ejecutar en desarrollo

```bash
npm run dev
```

## Ejecutar en producción

```bash
npm start
```

## Endpoints

### Autenticación
- POST `/api/usuarios` - Registro de usuario
- POST `/api/usuarios/login` - Inicio de sesión

### Teams (requiere autenticación)
- GET `/api/teams` - Obtener todos los equipos
- GET `/api/teams/:id` - Obtener un equipo por ID
- POST `/api/teams` - Crear un nuevo equipo
- PATCH `/api/teams/:id` - Editar un equipo
- DELETE `/api/teams/:id` - Eliminar un equipo

### Players (requiere autenticación)
- GET `/api/players` - Obtener todos los jugadores
- GET `/api/players/:id` - Obtener un jugador por ID
- POST `/api/players` - Crear un nuevo jugador
- PATCH `/api/players/:id` - Editar un jugador
- DELETE `/api/players/:id` - Eliminar un jugador
