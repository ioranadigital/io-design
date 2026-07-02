# ============================================================================
# VERIFY PORTS - Verificar disponibilidad de puertos
# ============================================================================
# Verifica que los puertos necesarios estén disponibles localmente
# y/o accesibles en el servidor Coolify

param(
    [ValidateSet("local", "remote", "both")]
    [string]$Check = "both",

    [string]$RemoteServer = "168.119.53.118",
    [string]$SSHKey = "$env:USERPROFILE\.ssh\id_ed25519"
)

$Green = "Green"
$Red = "Red"
$Yellow = "Yellow"
$Cyan = "Cyan"

Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor $Cyan
Write-Host "║  Verificar disponibilidad de puertos                           ║" -ForegroundColor $Cyan
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor $Cyan

# Puertos a verificar
$Ports = @{
    "Frontend"  = 3004
    "Backend"   = 4006
    "Redis"     = 6379
}

# ============================================================================
# VERIFICAR PUERTOS LOCALES
# ============================================================================

if ($Check -eq "local" -or $Check -eq "both") {
    Write-Host "`n🔍 Verificando puertos LOCALES..." -ForegroundColor $Yellow

    foreach ($service in $Ports.Keys) {
        $port = $Ports[$service]

        try {
            $result = Test-NetConnection -ComputerName localhost -Port $port -ErrorAction Stop -WarningAction SilentlyContinue

            if ($result.TcpTestSucceeded) {
                Write-Host "  ✓ Puerto $port ($service): DISPONIBLE" -ForegroundColor $Green
            }
            else {
                Write-Host "  ⚠ Puerto $port ($service): No respondiendo" -ForegroundColor $Yellow
            }
        }
        catch {
            Write-Host "  ❌ Puerto $port ($service): ERROR - $_" -ForegroundColor $Red
        }
    }
}

# ============================================================================
# VERIFICAR PUERTOS REMOTOS
# ============================================================================

if ($Check -eq "remote" -or $Check -eq "both") {
    Write-Host "`n🌍 Verificando puertos en SERVIDOR ($RemoteServer)..." -ForegroundColor $Yellow

    # Verificar SSH key
    if (-not (Test-Path $SSHKey)) {
        Write-Host "  ❌ SSH key no encontrada: $SSHKey" -ForegroundColor $Red
        return
    }

    foreach ($service in $Ports.Keys) {
        $port = $Ports[$service]

        try {
            $result = Test-NetConnection -ComputerName $RemoteServer -Port $port -ErrorAction Stop -WarningAction SilentlyContinue

            if ($result.TcpTestSucceeded) {
                Write-Host "  ✓ Puerto $port ($service): ACCESIBLE" -ForegroundColor $Green
            }
            else {
                Write-Host "  ⚠ Puerto $port ($service): No respondiendo" -ForegroundColor $Yellow
            }
        }
        catch {
            Write-Host "  ❌ Puerto $port ($service): ERROR - $_" -ForegroundColor $Red
        }
    }
}

# ============================================================================
# ESTADO DE CONTENEDORES (si están corriendo localmente)
# ============================================================================

if ($Check -eq "local" -or $Check -eq "both") {
    Write-Host "`n🐳 Estado de contenedores locales..." -ForegroundColor $Yellow

    $containerCheck = docker-compose ps 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✓ Docker Compose está disponible" -ForegroundColor $Green
        # Mostrar resumen
        docker-compose ps --format "table {{.Service}}\t{{.Status}}"
    }
    else {
        Write-Host "  ⚠ Docker Compose no está corriendo en esta dirección" -ForegroundColor $Yellow
    }
}

# ============================================================================
# RESUMEN
# ============================================================================

Write-Host "`n" -ForegroundColor $Cyan
Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor $Cyan
Write-Host "║  RESUMEN DE PUERTOS                                            ║" -ForegroundColor $Cyan
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor $Cyan

Write-Host "`nConfiguracion de puertos (from master.env):" -ForegroundColor $Cyan
Write-Host "  • Frontend:   localhost:3004 → container:3002"
Write-Host "  • Backend:    localhost:4006 → container:4000"
Write-Host "  • Redis:      localhost:6379 → container:6379"
Write-Host "`nSeridor Coolify:" -ForegroundColor $Cyan
Write-Host "  • URL:        http://$RemoteServer:8000"
Write-Host "  • Frontend:   http://$RemoteServer:3004"
Write-Host "  • Backend:    http://$RemoteServer:4006/api"
Write-Host "  • Redis:      $RemoteServer:6379 (internal)"

Write-Host "`n✅ Verificación completada" -ForegroundColor $Green
