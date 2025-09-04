#!/bin/bash

# 🚀 Script de instalación rápida para Full Stack Store
# Autor: Generado por GitHub Copilot
# Descripción: Instala y configura toda la aplicación con Docker

set -e

echo "🛒 Full Stack E-commerce Store - Instalación Rápida"
echo "=================================================="

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para imprimir mensajes coloreados
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Verificar si Docker está instalado
if ! command -v docker &> /dev/null; then
    print_error "Docker no está instalado. Por favor instalar Docker primero."
    echo "Visita: https://docs.docker.com/get-docker/"
    exit 1
fi

# Verificar si Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose no está instalado. Por favor instalar Docker Compose primero."
    echo "Visita: https://docs.docker.com/compose/install/"
    exit 1
fi

print_status "Docker y Docker Compose están instalados"

# Verificar si el puerto 5001 está ocupado
if lsof -Pi :5001 -sTCP:LISTEN -t >/dev/null 2>&1; then
    print_warning "Puerto 5001 está ocupado. ¿Continuar? (y/n)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Verificar si el puerto 5000 está ocupado
if lsof -Pi :5000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    print_warning "Puerto 5000 está ocupado. ¿Continuar? (y/n)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Crear archivo .env si no existe
if [ ! -f .env ]; then
    print_info "Creando archivo .env desde .env.example"
    cp .env.example .env
    print_status "Archivo .env creado"
else
    print_info "Archivo .env ya existe"
fi

# Detener servicios existentes si están corriendo
print_info "Deteniendo servicios existentes (si los hay)..."
docker-compose down 2>/dev/null || true

# Construir imágenes
print_info "Construyendo imágenes Docker (esto puede tomar unos minutos)..."
docker-compose build --no-cache

if [ $? -eq 0 ]; then
    print_status "Imágenes construidas exitosamente"
else
    print_error "Error construyendo las imágenes"
    exit 1
fi

# Levantar servicios
print_info "Levantando todos los servicios..."
docker-compose up -d

if [ $? -eq 0 ]; then
    print_status "Servicios levantados exitosamente"
else
    print_error "Error levantando los servicios"
    exit 1
fi

# Esperar a que los servicios estén listos
print_info "Esperando a que los servicios estén listos..."
sleep 10

# Verificar que los servicios estén funcionando
print_info "Verificando servicios..."

# Verificar backend
if curl -s http://localhost:5000/health > /dev/null; then
    print_status "Backend funcionando correctamente"
else
    print_warning "Backend puede estar iniciándose aún..."
fi

# Verificar frontend (simplemente verificar que el puerto esté abierto)
if nc -z localhost 5001 2>/dev/null; then
    print_status "Frontend funcionando correctamente"
else
    print_warning "Frontend puede estar iniciándose aún..."
fi

echo ""
echo "🎉 ¡Instalación completada!"
echo "========================="
echo ""
echo "📱 URLs de acceso:"
echo "  🌐 Frontend:      http://localhost:5001"
echo "  🔗 Backend API:   http://localhost:5000"
echo "  ❤️  Health Check:  http://localhost:5000/health"
echo "  🗄️  MongoDB Admin: http://localhost:8081 (admin/admin123)"
echo "  💾 Redis Admin:   http://localhost:8001"
echo ""
echo "🔑 Credenciales de prueba:"
echo "  Admin: admin@fullstack.com / admin123"
echo "  User:  usuario@fullstack.com / user123"
echo ""
echo "🛠️  Comandos útiles:"
echo "  make logs     # Ver logs en tiempo real"
echo "  make down     # Detener servicios"
echo "  make restart  # Reiniciar servicios"
echo "  make check    # Ver estado de servicios"
echo ""
echo "📚 Ver README-DOCKER.md para más información"

# Función para limpiar al salir
cleanup() {
    echo ""
    print_info "Para detener los servicios ejecuta: make down"
}

trap cleanup EXIT
