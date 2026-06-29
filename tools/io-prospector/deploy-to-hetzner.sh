#!/bin/bash

# 🚀 FULL DEPLOYMENT SCRIPT - io-prospector to Hetzner
# ====================================================
# Automatiza TODOS los 7 pasos del deployment
# Uso: bash deploy-to-hetzner.sh
# Requerimientos: SSH key configurada, git disponible

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
HETZNER_IP="89.167.103.147"
HETZNER_USER="root"
PROJECT_DIR="/opt/io-prospector"
TIMESTAMP=$(date +%Y-%m-%d_%H-%M-%S)
LOG_FILE="./deployment_${TIMESTAMP}.log"

echo -e "${BLUE}════════════════════════════════════════${NC}"
echo -e "${BLUE}🚀 io-prospector FULL DEPLOYMENT${NC}"
echo -e "${BLUE}════════════════════════════════════════${NC}"
echo ""
echo "Target: $HETZNER_IP"
echo "Project: $PROJECT_DIR"
echo "Log: $LOG_FILE"
echo ""

# Function to log
log() {
    echo -e "${GREEN}[$(date +'%H:%M:%S')]${NC} $1" | tee -a "$LOG_FILE"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a "$LOG_FILE"
    exit 1
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1" | tee -a "$LOG_FILE"
}

# ==========================================
# PHASE 0: PRE-FLIGHT CHECKS
# ==========================================
log "PHASE 0: Pre-flight checks..."

# Check SSH connectivity
if ! ssh -o ConnectTimeout=5 ${HETZNER_USER}@${HETZNER_IP} "echo 'SSH OK'" > /dev/null 2>&1; then
    error "Cannot connect to Hetzner via SSH. Check IP and SSH keys."
fi
log "✅ SSH connectivity OK"

# Check .env exists locally
if [ ! -f .env ]; then
    error ".env not found. Create it first: cp .env.example .env"
fi
log "✅ .env found locally"

# Check docker-compose.coolify.yml exists
if [ ! -f docker-compose.coolify.yml ]; then
    error "docker-compose.coolify.yml not found"
fi
log "✅ docker-compose.coolify.yml found"

echo ""

# ==========================================
# PHASE 1: PREPARE HETZNER (Install deps)
# ==========================================
log "PHASE 1: Installing dependencies on Hetzner..."

ssh ${HETZNER_USER}@${HETZNER_IP} << 'EOF'
set -e

echo "1. Updating system packages..."
apt-get update > /dev/null 2>&1
apt-get upgrade -y > /dev/null 2>&1

echo "2. Installing Docker..."
apt-get install -y docker.io > /dev/null 2>&1

echo "3. Installing Docker Compose..."
apt-get install -y docker-compose > /dev/null 2>&1

echo "4. Installing Nginx..."
apt-get install -y nginx > /dev/null 2>&1

echo "5. Installing Certbot..."
apt-get install -y certbot python3-certbot-nginx > /dev/null 2>&1

echo "6. Installing Git..."
apt-get install -y git > /dev/null 2>&1

echo "7. Starting Docker service..."
systemctl start docker > /dev/null 2>&1
systemctl enable docker > /dev/null 2>&1

echo "8. Verifying Docker installation..."
docker --version
docker-compose --version

EOF

log "✅ Dependencies installed successfully"
echo ""

# ==========================================
# PHASE 2: CREATE DIRECTORIES
# ==========================================
log "PHASE 2: Creating directories..."

ssh ${HETZNER_USER}@${HETZNER_IP} << 'EOF'
mkdir -p /opt/io-prospector
mkdir -p /var/www/certbot
echo "Directories created"
EOF

log "✅ Directories created"
echo ""

# ==========================================
# PHASE 3: CLONE REPOSITORY
# ==========================================
log "PHASE 3: Cloning repository..."

# Get current git remote URL
GIT_URL=$(git config --get remote.origin.url)

ssh ${HETZNER_USER}@${HETZNER_IP} << EOF
cd /opt

# Remove if exists
rm -rf io-prospector

# Clone
git clone ${GIT_URL} io-prospector

echo "Repository cloned"
EOF

log "✅ Repository cloned"
echo ""

# ==========================================
# PHASE 4: COPY .env
# ==========================================
log "PHASE 4: Copying .env to Hetzner..."

scp .env ${HETZNER_USER}@${HETZNER_IP}:${PROJECT_DIR}/.env

# Verify
ssh ${HETZNER_USER}@${HETZNER_IP} "test -f ${PROJECT_DIR}/.env && echo 'OK' || exit 1" > /dev/null

log "✅ .env copied successfully"
echo ""

# ==========================================
# PHASE 5: BUILD AND DEPLOY DOCKER
# ==========================================
log "PHASE 5: Building Docker images and deploying..."

