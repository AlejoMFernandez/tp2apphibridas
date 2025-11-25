# 🚀 GOALDEMY - Comandos Rápidos

## Instalación Inicial

### Backend
```bash
cd c:\xampp\htdocs\ReactTP2\MiProyecto\back
npm install
```

### Frontend
```bash
cd c:\xampp\htdocs\ReactTP2\MiProyecto\front
npm install
```

## Ejecutar el Proyecto

### Iniciar Backend (Terminal 1)
```bash
cd c:\xampp\htdocs\ReactTP2\MiProyecto\back
npm run dev
```
✅ Backend corriendo en: http://localhost:2025

### Iniciar Frontend (Terminal 2)
```bash
cd c:\xampp\htdocs\ReactTP2\MiProyecto\front
npm run dev
```
✅ Frontend corriendo en: http://localhost:5173

## Orden de Inicio

1. **PRIMERO**: Iniciar el backend
2. **SEGUNDO**: Iniciar el frontend
3. **TERCERO**: Abrir el navegador en http://localhost:5173

## Credenciales de Prueba

Puedes crear una cuenta nueva o usar estas credenciales de prueba:

**Email**: `test@goaldemy.com`  
**Password**: `Test123!`

(Primero debes registrar esta cuenta en /register)

## Estructura de MongoDB

**Conexión**: mongodb+srv://admin:admin123@goaldemy.jaqeums.mongodb.net  
**Base de datos**: data  
**Colecciones**:
- usuarios (se crea automáticamente al registrar)
- tokens (se crea automáticamente al hacer login)
- teamsANDplayers (ya existe con datos)

## Rutas de la Aplicación

### Públicas
- `/login` - Iniciar sesión
- `/register` - Crear cuenta

### Privadas (requieren login)
- `/` - Home (Lista de equipos)
- `/teams/:id` - Detalle de equipo
- `/teams/new` - Crear nuevo equipo
- `/teams/edit/:id` - Editar equipo
- `/teams/delete/:id` - Eliminar equipo
- `/players` - Lista de jugadores
- `/players/:id` - Detalle de jugador

## Endpoints de la API

### Autenticación
```bash
POST http://localhost:2025/api/usuarios
POST http://localhost:2025/api/usuarios/login
```

### Teams (requieren token)
```bash
GET    http://localhost:2025/api/teams
GET    http://localhost:2025/api/teams/:id
POST   http://localhost:2025/api/teams
PATCH  http://localhost:2025/api/teams/:id
DELETE http://localhost:2025/api/teams/:id
```

### Players (requieren token)
```bash
GET http://localhost:2025/api/players
GET http://localhost:2025/api/players?club=Real%20Madrid
GET http://localhost:2025/api/players/:id
```

## Solución de Problemas

### Error: Cannot find module
```bash
# Reinstalar dependencias
cd back
rm -rf node_modules
npm install

cd ../front
rm -rf node_modules
npm install
```

### Error: Port already in use
```bash
# En Windows PowerShell, matar proceso en puerto 2025:
Get-Process -Id (Get-NetTCPConnection -LocalPort 2025).OwningProcess | Stop-Process

# Para puerto 5173 (frontend):
Get-Process -Id (Get-NetTCPConnection -LocalPort 5173).OwningProcess | Stop-Process
```

### Error: CORS
Verificar que el backend tenga configurado:
```javascript
const corsOptions = {
    origin: ["http://localhost:5173"],
    methods: "GET, POST, PUT, PATCH, DELETE"
}
```

### Error: Token inválido
1. Ir a DevTools → Application → Local Storage
2. Borrar "token" y "usuario"
3. Hacer login nuevamente

## Testing con Postman/Thunder Client

### 1. Registro
```
POST http://localhost:2025/api/usuarios
Content-Type: application/json

{
  "email": "test@test.com",
  "password": "Test123!",
  "passwordConfirm": "Test123!",
  "username": "Test User"
}
```

### 2. Login
```
POST http://localhost:2025/api/usuarios/login
Content-Type: application/json

{
  "email": "test@test.com",
  "password": "Test123!"
}
```

Copiar el `token` de la respuesta.

### 3. Obtener Teams (con token)
```
GET http://localhost:2025/api/teams
Authorization: Bearer TU_TOKEN_AQUI
```

## Verificar que todo funciona

✅ **Backend corriendo**: Ir a http://localhost:2025/api/teams (debe dar error 401 - sin token)  
✅ **Frontend corriendo**: Ir a http://localhost:5173 (debe redirigir a /login)  
✅ **MongoDB conectado**: Ver logs del backend, debe decir "Funcionando en el puerto 2025"  

## Build para Producción

### Backend
```bash
cd back
npm start
```

### Frontend
```bash
cd front
npm run build
npm run preview
```

## Comandos Git

```bash
# Inicializar repositorio
git init
git add .
git commit -m "Initial commit: GOALDEMY project"

# Subir a GitHub
git remote add origin URL_DE_TU_REPO
git branch -M main
git push -u origin main
```

---

**¡Todo listo! Tu proyecto GOALDEMY está funcionando correctamente.** ⚽
