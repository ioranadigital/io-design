# 🔍 DEPLOYMENT STATUS AUDIT - io-prospector en Hetzner

**Fecha del Audit:** 2026-06-26  
**Status Actual:** ⚠️ **EN PRODUCCIÓN pero INCOMPLETO**  
**Prioridad:** 🔴 **CRÍTICA**

---

## 📊 RESUMEN EJECUTIVO

El proyecto está **~90% listo para Hetzner**, pero **FALTA lo más crítico: configuración real (.env)**

```
✅ LISTO (90%):
  • Dockerfiles (backend + frontend) → Optimizados para producción
  • docker-compose.yml → 4 archivos de configuración
  • Redis → Incluido en docker-compose.coolify.yml
  • Bull queue → Backend ready para async jobs
  • Nginx → Configurado con SSL/TLS
  • Deploy scripts → deploy.ps1, deploy.sh, test-build.ps1

❌ CRÍTICO (10% - BLOQUER):
  • .env MISSING → Sin credenciales reales
  • URLs hardcodeadas → Revisar dominio
  • Certificados Let's Encrypt → No configurados
```

---

## 🚨 PROBLEMAS IDENTIFICADOS

### PROBLEMA 1: NO EXISTE .env (BLOQUER CRÍTICO)
**Severidad:** 🔴 CRÍTICA  
**Estado:** ❌ INCOMPLETO

```bash
# Situación actual:
ls -la .env  # ❌ File not found

# Solución requerida:
cp .env.example .env
# Editar con valores REALES de Hetzner
```

**Qué valores necesitas:**
```bash
# SUPABASE (DB + Auth)
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_KEY=your-service-role-key-here
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# DOMINIOS (Hetzner)
FRONTEND_URL=https://pros.iorana.dev
NEXT_PUBLIC_API_URL=https://api.pros.iorana.dev

# EMAIL (Para notificaciones)
EMAIL_FROM=noreply@iorana.dev
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password  # NO la contraseña normal

# APIs (Opcional, si usas)
GOOGLE_PLACES_API_KEY=your-key-here
GOOGLE_MAPS_API_KEY=your-key-here
FIRECRAWL_API_KEY=your-key-here

# NODE
NODE_ENV=production
```

**Action:** 📋 Crear `.env` con estos valores antes de cualquier deploy.

---

### PROBLEMA 2: URLs Posiblemente Hardcodeadas
**Severidad:** 🟡 MEDIA  
**Estado:** ⚠️ NECESITA VERIFICACIÓN

**Dónde revisar:**
```bash
# 1. Frontend
grep -r "localhost\|10.0" frontend/
grep -r "hardcoded.*url" frontend/

# 2. Backend
grep -r "localhost\|127.0.0.1" backend/

# 3. Docker-compose
cat docker-compose.coolify.yml | grep -i "url"
```

**Qué debe verse:**
```bash
# ❌ MALO - Hardcoded
FRONTEND_URL=http://localhost:3002
NEXT_PUBLIC_API_URL=http://10.0.7.3:4000

# ✅ CORRECTO - Variables
FRONTEND_URL=${FRONTEND_URL}  # Desde .env
NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}  # Desde .env
```

---

### PROBLEMA 3: Certificados Let's Encrypt No Configurados
**Severidad:** 🟡 MEDIA  
**Estado:** ⚠️ PENDIENTE EN HETZNER

**Situación actual:**
```bash
# nginx.conf espera certificados aquí:
ssl_certificate /etc/letsencrypt/live/pros.iorana.dev/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/pros.iorana.dev/privkey.pem;

# Pero no existen aún
ls -la /etc/letsencrypt/live/  # ❌ No hay certificados
```

**Solución (ejecutar EN el VPS de Hetzner):**
```bash
apt-get install certbot python3-certbot-nginx -y

certbot certonly --webroot -w /var/www/certbot \
  -d pros.iorana.dev \
  -d api.pros.iorana.dev \
  -d www.pros.iorana.dev \
  --email honatuya@gmail.com \
  --agree-tos \
  --non-interactive
```

---

## 🔧 QUÉ NECESITAS HACER AHORA