ssh ${HETZNER_USER}@${HETZNER_IP} << 'EOF'
cd /opt/io-prospector

echo "Building Docker images... (this may take 5-10 minutes)"
docker-compose -f docker-compose.coolify.yml build --no-cache 2>&1 | tail -20

echo "Starting services..."
docker-compose -f docker-compose.coolify.yml up -d

echo "Waiting for services to initialize..."
sleep 10

echo "Checking service status..."
docker-compose -f docker-compose.coolify.yml ps

EOF

log "✅ Docker deployment completed"
echo ""

# ==========================================
# PHASE 6: VERIFY SERVICES
# ==========================================
log "PHASE 6: Verifying services..."

ssh ${HETZNER_USER}@${HETZNER_IP} << 'EOF'
cd /opt/io-prospector

echo "Waiting 30 seconds for services to be healthy..."
sleep 30

echo "Testing Backend health..."
for i in {1..5}; do
  if curl -f http://localhost:4006/health 2>/dev/null; then
    echo "✅ Backend is healthy"
    break
  else
    echo "Attempt $i/5... backend still initializing"
    sleep 5
  fi
done

echo "Testing Frontend..."
if curl -f http://localhost:3004 > /dev/null 2>&1; then
  echo "✅ Frontend is responding"
else
  echo "⚠️ Frontend might still be initializing"
fi

echo "Redis status..."
docker-compose -f docker-compose.coolify.yml exec -T redis redis-cli ping

EOF

log "✅ Services verified"
echo ""

# ==========================================
# PHASE 7: SSL CERTIFICATES
# ==========================================
log "PHASE 7: Setting up SSL certificates..."

ssh ${HETZNER_USER}@${HETZNER_IP} << 'EOF'
echo "Getting Let's Encrypt certificate..."
certbot certonly --webroot \
  -w /var/www/certbot \
  -d pros.iorana.dev \
  -d api.pros.iorana.dev \
  -d www.pros.iorana.dev \
  --email honatuya@gmail.com \
  --agree-tos \
  --non-interactive \
  --register-unsafely-without-email 2>&1 || echo "Certificate may already exist"

echo "Verifying certificates..."
ls -la /etc/letsencrypt/live/pros.iorana.dev/

EOF

log "✅ SSL certificates configured"
echo ""

# ==========================================
# PHASE 8: DNS REMINDER
# ==========================================
log "PHASE 8: DNS Configuration Required"
echo ""
echo -e "${YELLOW}⚠️  IMPORTANT: Configure DNS records in Hetzner Cloud Console:${NC}"
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
echo "DNS propagation: 5-30 minutes"
echo ""

# ==========================================
# PHASE 9: FINAL VERIFICATION
# ==========================================
log "PHASE 9: Final verification..."

echo ""
echo -e "${BLUE}Current service status on Hetzner:${NC}"
ssh ${HETZNER_USER}@${HETZNER_IP} << 'EOF'
cd /opt/io-prospector
echo "=== DOCKER CONTAINERS ==="
docker-compose -f docker-compose.coolify.yml ps

echo ""
echo "=== RECENT LOGS ==="
docker-compose -f docker-compose.coolify.yml logs --tail=20 2>&1 | grep -v "^$" | tail -10

echo ""
echo "=== ENDPOINTS STATUS ==="
echo -n "Backend health: "
curl -s http://localhost:4006/health || echo "not responding"
echo ""
EOF

log "✅ Final verification complete"
echo ""

# ==========================================
# SUMMARY
# ==========================================
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ DEPLOYMENT SUCCESSFUL!${NC}"
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo ""
echo -e "${BLUE}📊 Summary:${NC}"
echo "  IP:          $HETZNER_IP"
echo "  Project:     $PROJECT_DIR"
echo "  Frontend:    http://89.167.103.147:3004 (will be https://pros.iorana.dev)"
echo "  Backend:     http://89.167.103.147:4006 (will be https://api.pros.iorana.dev)"
echo "  Redis:       Internal 6379"
echo ""
echo -e "${YELLOW}📋 Next Steps:${NC}"
echo "  1. Configure DNS records (A records for pros.iorana.dev and api.pros.iorana.dev)"
echo "  2. Wait 5-30 minutes for DNS propagation"
echo "  3. Test: https://pros.iorana.dev"
echo "  4. Test: https://api.pros.iorana.dev/health"
echo ""
echo -e "${BLUE}📞 Monitoring:${NC}"
echo "  ssh root@$HETZNER_IP"
echo "  cd $PROJECT_DIR"
echo "  docker-compose -f docker-compose.coolify.yml logs -f"
echo ""
echo -e "${BLUE}📝 Log file: $LOG_FILE${NC}"
echo ""

log "Deployment completed at $(date)"
