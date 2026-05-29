# E:\git\CLAUDE.md — MASTER DE ORQUESTACIÓN DE REPOSITORIOS
**Nivel 2 (Subordinado a E:\CLAUDE.md)**
**Versión:** 2.0 | Fecha: 2026-05-22 | Actualizado: Hoy
**Status:** Operacional | Monorepo pnpm con 6 repositorios sincronizados

---

## AVISO DE AUTORIDAD
Este fichero **NO es soberano**. Todas las reglas aquí se subordinan a E:\CLAUDE.md (Master Constitutional). Cuando hay conflicto entre este fichero y E:\CLAUDE.md, **prevalece E:\CLAUDE.md**.

**Propósito:** Orquestar 6 repositorios como unidad cohesionada bajo pnpm workspace. Define flujos de trabajo, dependencias, comandos globales, y rutas críticas.

---

## 1. ARQUITECTURA DE 6 REPOSITORIOS (pnpm Monorepo)

```
E:\git\
├── pnpm-workspace.yaml (root)
├── iorana-next/              [Aplicación web principal - Next.js 15]
│   ├── src/
│   ├── .next/
│   └── CLAUDE.md (subordinado a este fichero)
├── lib/                      [Librería compartida @iorana/lib]
│   ├── hooks/
│   ├── types/
│   ├── utils/
│   └── CLAUDE.md (subordinado a este fichero)
├── audit-seo/                [Edge Functions + CLI para auditorías]
│   ├── supabase/functions/
│   ├── python/
│   └── CLAUDE.md (subordinado a este fichero)
├── io-obsidian/              [Base de conocimiento personal]
│   ├── vault/
│   └── CLAUDE.md (subordinado a este fichero)
├── io-crm/                   [Gestión relacional de clientes]
│   ├── src/
│   └── CLAUDE.md (subordinado a este fichero)
└── scripts/                  [Python, n8n, utilidades, logs]
    ├── python/
    ├── n8n-workflows/
    └── CLAUDE.md (subordinado a este fichero)
```

**Dependencias de buildtime:**
- `iorana-next` → depende de `@iorana/lib` (via pnpm)
- `lib` → **NO** depende de otros
- `audit-seo` → depende de `@iorana/lib` (tipos, utilidades)
- `io-obsidian` → independiente (markdown/JSON only)
- `io-crm` → depende de `@iorana/lib`
- `scripts` → depende de `@iorana/lib` (Python solo importa JSON types)

---

## 2. FLUJOS DE TRABAJO PRINCIPALES (3 Escenarios Críticos)

### FLUJO A: CREACIÓN DE LANDING PAGE (E2E: ~45min)

```
1. [lib] → Crear componente en @iorana/lib
   - Ruta: E:\git\lib\src\components\LandingHero.tsx
   - Validar: tsc, ESLint, Prettier
   
2. [lib] → Exportar en E:\git\lib\src\index.ts
   - export { LandingHero } from './components/...'
   - Correr: pnpm run build (desde lib/)
   
3. [iorana-next] → Importar y usar en página
   - import { LandingHero } from '@iorana/lib'
   - Integrar en E:\git\iorana-next\src\app\page.tsx
   
4. [iorana-next] → Validar y deployar
   - pnpm run build (root genera .next/ limpio)
   - pnpm run test:e2e
   - git commit + push a dev
   - Deploy automático via Vercel
```

**SLA:** < 45 minutos desde concepto a staging live

---

### FLUJO B: AUDITORÍA SEO CLIENTE (E2E: ~90min)

```
1. [scripts] → Localizar y validar fichero cliente
   - Ruta esperada: E:\_agencia\02-CLIENTES\{CLIENTE}\*KW-Final*.xlsx
   
2. [audit-seo] → Ejecutar auditoría Edge Function
   - supabase start
   - supabase functions serve
   - supabase functions deploy audit-seo --project-id=xxx
   
3. [scripts] → Generar resumen y archivar
   - Salida: E:\_agencia\02-CLIENTES\XANELUM\AUDITS\XANELUM_AUDIT_*.xlsx
   - Log: E:\scripts\output\logs\audit_XANELUM_*.log
```

**SLA:** < 90 minutos desde solicitud a entrega

---

### FLUJO C: SCRAPE + PUBLISH (E2E: ~120min)

```
1. [scripts] → Ejecutar scraper (n8n o Python)
   - Output: E:\git\scripts\output\scraped_*.json
   
2. [lib] → Procesar y enriquecer datos
   - Función: @iorana/lib/utils/enrichScrapedContent.ts
   
3. [io-crm] → Guardar metadatos en base relacional
   - INSERT en tabla scraped_content via Supabase
   
4. [iorana-next] → Publicar en página web
   - Ruta dinámica: /blog/[slug]
   - Query SSR desde Supabase
```

**SLA:** < 120 minutos desde scrape a sitio web live

---

## 3. TABLA DE DEPENDENCIAS ENTRE REPOSITORIOS

| Repositorio | Depende de | Criticidad | Impacto si falla |
|-------------|-----------|-----------|-----------------|
| iorana-next | lib | CRÍTICO | Landing no se renderiza |
| lib | — | BÁSICO | N/A (independiente) |
| audit-seo | lib | MEDIA | Edge functions malformadas |
| io-obsidian | — | BÁSICO | N/A (independiente) |
| io-crm | lib | MEDIA | CRM no persiste |
| scripts | lib | MEDIA | Scripts Python fallan |

---

## 4. PROTOCOLO pnpm WORKSPACE

### Instalación Inicial
```powershell
cd E:\git\
pnpm install           # Instala todas las dependencias
pnpm run build         # Build en orden topológico
```

