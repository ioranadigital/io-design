# ⚡ QUICK START - Deploy a Hetzner en 1 Comando

**Status:** ✅ Completamente Automatizado

---

## 🚀 UN COMANDO PARA HACER TODO

### Opción 1: PowerShell (Windows) - RECOMENDADO
```powershell
.\deploy-to-hetzner.ps1
```

### Opción 2: Bash (Linux/Mac)
```bash
chmod +x deploy-to-hetzner.sh
./deploy-to-hetzner.sh
```

---

## ⏱️ QUÉ SUCEDE (Automáticamente)

El script ejecuta estos 8 pasos sin intervención:

```
1️⃣  Pre-flight checks (verificar SSH, .env, archivos)
2️⃣  Install Docker, Docker-compose, Nginx, Certbot en Hetzner
3️⃣  Crear directorios en /opt/io-prospector
4️⃣  Clonar repositorio desde git
5️⃣  Copiar .env a Hetzner
6️⃣  Build Docker images (5-10 min)
7️⃣  Deploy servicios (redis, backend, frontend)
8️⃣  Configurar SSL con Let's Encrypt
9️⃣  Verificar health checks

⏱️  TOTAL: ~30 minutos (incluye Docker build)
```

---

## 📋 ANTES DE EJECUTAR

✅ **OBLIGATORIO:**
- [ ] `.env` creado en el proyecto (con credenciales reales)
- [ ] SSH key configurada para conectar a `root@89.167.103.147`
- [ ] Git remoto configurado (`git remote -v`)
- [ ] Estar en el directorio del proyecto

✅ **RECOMENDADO:**
- [ ] Tener PowerShell 7+ (Windows)
- [ ] Tener git disponible en PATH
- [ ] Tener ssh disponible en PATH

---

## 🔧 OPCIONES AVANZADAS (PowerShell)

### Test Mode (No hace cambios reales)
```powershell
.\deploy-to-hetzner.ps1 -DryRun
```

### Skip SSH Check
```powershell
.\deploy-to-hetzner.ps1 -SkipSSHCheck
```

### Combinadas
```powershell
.\deploy-to-hetzner.ps1 -DryRun -SkipSSHCheck
```

---

## 📊 QUÉ VES DURANTE EL DEPLOY

```
════════════════════════════════════════
🚀 io-prospector FULL DEPLOYMENT
════════════════════════════════════════

Target: 89.167.103.147
Project: /opt/io-prospector

[14:32:01] PHASE 0: Pre-flight checks...
[14:32:01] ✅ .env found locally
[14:32:02] ✅ SSH connectivity OK
[14:32:02] PHASE 1: Installing dependencies...
[14:32:15] ✅ Dependencies installed
[14:32:20] PHASE 2: Creating directories...
[14:32:21] ✅ Directories created
[14:32:25] PHASE 3: Cloning repository...
[14:32:45] ✅ Repository cloned
[14:32:50] PHASE 4: Copying .env...
[14:32:51] ✅ .env copied
[14:32:55] PHASE 5: Building Docker images... (this takes 5-10 min)
[14:43:20] ✅ Docker deployment completed
[14:43:50] PHASE 6: Verifying services...
[14:43:51] ✅ Backend is healthy
[14:43:51] ✅ Frontend responding
[14:44:00] PHASE 7: Setting up SSL...
[14:44:20] ✅ SSL configuration completed
[14:44:21] PHASE 8: Final status...
[14:44:22] ✅ Status check completed

════════════════════════════════════════
✅ DEPLOYMENT SUCCESSFUL!
════════════════════════════════════════

📊 Summary:
  IP:       89.167.103.147
  Frontend: http://89.167.103.147:3004
  Backend:  http://89.167.103.147:4006
  
⚠️  IMPORTANTE - Configure DNS Records:
  1. pros.iorana.dev → A record → 89.167.103.147
  2. api.pros.iorana.dev → A record → 89.167.103.147
  3. www.pros.iorana.dev → CNAME → pros.iorana.dev

📋 Next Steps:
  1. Create DNS records in Hetzner (5 min)
  2. Wait for DNS propagation (5-30 min)
  3. Test: https://pros.iorana.dev
  4. Monitor: docker logs
```

---

## 🔒 VERIFICACIÓN DESPUÉS DEL DEPLOY

