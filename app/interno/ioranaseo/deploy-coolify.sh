#!/bin/bash

# ============================================
# Script de Deployment IoranaSEO en Coolify
# ============================================

set -e

echo "🚀 Iniciando deployment de IoranaSEO en Hetzner..."

# Cargar variables desde .hetzner_token
if [ -f ".hetzner_token" ]; then
  source .hetzner_token
else
  echo "⚠️  Archivo .hetzner_token no encontrado"
  echo "Por favor crea el archivo con:"
  echo "COOLIFY_URL=http://89.167.103.147:8000"
  echo "COOLIFY_TOKEN=<tu-token>"
  exit 1
fi

# Variables de proyecto
COOLIFY_PROJECT_ID="dcccsw48ccog00k0k0wkc0oo"
COOLIFY_ENVIRONMENT_ID="vgwg0ckcwcwsowcscw808o04"

echo "📡 Conectando con Coolify en ${COOLIFY_URL}..."

# Crear aplicación en Coolify
curl -X POST "${COOLIFY_URL}/api/v1/applications" \
  -H "Authorization: Bearer ${COOLIFY_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "ioranaseo",
    "description": "SEO Reporting & Content Audit Platform",
    "type": "docker-compose",
    "project_id": "'${COOLIFY_PROJECT_ID}'",
    "environment_id": "'${COOLIFY_ENVIRONMENT_ID}'",
    "git_repository": "https://github.com/ioranadigital/io-design.git",
    "git_branch": "main",
    "docker_compose_location": "app/interno/ioranaseo/docker-compose.yml"
  }'

echo ""
echo "✅ Aplicación creada en Coolify"
echo "🌐 Acceder a: ${COOLIFY_URL}"
echo "🎯 Deployment completado"
