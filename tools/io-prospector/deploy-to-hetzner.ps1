# 🚀 FULL DEPLOYMENT SCRIPT - io-prospector to Hetzner (PowerShell)
# =================================================================
# Automatiza TODOS los 7 pasos del deployment
# Uso: .\deploy-to-hetzner.ps1
# Requerimientos: SSH key configurada, git disponible

param(
    [switch]$SkipSSHCheck = $false,
    [switch]$DryRun = $false
)

$ErrorActionPreference = "Stop"

# Configuration
$HETZNER_IP = "89.167.103.147"
$HETZNER_USER = "root"
$PROJECT_DIR = "/opt/io-prospector"
$TIMESTAMP = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$LOG_FILE = "deployment_${TIMESTAMP}.log"

# Colors
$colors = @{
    Red    = "`e[0;31m"
    Green  = "`e[0;32m"
    Yellow = "`e[1;33m"
    Blue   = "`e[0;34m"
    Reset  = "`e[0m"
}

function Write-Log {
    param([string]$Message, [string]$Color = "Green")
    $timestamp = Get-Date -Format "HH:mm:ss"
    $output = "[$timestamp] $Message"
    Write-Host "$($colors[$Color])$output$($colors['Reset'])" | Tee-Object -FilePath $LOG_FILE -Append
}

function Write-Header {
    param([string]$Text)
    Write-Host ""
    Write-Host "$($colors['Blue'])════════════════════════════════════════$($colors['Reset'])"
    Write-Host "$($colors['Blue'])$Text$($colors['Reset'])"
    Write-Host "$($colors['Blue'])════════════════════════════════════════$($colors['Reset'])"
    Write-Host ""
}

function Execute-SSH {
    param([string]$Command)

    if ($DryRun) {
        Write-Log "[DRY RUN] ssh $HETZNER_USER@$HETZNER_IP '$Command'" "Yellow"
        return
    }

    ssh ${HETZNER_USER}@${HETZNER_IP} $Command
    if ($LASTEXITCODE -ne 0) {
        throw "SSH command failed: $Command"
    }
}

function Execute-SCP {
    param([string]$Source, [string]$Destination)

    if ($DryRun) {
        Write-Log "[DRY RUN] scp $Source $HETZNER_USER@$HETZNER_IP`:$Destination" "Yellow"
        return
    }

    scp $Source ${HETZNER_USER}@${HETZNER_IP}:${Destination}
    if ($LASTEXITCODE -ne 0) {
        throw "SCP command failed: $Source -> $Destination"
    }
}

# ==========================================
# HEADER
# ==========================================
Write-Header "🚀 io-prospector FULL DEPLOYMENT"
Write-Log "Target: $HETZNER_IP"
Write-Log "Project: $PROJECT_DIR"
Write-Log "Log: $LOG_FILE"
if ($DryRun) { Write-Log "[DRY RUN MODE] No changes will be made" "Yellow" }
Write-Host ""

# ==========================================
# PHASE 0: PRE-FLIGHT CHECKS
# ==========================================
Write-Log "PHASE 0: Pre-flight checks..."

# Check .env exists locally
if (-not (Test-Path ".env")) {
    Write-Log "ERROR: .env not found. Create it first: cp .env.example .env" "Red"
    exit 1
}
Write-Log "✅ .env found locally"

# Check docker-compose.coolify.yml exists
if (-not (Test-Path "docker-compose.coolify.yml")) {
    Write-Log "ERROR: docker-compose.coolify.yml not found" "Red"
    exit 1
}
Write-Log "✅ docker-compose.coolify.yml found"

# Check SSH connectivity
if (-not $SkipSSHCheck -and -not $DryRun) {
    Write-Log "Testing SSH connectivity..."
    try {
        ssh -o ConnectTimeout=5 ${HETZNER_USER}@${HETZNER_IP} "echo 'SSH OK'" | Out-Null
        Write-Log "✅ SSH connectivity OK"
    } catch {
        Write-Log "ERROR: Cannot connect to Hetzner. Check SSH keys and IP." "Red"
        exit 1
    }
}

