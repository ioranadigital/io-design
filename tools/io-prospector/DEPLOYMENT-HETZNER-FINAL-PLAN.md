# 🚀 DEPLOYMENT FINAL A HETZNER - io-prospector

**Fecha:** 2026-06-26  
**IP Hetzner:** 89.167.103.147  
**Dominio:** https://pros.iorana.dev  
**Status:** ✅ **READY TO DEPLOY**

---

## 📋 DATOS DE CONFIGURACIÓN EXTRAÍDOS

### Puertos
```
Frontend: 3004
Backend:  4006
Redis:    6379
```

### Supabase (Compartido)
```
URL: https://zvehtloitnuglyjtxwye.supabase.co
Anon Key: sb_publishable_B0gQyDyf-p2vDg2UhytfDg_H54mWXbB
Service Role Key: ✅ Configurado
```

### Email (SMTP)
```
Host: smtp.gmail.com
User: honatuya@gmail.com
Pass: syolrxhccvaijkql
From: noreply@iorana.dev
```

### APIs
```
Google Places: ✅ AIzaSyCv5opVvfi_5RHfzjlLIFC1_xUaKOTqLmI
Google Maps: ✅ AIzaSyCv5opVvfi_5RHfzjlLIFC1_xUaKOTqLmI
Firecrawl: ✅ fc-30f8df272f2d4bcbb2f0a676eef5bd5d
SERP API: ✅ 5933317376023440a9dc8770b8b79f653958781377aceaf8cc24f23b67567572
```

### n8n Webhooks
```
URL: https://n8n.iorana.dev/webhook/email-outreach
Token: OeYhvN9EAbUh60
```

---

## 🎯 PLAN DE DEPLOYMENT (PASO A PASO)

### FASE 1: PREPARACIÓN LOCAL (30 min)

#### Paso 1.1: Validar .env local
```bash
# En tu máquina local
cd E:\git\tools\io-prospector

# Verificar .env existe
ls -la .env

# Validar no hay placeholders
grep "your-\|xxx\|placeholder" .env
# Debe retornar vacío

# Verificar URLs correctas
grep "FRONTEND_URL\|NEXT_PUBLIC_API_URL" .env
# Debe mostrar:
# FRONTEND_URL=https://pros.iorana.dev
# NEXT_PUBLIC_API_URL=https://api.pros.iorana.dev/api
```

#### Paso 1.2: Test Build Local
```bash
# En PowerShell
.\test-build.ps1

# Debe pasar todas las validaciones ✅
# Especialmente:
#   ✅ Backend dependencies
#   ✅ Frontend build
#   ✅ Docker images
```

#### Paso 1.3: Validar docker-compose
```bash
# Verificar sintaxis
docker-compose -f docker-compose.coolify.yml config > /dev/null
# Debe ser válido sin errores
```

---

### FASE 2: PREPARAR HETZNER (15 min)

#### Paso 2.1: Instalar Dependencias en VPS
```bash
# SSH al VPS
ssh root@89.167.103.147

# Actualizar sistema
apt-get update && apt-get upgrade -y

# Instalar Docker
apt-get install -y docker.io docker-compose

# Instalar Nginx
apt-get install -y nginx certbot python3-certbot-nginx

# Instalar Git
apt-get install -y git

# Iniciar Docker
systemctl start docker
systemctl enable docker
```

#### Paso 2.2: Crear directorios
```bash
mkdir -p /opt/io-prospector
mkdir -p /var/www/certbot
```

---

### FASE 3: CLONAR Y CONFIGURAR (10 min)

#### Paso 3.1: Clonar repositorio
```bash
cd /opt/io-prospector

# Clonar desde git
git clone <YOUR_REPO_URL> .

# Si es privado
git clone git@github.com:YOUR_GITHUB/io-prospector.git .
```

#### Paso 3.2: Copiar .env desde tu máquina
```bash
# DESDE TU MÁQUINA LOCAL (no SSH)
scp E:\git\tools\io-prospector\.env root@89.167.103.147:/opt/io-prospector/

# Verificar que llegó
ssh root@89.167.103.147 "cat /opt/io-prospector/.env | grep SUPABASE_URL"
```

