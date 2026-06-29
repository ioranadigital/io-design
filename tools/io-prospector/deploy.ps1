# 🚀 DEPLOY SCRIPT - io-prospector to Hetzner (Windows PowerShell)
# ===============================================================
# Usage: .\deploy.ps1 -Environment production
# Requires: .env configured, Docker, docker-compose

param(
    [ValidateSet('production', 'staging')]
    [string]$Environment = 'production',
    [switch]$NoCache = $false
)

# Setup
$ErrorActionPreference = "Stop"
$Timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$LogDir = Join-Path $PSScriptRoot "logs"
$LogFile = Join-Path $LogDir "deploy_${Timestamp}.log"

if (-not (Test-Path $LogDir)) {
    New-Item -ItemType Directory -Path $LogDir -Force | Out-Null
}

# Colors (Windows 10+ supports ANSI)
$colors = @{
    Red    = "`e[0;31m"
    Green  = "`e[0;32m"
    Yellow = "`e[1;33m"
    Reset  = "`e[0m"
}

function Write-Log {
    param([string]$Message, [string]$Color = "Reset")
    $timestamp = Get-Date -Format "HH:mm:ss"
    $output = "[$timestamp] $Message"
    Write-Host "$($colors[$Color])$output$($colors['Reset'])" | Tee-Object -FilePath $LogFile -Append
}

function Write-Step {
    param([int]$Number, [string]$Description)
    Write-Log "[Step $Number/8] $Description" "Yellow"
}

Write-Log "🚀 Starting deployment to $Environment" "Green"
Write-Log "Log file: $LogFile" "Green"
Write-Log "" "Reset"

# ==========================================
# 1. VALIDATE PREREQUISITES
# ==========================================
Write-Step 1 "Validating prerequisites..."

try {
    $dockerVersion = docker --version
    Write-Log "✅ Docker found: $dockerVersion" "Green"
} catch {
    Write-Log "❌ Docker not found or not in PATH" "Red"
    exit 1
}

try {
    $composeVersion = docker-compose --version
    Write-Log "✅ Docker Compose found: $composeVersion" "Green"
} catch {
    Write-Log "❌ Docker Compose not found or not in PATH" "Red"
    exit 1
}

# Check .env file
if (-not (Test-Path ".env")) {
    Write-Log "❌ .env file not found. Copy .env.example and configure it." "Red"
    exit 1
}
Write-Log "✅ .env file found" "Green"

# Check required env variables
$requiredVars = @(
    "SUPABASE_URL",
    "SUPABASE_KEY",
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "FRONTEND_URL",
    "NEXT_PUBLIC_API_URL"
)

$envContent = Get-Content ".env" -Raw
foreach ($var in $requiredVars) {
    if ($envContent -notmatch "^${var}=") {
        Write-Log "❌ Required env variable missing: $var" "Red"
        exit 1
    }
}
Write-Log "✅ All required env variables present" "Green"

# ==========================================
# 2. VALIDATE DOCKERFILES
# ==========================================
Write-Step 2 "Validating Dockerfiles..."

if (-not (Test-Path "backend.Dockerfile")) {
    Write-Log "❌ backend.Dockerfile not found" "Red"
    exit 1
}
Write-Log "✅ backend.Dockerfile found" "Green"

if (-not (Test-Path "frontend.Dockerfile")) {
    Write-Log "❌ frontend.Dockerfile not found" "Red"
    exit 1
}
Write-Log "✅ frontend.Dockerfile found" "Green"

# ==========================================
# 3. SELECT COMPOSE FILE
# ==========================================
Write-Step 3 "Selecting docker-compose configuration..."

if ($Environment -eq "production") {
    $ComposeFile = "docker-compose.coolify.yml"
} else {
    $ComposeFile = "docker-compose.yml"
}

if (-not (Test-Path $ComposeFile)) {
    Write-Log "❌ $ComposeFile not found" "Red"
    exit 1
}
Write-Log "✅ Using: $ComposeFile" "Green"

# ==========================================
# 4. BUILD DOCKER IMAGES
# ==========================================
Write-Step 4 "Building Docker images..."

# Load .env
$envContent = Get-Content ".env"
foreach ($line in $envContent) {
    if ($line -and -not $line.StartsWith("#")) {
        $key, $value = $line -split "=", 2
        [Environment]::SetEnvironmentVariable($key.Trim(), $value.Trim(), "Process")
    }
}

