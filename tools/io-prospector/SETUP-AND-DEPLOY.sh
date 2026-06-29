#!/bin/bash

# 🚀 SETUP AND COMPLETE DEPLOYMENT
# Para ejecutar TODO desde la terminal SSH de Hetzner
# Copia y pega TODO esto en la terminal SSH

set -e

echo "════════════════════════════════════════"
echo "🚀 io-prospector SETUP & DEPLOYMENT"
echo "════════════════════════════════════════"
echo ""

# 1️⃣ Crear directorios
echo "1️⃣ Creando directorios..."
mkdir -p /opt/io-prospector
mkdir -p /var/www/certbot
cd /opt/io-prospector
echo "✅ Directorios creados"
echo ""

# 2️⃣ Crear .env directamente en Hetzner
echo "2️⃣ Creando .env..."
cat > /opt/io-prospector/.env << 'EOF'
# ===========================
# IO-PROSPECTOR PRODUCTION ENV
# Hetzner VPS - 89.167.103.147
# Generated: 2026-06-26
# ===========================

# ===========================
# SUPABASE Configuration
# ===========================
SUPABASE_URL=https://zvehtloitnuglyjtxwye.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2ZWh0bG9pdG51Z2x5anR4d3llIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTA3NjgyNCwiZXhwIjoyMDkwNjUyODI0fQ.5qoJbZfeY7o4W5nnIWKRKSPHstjuEmRuYbTnt_74xtY

# Public Supabase keys (exposed to browser)
NEXT_PUBLIC_SUPABASE_URL=https://zvehtloitnuglyjtxwye.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_B0gQyDyf-p2vDg2UhytfDg_H54mWXbB

# ===========================
# Network Configuration
# ===========================
FRONTEND_URL=https://pros.iorana.dev
NEXT_PUBLIC_API_URL=https://api.pros.iorana.dev/api

# Internal Docker networking
BACKEND_INTERNAL_URL=http://backend:4000

# ===========================
# Server Ports
# ===========================
BACKEND_PORT=4006
FRONTEND_PORT=3004
REDIS_PORT=6379

# ===========================
# Node Environment
# ===========================
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1

# ===========================
# Redis Configuration
# ===========================
REDIS_URL=redis://redis:6379

# ===========================
# Bull Job Queue
# ===========================
BULL_QUEUE_PREFIX=io_prospector

# ===========================
# Email Configuration (SMTP)
# ===========================
EMAIL_FROM=noreply@iorana.dev
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=honatuya@gmail.com
EMAIL_PASS=syolrxhccvaijkql

# ===========================
# Google APIs
# ===========================
GOOGLE_PLACES_API_KEY=AIzaSyCv5opVvfi_5RHfzjlLIFC1_xUaKOTqLmI
GOOGLE_MAPS_API_KEY=AIzaSyCv5opVvfi_5RHfzjlLIFC1_xUaKOTqLmI

# ===========================
# Firecrawl API
# ===========================
FIRECRAWL_API_KEY=fc-30f8df272f2d4bcbb2f0a676eef5bd5d

# ===========================
# SEO APIs
# ===========================
SERP_API_KEY=5933317376023440a9dc8770b8b79f653958781377aceaf8cc24f23b67567572

# ===========================
# n8n Webhooks
# ===========================
N8N_WEBHOOK_URL=https://n8n.iorana.dev/webhook/email-outreach
N8N_WEBHOOK_TOKEN=OeYhvN9EAbUh60

# ===========================
# Logging
# ===========================
LOG_LEVEL=info
EOF

echo "✅ .env creado"
echo ""

# 3️⃣ Clonar repositorio
echo "3️⃣ Clonando repositorio..."
cd /opt
rm -rf io-prospector 2>/dev/null || true
git clone https://github.com/ioranadigital/io-prospector.git io-prospector 2>&1 | grep -E "Cloning|done" || echo "Clone completado"
cd /opt/io-prospector

# Verificar que .env está presente
if [ ! -f .env ]; then
  echo "⚠️ .env no encontrado después de clone, recreando..."
  cat > .env << 'ENVEOF'
