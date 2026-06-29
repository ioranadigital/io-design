# 📤 COPY .env TO HETZNER
# PowerShell script para copiar .env correctamente

$HETZNER_IP = "89.167.103.147"
$HETZNER_USER = "root"
$LOCAL_ENV = "E:\git\tools\io-prospector\.env"
$REMOTE_PATH = "/opt/io-prospector/.env"

Write-Host "📤 Copiando .env a Hetzner..." -ForegroundColor Cyan
Write-Host "De: $LOCAL_ENV" -ForegroundColor Gray
Write-Host "A:  $HETZNER_USER@$HETZNER_IP:$REMOTE_PATH" -ForegroundColor Gray
Write-Host ""

# Verificar que .env existe localmente
if (-not (Test-Path $LOCAL_ENV)) {
    Write-Host "❌ ERROR: .env no encontrado en $LOCAL_ENV" -ForegroundColor Red
    exit 1
}

Write-Host "✅ .env encontrado localmente" -ForegroundColor Green

# Crear directorio remoto si no existe
Write-Host ""
Write-Host "Creando directorio remoto..." -ForegroundColor Yellow
ssh -o ConnectTimeout=5 ${HETZNER_USER}@${HETZNER_IP} "mkdir -p /opt/io-prospector" 2>&1 | grep -v "password" || $true

# Copiar archivo
Write-Host "Copiando archivo..." -ForegroundColor Yellow
scp -o ConnectTimeout=5 -o StrictHostKeyChecking=no $LOCAL_ENV ${HETZNER_USER}@${HETZNER_IP}:${REMOTE_PATH}

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ .env copiado exitosamente" -ForegroundColor Green
    Write-Host ""

    # Verificar que se copió correctamente
    Write-Host "Verificando..." -ForegroundColor Yellow
    ssh -o ConnectTimeout=5 ${HETZNER_USER}@${HETZNER_IP} "test -f /opt/io-prospector/.env && echo '✅ .env presente en Hetzner' || echo '❌ Verificación falló'"

    Write-Host ""
    Write-Host "🎉 ¡Listo! Ahora ejecuta:" -ForegroundColor Green
    Write-Host "  ssh root@89.167.103.147" -ForegroundColor Cyan
    Write-Host "  cd /opt/io-prospector" -ForegroundColor Cyan
    Write-Host "  bash COMPLETE-DEPLOYMENT.sh" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "⚠️ SCP falló. Intentando método alternativo..." -ForegroundColor Yellow
    Write-Host ""

    # Método alternativo: Enviar contenido vía SSH
    Write-Host "Enviando .env vía SSH directamente..." -ForegroundColor Yellow

    # Leer contenido del .env
    $envContent = Get-Content $LOCAL_ENV -Raw

    # Escapar comillas y crear comando
    $escapedContent = $envContent -replace '"', '\"'

    # Crear archivo en Hetzner
    ssh ${HETZNER_USER}@${HETZNER_IP} @"
mkdir -p /opt/io-prospector
cat > /opt/io-prospector/.env << 'EOF'
$envContent
EOF
echo "✅ .env creado via SSH"
"@

    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ .env enviado exitosamente vía SSH" -ForegroundColor Green
    } else {
        Write-Host "❌ Error al enviar .env" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "📝 PRÓXIMO PASO:" -ForegroundColor Cyan
Write-Host "════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "SSH a Hetzner y ejecuta el deployment:" -ForegroundColor Yellow
Write-Host ""
Write-Host "  ssh root@89.167.103.147" -ForegroundColor Cyan
Write-Host ""
Write-Host "Luego en la terminal SSH:" -ForegroundColor Yellow
Write-Host ""
Write-Host "  cd /opt/io-prospector" -ForegroundColor Cyan
Write-Host "  bash COMPLETE-DEPLOYMENT.sh" -ForegroundColor Cyan
Write-Host ""
