# Makefile para gestión del proyecto Full Stack Store

# Variables
COMPOSE_FILE = docker-compose.yml
PROJECT_NAME = fullstack-store

# Comandos principales
.PHONY: help build up down restart logs clean

# Mostrar ayuda
help:
	@echo "🚀 Full Stack Store - Comandos Docker"
	@echo ""
	@echo "Comandos disponibles:"
	@echo "  make build     - Construir todas las imágenes"
	@echo "  make up        - Levantar todos los servicios"
	@echo "  make down      - Detener todos los servicios"
	@echo "  make restart   - Reiniciar todos los servicios"
	@echo "  make logs      - Ver logs de todos los servicios"
	@echo "  make clean     - Limpiar contenedores e imágenes"
	@echo ""
	@echo "Servicios individuales:"
	@echo "  make server    - Solo servidor backend"
	@echo "  make client    - Solo cliente frontend"
	@echo "  make db        - Solo bases de datos (MongoDB + Redis)"
	@echo "  make admin     - Solo interfaces de administración"
	@echo ""
	@echo "Desarrollo:"
	@echo "  make dev       - Modo desarrollo con hot reload"
	@echo "  make test      - Ejecutar pruebas"
	@echo "  make check     - Verificar estado de servicios"

# Construir todas las imágenes
build:
	@echo "🔨 Construyendo imágenes Docker..."
	docker-compose -f $(COMPOSE_FILE) build --no-cache

# Levantar todos los servicios
up:
	@echo "🚀 Levantando todos los servicios..."
	docker-compose -f $(COMPOSE_FILE) up -d
	@echo "✅ Servicios disponibles:"
	@echo "   🌐 Frontend:      http://localhost:5001"
	@echo "   🔗 API Backend:   http://localhost:5000"
	@echo "   🗄️  MongoDB Admin: http://localhost:8081"
	@echo "   💾 Redis Admin:   http://localhost:8001"

# Detener todos los servicios
down:
	@echo "🛑 Deteniendo todos los servicios..."
	docker-compose -f $(COMPOSE_FILE) down

# Reiniciar todos los servicios
restart: down up

# Ver logs de todos los servicios
logs:
	docker-compose -f $(COMPOSE_FILE) logs -f

# Limpiar contenedores e imágenes
clean:
	@echo "🧹 Limpiando contenedores e imágenes..."
	docker-compose -f $(COMPOSE_FILE) down -v --rmi all
	docker system prune -f

# Solo servidor backend
server:
	@echo "🔧 Levantando solo el servidor y dependencias..."
	docker-compose -f $(COMPOSE_FILE) up -d mongodb redis server

# Solo cliente frontend
client:
	@echo "🎨 Levantando solo el cliente..."
	docker-compose -f $(COMPOSE_FILE) up -d client

# Solo bases de datos
db:
	@echo "🗄️ Levantando solo las bases de datos..."
	docker-compose -f $(COMPOSE_FILE) up -d mongodb redis

# Solo interfaces de administración
admin:
	@echo "⚙️ Levantando interfaces de administración..."
	docker-compose -f $(COMPOSE_FILE) up -d mongo-express redis-insight

# Modo desarrollo
dev:
	@echo "🔧 Iniciando modo desarrollo..."
	docker-compose -f $(COMPOSE_FILE) -f docker-compose.dev.yml up

# Verificar estado de servicios
check:
	@echo "📊 Estado de los servicios:"
	@docker-compose -f $(COMPOSE_FILE) ps
	@echo ""
	@echo "🌐 URLs de acceso:"
	@echo "Frontend:      http://localhost:5001"
	@echo "API Backend:   http://localhost:5000"
	@echo "Health Check:  http://localhost:5000/health"
	@echo "MongoDB Admin: http://localhost:8081 (admin/admin123)"
	@echo "Redis Admin:   http://localhost:8001"

# Ejecutar pruebas
test:
	@echo "🧪 Ejecutando pruebas..."
	docker-compose -f $(COMPOSE_FILE) exec server npm test

# Instalar dependencias
install:
	@echo "📦 Instalando dependencias..."
	docker-compose -f $(COMPOSE_FILE) exec server npm install
	docker-compose -f $(COMPOSE_FILE) exec client npm install
