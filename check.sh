#!/bin/bash

# Script de verificación rápida del estado del sistema

echo "🔍 Verificando estado del sistema Full Stack Store..."
echo "================================================="

# Verificar Docker
if command -v docker &> /dev/null; then
    echo "✅ Docker instalado: $(docker --version)"
else
    echo "❌ Docker no está instalado"
fi

# Verificar Docker Compose
if command -v docker-compose &> /dev/null; then
    echo "✅ Docker Compose instalado: $(docker-compose --version)"
else
    echo "❌ Docker Compose no está instalado"
fi

echo ""
echo "📦 Estado de los servicios:"
docker-compose ps 2>/dev/null || echo "❌ No hay servicios corriendo"

echo ""
echo "🌐 Verificando puertos:"

# Función para verificar puerto
check_port() {
    if nc -z localhost $1 2>/dev/null; then
        echo "✅ Puerto $1 está abierto ($2)"
    else
        echo "❌ Puerto $1 no está disponible ($2)"
    fi
}

check_port 5001 "Frontend"
check_port 5000 "Backend API"
check_port 27017 "MongoDB"
check_port 6379 "Redis"
check_port 8081 "MongoDB Admin"
check_port 8001 "Redis Admin"

echo ""
echo "🧪 Probando endpoints (si están disponibles):"

# Probar health check
if curl -s http://localhost:5000/health > /dev/null 2>&1; then
    echo "✅ Health check: $(curl -s http://localhost:5000/health | jq -r .message 2>/dev/null || echo 'OK')"
else
    echo "❌ Health check no responde"
fi

# Probar frontend
if curl -s http://localhost:5001 > /dev/null 2>&1; then
    echo "✅ Frontend responde correctamente"
else
    echo "❌ Frontend no responde"
fi

echo ""
echo "📊 Recursos del sistema:"
echo "Espacio en disco: $(df -h / | awk 'NR==2{printf "%s/%s (%s usado)", $3,$2,$5}')"
echo "Memoria: $(free -h | awk 'NR==2{printf "%s/%s", $3,$2}')"

echo ""
echo "🔧 Para gestionar los servicios:"
echo "  make up      # Levantar servicios"
echo "  make down    # Detener servicios"
echo "  make logs    # Ver logs"
echo "  make build   # Reconstruir imágenes"
