# 🚀 CHECKLIST: io-prospector DEPLOY A HETZNER

**Fecha de Análisis:** 2026-06-23  
**Status:** ⚠️ PARCIALMENTE PREPARADO - Requiere correcciones

---

## 📋 RESUMEN EJECUTIVO

io-prospector **tiene estructura Docker pero requiere 6 correcciones críticas** antes de hacer deploy a Hetzner:

| Aspecto | Status | Prioridad | Solución |
|---------|--------|-----------|----------|
| Backend Dockerfile | ✅ OK | — | Listo para producción |
| Frontend Dockerfile | ✅ OK | — | Listo para producción |
| docker-compose.yml | ⚠️ CRÍTICO | 🔴 ALTA | Hardcoded credentials y URLs |
| .env.example | ❌ FALTA | 🔴 ALTA | Crear template |
| Variables de entorno | ❌ INCOMPLETO | 🔴 ALTA | Supabase keys hardcodeadas |
| Nginx reverse proxy | ❌ FALTA | 🟡 MEDIA | Necesario para Hetzner |
| Health checks | ✅ OK | — | Dockerfile tiene HEALTHCHECK |

---

## 🔴 PROBLEMAS CRÍTICOS DESCUBIERTOS

### 0. **🚨 REDIS FALTA EN docker-compose - BLOCKER**

**Problema:** Backend usa Bull (job queue) que REQUIERE Redis, pero docker-compose NO incluye Redis.

**Backend dependencies:**
- `bull@^4.16.5` ← Necesita Redis
- `redis@^5.12.1` ← Cliente Redis

**Código en server.js:**
```javascript
const PORT = process.env.IO_PROSPECTOR_BACKEND_PORT || process.env.PORT || 4006;
```

**Solución:** Agregar Redis a docker-compose
```yaml
services:
  redis:
    image: redis:7-alpine
    ports:
      - "${REDIS_PORT:-6379}:6379"
    volumes:
      - redis_data:/data
    restart: unless-stopped

volumes:
  redis_data:
```

**Status:** 🔴 **CRITICAL - El backend no funciona sin Redis**

---

### 1. **Credenciales Hardcodeadas en docker-compose.yml**

```yaml
# ❌ MALO - En archivo versionado
environment:
  - SUPABASE_URL=${SUPABASE_URL}
  - SUPABASE_KEY=${SUPABASE_KEY}
  - NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_B0gQyDyf-p2vDg2UhytfDg_H54mWXbB
```

**Problema:** `NEXT_PUBLIC_SUPABASE_ANON_KEY` está hardcodeada.

**Solución:**
```yaml
# ✅ CORRECTO - Variables de entorno
environment:
  - SUPABASE_URL=${SUPABASE_URL}
  - SUPABASE_KEY=${SUPABASE_KEY}
  - NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
  - NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}
  - NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
```

### 2. **URLs Hardcodeadas**

