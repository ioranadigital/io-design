# 🚀 IO-Prospector: Guía Completa de Despliegue en Coolify

**Servidor:** 168.119.53.118  
**Panel Coolify:** http://168.119.53.118:8000  
**Frontend:** Puerto 3004  
**Backend:** Puerto 4006  
**Redis:** Puerto 6379

---

## 📋 PRERREQUISITOS

- ✅ SSH key ed25519 en `~/.ssh/id_ed25519`
- ✅ rsync instalado (`choco install rsync` en Windows)
- ✅ Acceso a Coolify panel (token en master.env)
- ✅ Proyecto sincronizado en `/apps/io-prospector` del servidor

---

## 🔄 PASO 1: SINCRONIZAR CÓDIGO AL SERVIDOR

### Opción A: Script PowerShell (Recomendado)

```powershell
# Ejecutar desde E:\git\tools\io-prospector\

cd E:\git\tools\io-prospector
.\docs\deployment\sync-to-coolify.ps1 -DryRun

# Si se ve bien, ejecutar sin -DryRun
.\docs\deployment\sync-to-coolify.ps1
```

**Qué hace:**

- ✓ Conecta via SSH con tu clave id_ed25519
- ✓ Sincroniza archivos a `/apps/io-prospector`
- ✓ Excluye node_modules, .next, .git, .env local
- ✓ Mantiene permisos y estructura intacta

### Opción B: Manual rsync (Linux/Git Bash)

```bash
rsync -avz --delete \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='.env' \
  --exclude='.git' \
  --exclude='dist' \
  -e 'ssh -i ~/.ssh/id_ed25519' \
  . root@168.119.53.118:/apps/io-prospector/
```

---

## ✅ PASO 2: VERIFICAR ESTRUCTURA EN SERVIDOR

```bash
# SSH al servidor
ssh -i ~/.ssh/id_ed25519 root@168.119.53.118

# Verificar estructura
ls -la /apps/io-prospector/
tree -L 2 /apps/io-prospector/ -I 'node_modules|.next'
```

**Estructura esperada:**

```
/apps/io-prospector/
├── docker-compose.yml     ✓
├── backend.Dockerfile      ✓
├── frontend.Dockerfile     ✓
├── .env.example            ✓
├── backend/
│   ├── package.json
│   ├── server.js
│   └── ...
├── frontend/
│   ├── package.json
│   ├── next.config.js
│   └── ...
└── docs/
    └── deployment/
```

---

## 🔐 PASO 3: CREAR .env.production EN SERVIDOR

```bash
# SSH al servidor
ssh -i ~/.ssh/id_ed25519 root@168.119.53.118

# Crear archivo .env en raiz del proyecto
cd /apps/io-prospector
cat > .env << 'ENV_EOF'
NODE_ENV=production
PORT=4000
FRONTEND_URL=https://tu-dominio.com

# Copiar valores desde master.env (NUNCA commitear credenciales)
NEXT_PUBLIC_SUPABASE_URL=https://zvehtloitnuglyjtxwye.supabase.co
SUPABASE_URL=https://zvehtloitnuglyjtxwye.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Redis
REDIS_URL=redis://redis:6379
REDIS_HOST=redis

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=honatuya@gmail.com
SMTP_PASS=syolrxhccvaijkql
SMTP_FROM=honatuya <honatuya@gmail.com>

# Google APIs
GOOGLE_PLACES_API_KEY=AIzaSyCv5opVvfi_5RHfzjlLIFC1_xUaKOTqLmI
GOOGLE_MAPS_API_KEY=AIzaSyCv5opVvfi_5RHfzjlLIFC1_xUaKOTqLmI

# Logging
LOG_LEVEL=info

# Ports
IO_PROSPECTOR_FRONTEND_PORT=3004
IO_PROSPECTOR_BACKEND_PORT=4006
ENV_EOF

# Verificar archivo
cat .env | head -10

# Asegurar permisos
chmod 600 .env
```

**IMPORTANTE:**

- 🔒 Nunca subir .env a Git
- 🔒 Solo variables sensibles en .env.production
- 🔒 Variables públicas (NEXT*PUBLIC*\*) pueden estar en docker-compose.yml

---

## 🐳 PASO 4: CONSTRUIR IMÁGENES DOCKER

```bash
# SSH al servidor
ssh -i ~/.ssh/id_ed25519 root@168.119.53.118

cd /apps/io-prospector

# Verificar docker-compose
docker-compose --version
docker --version

# Construir imágenes (tomará ~5-10 minutos)
docker-compose build --progress=plain

# Verificar imágenes creadas
docker images | grep io-prospector
```

