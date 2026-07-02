# 🚀 START HERE - IO Prospector Deployment to Coolify

**¿Primer despliegue?** → Empieza aquí ⬇️

---

## 📌 3 OPCIONES DE LECTURA

### ⚡ Opción 1: Despliegue Rápido (5 minutos)

Si solo quieres deployar rápido y ya sabes qué haces:

**Leer:** [`docs/deployment/QUICK-DEPLOY.md`](docs/deployment/QUICK-DEPLOY.md)  
**Script:** `.\docs\deployment\sync-to-coolify.ps1`

---

### 📖 Opción 2: Guía Completa (30 minutos)

Si es tu primera vez y quieres entender todo:

**Leer:** [`docs/deployment/COOLIFY-DEPLOYMENT-GUIDE.md`](docs/deployment/COOLIFY-DEPLOYMENT-GUIDE.md)  
**Checklist:** [`DEPLOY-CHECKLIST.md`](DEPLOY-CHECKLIST.md)

---

### 📋 Opción 3: Visión General (2 minutos)

Solo quiero ver qué se preparó:

**Leer:** [`DEPLOY-SUMMARY.txt`](DEPLOY-SUMMARY.txt)  
**Leer:** [`docs/deployment/README.md`](docs/deployment/README.md)

---

## 🎯 PASOS RÁPIDOS (Para apurados)

```powershell
# PASO 1: Sincronizar código (2 min)
cd E:\git\tools\io-prospector
.\docs\deployment\sync-to-coolify.ps1

# PASO 2: SSH al servidor (1 min)
ssh -i ~/.ssh/id_ed25519 root@168.119.53.118
cd /apps/io-prospector

# PASO 3: Crear .env (1 min)
cp .env.example .env
nano .env  # Rellenar valores desde master.env

# PASO 4: Construir (5 min)
docker-compose build --progress=plain

# PASO 5: Iniciar (1 min)
docker-compose up -d
docker-compose ps

# PASO 6: Verificar (1 min)
curl http://168.119.53.118:3004
curl http://168.119.53.118:4006/api/health
```

**Total: ~10 minutos** ✅

---

## 📦 QUÉ SE PREPARÓ

### ✅ Dockerfiles

- **`backend.Dockerfile`** - Multi-stage builder para Express
- **`frontend.Dockerfile`** - Multi-stage builder para Next.js

### ✅ Scripts de Automatización

- **`sync-to-coolify.ps1`** - Sincronización automática via SSH
- **`verify-ports.ps1`** - Verificar puertos disponibles

### ✅ Configuración

- **`.env.example`** - Template de variables de entorno

### ✅ Documentación

- **`QUICK-DEPLOY.md`** - Guía rápida (5 min)
- **`COOLIFY-DEPLOYMENT-GUIDE.md`** - Guía completa (30 min)
- **`DEPLOY-CHECKLIST.md`** - Checklist interactiva
- **`README.md`** - Índice de documentación

---

## 🌍 ACCESO DESPUÉS DE DESPLIEGUE

```
Frontend:    http://168.119.53.118:3004
Backend API: http://168.119.53.118:4006/api
Redis:       redis://168.119.53.118:6379
Coolify:     http://168.119.53.118:8000
```

---

## ⚠️ PRE-REQUISITOS

Antes de empezar, asegúrate que tienes:

- ✅ SSH key `~/.ssh/id_ed25519`
- ✅ rsync instalado
- ✅ Acceso al servidor 168.119.53.118
- ✅ Acceso a master.env (para credenciales)

**¿Te falta algo?**

```powershell
# Generar SSH key
ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519 -N ""

# Instalar rsync
choco install rsync
```

---

## 🆘 PROBLEMAS COMUNES

| Problema              | Solución                               |
| --------------------- | -------------------------------------- |
| `Connection refused`  | `docker-compose restart frontend`      |
| `Port already in use` | Cambiar puerto en `docker-compose.yml` |
| `.env not found`      | `cp .env.example .env`                 |
| `Build failed`        | `docker-compose build --no-cache`      |
| `Redis timeout`       | `docker-compose restart redis`         |

---

## 📞 DOCUMENTACIÓN COMPLETA

| Documento                                                                    | Tiempo     | Propósito             |
| ---------------------------------------------------------------------------- | ---------- | --------------------- |
| [`QUICK-DEPLOY.md`](docs/deployment/QUICK-DEPLOY.md)                         | 5 min      | Despliegue rápido     |
| [`COOLIFY-DEPLOYMENT-GUIDE.md`](docs/deployment/COOLIFY-DEPLOYMENT-GUIDE.md) | 30 min     | Guía paso-a-paso      |
| [`README.md`](docs/deployment/README.md)                                     | 10 min     | Índice completo       |
| [`DEPLOY-CHECKLIST.md`](DEPLOY-CHECKLIST.md)                                 | Imprimible | Checklist interactiva |
| [`DEPLOY-SUMMARY.txt`](DEPLOY-SUMMARY.txt)                                   | 5 min      | Resumen visual        |

---

## 🎯 SIGUIENTES PASOS

1. **Ahora:** Elige una opción arriba y comienza
2. **Después:** Sigue los pasos en el documento que elegiste
3. **Final:** Verifica acceso en http://168.119.53.118:3004

---

**¿Listo?** → Elige tu guía arriba y ¡adelante! 🚀
