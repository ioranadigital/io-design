# 🚀 IO-Prospector: Deployment Documentation

**Versión:** 1.0  
**Fecha:** 2026-07-02  
**Status:** ✅ Ready for Production  
**Servidor Destino:** Coolify @ 168.119.53.118:8000

---

## 📋 ÍNDICE

1. **[QUICK-DEPLOY.md](QUICK-DEPLOY.md)** - Despliegue en 5 minutos ⚡
2. **[COOLIFY-DEPLOYMENT-GUIDE.md](COOLIFY-DEPLOYMENT-GUIDE.md)** - Guía completa y detallada 📖
3. **[sync-to-coolify.ps1](sync-to-coolify.ps1)** - Script de sincronización automático 🔄
4. **[verify-ports.ps1](verify-ports.ps1)** - Verificar puertos disponibles ✓

---

## 🎯 POR DÓNDE EMPEZAR

### 🏃 Si tienes prisa (5 min):

→ Lee **[QUICK-DEPLOY.md](QUICK-DEPLOY.md)**

### 🚀 Si haces despliegue por primera vez:

→ Lee **[COOLIFY-DEPLOYMENT-GUIDE.md](COOLIFY-DEPLOYMENT-GUIDE.md)** (completa)

### 🔧 Si ya lo has hecho antes:

```powershell
# Solo ejecuta esto:
.\sync-to-coolify.ps1
ssh -i ~/.ssh/id_ed25519 root@168.119.53.118
cd /apps/io-prospector
docker-compose build
docker-compose up -d
docker-compose ps
```

---

## 📦 ARCHIVOS GENERADOS EN ESTE DEPLOYMENT

### En raíz del proyecto:

| Archivo               | Descripción                         |
| --------------------- | ----------------------------------- |
| `backend.Dockerfile`  | ✅ Multi-stage builder para Express |
| `frontend.Dockerfile` | ✅ Multi-stage builder para Next.js |
| `.env.example`        | ✅ Template de variables de entorno |
| `docker-compose.yml`  | ✅ (Ya existía, verificado)         |

### En docs/deployment/:

| Archivo                       | Descripción                    |
| ----------------------------- | ------------------------------ |
| `QUICK-DEPLOY.md`             | Guía rápida (5 min)            |
| `COOLIFY-DEPLOYMENT-GUIDE.md` | Guía completa (30 min lectura) |
| `sync-to-coolify.ps1`         | Script de sincronización SSH   |
| `verify-ports.ps1`            | Verificar puertos              |
| `README.md`                   | Este archivo                   |

---

## 🏗️ ARQUITECTURA DEL DESPLIEGUE

```
LOCAL MACHINE (Windows)
├── E:\git\tools\io-prospector\
│   ├── backend/
│   ├── frontend/
│   ├── docker-compose.yml
│   ├── backend.Dockerfile ✨ (NEW)
│   ├── frontend.Dockerfile ✨ (NEW)
│   ├── .env.example ✨ (NEW)
│   └── docs/deployment/
│       ├── sync-to-coolify.ps1 ✨ (NEW)
│       ├── verify-ports.ps1 ✨ (NEW)
│       └── COOLIFY-DEPLOYMENT-GUIDE.md ✨ (NEW)
│
SSH (rsync)
│
↓
│
COOLIFY SERVER (168.119.53.118)
├── /apps/io-prospector/
│   ├── backend/
│   ├── frontend/
│   ├── docker-compose.yml
│   ├── backend.Dockerfile
│   ├── frontend.Dockerfile
│   ├── .env (CREADO MANUALMENTE)
│   └── ...
│
DOCKER (En servidor)
│
├── io-prospector-frontend:latest
│   ├── Port: 3004 → 3002
│   ├── Service: Next.js + npm start
│   └── Health: GET http://localhost:3002/
│
├── io-prospector-backend:latest
│   ├── Port: 4006 → 4000
│   ├── Service: Express + node server.js
│   └── Health: GET http://localhost:4000/health
│
└── redis:7-alpine
    ├── Port: 6379 → 6379
    ├── Service: Redis cache
    └── Health: redis-cli ping
```

---

## ⚡ COMANDOS RÁPIDOS

```powershell
# 1. SINCRONIZAR CÓDIGO
.\docs\deployment\sync-to-coolify.ps1

# 2. VERIFICAR PUERTOS
.\docs\deployment\verify-ports.ps1 -Check both

# 3. CONECTAR AL SERVIDOR
ssh -i ~/.ssh/id_ed25519 root@168.119.53.118

# 4. CONSTRUIR E INICIAR (en servidor)
cd /apps/io-prospector
docker-compose build --progress=plain
docker-compose up -d

# 5. VERIFICAR ESTADO
docker-compose ps
docker-compose logs -f

# 6. PARAR TODO
docker-compose down
```

---

## 📊 REQUISITOS Y VERIFICACIÓN