**Esperar a que termine:**

- ✓ `io-prospector-backend` construida
- ✓ `io-prospector-frontend` construida
- ✓ `redis:7-alpine` descargada

---

## 🚀 PASO 5: INICIAR CONTENEDORES

```bash
# SSH al servidor
ssh -i ~/.ssh/id_ed25519 root@168.119.53.118

cd /apps/io-prospector

# Crear volúmenes si no existen
docker volume create redis_data

# Iniciar servicios
docker-compose up -d

# Verificar estado
docker-compose ps

# Ver logs
docker-compose logs -f frontend    # Terminal 1
docker-compose logs -f backend     # Terminal 2
docker-compose logs -f redis       # Terminal 3
```

**Expected output:**

```
NAME                      COMMAND                  SERVICE             STATUS              PORTS
io-prospector-backend     docker-entrypoint.s…   backend             Up 2 minutes        4006->4000/tcp
io-prospector-frontend    docker-entrypoint.s…   frontend            Up 2 minutes        3004->3002/tcp
io-prospector-redis       redis-server --appe…   redis               Up 2 minutes        6379->6379/tcp
```

---

## 🌍 PASO 6: CONFIGURAR COOLIFY (Panel Web)

### 6.1 Acceder al Panel

```
URL: http://168.119.53.118:8000
```

### 6.2 Crear Proyecto Nuevo

1. **Settings → Projects** → Click "New Project"
2. **Project Name:** `IO-Prospector`
3. **Description:** `Herramienta de prospección SEO`
4. Click **Create**

### 6.3 Crear Aplicación (App)

1. **Your Project → Applications** → Click "New Application"
2. **Type:** Docker Compose
3. **Name:** `io-prospector`
4. **Dockerfile Location:** `.` (raíz del proyecto)
5. Click **Create**

### 6.4 Configurar Build

1. **Build → Build Command:**

   ```bash
   docker-compose build --progress=plain
   ```

2. **Build → Dockerfile (opcional):**
   - Leave empty (usando docker-compose.yml)

3. **Build → Build Context:**
   ```
   /apps/io-prospector
   ```

### 6.5 Configurar Start/Stop

**Start Command:**

```bash
docker-compose up -d
```

**Stop Command:**

```bash
docker-compose down
```

**Health Check:**

```
http://localhost:4000/health
Timeout: 30s
```

### 6.6 Configurar Puertos (Networking)

1. **Network → Expose Ports**
2. Agregar:
   - **Frontend:** `3004:3002` (Public)
   - **Backend:** `4006:4000` (Public)
   - **Redis:** `6379:6379` (Private - solo localhost)

### 6.7 Configurar Dominios (Opcional)

Si tienes dominio configurado:

1. **Network → Domains**
2. **Frontend Domain:** `prospector.tu-dominio.com`
   - Point to: `http://localhost:3004`
3. **Backend Domain:** `api-prospector.tu-dominio.com`
   - Point to: `http://localhost:4006/api`

### 6.8 Configurar Variables de Entorno

1. **Environment → .env File**
2. Copiar contenido de `.env.production` que creamos arriba
3. **Save** y **Deploy**

---

## 📊 PASO 7: VERIFICAR DESPLIEGUE

### Desde tu máquina local:

```bash
# Frontend
curl http://168.119.53.118:3004

# Backend
curl http://168.119.53.118:4006/api/health

# Redis
redis-cli -h 168.119.53.118 ping
```

### Desde el servidor:

```bash
ssh -i ~/.ssh/id_ed25519 root@168.119.53.118

cd /apps/io-prospector

# Ver logs detallados
docker-compose logs frontend
docker-compose logs backend
docker-compose logs redis

# Ejecutar health checks
docker exec io-prospector-backend node -e "require('http').get('http://localhost:4000/health', (r) => console.log('Status:', r.statusCode))"
docker exec io-prospector-frontend node -e "require('http').get('http://localhost:3002/', (r) => console.log('Status:', r.statusCode))"
```

---

## 🔄 PASO 8: CONFIGURAR CI/CD (OPCIONAL)

### 8.1 Webhook automático en Coolify

En panel Coolify:

```
Settings → Webhooks
URL: http://168.119.53.118:8000/api/webhooks/deploy

Trigger on: Push to main branch
```

### 8.2 GitHub Actions (para auto-deploy)

Crear `.github/workflows/deploy-coolify.yml`:

