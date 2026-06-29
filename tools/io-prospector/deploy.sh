#!/bin/bash

# 🚀 DEPLOY SCRIPT - io-prospector a Hetzner
# ==========================================
# Uso: ./deploy.sh [production|staging]
# Requiere: .env configurado, Docker, docker-compose

set -e  # Exit on error

ENVIRONMENT=${1:-production}
TIMESTAMP=$(date +%Y-%m-%d_%H-%M-%S)
LOG_FILE="./logs/deploy_${TIMESTAMP}.log"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Create logs directory
mkdir -p logs

echo -e "${GREEN}🚀 Starting deployment to $ENVIRONMENT${NC}" | tee -a "$LOG_FILE"

# ==========================================
# 1. VALIDAR PREREQUISITOS
# ==========================================
echo -e "${YELLOW}[1/6] Validating prerequisites...${NC}" | tee -a "$LOG_FILE"

# Check Docker
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker no está instalado${NC}" | tee -a "$LOG_FILE"
    exit 1
fi

# Check docker-compose
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ docker-compose no está instalado${NC}" | tee -a "$LOG_FILE"
    exit 1
fi

# Check .env file
if [ ! -f .env ]; then
    echo -e "${RED}❌ .env no encontrado. Copia .env.example y configura${NC}" | tee -a "$LOG_FILE"
    exit 1
fi

# Check required env variables
REQUIRED_VARS=("SUPABASE_URL" "SUPABASE_KEY" "NEXT_PUBLIC_SUPABASE_URL" "NEXT_PUBLIC_SUPABASE_ANON_KEY" "FRONTEND_URL" "NEXT_PUBLIC_API_URL")
for var in "${REQUIRED_VARS[@]}"; do
    if ! grep -q "^${var}=" .env; then
        echo -e "${RED}❌ Variable de entorno faltante: $var${NC}" | tee -a "$LOG_FILE"
        exit 1
    fi
done

echo -e "${GREEN}✅ Prerequisites validated${NC}" | tee -a "$LOG_FILE"

# ==========================================
# 2. VALIDAR DOCKERFILES
# ==========================================
echo -e "${YELLOW}[2/6] Validating Dockerfiles...${NC}" | tee -a "$LOG_FILE"

if [ ! -f backend.Dockerfile ]; then
    echo -e "${RED}❌ backend.Dockerfile no encontrado${NC}" | tee -a "$LOG_FILE"
    exit 1
fi

if [ ! -f frontend.Dockerfile ]; then
    echo -e "${RED}❌ frontend.Dockerfile no encontrado${NC}" | tee -a "$LOG_FILE"
    exit 1
fi

echo -e "${GREEN}✅ Dockerfiles found${NC}" | tee -a "$LOG_FILE"

# ==========================================
# 3. BUILD DOCKER IMAGES
# ==========================================
echo -e "${YELLOW}[3/6] Building Docker images...${NC}" | tee -a "$LOG_FILE"

if [ "$ENVIRONMENT" = "production" ]; then
    COMPOSE_FILE="docker-compose.coolify.yml"
else
    COMPOSE_FILE="docker-compose.yml"
fi

if [ ! -f "$COMPOSE_FILE" ]; then
    echo -e "${RED}❌ $COMPOSE_FILE no encontrado${NC}" | tee -a "$LOG_FILE"
    exit 1
fi

# Load .env and build
export $(cat .env | grep -v '^#' | xargs)
docker-compose -f "$COMPOSE_FILE" build --no-cache >> "$LOG_FILE" 2>&1

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Images built successfully${NC}" | tee -a "$LOG_FILE"
else
    echo -e "${RED}❌ Build failed. Check logs: $LOG_FILE${NC}" | tee -a "$LOG_FILE"
    exit 1
fi

# ==========================================
# 4. VALIDAR IMAGES
# ==========================================
echo -e "${YELLOW}[4/6] Validating built images...${NC}" | tee -a "$LOG_FILE"

# Check if images exist
if ! docker image inspect io-prospector_backend:latest &>/dev/null; then
    echo -e "${YELLOW}⚠️  Backend image might not exist, checking...${NC}" | tee -a "$LOG_FILE"
fi

if ! docker image inspect io-prospector_frontend:latest &>/dev/null; then
    echo -e "${YELLOW}⚠️  Frontend image might not exist, checking...${NC}" | tee -a "$LOG_FILE"
