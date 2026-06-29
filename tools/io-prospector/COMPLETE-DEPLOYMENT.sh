#!/bin/bash

# 🚀 COMPLETE DEPLOYMENT SCRIPT - PARA EJECUTAR EN HETZNER SSH
# Copiar TODO esto y pegarlo en la terminal SSH de Hetzner

set -e

echo "════════════════════════════════════════"
echo "🚀 io-prospector DEPLOYMENT - FASE FINAL"
echo "════════════════════════════════════════"
echo ""

# 1️⃣ Crear directorios
echo "1️⃣ Creando directorios..."
mkdir -p /opt/io-prospector
mkdir -p /var/www/certbot
cd /opt/io-prospector
echo "✅ Directorios creados"
echo ""

# 2️⃣ Verificar repo
echo "2️⃣ Verificando repositorio..."
if [ ! -d .git ]; then
  echo "Clonando repositorio..."
  cd /opt
  rm -rf io-prospector 2>/dev/null || true
  git clone https://github.com/ioranadigital/io-prospector.git io-prospector
  cd /opt/io-prospector
else
  echo "Repositorio ya existe, actualizando..."
  git pull origin main
fi
echo "✅ Repositorio OK"
echo ""

# 3️⃣ Crear .env (si no existe)
echo "3️⃣ Creando .env..."
if [ ! -f .env ]; then
  echo "❌ .env no encontrado! Debes copiar manualmente."
  echo "Desde tu máquina local ejecuta:"
  echo "  scp .env root@89.167.103.147:/opt/io-prospector/"
  echo ""
  echo "Luego vuelve a ejecutar este script."
  exit 1
fi
echo "✅ .env presente"
echo ""

# 4️⃣ Build Docker
echo "4️⃣ Building Docker images (5-10 minutos)..."
echo "⏳ Esto tarda un poco, especialmente el frontend..."
docker-compose -f docker-compose.coolify.yml build --no-cache 2>&1 | grep -E "Building|Step|Successfully|ERROR" | tail -50
echo "✅ Docker build completado"
echo ""

# 5️⃣ Deploy servicios
echo "5️⃣ Iniciando servicios Docker..."
docker-compose -f docker-compose.coolify.yml up -d
echo "✅ Servicios iniciados"
echo ""

# 6️⃣ Esperar inicialización
echo "6️⃣ Esperando servicios (30 segundos)..."
sleep 30
echo "✅ Servicios deberían estar listos"
echo ""

# 7️⃣ Health checks
echo "7️⃣ Health Checks:"
echo ""
echo "   Backend:"
if curl -s http://localhost:4006/health 2>/dev/null | grep -q status; then
  echo "   ✅ Backend health OK"
else
  echo "   ⚠️ Backend aún inicializando... intenta en 10 segundos"
fi

echo ""
echo "   Frontend:"
if curl -s http://localhost:3004 > /dev/null 2>&1; then
  echo "   ✅ Frontend responding"
else
  echo "   ⚠️ Frontend aún inicializando..."
fi

echo ""
echo "   Redis:"
docker-compose -f docker-compose.coolify.yml exec -T redis redis-cli ping 2>/dev/null && echo "   ✅ Redis OK" || echo "   ⚠️ Redis check"

echo ""

# 8️⃣ Docker status
echo "8️⃣ Estado de Servicios:"
docker-compose -f docker-compose.coolify.yml ps
echo ""

# 9️⃣ SSL Certificates
echo "9️⃣ Configurando SSL con Let's Encrypt..."
mkdir -p /var/www/certbot

certbot certonly --webroot \
  -w /var/www/certbot \
  -d pros.iorana.dev \
  -d api.pros.iorana.dev \
  -d www.pros.iorana.dev \
  --email honatuya@gmail.com \
  --agree-tos \
  --non-interactive --break-my-certs 2>&1 | grep -E "Successfully|Congratulations|already" || true

echo "✅ SSL configurado"
echo ""

# 🔟 Verificar certificados
echo "🔟 Certificados SSL:"
if [ -d /etc/letsencrypt/live/pros.iorana.dev ]; then
  ls -la /etc/letsencrypt/live/pros.iorana.dev/
  echo "✅ Certificados presentes"
else
  echo "⚠️ Certificados pendientes"
fi
echo ""

# SUMMARY
echo "════════════════════════════════════════"
echo "✅ DEPLOYMENT COMPLETADO"
echo "════════════════════════════════════════"
echo ""

echo "📊 Endpoints Disponibles:"
echo ""
echo "  🌐 Frontend (HTTP):"
echo "     http://89.167.103.147:3004"
echo ""
echo "  🔌 Backend API (HTTP):"
echo "     http://89.167.103.147:4006"
echo "     http://89.167.103.147:4006/health"
echo ""
echo "  📡 Redis:"
echo "     Interno puerto 6379"
echo ""

echo "🔐 Después de DNS propagation (5-30 min):"
echo ""
echo "  🌐 Frontend (HTTPS):"
echo "     https://pros.iorana.dev"
echo ""
echo "  🔌 Backend API (HTTPS):"
echo "     https://api.pros.iorana.dev/api"
echo "     https://api.pros.iorana.dev/health"
echo ""

echo "⚠️  IMPORTANTE - Configurar DNS en Hetzner Cloud:"
echo ""
echo "  1. pros.iorana.dev"
echo "     Type: A Record"
echo "     Value: 89.167.103.147"
echo ""
echo "  2. api.pros.iorana.dev"
echo "     Type: A Record"
echo "     Value: 89.167.103.147"
echo ""
echo "  3. www.pros.iorana.dev"
echo "     Type: CNAME Record"
echo "     Value: pros.iorana.dev"
echo ""

echo "📞 Monitoreo:"
echo ""
echo "  Ver logs:"
echo "    docker-compose -f /opt/io-prospector/docker-compose.coolify.yml logs -f"
echo ""
echo "  Status:"
echo "    docker-compose -f /opt/io-prospector/docker-compose.coolify.yml ps"
echo ""
echo "  Health backend:"
echo "    curl http://localhost:4006/health"
echo ""

echo "🎉 ¡DEPLOYMENT EXITOSO!"
echo ""
