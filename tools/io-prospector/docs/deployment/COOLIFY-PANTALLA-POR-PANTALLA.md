# ⚙️ COOLIFY: CONFIGURACIÓN PANTALLA POR PANTALLA

**URL:** http://168.119.53.118:8000

---

## 🔐 PANTALLA 1: LOGIN

**Si es primera vez:**

```
URL: http://168.119.53.118:8000
↓
Click en "Register" o crear cuenta
Email: honatuya@gmail.com
Password: [crear contraseña fuerte]
Click "Create Account"
```

**Si ya tienes cuenta:**

```
Email: honatuya@gmail.com
Password: [tu contraseña]
Click "Login"
```

---

## 🏠 PANTALLA 2: DASHBOARD PRINCIPAL

Después de login, verás:

```
┌─────────────────────────────────────────────┐
│ Coolify Dashboard                           │
│ ┌─────────────────────────────────────────┐ │
│ │ Projects          [+ New Project]       │ │
│ │                                         │ │
│ │ Resources | Applications | Databases   │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

**Acción:** Click en `[+ New Project]` (arriba a la derecha)

---

## 📁 PANTALLA 3: CREAR NUEVO PROYECTO

Verás formulario:

```
┌─────────────────────────────────────────────┐
│ New Project                                 │
├─────────────────────────────────────────────┤
│                                             │
│ Project Name *                              │
│ ┌─────────────────────────────────────────┐ │
│ │ IO-Prospector                           │ │ ← COPIA ESTO
│ └─────────────────────────────────────────┘ │
│                                             │
│ Description (opcional)                      │
│ ┌─────────────────────────────────────────┐ │
│ │ Herramienta de prospección SEO          │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│                     [Create Project]       │
│                                             │
└─────────────────────────────────────────────┘
```

**Acciones:**

1. En "Project Name" escribe: `IO-Prospector`
2. En "Description" escribe: `Herramienta de prospección SEO`
3. Click `[Create Project]`

---

## ✅ PANTALLA 4: PROYECTO CREADO

Verás:

```
┌──────────────────────────────────────────────┐
│ IO-Prospector                                │
├──────────────────────────────────────────────┤
│                                              │
│ [Applications]  [Databases]  [Settings]     │
│                                              │
│ Applications (vacío aún)                    │
│ ┌──────────────────────────────────────────┐ │
│ │                                          │ │
│ │     [+ New Application]                  │ │
│ │                                          │ │
│ └──────────────────────────────────────────┘ │
│                                              │
└──────────────────────────────────────────────┘
```

**Acción:** Click en `[+ New Application]`

---

## 📦 PANTALLA 5: CREAR APLICACIÓN - TIPO

Verás opciones de tipo:

```
┌──────────────────────────────────────────────┐
│ Create Application                           │
├──────────────────────────────────────────────┤
│                                              │
│ Application Type:                            │
│                                              │
│ ○ Docker                                    │
│ ○ Docker Compose  ← SELECCIONA ESTO        │
│ ○ Heroku Buildpacks                         │
│ ○ Git Repository                            │
│ ○ Static Site                                │
│                                              │
│                 [Next]                       │
│                                              │
└──────────────────────────────────────────────┘
```

**Acción:**

1. Click en radio button de `Docker Compose`
2. Click `[Next]`

---

## 🔧 PANTALLA 6: CREAR APLICACIÓN - CONFIGURACIÓN

Verás formulario:

```
┌──────────────────────────────────────────────┐
│ Create Application - Docker Compose          │
├──────────────────────────────────────────────┤
│                                              │
│ Application Name *                           │
│ ┌──────────────────────────────────────────┐ │
│ │ io-prospector                            │ │ ← COPIA ESTO
│ └──────────────────────────────────────────┘ │
│                                              │
│ Source Path *                                │
│ ┌──────────────────────────────────────────┐ │
│ │ /apps/io-prospector                      │ │ ← COPIA ESTO
│ └──────────────────────────────────────────┘ │
│                                              │
│ Description (opcional)                       │
│ ┌──────────────────────────────────────────┐ │
│ │ Frontend + Backend + Redis                │ │
│ └──────────────────────────────────────────┘ │
│                                              │
│                 [Create]                    │
│                                              │
└──────────────────────────────────────────────┘
```

**Acciones:**

1. Application Name: `io-prospector`
2. Source Path: `/apps/io-prospector`
3. Description: `Frontend + Backend + Redis`
4. Click `[Create]`

---

## ✅ PANTALLA 7: APLICACIÓN CREADA

Verás la aplicación creada con tabs:

```
┌──────────────────────────────────────────────────┐
│ IO-Prospector > io-prospector                   │
├──────────────────────────────────────────────────┤
│                                                  │
│ [General] [Build] [Deploy] [Environment]        │
│ [Network] [Volumes] [Monitoring] [Logs]         │
│                                                  │
│ Status: Not deployed yet                        │
│                                                  │
└──────────────────────────────────────────────────┘
```

**Acción:** Click en tab `[Build]`

---

## 🔨 PANTALLA 8: TAB BUILD

Verás campo de Build Command:

```
┌──────────────────────────────────────────────────┐
│ [General] [Build] [Deploy]...                   │
├──────────────────────────────────────────────────┤
│                                                  │
│ Build Command *                                 │
│ ┌──────────────────────────────────────────────┐ │
│ │ docker-compose build --progress=plain       │ │
│ └──────────────────────────────────────────────┘ │ ← COPIA ESTO
│                                                  │
│ Dockerfile (opcional - dejar vacío)             │
│ ┌──────────────────────────────────────────────┐ │
│ │ [vacío]                                      │ │
│ └──────────────────────────────────────────────┘ │
│                                                  │
│ Base Directory (opcional)                       │
│ ┌──────────────────────────────────────────────┐ │
│ │ /apps/io-prospector                          │ │
│ └──────────────────────────────────────────────┘ │
│                                                  │
│ [Save]                                          │
│                                                  │
└──────────────────────────────────────────────────┘
```

**Acciones:**

1. Build Command: `docker-compose build --progress=plain`
2. Dockerfile: DEJAR VACÍO (usará docker-compose.yml)
3. Base Directory: `/apps/io-prospector`
4. Click `[Save]`

---

## 🚀 PANTALLA 9: TAB DEPLOY

Click en tab `[Deploy]`:

```
┌──────────────────────────────────────────────────┐
│ [Build] [Deploy] [Environment]...              │
├──────────────────────────────────────────────────┤
│                                                  │
│ Start Command *                                 │
│ ┌──────────────────────────────────────────────┐ │
│ │ docker-compose up -d                        │ │
│ └──────────────────────────────────────────────┘ │ ← COPIA ESTO
│                                                  │
│ Stop Command (opcional)                         │
│ ┌──────────────────────────────────────────────┐ │
│ │ docker-compose down                         │ │
│ └──────────────────────────────────────────────┘ │ ← COPIA ESTO
│                                                  │
│ Health Check (opcional)                         │
│ ┌──────────────────────────────────────────────┐ │
│ │ http://localhost:4000/health                │ │
│ └──────────────────────────────────────────────┘ │ ← COPIA ESTO
│                                                  │
│ [Save]                                          │
│                                                  │
└──────────────────────────────────────────────────┘
```

**Acciones:**

1. Start Command: `docker-compose up -d`
2. Stop Command: `docker-compose down`
3. Health Check: `http://localhost:4000/health`
4. Click `[Save]`