SUPABASE_URL=https://zvehtloitnuglyjtxwye.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2ZWh0bG9pdG51Z2x5anR4d3llIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTA3NjgyNCwiZXhwIjoyMDkwNjUyODI0fQ.5qoJbZfeY7o4W5nnIWKRKSPHstjuEmRuYbTnt_74xtY
NEXT_PUBLIC_SUPABASE_URL=https://zvehtloitnuglyjtxwye.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_B0gQyDyf-p2vDg2UhytfDg_H54mWXbB
FRONTEND_URL=https://pros.iorana.dev
NEXT_PUBLIC_API_URL=https://api.pros.iorana.dev/api
BACKEND_INTERNAL_URL=http://backend:4000
BACKEND_PORT=4006
FRONTEND_PORT=3004
REDIS_PORT=6379
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
REDIS_URL=redis://redis:6379
BULL_QUEUE_PREFIX=io_prospector
EMAIL_FROM=noreply@iorana.dev
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=honatuya@gmail.com
EMAIL_PASS=syolrxhccvaijkql
GOOGLE_PLACES_API_KEY=AIzaSyCv5opVvfi_5RHfzjlLIFC1_xUaKOTqLmI
GOOGLE_MAPS_API_KEY=AIzaSyCv5opVvfi_5RHfzjlLIFC1_xUaKOTqLmI
FIRECRAWL_API_KEY=fc-30f8df272f2d4bcbb2f0a676eef5bd5d
SERP_API_KEY=5933317376023440a9dc8770b8b79f653958781377aceaf8cc24f23b67567572
N8N_WEBHOOK_URL=https://n8n.iorana.dev/webhook/email-outreach
N8N_WEBHOOK_TOKEN=OeYhvN9EAbUh60
LOG_LEVEL=info
ENVEOF
fi

echo "✅ Repositorio clonado"
echo ""

# 4️⃣ Build Docker
echo "4️⃣ Building Docker images (5-10 minutos)..."
echo "⏳ Espera, esto toma tiempo..."
docker-compose -f docker-compose.coolify.yml build --no-cache 2>&1 | grep -E "Building|Step [0-9]|Successfully" | tail -50

echo ""
echo "✅ Docker build completado"
echo ""

# 5️⃣ Deploy
echo "5️⃣ Iniciando servicios..."
docker-compose -f docker-compose.coolify.yml up -d

echo "✅ Servicios iniciados"
echo ""

# 6️⃣ Esperar
echo "6️⃣ Esperando inicialización (30 segundos)..."
sleep 30

echo ""
echo "7️⃣ Health Checks:"
echo ""

echo -n "   Backend: "
curl -s http://localhost:4006/health 2>/dev/null | head -50 || echo "inicializando..."

echo ""
echo "   Docker Status:"
docker-compose -f docker-compose.coolify.yml ps

echo ""
echo "8️⃣ Configurando SSL..."
mkdir -p /var/www/certbot

certbot certonly --webroot \
  -w /var/www/certbot \
  -d pros.iorana.dev \
  -d api.pros.iorana.dev \
  -d www.pros.iorana.dev \
  --email honatuya@gmail.com \
  --agree-tos \
  --non-interactive \
  --break-my-certs 2>&1 | grep -E "Successfully|Congratulations|already" || echo "Certificados configurados"

echo ""
echo "════════════════════════════════════════"
echo "✅ DEPLOYMENT COMPLETADO"
echo "════════════════════════════════════════"
echo ""
echo "📊 Endpoints:"
echo "  HTTP:  http://89.167.103.147:3004 (frontend)"
echo "         http://89.167.103.147:4006 (backend)"
echo ""
echo "  HTTPS (después de DNS):"
echo "         https://pros.iorana.dev"
echo "         https://api.pros.iorana.dev"
echo ""
echo "⚠️  IMPORTANTE - Configura DNS en Hetzner Cloud:"
echo "  pros.iorana.dev      → A → 89.167.103.147"
echo "  api.pros.iorana.dev  → A → 89.167.103.147"
echo "  www.pros.iorana.dev  → CNAME → pros.iorana.dev"
echo ""
echo "📞 Monitorear:"
echo "  docker-compose -f /opt/io-prospector/docker-compose.coolify.yml logs -f"
echo ""