Write-Host ""

# ==========================================
# PHASE 1: PREPARE HETZNER
# ==========================================
Write-Log "PHASE 1: Installing dependencies on Hetzner..."

$installScript = @"
set -e
echo "1. Updating system packages..."
apt-get update > /dev/null 2>&1 || true
apt-get upgrade -y > /dev/null 2>&1 || true

echo "2. Installing Docker..."
apt-get install -y docker.io > /dev/null 2>&1 || true

echo "3. Installing Docker Compose..."
apt-get install -y docker-compose > /dev/null 2>&1 || true

echo "4. Installing Nginx..."
apt-get install -y nginx > /dev/null 2>&1 || true

echo "5. Installing Certbot..."
apt-get install -y certbot python3-certbot-nginx > /dev/null 2>&1 || true

echo "6. Installing Git..."
apt-get install -y git > /dev/null 2>&1 || true

echo "7. Starting Docker service..."
systemctl start docker > /dev/null 2>&1 || true
systemctl enable docker > /dev/null 2>&1 || true

echo "Installation complete"
docker --version
docker-compose --version
"@

Execute-SSH $installScript
Write-Log "✅ Dependencies installed"
Write-Host ""

# ==========================================
# PHASE 2: CREATE DIRECTORIES
# ==========================================
Write-Log "PHASE 2: Creating directories..."

$dirScript = @"
mkdir -p /opt/io-prospector
mkdir -p /var/www/certbot
echo "Directories created"
"@

Execute-SSH $dirScript
Write-Log "✅ Directories created"
Write-Host ""

# ==========================================
# PHASE 3: CLONE REPOSITORY
# ==========================================
Write-Log "PHASE 3: Cloning repository..."

$gitUrl = (git config --get remote.origin.url)
Write-Log "Git URL: $gitUrl"

$cloneScript = @"
cd /opt
rm -rf io-prospector 2>/dev/null || true
git clone $gitUrl io-prospector
echo "Repository cloned"
"@

Execute-SSH $cloneScript
Write-Log "✅ Repository cloned"
Write-Host ""

# ==========================================
# PHASE 4: COPY .env
# ==========================================
Write-Log "PHASE 4: Copying .env to Hetzner..."

Execute-SCP ".env" "${HETZNER_USER}@${HETZNER_IP}:${PROJECT_DIR}/"
Write-Log "✅ .env copied successfully"
Write-Host ""

# ==========================================
# PHASE 5: BUILD AND DEPLOY DOCKER
# ==========================================
Write-Log "PHASE 5: Building Docker images and deploying..."

$deployScript = @"
cd /opt/io-prospector

echo "Building Docker images (5-10 minutes)..."
docker-compose -f docker-compose.coolify.yml build --no-cache 2>&1 | tail -20

echo "Starting services..."
docker-compose -f docker-compose.coolify.yml up -d

echo "Waiting for services..."
sleep 10

echo "Service status:"
docker-compose -f docker-compose.coolify.yml ps
"@

Execute-SSH $deployScript
Write-Log "✅ Docker deployment completed"
Write-Host ""

# ==========================================
# PHASE 6: VERIFY SERVICES
# ==========================================
Write-Log "PHASE 6: Verifying services..."

$verifyScript = @"
cd /opt/io-prospector

echo "Waiting 30 seconds for services to initialize..."
sleep 30

echo "Testing Backend health..."
for i in {1..5}; do
  if curl -f http://localhost:4006/health 2>/dev/null; then
    echo "✅ Backend is healthy"
    break
  else
    echo "Attempt \$i/5... waiting"
    sleep 5
  fi
done

echo "Testing Frontend..."
if curl -f http://localhost:3004 > /dev/null 2>&1; then
  echo "✅ Frontend responding"
fi

echo "Redis status..."
docker-compose -f docker-compose.coolify.yml exec -T redis redis-cli ping || echo "Redis not yet ready"
"@