### PASO 1: Crear .env con valores REALES (5 min)
```bash
# En tu máquina local o VPS
cp .env.example .env

# Editar con valores reales
# Necesitas:
# ✅ Supabase credentials (ve a https://supabase.com)
# ✅ Email credentials (Google App Password)
# ✅ Tu dominio (pros.iorana.dev)
# ✅ APIs si las usas (Google, Firecrawl, etc)

nano .env  # o usa tu editor favorito
```

**Verificar:**
```bash
# Revisar que no hay placeholders
grep "your-\|xxx\|placeholder" .env
# Debe retornar vacío

# Verificar URLs correctas
grep "FRONTEND_URL\|NEXT_PUBLIC_API_URL" .env
# Debe mostrar dominio real, no localhost
```

### PASO 2: Validar configuración (2 min)
```bash
# Ejecutar test-build (asume Docker instalado)
.\test-build.ps1

# Debe pasar todas las checks ✅
```

### PASO 3: Validar docker-compose (1 min)
```bash
# Verificar que el archivo es válido
docker-compose -f docker-compose.coolify.yml config > /dev/null && echo "✅ Valid" || echo "❌ Invalid"
```

### PASO 4: Revisar URLs en código (10 min)
```bash
# Buscar hardcoded URLs
grep -r "localhost" backend/ frontend/ | grep -v node_modules | grep -v ".next"

# Si encuentra algo, editar y usar variables de entorno
```

### PASO 5: Deploy en Hetzner (30 min)
```bash
# SSH a VPS
ssh root@YOUR_VPS_IP

# Ir a proyecto
cd /opt/io-prospector

# Copiar .env desde tu máquina
scp .env root@YOUR_VPS_IP:/opt/io-prospector/

# Deploy
docker-compose -f docker-compose.coolify.yml up -d

# Verificar
docker-compose ps
curl http://localhost:3004  # Frontend
curl http://localhost:4006/health  # Backend
```

### PASO 6: Configurar SSL (10 min)
```bash
# EN el VPS
apt-get install certbot python3-certbot-nginx

certbot certonly --webroot -w /var/www/certbot \
  -d pros.iorana.dev \
  -d api.pros.iorana.dev \
  -d www.pros.iorana.dev

# Reiniciar nginx
docker-compose -f docker-compose.coolify.yml restart nginx  # o manualmente
```

---

## ✅ CHECKLIST ANTES DE PRODUCCIÓN

### Configuración Base
- [ ] **CRÍTICO:** `.env` creado con credenciales REALES (no placeholders)
- [ ] Verificar SUPABASE_URL y SUPABASE_KEY válidos
- [ ] Verificar NEXT_PUBLIC_SUPABASE_ANON_KEY válido
- [ ] Verificar FRONTEND_URL = `https://pros.iorana.dev`
- [ ] Verificar NEXT_PUBLIC_API_URL = `https://api.pros.iorana.dev`

### Docker & Compose
- [ ] `docker-compose.coolify.yml` incluye Redis
- [ ] Todas las variables de entorno están en .env
- [ ] No hay URLs hardcodeadas en docker-compose
- [ ] `docker-compose config` valida sin errores

### Código
- [ ] Grep de "localhost" retorna vacío
- [ ] Grep de "hardcoded" retorna vacío
- [ ] Grep de "10.0.7" retorna vacío
- [ ] Variables de entorno usadas correctamente

### Certificados
- [ ] Let's Encrypt configurado para dominio
- [ ] nginx.conf apunta a certificados correctos
- [ ] HSTS header presente en nginx

### Hetzner
- [ ] DNS records configurados:
  - `pros.iorana.dev` → IP del VPS
  - `api.pros.iorana.dev` → IP del VPS
  - `www.pros.iorana.dev` → CNAME a `pros.iorana.dev`
- [ ] VPS firewall: Puertos 80, 443 abiertos
- [ ] Supabase whitelisted desde IP del VPS

---

## 📋 ESTADO DETALLADO POR COMPONENTE

### Backend (Node.js + Express)
```
Status: ✅ LISTO
Dockerfile: ✅ Optimizado (multistage, skip browsers)
Dependencies: ✅ Bull queue + Redis
Config: ⚠️ NECESITA .env
Ports: 4006 (Coolify), 4000 (override)
Health Check: ✅ /health endpoint
```