$buildArgs = if ($NoCache) { "--no-cache" } else { "" }

Write-Log "Running: docker-compose -f $ComposeFile build $buildArgs" "Yellow"
& docker-compose -f $ComposeFile build $buildArgs | Tee-Object -FilePath $LogFile -Append

if ($LASTEXITCODE -ne 0) {
    Write-Log "❌ Build failed. Check logs: $LogFile" "Red"
    exit 1
}
Write-Log "✅ Images built successfully" "Green"

# ==========================================
# 5. STOP EXISTING CONTAINERS
# ==========================================
Write-Step 5 "Stopping existing containers..."

& docker-compose -f $ComposeFile down 2>&1 | Tee-Object -FilePath $LogFile -Append -ErrorAction SilentlyContinue

Write-Log "✅ Old containers stopped (or didn't exist)" "Green"

# ==========================================
# 6. START NEW CONTAINERS
# ==========================================
Write-Step 6 "Starting new containers..."

Write-Log "Running: docker-compose -f $ComposeFile up -d" "Yellow"
& docker-compose -f $ComposeFile up -d | Tee-Object -FilePath $LogFile -Append

if ($LASTEXITCODE -ne 0) {
    Write-Log "❌ Failed to start containers" "Red"
    & docker-compose -f $ComposeFile logs | Tee-Object -FilePath $LogFile -Append
    exit 1
}
Write-Log "✅ Containers started" "Green"

# ==========================================
# 7. WAIT FOR HEALTH
# ==========================================
Write-Step 7 "Waiting for services to initialize..."

Start-Sleep -Seconds 5

# Wait for backend
Write-Log "Checking backend health..." "Yellow"
$healthyAttempts = 0
for ($i = 1; $i -le 30; $i++) {
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:4006/health" -Method GET -ErrorAction Stop -TimeoutSec 2
        if ($response.StatusCode -eq 200) {
            Write-Log "✅ Backend is healthy" "Green"
            $healthyAttempts = 1
            break
        }
    } catch {
        # Try alternative port
        try {
            $response = Invoke-WebRequest -Uri "http://localhost:4000/health" -Method GET -ErrorAction Stop -TimeoutSec 2
            if ($response.StatusCode -eq 200) {
                Write-Log "✅ Backend is healthy (port 4000)" "Green"
                $healthyAttempts = 1
                break
            }
        } catch {
            Write-Log "  Attempt $i/30... (waiting for backend)" "Yellow"
            Start-Sleep -Seconds 2
        }
    }
}

# Check frontend
Write-Log "Checking frontend..." "Yellow"
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3004" -Method GET -ErrorAction Stop -TimeoutSec 2
    if ($response.StatusCode -eq 200) {
        Write-Log "✅ Frontend is accessible" "Green"
    }
} catch {
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:3002" -Method GET -ErrorAction Stop -TimeoutSec 2
        if ($response.StatusCode -eq 200) {
            Write-Log "✅ Frontend is accessible (port 3002)" "Green"
        }
    } catch {
        Write-Log "⚠️  Frontend might still be starting..." "Yellow"
    }
}

# ==========================================
# 8. SUMMARY
# ==========================================
Write-Log "" "Reset"
Write-Log "═══════════════════════════════════════" "Green"
Write-Log "🎉 DEPLOYMENT SUCCESSFUL!" "Green"
Write-Log "═══════════════════════════════════════" "Green"
Write-Log "" "Reset"

Write-Log "Environment: $Environment" "Reset"
Write-Log "Log file: $LogFile" "Reset"
Write-Log "" "Reset"

Write-Log "Services:" "Yellow"
& docker-compose -f $ComposeFile ps | Tee-Object -FilePath $LogFile -Append

Write-Log "" "Reset"
Write-Log "🔗 Endpoints:" "Yellow"
Write-Log "  Frontend: http://localhost:3004 (or https://pros.iorana.dev)" "Reset"
Write-Log "  Backend:  http://localhost:4006 (or https://api.pros.iorana.dev)" "Reset"
Write-Log "" "Reset"

Write-Log "Next steps:" "Yellow"
Write-Log "  1. Verify frontend loads correctly" "Reset"
Write-Log "  2. Check backend API responses" "Reset"
Write-Log "  3. Review logs: docker-compose logs -f" "Reset"
Write-Log "  4. Monitor: docker stats" "Reset"
Write-Log "" "Reset"

Write-Log "Deployment complete! ✅" "Green"