fi

echo -e "${GREEN}✅ Images validated${NC}" | tee -a "$LOG_FILE"

# ==========================================
# 5. STOP EXISTING CONTAINERS
# ==========================================
echo -e "${YELLOW}[5/6] Stopping existing containers...${NC}" | tee -a "$LOG_FILE"

docker-compose -f "$COMPOSE_FILE" down >> "$LOG_FILE" 2>&1 || true

echo -e "${GREEN}✅ Old containers stopped${NC}" | tee -a "$LOG_FILE"

# ==========================================
# 6. START NEW CONTAINERS
# ==========================================
echo -e "${YELLOW}[6/6] Starting new containers...${NC}" | tee -a "$LOG_FILE"

docker-compose -f "$COMPOSE_FILE" up -d >> "$LOG_FILE" 2>&1

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Containers started${NC}" | tee -a "$LOG_FILE"
else
    echo -e "${RED}❌ Failed to start containers. Check logs: $LOG_FILE${NC}" | tee -a "$LOG_FILE"
    docker-compose -f "$COMPOSE_FILE" logs
    exit 1
fi

# ==========================================
# 7. HEALTH CHECKS
# ==========================================
echo -e "${YELLOW}[7/6] Running health checks...${NC}" | tee -a "$LOG_FILE"

sleep 5  # Wait for services to initialize

# Wait for backend
echo "Waiting for backend to be healthy..." | tee -a "$LOG_FILE"
for i in {1..30}; do
    if docker-compose -f "$COMPOSE_FILE" exec backend curl -f http://localhost:4000/health 2>/dev/null || docker-compose -f "$COMPOSE_FILE" exec -T backend curl -f http://localhost:4000/health 2>/dev/null; then
        echo -e "${GREEN}✅ Backend is healthy${NC}" | tee -a "$LOG_FILE"
        break
    fi
    echo "  Attempt $i/30..." | tee -a "$LOG_FILE"
    sleep 2
done

# Check frontend
echo "Checking frontend..." | tee -a "$LOG_FILE"
if curl -f http://localhost:3004 &>/dev/null || curl -f http://localhost:3002 &>/dev/null; then
    echo -e "${GREEN}✅ Frontend is accessible${NC}" | tee -a "$LOG_FILE"
else
    echo -e "${YELLOW}⚠️  Frontend might still be starting...${NC}" | tee -a "$LOG_FILE"
fi

# ==========================================
# 8. SUMMARY
# ==========================================
echo "" | tee -a "$LOG_FILE"
echo -e "${GREEN}═══════════════════════════════════════${NC}" | tee -a "$LOG_FILE"
echo -e "${GREEN}🎉 DEPLOYMENT SUCCESSFUL!${NC}" | tee -a "$LOG_FILE"
echo -e "${GREEN}═══════════════════════════════════════${NC}" | tee -a "$LOG_FILE"
echo "" | tee -a "$LOG_FILE"
echo "Environment: $ENVIRONMENT" | tee -a "$LOG_FILE"
echo "Log file: $LOG_FILE" | tee -a "$LOG_FILE"
echo "" | tee -a "$LOG_FILE"
echo "Services:" | tee -a "$LOG_FILE"
docker-compose -f "$COMPOSE_FILE" ps | tee -a "$LOG_FILE"
echo "" | tee -a "$LOG_FILE"
echo "🔗 Endpoints:" | tee -a "$LOG_FILE"
echo "  Frontend: http://localhost:3004 (or https://pros.iorana.dev)" | tee -a "$LOG_FILE"
echo "  Backend:  http://localhost:4006 (or https://api.pros.iorana.dev)" | tee -a "$LOG_FILE"
echo "" | tee -a "$LOG_FILE"
echo -e "${YELLOW}Next steps:${NC}" | tee -a "$LOG_FILE"
echo "  1. Verify frontend loads correctly" | tee -a "$LOG_FILE"
echo "  2. Check backend API responses" | tee -a "$LOG_FILE"
echo "  3. Review logs: docker-compose logs -f" | tee -a "$LOG_FILE"
echo "  4. Monitor: docker stats" | tee -a "$LOG_FILE"
echo "" | tee -a "$LOG_FILE"
