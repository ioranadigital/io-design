# 🚀 Guía Rápida de Puertos - Cómo Levantar Proyectos

**Usa esta guía para ejecutar múltiples proyectos sin conflictos de puerto**

---

## 📋 Levantar Proyectos Individuales

### 🌐 Aplicaciones Next.js (3000-3009)

```bash
# Puerto 3000 - Iorana Next (Principal)
cd E:\git\app\interno\iorana-next && pnpm run dev

# Puerto 3001 - Resogar
cd E:\git\app\clientes\resogar && pnpm run dev

# Puerto 3003 - Casa Rural Asturias
cd E:\git\app\interno\casaruralasturias && pnpm run dev

# Puerto 3004 - Index Construcción
cd E:\git\app\interno\index-construccion && pnpm run dev

# Puerto 3005 - IO Docusia
cd E:\git\app\interno\io-docusia && pnpm run dev

# Puerto 3006 - Iorana Surf
cd E:\git\app\interno\iorana-surf && pnpm run dev

# Puerto 3007 - QR Iorana Dev
cd E:\git\app\interno\qr-iorana-dev && pnpm run dev

# Puerto 3008 - Ricardo Herrera Varela
cd E:\git\app\interno\ricardoherreravarela && pnpm run dev

# Puerto 3009 - Ricardo Herrera Varela (Copia)
cd E:\git\app\interno\ricardoherreravarela\ -\ copia && pnpm run dev
```

### 🔧 Herramientas (4000-4007)

```bash
# Puerto 4001 - IO Audit SEO
cd E:\git\app\tools\io-auditseo && supabase functions serve

# Puerto 4002 - IO CRM
cd E:\git\app\tools\io-crm && pnpm run dev

# Puerto 4003 - IO Budget
cd E:\git\app\interno\io-budget && pnpm run dev

# Puerto 4004 - IO Ads
cd E:\git\app\tools\io-ads && pnpm run dev

# Puerto 4005 - IO Design (Storybook)
cd E:\git\app\tools\io-design && pnpm run storybook

# Puerto 4006 - IO Neruda
cd E:\git\app\tools\io-neruda && pnpm run dev

# Puerto 4007 - Iorana Dev (Docker)
cd E:\git\app\interno\iorana-dev && docker-compose up -d
```

### ⚠️ Proyectos con Puertos Fijos

```bash
# Puertos 3002 + 4000 - IO Prospector (NO cambiar)
# Frontend (3002)
cd E:\git\app\tools\io-prospector\frontend && pnpm run dev

# Backend (4000)
cd E:\git\app\tools\io-prospector\backend && npm run dev

# Puerto 8080 - SurfVintage (Docker - NO cambiar)
cd E:\git\app\interno\surfvintage && docker-compose up -d
```

---

## 🎯 Escenarios Típicos

### Scenario 1: Desarrollar Solo Iorana Next
```bash
cd E:\git\app\interno\iorana-next
pnpm run dev
# Acceso: http://localhost:3000
```

### Scenario 2: Frontend + Backend (Prospector)
```bash
# Terminal 1
cd E:\git\app\tools\io-prospector\frontend
pnpm run dev
# http://localhost:3002

# Terminal 2
cd E:\git\app\tools\io-prospector\backend
npm run dev
# http://localhost:4000
```

### Scenario 3: WordPress Local + Una App
```bash
# Terminal 1 - SurfVintage
cd E:\git\app\interno\surfvintage
docker-compose up -d
# Acceso: http://localhost:8080

# Terminal 2 - Iorana Next
cd E:\git\app\interno\iorana-next
pnpm run dev
# Acceso: http://localhost:3000
```

### Scenario 4: Desarrollo Múltiple (5 proyectos)
```bash
# Abre 5 terminales

# Terminal 1: Iorana Next (3000)
cd E:\git\app\interno\iorana-next && pnpm run dev

# Terminal 2: Resogar (3001)
cd E:\git\app\clientes\resogar && pnpm run dev

# Terminal 3: IO Budget (4003)
cd E:\git\app\interno\io-budget && pnpm run dev

# Terminal 4: IO Ads (4004)
cd E:\git\app\tools\io-ads && pnpm run dev

# Terminal 5: SurfVintage (8080)
cd E:\git\app\interno\surfvintage && docker-compose up -d
```

---

## 📊 Tabla de Referencia Completa

Consulta **E:\git\PORTS.md** para:
- ✅ Tabla completa de todos los puertos
- ✅ Paths de cada proyecto
- ✅ Comandos exactos
- ✅ Información sobre puertos fijos

---

## ⚙️ Configuración Automática (Opcional)

Si quieres que los proyectos usen automáticamente sus puertos asignados, actualiza:

### Para Next.js projects:

**Crear `.env.local`:**
```env
PORT=3001  # Cambiar según proyecto
```

**O crear `next.config.js`:**
```javascript
module.exports = {
  env: {
    PORT: process.env.PORT || 3000
  },
  server: {
    port: process.env.PORT || 3000,
  },
}
```

### Para Node.js backends:

**Crear `.env`:**
```env
PORT=4000  # Cambiar según proyecto
```

---

## 🆘 Solución de Problemas

### ❌ "Address already in use" (Puerto ocupado)

```bash
# Encontrar proceso en puerto 3000
netstat -ano | findstr :3000

# Matar proceso (PID = 12345)
taskkill /PID 12345 /F
```

### ✅ Verificar que puerto está libre

```bash
# Comprobar puerto 3000
netstat -ano | findstr :3000

# Si no hay output, el puerto está libre
```

---

**Versión:** 1.0
**Última actualización:** 2026-05-29
**Mantener sincronizado con:** E:\git\PORTS.md
