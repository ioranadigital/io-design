#!/bin/bash
# ============================================================================
# IoranaSEO Hetzner Deployment Script
# ============================================================================
# Usage:
#   Local:  bash deploy-hetzner.sh <hetzner-ip> <ssh-user> <deploy-path>
#   Remote: ssh user@hetzner-ip "bash deploy-hetzner.sh" (after copying)
# ============================================================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
DEPLOY_PATH="${1:-.}"
PORT="${2:-3005}"
DOMAIN="${3:-iorana.dev}"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}IoranaSEO Hetzner Deployment${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# ============================================================================
# STEP 1: System Prerequisites
# ============================================================================
echo -e "${YELLOW}[1/7] Checking system prerequisites...${NC}"

if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js not found. Installing...${NC}"
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

if ! command -v pnpm &> /dev/null; then
    echo -e "${RED}✗ pnpm not found. Installing...${NC}"
    npm install -g pnpm
fi

NODE_VERSION=$(node -v)
PNPM_VERSION=$(pnpm -v)
echo -e "${GREEN}✓ Node.js ${NODE_VERSION} installed${NC}"
echo -e "${GREEN}✓ pnpm ${PNPM_VERSION} installed${NC}"
echo ""

# ============================================================================
# STEP 2: Clone/Update Repository
# ============================================================================
echo -e "${YELLOW}[2/7] Setting up repository...${NC}"

REPO_URL="https://github.com/ioranadigital/io-design.git"
APP_DIR="${DEPLOY_PATH}/ioranaseo"

if [ -d "$APP_DIR" ]; then
    echo "Updating existing repository..."
    cd "$APP_DIR"
    git fetch origin
    git checkout main
    git pull origin main
else
    echo "Cloning repository..."
    mkdir -p "$DEPLOY_PATH"
    cd "$DEPLOY_PATH"
    git clone "$REPO_URL" .
    cd interno/ioranaseo
fi

echo -e "${GREEN}✓ Repository ready${NC}"
echo ""

# ============================================================================
# STEP 3: Install Dependencies
# ============================================================================
echo -e "${YELLOW}[3/7] Installing dependencies...${NC}"

pnpm install --frozen-lockfile

echo -e "${GREEN}✓ Dependencies installed${NC}"
echo ""

# ============================================================================
# STEP 4: Environment Setup
# ============================================================================
echo -e "${YELLOW}[4/7] Configuring environment...${NC}"

# Check if .env.local exists, if not create from example
if [ ! -f ".env.local" ]; then
    if [ -f ".env.production.example" ]; then
        cp .env.production.example .env.local
        echo -e "${YELLOW}⚠ Created .env.local from example${NC}"
        echo -e "${YELLOW}  ⚠ Please update .env.local with production values${NC}"
    fi
fi

# Set production environment
export NODE_ENV=production
export IORANASEO_ENV=production
export IORANASEO_FRONTEND_PORT=$PORT

echo -e "${GREEN}✓ Environment configured${NC}"
echo "  NODE_ENV: $NODE_ENV"
echo "  PORT: $PORT"
echo ""

# ============================================================================
# STEP 5: Build Application
# ============================================================================
echo -e "${YELLOW}[5/7] Building application...${NC}"

rm -rf .next
pnpm build

if [ -d ".next" ]; then
    BUILD_SIZE=$(du -sh .next | cut -f1)
    echo -e "${GREEN}✓ Build successful (${BUILD_SIZE})${NC}"
else
    echo -e "${RED}✗ Build failed${NC}"
    exit 1
fi
echo ""

# ============================================================================
# STEP 6: Stop Previous Process (if running)
# ============================================================================
echo -e "${YELLOW}[6/7] Managing application processes...${NC}"

if pgrep -f "next start.*3005" > /dev/null; then
    echo "Stopping existing Next.js process..."
    pkill -f "next start.*3005" || true
    sleep 2
fi

echo -e "${GREEN}✓ Processes managed${NC}"
echo ""

# ============================================================================
# STEP 7: Start Application
# ============================================================================
echo -e "${YELLOW}[7/7] Starting application...${NC}"

# Option A: Direct start
# pnpm start

# Option B: PM2 (recommended for production)
if ! command -v pm2 &> /dev/null; then
    echo "Installing PM2..."
    npm install -g pm2
fi

pm2 delete ioranaseo 2>/dev/null || true
pm2 start pnpm --name "ioranaseo" -- start
pm2 save
pm2 startup

echo -e "${GREEN}✓ Application started${NC}"
echo ""

# ============================================================================
# VERIFICATION
# ============================================================================
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Deployment Summary${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

sleep 2

if curl -s http://localhost:$PORT > /dev/null; then
    echo -e "${GREEN}✓ Server responding on port ${PORT}${NC}"
    echo ""
    echo "Access your site:"
    echo -e "  ${BLUE}Local:  http://localhost:${PORT}${NC}"
    echo -e "  ${BLUE}Remote: https://${DOMAIN}${NC}"
else
    echo -e "${RED}✗ Server not responding on port ${PORT}${NC}"
    echo "Check logs with: pm2 logs ioranaseo"
fi

echo ""
echo -e "${GREEN}✓ Deployment complete!${NC}"
echo ""
echo "Useful commands:"
echo "  pm2 logs ioranaseo          # View application logs"
echo "  pm2 status                  # Check process status"
echo "  pm2 restart ioranaseo       # Restart application"
echo "  pm2 stop ioranaseo          # Stop application"
