# 🔌 Tabla de Puertos - Arquitectura Local

**Referencia centralizada de puertos para todos los proyectos**

Última actualización: 2026-05-29

---

## 📋 Resumen por Rango

| Rango | Uso | Proyectos | Estado |
|-------|-----|-----------|--------|
| 3000-3009 | Aplicaciones Next.js | 10 sitios web | Activo |
| 4000-4009 | Herramientas & Backends | 7 herramientas | Activo |
| 8080 | Docker (WordPress) | SurfVintage | Activo |

---

## 🌐 APLICACIONES NEXT.JS (3000-3009)

| Puerto | Proyecto | Tipo | Path | Comando |
|--------|----------|------|------|---------|
| **3000** | **Iorana Next** | SaaS Principal | `E:\git\app\interno\iorana-next` | `pnpm run dev` |
| **3001** | Resogar | Sitio Cliente | `E:\git\app\clientes\resogar` | `pnpm run dev` |
| **3002** | IO Prospector (Frontend) | ⚠️ FIJO | `E:\git\app\tools\io-prospector\frontend` | `pnpm run dev` |
| **3003** | Casa Rural Asturias | Sitio Interno | `E:\git\app\interno\casaruralasturias` | `pnpm run dev` |
| **3004** | Index Construcción | Sitio Interno | `E:\git\app\interno\index-construccion` | `pnpm run dev` |
| **3005** | IO Docusia | Herramienta | `E:\git\app\interno\io-docusia` | `pnpm run dev` |
| **3006** | Iorana Surf | Sitio Interno | `E:\git\app\interno\iorana-surf` | `pnpm run dev` |
| **3007** | QR Iorana Dev | Herramienta | `E:\git\app\interno\qr-iorana-dev` | `pnpm run dev` |
| **3008** | Ricardo Herrera Varela | Portafolio | `E:\git\app\interno\ricardoherreravarela` | `pnpm run dev` |
| **3009** | Ricardo Herrera Varela (Copia) | Experimental | `E:\git\app\interno\ricardoherreravarela - copia` | `pnpm run dev` |

---

## 🔧 HERRAMIENTAS & BACKENDS (4000-4009)

| Puerto | Proyecto | Tipo | Path | Comando |
|--------|----------|------|------|---------|
| **4000** | IO Prospector (Backend) | ⚠️ FIJO | `E:\git\app\tools\io-prospector\backend` | `npm run dev` |
| **4001** | IO Audit SEO | Edge Functions | `E:\git\app\tools\io-auditseo` | `supabase functions serve` |
| **4002** | IO CRM | Aplicación | `E:\git\app\tools\io-crm` | `pnpm run dev` |
| **4003** | IO Budget | Aplicación | `E:\git\app\interno\io-budget` | `pnpm run dev` |
| **4004** | IO Ads | Aplicación | `E:\git\app\tools\io-ads` | `pnpm run dev` |
| **4005** | IO Design | Librería + Storybook | `E:\git\app\tools\io-design` | `pnpm run storybook` |
| **4006** | IO Neruda | Aplicación | `E:\git\app\tools\io-neruda` | `pnpm run dev` |
| **4007** | Iorana Dev | Docker Dev | `E:\git\app\interno\iorana-dev` | `docker-compose up -d` |

---

## 🐳 DOCKER CONTAINERS (Puertos especiales)

| Puerto | Proyecto | Servicio | Path | Comando |
|--------|----------|----------|------|---------|
| **8080** | SurfVintage (WordPress) | ⚠️ FIJO | `E:\git\app\interno\surfvintage` | `docker-compose up -d` |
| 3306 | SurfVintage | MariaDB | - | Interno |
| 6379 | SurfVintage | Redis | - | Interno |

---

## ⚙️ CLI & LIBRERÍAS (Sin puerto)

| Proyecto | Tipo | Path | Comando |
|----------|------|------|---------|
| IO KW | CLI Python/TypeScript | `E:\git\app\tools\io-kw` | `pnpm extract:gsc` |
| @iorana/lib | Librería | `E:\git\lib` | `pnpm run build` |
| Scripts | Python + N8N | `E:\git\scripts` | `python3 script.py` |
| Artifacts | Almacenamiento | `E:\git\artifacts` | N/A |

---

## 🚀 Cómo Usar Este Documento

### Levantar un proyecto específico:
```bash
cd E:\git\app\interno\iorana-next
pnpm run dev    # Abrirá en http://localhost:3000
```

### Levantar múltiples proyectos sin conflictos:
```bash
# Terminal 1: Iorana Next en puerto 3000
cd E:\git\app\interno\iorana-next && pnpm run dev

# Terminal 2: Resogar en puerto 3001
cd E:\git\app\clientes\resogar && pnpm run dev

# Terminal 3: IO Prospector Backend en puerto 4000
cd E:\git\app\tools\io-prospector\backend && npm run dev

# Terminal 4: SurfVintage en puerto 8080
cd E:\git\app\interno\surfvintage && docker-compose up -d
```

Todos funcionarán sin conflictos.

---

## ⚠️ PUERTOS FIJOS (NO MODIFICAR)

Estos puertos están hardcodeados en configuraciones externas y **no deben cambiarse**:

- **3002** - IO Prospector Frontend (NEXT_PUBLIC_API_URL apunta a localhost:4000)
- **4000** - IO Prospector Backend (referenciado desde frontend)
- **8080** - SurfVintage (docker-compose.yml)

---

## 📝 Configuración de Variables de Entorno

Cada proyecto debe tener en su `.env.local`:

```env
# Ejemplo para Resogar en puerto 3001
PORT=3001
NEXT_PUBLIC_API_URL=http://localhost:4000  # Si necesita backend
```

Para projects Next.js, crear/actualizar `next.config.js`:
```javascript
module.exports = {
  server: {
    port: process.env.PORT || 3000,
  },
}
```

---

## 📊 Estado Actual

✅ Asignación completa (22 proyectos)
✅ Sin conflictos de puertos
✅ CLI/Librerías documentadas
⚠️ Pendiente: Actualizar `.env.local` en proyectos

---

**Versión:** 1.0
**Status:** Activo
**Mantenedor:** Claude Code