---

### FASE 4: DEPLOY DOCKER (15 min)

#### Paso 4.1: Build imágenes Docker
```bash
# EN el VPS
cd /opt/io-prospector

# Build
docker-compose -f docker-compose.coolify.yml build --no-cache

# Esto tarda ~5-10 min
```

#### Paso 4.2: Iniciar servicios
```bash
# Iniciar
docker-compose -f docker-compose.coolify.yml up -d

# Verificar
docker-compose -f docker-compose.coolify.yml ps

# Debe mostrar:
# io-prospector-redis     ✅ Up
# io-prospector-backend   ✅ Up
# io-prospector-frontend  ✅ Up
```

#### Paso 4.3: Verificar salud de servicios
```bash
# Esperar 30 segundos
sleep 30

# Health check backend
curl http://localhost:4006/health
# Respuesta esperada: {"status":"ok"} o similar

# Health check frontend
curl http://localhost:3004
# Respuesta esperada: HTML de Next.js
```

---

### FASE 5: CERTIFICADOS SSL (10 min)

#### Paso 5.1: Crear certificado Let's Encrypt
```bash
# EN el VPS
certbot certonly --webroot \
  -w /var/www/certbot \
  -d pros.iorana.dev \
  -d api.pros.iorana.dev \
  -d www.pros.iorana.dev \
  --email honatuya@gmail.com \
  --agree-tos \
  --non-interactive

# Verifica que se creó
ls -la /etc/letsencrypt/live/pros.iorana.dev/
```

#### Paso 5.2: Copiar nginx.conf
```bash
# Si aún no está en /etc/nginx
cp nginx.conf /etc/nginx/nginx.conf

# Verificar sintaxis
nginx -t
# Debe retornar: "test successful"
```

#### Paso 5.3: Reiniciar Nginx
```bash
systemctl restart nginx

# Verificar
systemctl status nginx
# Debe estar "active (running)"
```

---

### FASE 6: CONFIGURAR DNS (5 min)

#### En Hetzner Cloud Console o DNS Manager

```
Registro A para pros.iorana.dev:
  Name: pros
  Type: A
  TTL: 3600
  Value: 89.167.103.147

Registro A para api.pros.iorana.dev:
  Name: api
  Type: A
  TTL: 3600
  Value: 89.167.103.147

Registro CNAME para www.pros.iorana.dev:
  Name: www.pros
  Type: CNAME
  TTL: 3600
  Value: pros.iorana.dev
```

**Nota:** DNS puede tomar 5-30 minutos en propagarse.

---

### FASE 7: VERIFICACIÓN FINAL (5 min)

#### Paso 7.1: Esperar propagación DNS
```bash
# Verificar DNS propagado
nslookup pros.iorana.dev
# Debe resolver a 89.167.103.147

# O usar dig
dig pros.iorana.dev +short
# Debe retornar: 89.167.103.147
```

#### Paso 7.2: Probar endpoints
```bash
# Frontend (HTTPS)
curl -k https://pros.iorana.dev
# Respuesta esperada: HTML de Next.js

# Backend API (HTTPS)
curl -k https://api.pros.iorana.dev/health
# Respuesta esperada: {"status":"ok"}

# Verificar certificado
curl -I https://pros.iorana.dev
# Respuesta esperada: 200 OK
```

#### Paso 7.3: Pruebas en navegador
```
1. Abrir https://pros.iorana.dev en navegador
   ✅ Debe cargar sin errores SSL
   ✅ Debe mostrar el UI del frontend

2. Abrir https://api.pros.iorana.dev/health
   ✅ Debe retornar JSON status

3. Verificar certificado:
   ✅ Click en candado → Certificado válido
   ✅ Debe ser Let's Encrypt
   ✅ Dominio correcto
```

---

## 📊 CHECKLIST FINAL

