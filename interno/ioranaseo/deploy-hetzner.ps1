# ============================================================================
# IoranaSEO Hetzner Deployment Script (PowerShell)
# ============================================================================
# Usage: .\deploy-hetzner.ps1 -SSHHost "user@ip" -DeployPath "/opt/ioranaseo"
# ============================================================================

param(
    [string]$SSHHost = "",
    [string]$DeployPath = "/opt/ioranaseo",
    [int]$Port = 3005,
    [string]$Domain = "iorana.dev"
)

$ErrorActionPreference = "Stop"

function Write-Section {
    param([string]$Message)
    Write-Host "`n========================================" -ForegroundColor Cyan
    Write-Host $Message -ForegroundColor Cyan
    Write-Host "========================================`n" -ForegroundColor Cyan
}

function Write-Step {
    param([string]$Message, [int]$Step, [int]$Total)
    Write-Host "[$Step/$Total] $Message" -ForegroundColor Yellow
}

Write-Section "IoranaSEO Hetzner Deployment"

if ([string]::IsNullOrEmpty($SSHHost)) {
    Write-Host "Usage: .\deploy-hetzner.ps1 -SSHHost 'user@ip.address'" -ForegroundColor Red
    Write-Host "`nExample:" -ForegroundColor Yellow
    Write-Host "  .\deploy-hetzner.ps1 -SSHHost 'root@192.168.1.100' -DeployPath '/opt/ioranaseo'" -ForegroundColor Green
    exit 1
}

# ============================================================================
# STEP 1: SSH Connection Test
# ============================================================================
Write-Step "Testing SSH connection..." 1 5

try {
    $null = ssh $SSHHost "echo 'SSH connection successful'" 2>$null
    Write-Host "✓ SSH connection successful" -ForegroundColor Green
}
catch {
    Write-Host "✗ SSH connection failed" -ForegroundColor Red
    Write-Host "Make sure you can SSH manually: ssh $SSHHost" -ForegroundColor Yellow
    exit 1
}

# ============================================================================
# STEP 2: Copy Deploy Script
# ============================================================================
Write-Step "Uploading deployment script..." 2 5

$scriptPath = "$(Get-Location)\deploy-hetzner.sh"
$remoteDeployPath = "$DeployPath/deploy-hetzner.sh"

Write-Host "Copying script to server..."
scp $scriptPath "${SSHHost}:${remoteDeployPath}"
Write-Host "✓ Script uploaded" -ForegroundColor Green

# ============================================================================
# STEP 3: Execute Remote Deployment
# ============================================================================
Write-Step "Executing deployment on Hetzner..." 3 5

Write-Host "Running deployment script on remote server..."
ssh $SSHHost "chmod +x $remoteDeployPath && bash $remoteDeployPath '$DeployPath' '$Port' '$Domain'"

if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Deployment script failed" -ForegroundColor Red
    exit 1
}

Write-Host "✓ Deployment script completed" -ForegroundColor Green

# ============================================================================
# STEP 4: Verify Deployment
# ============================================================================
Write-Step "Verifying deployment..." 4 5

Write-Host "Checking application status..."
$appStatus = ssh $SSHHost "curl -s -o /dev/null -w '%{http_code}' http://localhost:$Port"

if ($appStatus -eq "200") {
    Write-Host "✓ Application is running (HTTP $appStatus)" -ForegroundColor Green
}
else {
    Write-Host "⚠ Application returned HTTP $appStatus" -ForegroundColor Yellow
    Write-Host "  Check logs: ssh $SSHHost 'pm2 logs ioranaseo'" -ForegroundColor Yellow
}

# ============================================================================
# STEP 5: Display Summary
# ============================================================================
Write-Section "Deployment Summary"

Write-Host "Application deployed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Access your application:" -ForegroundColor Cyan
Write-Host "  Web: https://$Domain" -ForegroundColor Blue
Write-Host "  SSH: ssh $SSHHost" -ForegroundColor Blue
Write-Host ""
Write-Host "Useful commands:" -ForegroundColor Cyan
Write-Host "  ssh $SSHHost 'pm2 logs ioranaseo'        # View logs" -ForegroundColor Gray
Write-Host "  ssh $SSHHost 'pm2 status'               # Check status" -ForegroundColor Gray
Write-Host "  ssh $SSHHost 'pm2 restart ioranaseo'    # Restart" -ForegroundColor Gray
Write-Host "  ssh $SSHHost 'pm2 stop ioranaseo'       # Stop" -ForegroundColor Gray
Write-Host ""
Write-Host "✓ Deployment complete!" -ForegroundColor Green