```yaml
name: Deploy to Coolify

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Sync to Coolify
        run: |
          mkdir -p ~/.ssh
          echo "${{ secrets.SSH_PRIVATE_KEY }}" > ~/.ssh/id_ed25519
          chmod 600 ~/.ssh/id_ed25519
          ssh-keyscan -H 168.119.53.118 >> ~/.ssh/known_hosts

          rsync -avz --delete \
            --exclude='node_modules' \
            --exclude='.next' \
            --exclude='.git' \
            -e 'ssh -i ~/.ssh/id_ed25519' \
            . root@168.119.53.118:/apps/io-prospector/

      - name: Rebuild & Restart
        run: |
          ssh -i ~/.ssh/id_ed25519 root@168.119.53.118 << 'EOF'
          cd /apps/io-prospector
          docker-compose build --progress=plain
          docker-compose restart
          docker-compose ps
          EOF
```

---

## 🐛 TROUBLESHOOTING

### ❌ "Connection refused" en puerto 3004/4006

```bash
# Verificar contenedores en ejecución
docker ps | grep io-prospector

# Reiniciar servicio específico
docker-compose restart frontend
docker-compose restart backend

# Ver logs
docker-compose logs -f frontend
```

### ❌ "Redis connection timeout"

```bash
# Verificar Redis
docker exec io-prospector-redis redis-cli ping

# Reiniciar Redis
docker-compose restart redis
docker-compose logs redis
```

### ❌ "Build failed: Cannot find module"

```bash
# Limpiar y reconstruir
docker-compose down
docker-compose build --no-cache --progress=plain

# Verificar node_modules
docker exec io-prospector-backend ls -la node_modules | head -5
```

### ❌ ".env not found"

```bash
# Verificar archivo existe
ls -la /apps/io-prospector/.env

# Si falta, crear desde .env.example
cp /apps/io-prospector/.env.example /apps/io-prospector/.env

# Editar con valores reales
nano /apps/io-prospector/.env
```

### ❌ "Port already in use"

```bash
# Buscar procesos usando puertos
lsof -i :3004
lsof -i :4006
lsof -i :6379

# Matar procesos (si es necesario)
kill -9 <PID>

# O cambiar puertos en docker-compose.yml
# ports:
#   - "3005:3002"  # Cambiar a 3005
#   - "4007:4000"  # Cambiar a 4007
```

---

## 📈 MONITOREO Y MANTENIMIENTO

### Ver estado en tiempo real:

```bash
ssh -i ~/.ssh/id_ed25519 root@168.119.53.118

# Dashboard en vivo
watch 'docker stats io-prospector-*'

# Logs en tiempo real
docker-compose logs -f --tail=50
```

### Backups de Redis:

```bash
# Backup manual
docker exec io-prospector-redis redis-cli BGSAVE

# Copiar archivo de backup
docker cp io-prospector-redis:/data/dump.rdb ./redis-backup.rdb

# Restaurar si es necesario
docker cp ./redis-backup.rdb io-prospector-redis:/data/dump.rdb
docker-compose restart redis
```

### Actualizar código (después de git push):

```bash
# Desde tu máquina local
.\docs\deployment\sync-to-coolify.ps1

# Luego SSH al servidor
ssh -i ~/.ssh/id_ed25519 root@168.119.53.118
cd /apps/io-prospector

# Reconstruir e iniciar
docker-compose build
docker-compose restart frontend backend
docker-compose ps
```

---

## ✅ CHECKLIST DE DESPLIEGUE

- [ ] Sincronizar código: `sync-to-coolify.ps1`
- [ ] Crear `.env.production` en servidor
- [ ] Construir imágenes: `docker-compose build`
- [ ] Iniciar contenedores: `docker-compose up -d`
- [ ] Verificar logs sin errores
- [ ] Crear proyecto en Coolify panel
- [ ] Configurar puertos (3004, 4006)
- [ ] Configurar variables .env
- [ ] Probar acceso a http://168.119.53.118:3004
- [ ] Probar API en http://168.119.53.118:4006/api/health
- [ ] (Opcional) Configurar dominios
- [ ] (Opcional) Configurar CI/CD webhook

---

## 📞 SOPORTE

**Panel Coolify:** http://168.119.53.118:8000  
**Frontend:** http://168.119.53.118:3004  
**Backend API:** http://168.119.53.118:4006/api  
**SSH:** `ssh -i ~/.ssh/id_ed25519 root@168.119.53.118`

**Comandos rápidos:**

```powershell
# Sync
.\docs\deployment\sync-to-coolify.ps1

# Logs (en servidor)
docker-compose logs -f

# Status
docker-compose ps

# Stop all
docker-compose down
```

---

**Última actualización:** 2026-07-02  
**Versión:** 1.0  
**Status:** ✅ Listo para producción
