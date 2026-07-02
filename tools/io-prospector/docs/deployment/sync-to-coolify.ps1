# SYNC TO COOLIFY - Sincronizar proyecto a servidor
param(
    [string]$SSHKey = "$env:USERPROFILE\.ssh\id_ed25519",
    [string]$RemoteServer = "root@168.119.53.118",
    [string]$RemotePath = "/apps/io-prospector",
    [string]$LocalPath = "E:\git\tools\io-prospector",
    [switch]$DryRun = $false
)

Write-Host "`n=== IO-PROSPECTOR SYNC ===" -ForegroundColor Cyan
Write-Host "Sincronizando a: $RemoteServer" -ForegroundColor Yellow

# Validar SSH key
if (-not (Test-Path $SSHKey)) {
    Write-Host "ERROR: SSH key no encontrada: $SSHKey" -ForegroundColor Red
    exit 1
}

Write-Host "✓ SSH key encontrada" -ForegroundColor Green

# Patrones de exclusión
$Excludes = @(
    "node_modules/",
    ".next/",
    ".git/",
    ".env",
    ".env.local",
    "dist/",
    "build/",
    ".DS_Store",
    "*.log"
)

# Construir comando rsync
$ExcludeArgs = $Excludes | ForEach-Object { "--exclude='$_'" } | Join-String -Separator " "
$RsyncCmd = "rsync.exe -avz --delete $ExcludeArgs -e `"ssh -i $SSHKey`" `"$LocalPath/`" `"$($RemoteServer):$RemotePath/`""

if ($DryRun) {
    $RsyncCmd = "rsync.exe --dry-run -avz --delete $ExcludeArgs -e `"ssh -i $SSHKey`" `"$LocalPath/`" `"$($RemoteServer):$RemotePath/`""
}

Write-Host "`nEjecutando rsync..." -ForegroundColor Yellow
Invoke-Expression $RsyncCmd

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✓ Sincronización completada" -ForegroundColor Green
    Write-Host "`nProximos pasos:" -ForegroundColor Yellow
    Write-Host "1. ssh -i ~/.ssh/id_ed25519 root@168.119.53.118" -ForegroundColor Cyan
    Write-Host "2. cd /apps/io-prospector" -ForegroundColor Cyan
    Write-Host "3. cat .env (copiar y pegar en Coolify Environment)" -ForegroundColor Cyan
} else {
    Write-Host "`nERROR: Falló la sincronización" -ForegroundColor Red
    exit 1
}
