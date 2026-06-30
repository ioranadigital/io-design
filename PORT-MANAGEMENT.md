# 🔌 PORT MANAGEMENT - Iorana Monorepo

**Status:** ⚠️ CONFLICTS DETECTED
**Date:** 2026-06-29
**Reviewed:** master.env + all docker-compose.yml files

---

## 📋 PUERTO REGISTRY ACTUAL (master.env)

### Core Services

```
PORT=3000                    # General/NextAuth (CONFLICTO: usado por qr-iorana & iorana-dev)
REDIS_PORT=6379            # Redis (OK - está en docker-compose)
SMTP_PORT=587              # SMTP (OK - no docker)
```

### Frontend Ports (3000-3999)

```
IO_SEMANTICO_FRONTEND_PORT=3002      # ✅ OK
IO_NERUDA_FRONTEND_PORT=3003         # ✅ OK
IO_PROSPECTOR_FRONTEND_PORT=3004     # ✅ OK (pero docker-compose dice 3002 ❌)
IORANASEO_FRONTEND_PORT=3005         # ✅ OK - EN USO ✅
IO_DOCUSIA_FRONTEND_PORT=3006        # ✅ OK
```

### Backend Ports (4000-4999)

```
IO_SEMANTICO_BACKEND_PORT=4000       # ⚠️ CONFLICT: io-prospector también usa 4000
IO_DOCUSIA_BACKEND_PORT=4001         # ✅ OK
IO_PROSPECTOR_BACKEND_PORT=4006      # ✅ Definido, pero docker-compose dice 4000 ❌
IO_NERUDA_BACKEND_PORT=4005          # ✅ OK
```

### Python/Specialized Ports (5000+)

```
IO_SEMANTICO_PYTHON_PORT=5000        # ✅ OK
N8N_PORT=5678                         # ⚠️ MISSING en master.env (solo en iorana-dev docker-compose)
COOLIFY_PORT=8000                     # ✅ OK (http://89.167.103.147:8000)
```

---

## 🚨 CONFLICTOS ENCONTRADOS

### CRÍTICO 1: qr-iorana-dev usa puerto 3000

- **Archivo:** E:\git\interno\qr-iorana-dev\docker-compose.yml
- **Puerto:** 3000:3000
- **Conflicto:** master.env define PORT=3000 para NextAuth
- **Solución:** Cambiar a 3010, registrar en master.env

### CRÍTICO 2: iorana-dev usa puerto 3000

- **Archivo:** E:\git\interno\iorana-dev\docker-compose.yml
- **Puerto:** PORT=3000 (app + n8n puerto 5678 sin registrar)
- **Conflicto:** Duplica con qr-iorana-dev y NextAuth
- **Solución:** Cambiar a 3011, registrar N8N_PORT=5678

### CRÍTICO 3: io-prospector puerto mismatch

- **Archivo:** E:\git\tools\io-prospector\docker-compose.yml
- **Define:** BACKEND_PORT=${BACKEND_PORT:-4000}, FRONTEND_PORT=${FRONTEND_PORT:-3002}
- **master.env:** IO_PROSPECTOR_BACKEND_PORT=4006, IO_PROSPECTOR_FRONTEND_PORT=3004
- **Conflicto:** docker-compose usa valores defaults en lugar de variables master.env
- **Solución:** Actualizar docker-compose para usar ${IO*PROSPECTOR*\*} variables

### ADVERTENCIA: N8N sin registro

- **Archivo:** E:\git\interno\iorana-dev\docker-compose.yml
- **Puerto:** N8N_PORT=5678
- **Status:** NO está en master.env
- **Solución:** Agregar N8N_PORT=5678 a master.env

---

## ✅ PUERTOS ÓPTIMOS RECOMENDADOS

**Frontend (3000-3999):**

- 3001: NextAuth (cambiar de 3000)
- 3010: qr-iorana (NUEVO)
- 3011: iorana-dev (NUEVO)
- 3002: io-semantico ✅
- 3003: io-neruda ✅
- 3004: io-prospector ✅
- 3005: ioranaseo ✅
- 3006: io-docusia ✅

**Backend (4000-4999):**

- 4000: io-semantico ✅
- 4001: io-docusia ✅
- 4005: io-neruda ✅
- 4006: io-prospector ✅

**Services (5000+):**

- 5000: io-semantico python ✅
- 5678: n8n (NUEVO)
- 8000: coolify ✅

---

## 🔧 ACCIONES REQUERIDAS

### 1. Actualizar master.env

Agregar al final de master.env (antes de GEMINI_API_KEY):

```env
# --- PUERTOS ADICIONALES & CONFLICTO FIXES ---
NEXTAUTH_FRONTEND_PORT=3001           # Cambiar PORT=3000
QR_IORANA_FRONTEND_PORT=3010          # qr-iorana-dev
IORANA_DEV_FRONTEND_PORT=3011         # iorana-dev
N8N_PORT=5678                         # n8n automation
```

### 2. Actualizar docker-compose files

**E:\git\interno\qr-iorana-dev\docker-compose.yml**

- Cambiar: `"3000:3000"` → `"3010:3010"`
- Cambiar: `PORT=3000` → `PORT=${QR_IORANA_FRONTEND_PORT:-3010}`

**E:\git\interno\iorana-dev\docker-compose.yml**

- Cambiar: `PORT=3000` → `PORT=${IORANA_DEV_FRONTEND_PORT:-3011}`
- Agregar: `N8N_PORT=${N8N_PORT:-5678}`

**E:\git\tools\io-prospector\docker-compose.yml**

- Cambiar: `"${BACKEND_PORT:-4000}:4000"` → `"${IO_PROSPECTOR_BACKEND_PORT:-4006}:4000"`
- Cambiar: `"${FRONTEND_PORT:-3002}:3002"` → `"${IO_PROSPECTOR_FRONTEND_PORT:-3004}:3002"`

### 3. Verificar en Hetzner

```bash
ssh root@89.167.103.147

# Verificar disponibilidad de puertos
netstat -tlnp | grep LISTEN

# Después de cambios
docker-compose up -d
netstat -tlnp | grep -E ":300[0-9]|:400[0-9]|:500[0-9]"
```

---

## 📋 CHECKLIST FUTURO

- [ ] **Siempre usar variables** en docker-compose (${VAR_NAME})
- [ ] **Registrar TODOS los puertos** en master.env
- [ ] **Documentar cambios** en CHANGELOG
- [ ] **Verificar disponibilidad** ANTES de desplegar: `netstat -tlnp`
- [ ] **Testing local**: `docker-compose up` en cada proyecto
- [ ] **Testing en Hetzner**: SSH y verificar puertos en uso
- [ ] **Convención**: Frontend 3000-3999, Backend 4000-4999, Services 5000+

---

## ⚡ IMPACTO EN DEPLOY

**LOCAL:**

- 5 archivos a modificar (master.env + 3x docker-compose)
- Test time: 5 minutos
- Tiempo total: 10-15 minutos

**HETZNER:**

```bash
cd /opt/ioranaseo/interno/ioranaseo
git pull
docker-compose down
docker-compose up -d
pm2 restart ioranaseo
netstat -tlnp | grep 3005
```

**Riesgo:** BAJO (cambios aislados, sin afectar ioranaseo:3005)

---

**Generated:** 2026-06-29
**Status:** ⚠️ URGENTE - Resolver ANTES de producción
**Estimated Fix:** 15 minutos