### Frontend (Next.js 15)
```
Status: ✅ LISTO
Dockerfile: ✅ Multistage, optimizado
Build: ✅ Next.js build configured
Config: ⚠️ NECESITA .env para Supabase keys
Ports: 3004 (Coolify), 3002 (override)
Health Check: ✅ Status endpoint
```

### Redis
```
Status: ✅ INCLUIDO
Service: docker-compose.coolify.yml line 6
Config: ✅ redis:7-alpine
Persistence: ✅ appendonly yes
Port: 6379 (interno)
```

### Nginx
```
Status: ✅ CONFIGURADO
File: nginx.conf (200 líneas)
SSL: ✅ Let's Encrypt ready
Rate Limiting: ✅ Implemented
Upstream: ✅ Backend + Frontend defined
HSTS: ✅ Configured
```

### Deployment Scripts
```
deploy.ps1: ✅ Windows PowerShell
deploy.sh: ✅ Bash/Linux
test-build.ps1: ✅ Local validation
```

---

## 🎯 PRIORIDADES

### 🔴 CRÍTICO (Do First)
1. **Crear .env** con credenciales reales
2. **Validar URLs** en código
3. **Test local** con test-build.ps1

### 🟡 IMPORTANTE (Do Next)
4. **DNS configuration** en Hetzner
5. **SSL certificates** con Let's Encrypt
6. **Deploy** a producción

### 🟢 OPTIONAL (Do Later)
7. Monitoreo y logging
8. Backups automáticos
9. Performance tuning

---

## 🚀 SECUENCIA RECOMENDADA

```
DÍA 1 (30 min):
  1. Crear .env
  2. Validar con test-build.ps1
  3. Commit a git

DÍA 2 (2 horas):
  4. SSH a Hetzner
  5. Clone proyecto
  6. Copy .env (scp)
  7. Deploy (docker-compose up)
  8. Configurar DNS

DÍA 3 (1 hora):
  9. SSL certificates
  10. Test endpoints
  11. Monitor logs
  12. DONE ✅
```

---

## 📞 TROUBLESHOOTING RÁPIDO

### "Backend no conecta a Redis"
```bash
# En .env, verificar:
REDIS_URL=redis://redis:6379  # ✅ Correcto
REDIS_URL=redis://localhost:6379  # ❌ Incorrecto (en Docker)

# En docker-compose, verificar service name:
services:
  redis:  # ← Este es el hostname
    image: redis:7-alpine
```

### "Frontend no ve API"
```bash
# En .env, verificar:
NEXT_PUBLIC_API_URL=https://api.pros.iorana.dev  # ✅ Desde .env
# NO hardcodeado en código frontend
```

### "Certificado SSL no encuentra"
```bash
# nginx.conf necesita:
ssl_certificate /etc/letsencrypt/live/pros.iorana.dev/fullchain.pem;

# Crear con:
certbot certonly --webroot -w /var/www/certbot -d pros.iorana.dev
```

---

## 📚 ARCHIVOS RELACIONADOS

- `DEPLOYMENT-INFRASTRUCTURE.md` — Setup guide completo
- `DEPLOY-HETZNER-CHECKLIST.md` — Checklist original
- `docker-compose.coolify.yml` — Producción config
- `.env.example` — Template de variables
- `nginx.conf` — Reverse proxy ready

---

## 🎓 NEXT: ASISTENT NECESITA DE TI

**Para continuar, necesito que me proporciones:**

1. **Credenciales Supabase:**
   - SUPABASE_URL (project URL)
   - SUPABASE_KEY (service role key)
   - NEXT_PUBLIC_SUPABASE_ANON_KEY (anon key)

2. **Email configuration:**
   - EMAIL_USER (Gmail address)
   - EMAIL_PASS (App-specific password)

3. **Confirmar dominio:**
   - ¿Es `pros.iorana.dev`?
   - ¿Ya está registrado?
   - ¿Ya apunta a Hetzner?

4. **APIs (si los usas):**
   - GOOGLE_PLACES_API_KEY
   - GOOGLE_MAPS_API_KEY
   - FIRECRAWL_API_KEY

---

**Generated:** 2026-06-26  
**Status:** ⚠️ WAITING FOR YOUR INPUT
**Next Action:** Provide .env values or clarify requirements