---

## 🔐 PANTALLA 10: TAB ENVIRONMENT

Click en tab `[Environment]`:

```
┌──────────────────────────────────────────────────┐
│ [Deploy] [Environment] [Network]...            │
├──────────────────────────────────────────────────┤
│                                                  │
│ Environment Variables                           │
│ ┌──────────────────────────────────────────────┐ │
│ │ KEY              | VALUE                     │ │
│ ├──────────────────────────────────────────────┤ │
│ │                  |                            │ │
│ │  [+ Add Variable]                            │ │
│ │                                              │ │
│ └──────────────────────────────────────────────┘ │
│                                                  │
│ O pega archivo .env completo:                   │
│ ┌──────────────────────────────────────────────┐ │
│ │ NODE_ENV=production                          │ │
│ │ PORT=4000                                    │ │
│ │ FRONTEND_URL=http://168.119.53.118:3004    │ │
│ │ NEXT_PUBLIC_SUPABASE_URL=...                │ │
│ │ SUPABASE_URL=...                            │ │
│ │ ... (todas las variables del .env)          │ │
│ └──────────────────────────────────────────────┘ │
│                                                  │
│ [Save]                                          │
│                                                  │
└──────────────────────────────────────────────────┘
```

**Acción IMPORTANTE:**
Copiar TODO el contenido del `.env` que creaste en el servidor:

```bash
# En servidor: /apps/io-prospector/
cat .env
# Copiar TODO el output
```

Luego pegarla en el campo grande de Environment Variables en Coolify.

**Click `[Save]`**

---

## 🌐 PANTALLA 11: TAB NETWORK

Click en tab `[Network]`:

```
┌──────────────────────────────────────────────────┐
│ [Environment] [Network] [Volumes]...            │
├──────────────────────────────────────────────────┤
│                                                  │
│ Expose Ports                                    │
│ ┌──────────────────────────────────────────────┐ │
│ │ Port  | Published | Type                     │ │
│ ├──────────────────────────────────────────────┤ │
│ │ 3004  | 3004      | Public  ✓                │ │
│ │ 4006  | 4006      | Public  ✓                │ │
│ │ 6379  | 6379      | Private ✓                │ │
│ │                                              │ │
│ │ [+ Add Port]                                 │ │
│ │                                              │ │
│ └──────────────────────────────────────────────┘ │
│                                                  │
│ [Save]                                          │
│                                                  │
└──────────────────────────────────────────────────┘
```

**Si NO ves los puertos, agregalos:**

1. Click `[+ Add Port]` para cada uno:

   **Puerto 1:**
   - Port: `3004`
   - Published: `3004`
   - Type: `Public` ✓
   - Click Add

   **Puerto 2:**
   - Port: `4006`
   - Published: `4006`
   - Type: `Public` ✓
   - Click Add

   **Puerto 3:**
   - Port: `6379`
   - Published: `6379`
   - Type: `Private` ✓
   - Click Add

2. Click `[Save]`

---

## ✅ PANTALLA 12: VERIFICACIÓN FINAL

Vuelve a tab `[General]`:

```
┌──────────────────────────────────────────────────┐
│ [General] [Build] [Deploy] [Environment]...    │
├──────────────────────────────────────────────────┤
│                                                  │
│ Status: Ready to Deploy ✓                       │
│                                                  │
│ Build Command: ✓ docker-compose build...       │
│ Start Command: ✓ docker-compose up -d          │
│ Ports: ✓ 3004, 4006, 6379                      │
│ Environment: ✓ Variables cargadas              │
│                                                  │
│              [Deploy Now]                       │
│                                                  │
└──────────────────────────────────────────────────┘
```

**Acción:** Click `[Deploy Now]`

---

## 🚀 PANTALLA 13: DEPLOYMENT EN PROGRESO

Verás:

```
┌──────────────────────────────────────────────────┐
│ Deployment Status                                │
├──────────────────────────────────────────────────┤
│                                                  │
│ ⏳ Building images...                           │
│    Step 1/15 FROM node:20-alpine                │
│    Step 2/15 WORKDIR /app                       │
│    ...                                          │
│                                                  │
│ Progress: 45%                                   │
│                                                  │
│ [Cancel]                                        │
│                                                  │
└──────────────────────────────────────────────────┘
```

**Espera a que termine** (3-10 minutos)

Verás:

```
✓ Build successful
✓ Images created
✓ Containers starting...
✓ Health checks: OK
✓ Deployment complete!
```

---

## ✨ PANTALLA 14: DEPLOYMENT EXITOSO

Verás:

```
┌──────────────────────────────────────────────────┐
│ IO-Prospector > io-prospector                   │
│                                                  │
│ Status: ✅ Running                              │
│                                                  │
│ Endpoints:                                      │
│ • Frontend: http://168.119.53.118:3004         │
│ • Backend: http://168.119.53.118:4006/api      │
│ • Redis: redis://168.119.53.118:6379           │
│                                                  │
│ Containers:                                     │
│ ✓ io-prospector-frontend (Up)                  │
│ ✓ io-prospector-backend (Up)                   │
│ ✓ io-prospector-redis (Up)                     │
│                                                  │
│ [View Logs] [Restart] [Stop] [Settings]        │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

## 🎯 RESUMEN DE LO QUE CONFIGURASTE

| Paso | Campo         | Valor                                   |
| ---- | ------------- | --------------------------------------- |
| 3    | Project Name  | `IO-Prospector`                         |
| 6    | App Name      | `io-prospector`                         |
| 6    | Source Path   | `/apps/io-prospector`                   |
| 8    | Build Command | `docker-compose build --progress=plain` |
| 9    | Start Command | `docker-compose up -d`                  |
| 9    | Stop Command  | `docker-compose down`                   |
| 9    | Health Check  | `http://localhost:4000/health`          |
| 10   | Environment   | Copiar .env completo                    |
| 11   | Puertos       | 3004, 4006, 6379                        |

---

## ✅ VERIFICAR QUE FUNCIONÓ

```bash
# Desde tu máquina
curl http://168.119.53.118:3004          # Debe ver HTML
curl http://168.119.53.118:4006/api/health  # Debe ver JSON
```

---

**Tiempo total:** ~15 minutos  
**Status:** ✅ Deployment en Coolify completado