### En tu máquina (Windows):

- ✅ SSH key: `~/.ssh/id_ed25519`
- ✅ rsync: `choco install rsync` (si falta)
- ✅ PowerShell 5.0+
- ✅ Docker (opcional, para testing local)

### En el servidor:

- ✅ Docker 20.10+
- ✅ Docker Compose 1.29+
- ✅ Node.js 20+ (en contenedores)
- ✅ Directorio `/apps/io-prospector` accesible
- ✅ Puertos 3004, 4006, 6379 disponibles

---

## 🔐 VARIABLES DE ENTORNO CRÍTICAS

**NUNCA COMMITEAR:**

```
.env
.env.production
.env.local
```

**Copiar desde master.env a .env en servidor:**

```bash
SUPABASE_URL=...
SUPABASE_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
SMTP_USER=...
SMTP_PASS=...
GOOGLE_*_API_KEY=...
NEXTAUTH_SECRET=...
```

---

## 🐛 TROUBLESHOOTING

### Port Already in Use

```bash
lsof -i :3004
kill -9 <PID>
docker-compose restart frontend
```

### Container Crashes

```bash
docker-compose logs frontend
docker-compose logs backend
docker exec io-prospector-frontend npm start
```

### Build Failures

```bash
docker-compose build --no-cache --progress=plain
```

### Redis Connection Error

```bash
docker-compose restart redis
docker exec io-prospector-redis redis-cli ping
```

---

## ✅ DESPLIEGUE: ANTES Y DESPUÉS

### ANTES (Sin automatización):

- ❌ Sync manual (prone a errores)
- ❌ No hay Dockerfiles
- ❌ Configuración esparcida
- ❌ Sin guía de deployment
- ⏱️ Tiempo: ~1 hora

### DESPUÉS (Con estos archivos):

- ✅ Sync automático via `sync-to-coolify.ps1`
- ✅ Multi-stage Dockerfiles optimizados
- ✅ Configuración centralizada en `.env`
- ✅ Guía detallada paso a paso
- ✅ Scripts de verificación
- ⏱️ Tiempo: ~5-10 minutos

---

## 📞 SOPORTE Y REFERENCIAS

| Necesidad          | Referencia                                                   |
| ------------------ | ------------------------------------------------------------ |
| Despliegue rápido  | → [QUICK-DEPLOY.md](QUICK-DEPLOY.md)                         |
| Guía completa      | → [COOLIFY-DEPLOYMENT-GUIDE.md](COOLIFY-DEPLOYMENT-GUIDE.md) |
| Sincronizar código | → `.\sync-to-coolify.ps1`                                    |
| Verificar puertos  | → `.\verify-ports.ps1`                                       |
| Panel Coolify      | → http://168.119.53.118:8000                                 |
| SSH Servidor       | → `ssh -i ~/.ssh/id_ed25519 root@168.119.53.118`             |

---

## 🔄 WORKFLOW ACTUALIZACIÓN (Después de cambios locales)

```powershell
# 1. Commitear cambios en Git
git add .
git commit -m "feat: actualizar componente X"
git push origin main

# 2. Sincronizar a servidor
.\docs\deployment\sync-to-coolify.ps1

# 3. Reconstruir en servidor
ssh -i ~/.ssh/id_ed25519 root@168.119.53.118 << 'EOF'
cd /apps/io-prospector
docker-compose build
docker-compose restart frontend backend
docker-compose ps
EOF
```

---

## 📈 MONITOREO CONTINUO

```bash
# Ver logs en tiempo real
docker-compose logs -f

# Estadísticas de contenedores
docker stats io-prospector-*

# Salud de la aplicación
curl http://168.119.53.118:4006/api/health
curl http://168.119.53.118:3004/

# Redis status
redis-cli -h 168.119.53.118 INFO
```

---

## ✨ PRÓXIMAS MEJORAS

- [ ] GitHub Actions para auto-deploy
- [ ] Backup automático de Redis
- [ ] SSL/HTTPS con Let's Encrypt
- [ ] CDN para assets estáticos
- [ ] Database migrations automáticas
- [ ] Monitoring con Prometheus/Grafana

---

**Última actualización:** 2026-07-02  
**Generado por:** Claude Code  
**Stack:** Next.js 15 + Express + Supabase + Docker  
**Ambiente:** Coolify @ 168.119.53.118

---

### 🎯 SIGUIENTES PASOS

1. **Hoy:** Ejecutar `sync-to-coolify.ps1`
2. **Hoy:** Seguir guía en `COOLIFY-DEPLOYMENT-GUIDE.md`
3. **Mañana:** Configurar CI/CD (GitHub Actions)
4. **Próxima semana:** Configurar monitoreo y alertas

**¿Preguntas?** Revisa `COOLIFY-DEPLOYMENT-GUIDE.md` sección Troubleshooting.
