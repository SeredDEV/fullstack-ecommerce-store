# 🛒 Full Stack E-commerce Store

Una aplicación completa de e-commerce desarrollada con React 19, Node.js, TypeScript, MongoDB y Redis, completamente dockerizada.

## 🏗️ Arquitectura

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Client  │    │  Express Server │    │    MongoDB      │
│   (Frontend)    │ ── │   (Backend)     │ ── │   (Database)    │
│   Port: 3000    │    │   Port: 5000    │    │   Port: 27017   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                    ┌─────────────────┐
                    │      Redis      │
                    │     (Cache)     │
                    │   Port: 6379    │
                    └─────────────────┘
```

## 🚀 Inicio Rápido

### Prerequisitos
- Docker y Docker Compose instalados
- Make (opcional, pero recomendado)

### Levantar toda la aplicación
```bash
# Opción 1: Con Make (recomendado)
make up

# Opción 2: Con Docker Compose directamente
docker-compose up -d
```

### URLs de Acceso
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health
- **MongoDB Admin**: http://localhost:8081 (admin/admin123)
- **Redis Admin**: http://localhost:8001

## 🛠️ Comandos Disponibles

### Con Make
```bash
make help          # Ver todos los comandos disponibles
make build         # Construir todas las imágenes
make up            # Levantar todos los servicios
make down          # Detener todos los servicios
make restart       # Reiniciar servicios
make logs          # Ver logs en tiempo real
make clean         # Limpiar contenedores e imágenes
make check         # Verificar estado de servicios
```

### Servicios Individuales
```bash
make server        # Solo backend + bases de datos
make client        # Solo frontend
make db            # Solo MongoDB y Redis
make admin         # Solo interfaces de administración
```

### Con Docker Compose
```bash
docker-compose up -d                    # Levantar todos los servicios
docker-compose up -d server mongodb    # Solo servicios específicos
docker-compose down                     # Detener servicios
docker-compose logs -f server           # Ver logs de un servicio
docker-compose ps                       # Ver estado de servicios
```

## 📦 Servicios Incluidos

### 🎨 Frontend (React 19 + TypeScript)
- **Puerto**: 3000
- **Tecnologías**: React 19, TypeScript, Vite
- **Características**: Hot reload, proxy automático a API

### 🔧 Backend (Node.js + Express + TypeScript)
- **Puerto**: 5000
- **Tecnologías**: Node.js, Express, TypeScript, Zod
- **Características**: API REST, autenticación JWT, validaciones

### 🗄️ MongoDB
- **Puerto**: 27017
- **Características**: Base de datos principal, índices optimizados
- **Datos iniciales**: Usuarios y productos de prueba
- **Admin UI**: Mongo Express en puerto 8081

### 💾 Redis
- **Puerto**: 6379
- **Características**: Cache, sesiones, rate limiting
- **Admin UI**: RedisInsight en puerto 8001

## 🔐 Credenciales por Defecto

### MongoDB
- **Root User**: admin / password123
- **App User**: app_user / app_password123

### Mongo Express (Admin UI)
- **Usuario**: admin / admin123

### Redis
- **Password**: redis123

### Usuarios de Prueba (en la app)
- **Admin**: admin@fullstack.com / admin123
- **Usuario**: usuario@fullstack.com / user123

## 🧪 Testing

```bash
# Probar endpoints
curl http://localhost:5000/health
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@fullstack.com", "password": "admin123", "userType": "admin"}'
```

## 🔧 Desarrollo

### Modo Desarrollo con Hot Reload
```bash
# Con Make
make dev

# Con Docker Compose
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

### Estructura del Proyecto
```
├── client/                 # Frontend React
│   ├── src/
│   ├── Dockerfile
│   ├── Dockerfile.dev
│   └── nginx.conf
├── server/                 # Backend Node.js
│   ├── src/
│   │   ├── routes/        # Rutas organizadas por módulos
│   │   ├── services/      # Lógica de negocio
│   │   └── lib/           # Framework personalizado
│   ├── Dockerfile
│   └── Dockerfile.dev
├── docker/                 # Configuración Docker
│   └── mongodb/init/      # Scripts de inicialización
├── docker-compose.yml      # Configuración principal
├── docker-compose.dev.yml  # Override para desarrollo
├── Makefile               # Comandos automatizados
└── README.md
```

## 🌍 Variables de Entorno

Copiar `.env.example` a `.env` y ajustar los valores:

```bash
cp .env.example .env
```

## 📝 API Endpoints

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registrar usuario

### Información
- `GET /health` - Health check
- `GET /` - Información de la API

## 🚨 Troubleshooting

### Problemas Comunes

**Puerto ocupado**
```bash
# Ver qué proceso usa el puerto
lsof -i :3000
lsof -i :5000

# Detener servicios
make down
```

**Limpiar todo y empezar de nuevo**
```bash
make clean
make build
make up
```

**Ver logs de errores**
```bash
make logs
# O para un servicio específico:
docker-compose logs server
```

## 🔄 Actualización

```bash
# Reconstruir imágenes después de cambios
make build

# Actualizar servicios específicos
docker-compose up -d --build server
```

## 📊 Monitoreo

- **Estado de servicios**: `make check`
- **Logs en tiempo real**: `make logs`
- **Métricas Redis**: http://localhost:8001
- **Datos MongoDB**: http://localhost:8081

---

## 🤝 Contribuir

1. Fork el proyecto
2. Crear rama para feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver archivo LICENSE.md para detalles.