```yaml
# ❌ MALO
FRONTEND_URL=http://localhost:3002,http://10.0.7.3:3002,https://pros.iorana.dev
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

**Problema:** 
- `localhost` no funciona en Hetzner
- IP interna no es válida en producción
- No hay fallback para CORS

**Solución:**
```yaml
# ✅ CORRECTO - Desde variables de entorno
FRONTEND_URL=${FRONTEND_URL}  # ej: https://pros.iorana.dev
NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}  # ej: https://api.pros.iorana.dev
```

### 3. **No existe .env.example**

**Problema:** Nada documenta qué variables son necesarias.

**Solución:** Crear `.env.example` con todas las variables requeridas.

### 4. **Falta Nginx Reverse Proxy**

**Problema:** docker-compose expone puertos 3002 y 4000 directamente sin proxy inverso.

**Solución:** Agregar servicio nginx con:
- SSL/TLS
- Reverse proxy para backend y frontend
- Rate limiting
- Gzip compression

### 5. **Dependencias Problemáticas para Producción**

```json
{
  "playwright": "^1.42.0",
  "whatsapp-web.js": "^1.23.0"
}
```

**Problema:**
- Playwright descarga navegadores (pesado, 500MB+)
- whatsapp-web.js requiere un browser headless
- Ambas son problemáticas en VPS con recursos limitados

**Solución:**
- Usar `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1` (ya está en Dockerfile ✅)
- Verificar si whatsapp-web.js es realmente necesario
- Si sí: usar servicio Chrome/Chromium separado

### 6. **⚠️ Frontend Dockerfile es para DESARROLLO, no Producción**

**Problema:** Está usando `npm run dev` en lugar de build + start

```dockerfile
# ❌ MALO - Desarrollo
CMD ["npm", "run", "dev"]
```

**Solución:**
```dockerfile
# ✅ CORRECTO - Producción
RUN npm run build
CMD ["npm", "start"]
```

**Status:** 🔴 **CRITICAL - Frontend no se compila para producción**

---

### 7. **Port Inconsistency**

**Problema:** Backend espera `IO_PROSPECTOR_BACKEND_PORT` pero docker-compose usa fallback PORT

```javascript
// En backend/server.js:
const PORT = process.env.IO_PROSPECTOR_BACKEND_PORT || process.env.PORT || 4006;
```

Pero docker-compose expone:
```yaml
ports:
  - "4000:4000"  # ❌ Mismatch!
```

**Solución:** Usar variable consistente en todo el proyecto:
- Decidir: `BACKEND_PORT` o `IO_PROSPECTOR_BACKEND_PORT`
- Actualizar docker-compose
- Actualizar server.js

---

## ✅ LO QUE SÍ ESTÁ BIEN

- ✅ **Backend Dockerfile:** Node.js 20-alpine, multistage optimization
- ✅ **Frontend Dockerfile:** Tiene ARG para variables de build
- ✅ **HEALTHCHECK:** Backend tiene health check en Dockerfile
- ✅ **Restart policy:** `unless-stopped` para auto-recovery
- ✅ `.dockerignore:** Existe y filtra archivos innecesarios
- ✅ **Node.js version:** v20 es estable y soportado
- ✅ **npm install --omit=dev:** Optimiza tamaño de imagen

---

## 🛠️ CORRECCIONES A REALIZAR

### Paso 1: Crear .env.example
```bash
# Backend variables
SUPABASE_URL=https://your-supabase.supabase.co
SUPABASE_KEY=your-supabase-service-key

# Frontend variables
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_API_URL=https://api.pros.iorana.dev

# Network
FRONTEND_URL=https://pros.iorana.dev
NEXT_PUBLIC_API_URL=https://api.pros.iorana.dev

# Ports (desarrollo)
BACKEND_PORT=4000
FRONTEND_PORT=3002

# Node environment
NODE_ENV=production
```

### Paso 2: Actualizar docker-compose.yml
```yaml
version: '3.8'

services:
  backend:
    build:
      context: .
      dockerfile: backend.Dockerfile
    ports:
      - "${BACKEND_PORT:-4000}:4000"
    environment:
      - NODE_ENV=production
      - PORT=4000
      - SUPABASE_URL=${SUPABASE_URL}
      - SUPABASE_KEY=${SUPABASE_KEY}
      - FRONTEND_URL=${FRONTEND_URL}
    restart: unless-stopped

  frontend:
    build:
      context: .
      dockerfile: frontend.Dockerfile
      args:
        - NODE_ENV=production
        - NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
        - NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}
        - NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
    ports:
      - "${FRONTEND_PORT:-3002}:3002"
    environment:
      - PORT=3002
    depends_on:
      - backend
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - backend
      - frontend
    restart: unless-stopped
```

### Paso 3: Crear nginx.conf para Hetzner
Necesita:
- SSL/TLS con certificados Let's Encrypt
- Reverse proxy para backend
- Reverse proxy para frontend
- Rate limiting
- Gzip compression