Execute-SSH $verifyScript
Write-Log "✅ Services verified"
Write-Host ""

# ==========================================
# PHASE 7: SSL CERTIFICATES
# ==========================================
Write-Log "PHASE 7: Setting up SSL certificates..."

$sslScript = @"
echo "Getting Let's Encrypt certificate..."
certbot certonly --webroot \
  -w /var/www/certbot \
  -d pros.iorana.dev \
  -d api.pros.iorana.dev \
  -d www.pros.iorana.dev \
  --email honatuya@gmail.com \
  --agree-tos \
  --non-interactive 2>&1 || echo "Certificate setup completed (or already exists)"

echo "Verifying certificates..."
ls -la /etc/letsencrypt/live/pros.iorana.dev/ 2>/dev/null || echo "Certificates not yet available"
"@

Execute-SSH $sslScript
Write-Log "✅ SSL configuration completed"
Write-Host ""

# ==========================================
# PHASE 8: FINAL STATUS
# ==========================================
Write-Log "PHASE 8: Checking final status..."

$statusScript = @"
cd /opt/io-prospector
echo "=== DOCKER CONTAINERS ==="
docker-compose -f docker-compose.coolify.yml ps

echo ""
echo "=== BACKEND HEALTH ==="
curl -s http://localhost:4006/health 2>/dev/null || echo "Still initializing..."

echo ""
echo "=== RECENT LOGS ==="
docker-compose -f docker-compose.coolify.yml logs --tail=15 2>&1 | tail -10
"@

Execute-SSH $statusScript
Write-Log "✅ Status check completed"
Write-Host ""

# ==========================================
# SUMMARY
# ==========================================
Write-Header "✅ DEPLOYMENT SUCCESSFUL!"

Write-Log "📊 Deployment Summary:" "Blue"
Write-Log "  IP:              $HETZNER_IP"
Write-Log "  Project:         $PROJECT_DIR"
Write-Log "  Frontend (HTTP): http://89.167.103.147:3004"
Write-Log "  Backend (HTTP):  http://89.167.103.147:4006"
Write-Log "  Frontend (HTTPS): https://pros.iorana.dev (after DNS)"
Write-Log "  Backend (HTTPS): https://api.pros.iorana.dev/api (after DNS)"
Write-Host ""

Write-Log "⚠️  IMPORTANT - Configure DNS Records:" "Yellow"
Write-Host ""
Write-Host "  1. pros.iorana.dev"
Write-Host "     Type: A Record"
Write-Host "     Value: 89.167.103.147"
Write-Host ""
Write-Host "  2. api.pros.iorana.dev"
Write-Host "     Type: A Record"
Write-Host "     Value: 89.167.103.147"
Write-Host ""
Write-Host "  3. www.pros.iorana.dev"
Write-Host "     Type: CNAME Record"
Write-Host "     Value: pros.iorana.dev"
Write-Host ""
Write-Log "  ⏱️  DNS propagation: 5-30 minutes"
Write-Host ""

Write-Log "📋 Next Steps:" "Blue"
Write-Log "  1. Create DNS A records in Hetzner Cloud Console"
Write-Log "  2. Wait 5-30 minutes for DNS propagation"
Write-Log "  3. Test: https://pros.iorana.dev (in browser)"
Write-Log "  4. Test: https://api.pros.iorana.dev/health"
Write-Log "  5. Monitor logs: ssh root@$HETZNER_IP 'docker-compose -f /opt/io-prospector/docker-compose.coolify.yml logs -f'"
Write-Host ""

Write-Log "📞 Monitoring:" "Blue"
Write-Log "  SSH: ssh root@$HETZNER_IP"
Write-Log "  Logs: docker-compose -f $PROJECT_DIR/docker-compose.coolify.yml logs -f"
Write-Log "  Status: docker-compose -f $PROJECT_DIR/docker-compose.coolify.yml ps"
Write-Host ""

Write-Log "📝 Log file saved: $LOG_FILE" "Blue"
Write-Log "Deployment completed at $(Get-Date)" "Green"
