# ⚡ DESPLIEGUE RÁPIDO (5 MINUTOS)

## 🚀 Resumen Ejecutivo

**Proyecto:** IO-Prospector  
**Servidor:** 168.119.53.118 (Coolify)  
**Puertos:** Frontend 3004 | Backend 4006 | Redis 6379  
**Tiempo:** ~5 minutos (si ya tienes SSH key)

---

## 1️⃣ SINCRONIZAR CÓDIGO (2 min)

```powershell
cd E:\git\tools\io-prospector
.\docs\deployment\sync-to-coolify.ps1
```

✓ Copia archivos al servidor (excluye node_modules)  
✓ Requiere SSH key `~/.ssh/id_ed25519`

---

## 2️⃣ CONECTAR AL SERVIDOR (1 min)

```bash
ssh -i ~/.ssh/id_ed25519 root@168.119.53.118
cd /apps/io-prospector
```

---

## 3️⃣ CREAR .env EN SERVIDOR (1 min)

```bash
# Copiar template
cp .env.example .env

# Editar con tus valores (usa vi, nano o cat)
nano .env
```

**Valores mínimos necesarios:**

- `SUPABASE_URL`, `SUPABASE_KEY` → desde master.env
- `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` → Gmail
- `GOOGLE_*_API_KEY` → Google Cloud

---

## 4️⃣ CONSTRUIR E INICIAR (1 min)

```bash
# Construir imágenes
docker-compose build --progress=plain

# Iniciar servicios
docker-compose up -d

# Verificar
docker-compose ps
```

✓ Debería mostrar 3 contenedores en estado UP

---

## 5️⃣ VERIFICAR ACCESO (1 min)

**Desde tu máquina:**

```bash
curl http://168.119.53.118:3004  # Frontend
curl http://168.119.53.118:4006/api/health  # Backend
```

✓ Frontend: debe cargar HTML  
✓ Backend: debe retornar `{ "status": "ok" }`

---

## 🎯 RESULTADO FINAL

```
Frontend: http://168.119.53.118:3004
API:      http://168.119.53.118:4006/api
Redis:    redis://168.119.53.118:6379
```

---

## ⚠️ PROBLEMAS COMUNES

| Problema             | Solución                                  |
| -------------------- | ----------------------------------------- |
| `Connection refused` | `docker-compose restart frontend backend` |
| `Redis timeout`      | `docker-compose restart redis`            |
| `.env not found`     | `cp .env.example .env` y rellenar valores |
| `Build failed`       | `docker-compose build --no-cache`         |
| `Port in use`        | Cambiar puertos en docker-compose.yml     |

---

## 📋 ARCHIVOS GENERADOS

✓ `backend.Dockerfile` - Docker builder multistage  
✓ `frontend.Dockerfile` - Next.js optimizado  
✓ `.env.example` - Template de variables  
✓ `sync-to-coolify.ps1` - Script de sincronización  
✓ `COOLIFY-DEPLOYMENT-GUIDE.md` - Guía detallada  
✓ `QUICK-DEPLOY.md` - Este archivo

---

## 🔗 PRÓXIMOS PASOS

1. **Configurar dominio (opcional):**
   - Panel Coolify → Network → Domains
   - Apuntar `prospector.tu-dominio.com` → `3004`

2. **Configurar CI/CD (opcional):**
   - GitHub Actions para auto-deploy
   - Webhook en Coolify panel

3. **Monitorear (obligatorio):**
   - `docker-compose logs -f` en servidor
   - Alert setup para downtime

---

**Necesitas ayuda?** → Lee `COOLIFY-DEPLOYMENT-GUIDE.md` para guía completa