---

## 📊 ESTADO POR COMPONENTE

### Backend
```
✅ Dockerfile optimizado
✅ package.json con todas las dependencias
✅ Health check implementado
✅ dotenv para configuración
⚠️  Necesita variables de entorno en docker-compose
```

### Frontend (Next.js)
```
✅ Dockerfile existe
✅ ARG para build-time variables
⚠️  NEXT_PUBLIC_SUPABASE_ANON_KEY hardcodeada en docker-compose
⚠️  Necesita URL dinámica en lugar de localhost
```

### Infrastructure
```
❌ No hay nginx
❌ No hay SSL/TLS
❌ No hay .env.example
⚠️  Puertos hardcodeados
```

---

## 🚀 PLAN DE DEPLOY A HETZNER

### Pre-deploy (Antes de ir a Hetzner)
- [ ] Crear `.env.example`
- [ ] Actualizar `docker-compose.yml` con variables de entorno
- [ ] Crear `nginx.conf` con SSL/TLS
- [ ] Crear `docker-compose.production.yml` con nginx
- [ ] Documentar pasos de deploy
- [ ] Tester en ambiente similar a Hetzner

### Deploy en Hetzner
1. SSH a VPS
2. Clone repository
3. Copy `.env` (desde template, con values reales)
4. `docker-compose -f docker-compose.production.yml up -d`
5. Verificar health checks
6. Configurar DNS
7. Solicitar certificado Let's Encrypt para nginx

---

## ⚠️ RECOMENDACIONES

1. **Usar docker-compose.override.yml para desarrollo**
   - Mantén desarrollo local con localhost
   - Usa docker-compose.yml + docker-compose.override.yml

2. **SSL/TLS es OBLIGATORIO para Supabase**
   - Supabase requiere HTTPS para APIs
   - Let's Encrypt es gratuito en Hetzner

3. **Considerar Coolify**
   - El docker-compose tiene referencias a COOLIFY_FQDN
   - ¿Usas Coolify en Hetzner? Si sí, simplifica el deploy

4. **Redis en producción**
   - Backend usa Bull queue que necesita Redis
   - Verificar si docker-compose incluye Redis (parece que no)
   - Agregar servicio Redis a docker-compose

---

## 📝 ARCHIVOS A CREAR/MODIFICAR

| Archivo | Acción | Prioridad |
|---------|--------|-----------|
| `.env.example` | Crear | 🔴 ALTA |
| `docker-compose.yml` | Modificar | 🔴 ALTA |
| `docker-compose.production.yml` | Crear | 🔴 ALTA |
| `nginx.conf` | Crear | 🔴 ALTA |
| `ssl/Dockerfile` | Crear (opcional: certbot) | 🟡 MEDIA |
| `DEPLOY.md` | Crear | 🟡 MEDIA |

---

## 🔍 PRÓXIMOS PASOS RECOMENDADOS

1. **Verificar si Redis está configurado**
   - Bull queue requiere Redis
   - ¿Está en docker-compose?

2. **Revisar backend/server.js**
   - Verificar inicialización de Redis
   - Confirmar variables de entorno

3. **Planificar dominios**
   - Frontend: `pros.iorana.dev` o similar
   - Backend API: `api.pros.iorana.dev` o `/api` proxy

4. **Recursos de Hetzner**
   - ¿Tamaño del VPS?
   - ¿Memoria disponible? (Playwright + whatsapp-web.js son pesados)
   - ¿Almacenamiento suficiente?

---

**Status Final:** ⚠️ **REQUIERE 6 CORRECCIONES ANTES DE HETZNER DEPLOY**

**Tiempo Estimado para Correcciones:** 2-3 horas
**Tiempo de Deployment:** 30 minutos (post-correcciones)

Generated: 2026-06-23