### Pre-Deploy
- [x] .env creado con credenciales reales
- [x] test-build.ps1 pasa todas las validaciones
- [x] docker-compose.yml válido
- [x] Sin URLs hardcodeadas
- [x] Puertos configurados: 3004 (frontend), 4006 (backend), 6379 (redis)

### Deploy
- [ ] Hetzner VPS preparado (Docker, Git, Nginx, Certbot)
- [ ] Repositorio clonado en /opt/io-prospector
- [ ] .env copiado al VPS
- [ ] Docker images buildeadas exitosamente
- [ ] Servicios iniciados: redis, backend, frontend
- [ ] Health checks pasando

### Post-Deploy
- [ ] Certificado Let's Encrypt obtenido
- [ ] DNS records configurados y propagados
- [ ] Nginx configurado y reiniciado
- [ ] https://pros.iorana.dev carga correctamente
- [ ] https://api.pros.iorana.dev/health responde
- [ ] Certificado SSL válido en navegador
- [ ] Logs sin errores: docker-compose logs

---

## ⏱️ TIEMPO ESTIMADO

```
Fase 1 (Local):     30 min
Fase 2 (Hetzner):   15 min
Fase 3 (Clone):     10 min
Fase 4 (Docker):    15 min
Fase 5 (SSL):       10 min
Fase 6 (DNS):        5 min
Fase 7 (Test):       5 min
─────────────────────────
TOTAL:              90 min (1.5 horas)
```

**Incluye espera DNS:** +15-30 min (en paralelo)

---

## 🆘 TROUBLESHOOTING RÁPIDO

### Backend no inicia
```bash
# Ver logs
docker-compose logs backend

# Común: .env missing
# Solución: scp .env al VPS

# Común: Redis no disponible
# Solución: Esperar redis a iniciar, redis status en logs
```

### Frontend no carga
```bash
# Ver logs
docker-compose logs frontend

# Común: API URL incorrecto
# Solución: Revisar NEXT_PUBLIC_API_URL en .env

# Común: Build falló
# Solución: Revisar next.config.js, compilación local
```

### SSL error
```bash
# Verificar certificado
ls -la /etc/letsencrypt/live/pros.iorana.dev/

# Si falta:
certbot certonly --webroot -w /var/www/certbot -d pros.iorana.dev

# Verificar nginx config
nginx -t
```

### DNS no resuelve
```bash
# Esperar propagación (5-30 min)
nslookup pros.iorana.dev

# Forzar purga de caché
# Windows: ipconfig /flushdns
# Mac: sudo dscacheutil -flushcache
```

---

## 📞 MONITOREO POST-DEPLOY

### Logs en tiempo real
```bash
ssh root@89.167.103.147

# Ver logs de todos los servicios
docker-compose -f /opt/io-prospector/docker-compose.coolify.yml logs -f

# Solo backend
docker-compose -f /opt/io-prospector/docker-compose.coolify.yml logs -f backend

# Solo frontend
docker-compose -f /opt/io-prospector/docker-compose.coolify.yml logs -f frontend
```

### Health check
```bash
# Desde tu máquina
curl -I https://pros.iorana.dev
curl -I https://api.pros.iorana.dev/health

# Desde el VPS
curl http://localhost:3004
curl http://localhost:4006/health
```

### Reiniciar servicios
```bash
# Detener
docker-compose -f docker-compose.coolify.yml down

# Iniciar
docker-compose -f docker-compose.coolify.yml up -d

# Restart uno específico
docker-compose -f docker-compose.coolify.yml restart backend
```

---

## ✅ STATUS ACTUAL

```
✅ Configuración:    COMPLETA
✅ .env:              CREADO (credenciales reales)
✅ Scripts:           LISTOS (deploy.ps1, deploy.sh)
✅ Docker:            READY
✅ Nginx:             CONFIGURADO
✅ Certificados:      PENDIENTE (se crean en Hetzner)
✅ DNS:               PENDIENTE (configurar en Hetzner)

🚀 LISTO PARA DEPLOYMENT
```

---

**Generated:** 2026-06-26  
**Autor:** Claude Code  
**Status:** ✅ READY FOR PRODUCTION DEPLOYMENT