El script automáticamente:
- ✅ Verifica que los servicios estén running
- ✅ Hace health check al backend
- ✅ Verifica que el frontend responde
- ✅ Configura Let's Encrypt SSL
- ✅ Muestra los logs

---

## ⚡ DESPUÉS DEL DEPLOYMENT

### 1. Configure DNS (Manual - 5 min)
```
En Hetzner Cloud Console:
  DNS Zone ID: 1366135
  
  Crear 3 records:
  - pros.iorana.dev          → A → 89.167.103.147
  - api.pros.iorana.dev      → A → 89.167.103.147
  - www.pros.iorana.dev      → CNAME → pros.iorana.dev
```

### 2. Esperar DNS propagation (5-30 min)
```bash
# Verificar DNS propagado
nslookup pros.iorana.dev
# Debe retornar: 89.167.103.147

# O verificar localmente
ping pros.iorana.dev
```

### 3. Test endpoints
```bash
# Frontend (HTTP)
curl http://89.167.103.147:3004

# Backend API (HTTP)
curl http://89.167.103.147:4006/health

# Después que DNS propague:
# Frontend (HTTPS)
curl https://pros.iorana.dev

# Backend (HTTPS)
curl https://api.pros.iorana.dev/health
```

### 4. Monitorear logs
```bash
# SSH a Hetzner
ssh root@89.167.103.147

# Ver logs en tiempo real
cd /opt/io-prospector
docker-compose -f docker-compose.coolify.yml logs -f

# Ver logs de servicio específico
docker-compose -f docker-compose.coolify.yml logs -f backend
docker-compose -f docker-compose.coolify.yml logs -f frontend
```

---

## 🆘 TROUBLESHOOTING

### SSH connection denied
```bash
# Verificar SSH key está configurada
ssh-add ~/.ssh/id_rsa

# Verificar puedes conectar manualmente
ssh root@89.167.103.147 "echo test"
```

### .env not found
```bash
# Crear desde ejemplo
cp .env.example .env

# Editar con valores reales
nano .env
```

### Docker build falla
```bash
# Verificar Docker logs
ssh root@89.167.103.147

# Ir a proyecto
cd /opt/io-prospector

# Ver logs del build
docker-compose -f docker-compose.coolify.yml logs backend
```

### Services no inician
```bash
# SSH y verificar
ssh root@89.167.103.147

# Ver status
docker-compose -f /opt/io-prospector/docker-compose.coolify.yml ps

# Reiniciar servicios
docker-compose -f /opt/io-prospector/docker-compose.coolify.yml restart

# Ver logs
docker-compose -f /opt/io-prospector/docker-compose.coolify.yml logs -f
```

---

## 📞 MONITOREO CONTINUO

```bash
# SSH a Hetzner
ssh root@89.167.103.147

# Stats en tiempo real
docker stats

# Logs en tiempo real
docker-compose -f /opt/io-prospector/docker-compose.coolify.yml logs -f

# Health de Redis
docker exec io-prospector-redis redis-cli ping
# Respuesta esperada: PONG

# Health de Backend
curl http://localhost:4006/health
# Respuesta esperada: {"status":"ok"} o similar
```

---

## 📝 LOG FILES

El script crea un archivo de log:
```
deployment_2026-06-26_14-32-45.log
```

Contiene TODO lo que pasó. Útil para debugging.

---

## ✅ CONFIRMACIÓN

Cuando el script termine mostrará:

```
✅ DEPLOYMENT SUCCESSFUL!

Endpoints:
  Frontend (HTTP):  http://89.167.103.147:3004
  Backend (HTTP):   http://89.167.103.147:4006
  
Después de DNS propagation:
  Frontend (HTTPS): https://pros.iorana.dev
  Backend (HTTPS):  https://api.pros.iorana.dev/api

Next:
  1. Configure DNS records
  2. Wait for DNS propagation
  3. Test endpoints
  4. Monitor logs
```

---

## 🎯 RESUMEN

```
1. Ejecuta: .\deploy-to-hetzner.ps1
2. Espera ~30 min (Docker build)
3. Configure DNS records (5 min, manual)
4. Espera DNS propagation (5-30 min)
5. Test: https://pros.iorana.dev
6. Done! 🎉
```

---

**Total Time:** ~1 hora (incluye DNS propagation)  
**Automation Level:** 99% (solo DNS manual)  
**Status:** ✅ Ready to Deploy