### pnpm-workspace.yaml (E:\git\pnpm-workspace.yaml)
```yaml
packages:
  - 'lib'
  - 'iorana-next'
  - 'audit-seo'
  - 'io-obsidian'
  - 'io-crm'
  - 'scripts'
```

### Cambios Locales en lib → Propagar al Instante
```powershell
cd E:\git\lib
pnpm run build
cd E:\git\iorana-next
pnpm run dev           # Hot reload automático
```

**Regla de oro:** Cuando modificas lib, los cambios se ven al instante en iorana-next.

---

## 5. COMANDOS GLOBALES

| Comando | Ubicación | Qué hace |
|---------|-----------|----------|
| pnpm install | E:\git\ | Instala todas las dependencias |
| pnpm run build | E:\git\ | Build topológico |
| pnpm run dev | E:\git\iorana-next | Servidor local (puerto 3000) |
| pnpm run test:e2e | E:\git\iorana-next | Playwright E2E tests |
| pnpm run lint | E:\git\ | ESLint en todos |
| tsc --noEmit | E:\git\ | TypeScript validation |
| supabase functions serve | E:\git\audit-seo | Emula Edge Functions |

---

## 6. TABLA DE ACTIVACIÓN (User Phrases)

| User Phrase | Repo | Acción |
|-------------|------|--------|
| crear componente landing | lib → iorana-next | Generar componente |
| auditoría SEO para XANELUM | audit-seo → scripts | Ejecutar flujo |
| scrape y publica en web | scripts → lib → io-crm → iorana-next | Scrape + deploy |
| validar tipos | todos | tsc --noEmit |

---

## 7. VARIABLES .env COMPARTIDAS

**Ubicación única:** E:\master.env

```typescript
// lib/src/config/env.ts
import { config } from 'dotenv'
config({ path: 'E:/master.env' })

export const ENV = {
  SUPABASE_URL: process.env.SUPABASE_URL!,
  SUPABASE_KEY: process.env.SUPABASE_KEY!,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  N8N_WEBHOOK_URL: process.env.N8N_WEBHOOK_URL!,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY!,
}
```

---

## 8. RUTAS CRÍTICAS Y SLAs

| Ruta | SLA | Owner |
|------|-----|-------|
| Landing Deploy | < 5min | iorana-next |
| SEO Audit | < 90min | audit-seo + scripts |
| Scrape → Publish | < 120min | scripts + io-crm + iorana-next |
| Type Validation | < 3min | lib |

---

## 9. MATRIZ DE AUTORIDAD

| Nivel | Fichero | Autoridad |
|-------|---------|-----------|
| Nivel 1 (Supremo) | E:\CLAUDE.md | Master Constitutional |
| Nivel 2 (Orquestación) | E:\git\CLAUDE.md | Gobierna 6 repos |
| Nivel 3 (Especializado) | E:\git\{repo}\CLAUDE.md | Repo específico |

**Cuando hay conflicto: E:\CLAUDE.md prevalece siempre**

---

## 10. ÍNDICE CRUZADO DE DOCUMENTACIÓN

| Documento | Ubicación | Propósito |
|-----------|-----------|----------|
| Master Constitutional | E:\CLAUDE.md | Governanza suprema |
| Orquestación Monorepo | E:\git\CLAUDE.md | Conectar 6 repos |
| Lib Config | E:\git\lib\CLAUDE.md | Hooks y tipos |
| Next.js App | E:\git\iorana-next\CLAUDE.md | Landing + auditoría UI |
| Audit SEO | E:\git\audit-seo\CLAUDE.md | Edge Functions |
| Obsidian Vault | E:\git\io-obsidian\CLAUDE.md | Base de conocimiento |
| CRM Relacional | E:\git\io-crm\CLAUDE.md | Persistencia cliente |
| Scripts & n8n | E:\git\scripts\CLAUDE.md | Python + workflows |

---

## 11. STACK VALIDATION (Confirmar Conformidad)

Todos los 6 repositorios DEBEN respetar:

- ✅ Next.js 15
- ✅ TypeScript 5.x con strict: true
- ✅ Tailwind CSS v4
- ✅ pnpm como ÚNICO package manager (npm PROHIBIDO)
- ✅ Supabase para DB + Auth
- ✅ Python 3.11
- ✅ n8n para workflows
- ✅ Hetzner VPS para hosting
- ✅ E:\master.env como single source of truth

Validar antes de cada deploy:
```powershell
cd E:\git\
pnpm run build          # Detiene si hay errores
tsc --noEmit            # TypeScript strict validation
pnpm run lint           # ESLint en todos
```

Si CUALQUIERA falla, **bloquea deploy**.

---

## 12. CÓMO USAR ESTE FICHERO

**Para Claude Code:**
1. Si usuario dice "crear componente" → FLUJO A (sección 2)
2. Si usuario dice "auditoría SEO" → FLUJO B
3. Si usuario dice "scrape + publish" → FLUJO C
4. Si hay conflicto de autoridad → E:\CLAUDE.md prevalece
5. Para preguntas sobre monorepo → sección 4
6. Para activación de acciones → tabla 6

**Para el usuario (Manual Operacional):**
1. Antes de commitear: pnpm run build && tsc --noEmit && pnpm run lint
2. Antes de desplegar: Verificar que SLA en sección 8 se cumple
3. Si algo falla: Revisar matriz de dependencias (sección 3)

---

**Versión:** 2.0
**Última actualización:** 2026-05-22
**Estatus:** ✅ Operacional
**Subordinado a:** E:\CLAUDE.md (Master Constitutional)
