# 🔍 AUDITORÍA DE ARQUITECTURA - Plan de Acción

**Fecha:** 2026-05-29  
**Estado:** 23 hallazgos identificados  
**Prioridad:** 🔴 6 Críticos | 🟠 8 Altos | 🟡 9 Medios

---

## 🚨 ACCIONES CRÍTICAS INMEDIATAS (24h)

### 1. REVOCAR CREDENCIALES EXPUESTAS ⚠️⚠️⚠️

**Ubicación:** `E:\git\app\tools\io-prospector\backend\.env`

**Credenciales Comprometidas:**
```
✗ SUPABASE_KEY (JWT token válido)
✗ SERP_API_KEY
✗ SMTP_PASS (Gmail: syolrxhccvaijkql)
✗ SUPABASE_URL
✗ Email: honatuya@gmail.com
```

**Acciones:**
- [ ] **Inmediatamente**: Revocar Supabase API keys en console.supabase.co
- [ ] Cambiar contraseña Gmail (y generar nueva app password)
- [ ] Revocar SerpAPI key en dashboard
- [ ] Generar nuevas credenciales
- [ ] Actualizar E:\master.env
- [ ] Realizar git clean: `git filter-branch --force --index-filter "git rm --cached --ignore-unmatch .env" --prune-empty --tag-name-filter cat -- --all`

**Tiempo:** 30 minutos
**Riesgo:** 🔴 CRÍTICO

---

### 2. Eliminar Carpeta "Copia" de Git

**Ubicación:** `E:\git\app\interno\ricardoherreravarela - copia/`

**Problema:** Duplicación innecesaria, anti-patrón, contamina el repo

**Acciones:**
```bash
# Opción A: Si no necesitas el contenido
cd E:\git\app\interno
rm -r "ricardoherreravarela - copia"
git rm -r "ricardoherreravarela - copia"
git commit -m "Remove duplicate ricardoherreravarela folder (use git branches instead)"

# Opción B: Si quieres preservar el contenido
git checkout -b feature/ricardo-experimental
# (copy contents to main branch if needed)
git checkout main
git branch -D feature/ricardo-experimental
```

**Tiempo:** 10 minutos
**Riesgo:** 🔴 CRÍTICO

---

### 3. Actualizar pnpm-workspace.yaml

**Ubicación:** `E:\git\pnpm-workspace.yaml`

**Problema:** No incluye 13+ proyectos en `/app/`

**Cambio:**
```yaml
# ANTES
packages:
  - 'lib'
  - 'iorana-next'
  - 'audit-seo'
  - 'io-obsidian'
  - 'io-crm'
  - 'scripts'

# DESPUÉS
packages:
  - 'lib'
  - 'scripts'
  - 'app/clientes/*'
  - 'app/interno/*'
  - 'app/tools/*'
```

**Acciones:**
- [ ] Actualizar pnpm-workspace.yaml
- [ ] Ejecutar `pnpm install` en raíz
- [ ] Verificar: `pnpm ls --depth=0`

**Tiempo:** 15 minutos
**Riesgo:** 🔴 CRÍTICO

---

### 4. Eliminar package-lock.json (npm)

**Ubicación:** Múltiples directorios

**Problema:** Violación de regla "pnpm como ÚNICO package manager"

**Archivos a eliminar:**
```
E:\git\app\clientes\resogar\package-lock.json
E:\git\app\interno\iorana-next\package-lock.json
E:\git\app\tools\io-crm\package-lock.json
E:\git\app\tools\io-auditseo\package-lock.json
E:\git\app\tools\io-prospector\frontend\package-lock.json
```

**Acciones:**
```bash
# Eliminar y regenerar con pnpm
find E:\git\app -name "package-lock.json" -delete
cd E:\git
pnpm install
```

**Tiempo:** 10 minutos
**Riesgo:** 🔴 CRÍTICO

---

## 📋 ACCIONES DE ALTA PRIORIDAD (Esta Semana)

### 5. Fix @iorana/lib Path Hardcoding

**Ubicación:** `E:\git\app\interno\iorana-next\package.json`

**Problema:**
```json
"@iorana/lib": "link:E:\\lib"  // ❌ Hardcoded Windows path
```

**Solución:**
```json
"@iorana/lib": "workspace:*"  // ✅ Usa pnpm workspace
```

**Acciones:**
- [ ] Actualizar `package.json` en iorana-next
- [ ] Actualizar `package.json` en otros proyectos que usan @iorana/lib
- [ ] Verificar: `pnpm ls @iorana/lib`

**Tiempo:** 20 minutos
**Impacto:** CI/CD en Linux/Docker

---

### 6. Enforcar TypeScript Strict Mode

**Ubicación:** Múltiples `tsconfig.json`

**Problema:**
```json
{
  "compilerOptions": {
    "strict": false  // ❌ io-crm
  }
}
```

**Solución:**
```bash
# Actualizar io-crm
cd E:\git\app\tools\io-crm
# Cambiar "strict": false a "strict": true
# Ejecutar: tsc --noEmit para encontrar errores
# Corregir tipos
```

**Acciones:**
- [ ] Establecer `strict: true` en todos los tsconfig.json
- [ ] Ejecutar `tsc --noEmit` en cada proyecto
- [ ] Corregir errores de tipo
- [ ] Centralizar en `tsconfig.base.json`:
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

**Tiempo:** 2-3 horas
**Riesgo:** 🟠 Alto

---

### 7. Crear GitHub Actions CI/CD

**Ubicación:** Crear `.github/workflows/`

**Archivos a crear:**
- `.github/workflows/test.yml` - Tests & Lint
- `.github/workflows/build.yml` - Build validation
- `.github/workflows/deploy.yml` - Deploy a Hetzner/Vercel

**Ejemplo test.yml:**
```yaml
name: Test & Lint

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v3
        with:
          node-version: 20
          cache: 'pnpm'
      
      - run: pnpm install
      - run: pnpm run lint
      - run: pnpm run type-check
      - run: pnpm run test:run
      - run: pnpm run build
```

**Acciones:**
- [ ] Crear workflow files
- [ ] Configurar secrets en GitHub (API keys)
- [ ] Probar en rama de prueba
- [ ] Validar que pasa en PRs

**Tiempo:** 3-4 horas
**Beneficio:** 🟠 Alto

---

### 8. Crear Git Hooks (Husky + Lint-Staged)

**Ubicación:** Raíz monorepo

**Acciones:**
```bash
cd E:\git
pnpm add -D husky lint-staged

# Setup husky
npx husky install

# Crear pre-commit hook
npx husky add .husky/pre-commit "pnpm exec lint-staged"
npx husky add .husky/pre-push "pnpm run type-check && pnpm run test"
```

**Configurar lint-staged en root package.json:**
```json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "tsc --noEmit"],
    "*.json": ["prettier --write"]
  }
}
```

**Tiempo:** 1 hora
**Beneficio:** Evita commits inválidos

---

## 🔧 ACCIONES DE PRIORIDAD MEDIA (Próximas 2 Semanas)

### 9. Actualizar Tailwind CSS a v4

**Ubicación:** `E:\git\app\tools\io-crm/`

**Cambio:**
```json
{
  "tailwindcss": "^4.0.0"  // Cambiar desde ^3.4.1
}
```

**Acciones:**
```bash
cd E:\git\app\tools\io-crm
pnpm update tailwindcss@latest
# Revisar breaking changes en tailwind.config.js
```

**Tiempo:** 1 hora
**Riesgo:** 🟡 Medio (puede haber breaking changes)

---

### 10. Actualizar React 18 → React 19

**Ubicación:** `E:\git\app\tools\io-crm/`

**Acciones:**
```bash
cd E:\git\app\tools\io-crm
pnpm update react@latest react-dom@latest next@latest
# Revisar changelog
```

**Tiempo:** 2 horas
**Riesgo:** 🟡 Medio

---

### 11. Centralizar Node.js Version

**Ubicación:** Raíz + .nvmrc

**Crear `.nvmrc` en raíz:**
```
20.11.0
```

**Actualizar root `package.json`:**
```json
{
  "engines": {
    "node": ">=20.0.0",
    "pnpm": ">=8.0.0"
  }
}
```

**Crear `.npmrc` en raíz:**
```
engine-strict=true
```

**Tiempo:** 30 minutos

---

### 12. Documentación Central

**Crear estructura `/docs/`:**
```
/docs/
├── README.md              # Índice
├── ARCHITECTURE.md        # Estructura del monorepo
├── SETUP.md              # Installation guide
├── CONTRIBUTING.md       # Convenciones
├── DEPLOY.md             # Deployment en Hetzner
├── PORTS.md              # (ya existe)
└── TROUBLESHOOTING.md    # FAQ
```

**Actualizar `/e/git/CLAUDE.md`:**
- Corregir paths para reflejar estructura actual (app/ vs raíz)
- Agregar link a `/docs/ARCHITECTURE.md`

**Tiempo:** 3 horas

---

### 13. Consolidar .gitignore

**Ubicación:** Crear root `.gitignore` unificado

**Agregar:**
```
# Dependencies
node_modules/
.pnpm-store/

# Build outputs
dist/
build/
.next/
.nuxt/
out/
*.tsbuildinfo

# Environment
.env
.env.local
.env.*.local
.env.production.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~
.DS_Store

# Temporary
temp-*.json
variables-*.json
*.tmp
.turbo/
```

**Tiempo:** 30 minutos

---

### 14. Remove Build Outputs from Git

**Acciones:**
```bash
cd E:\git

# Remove from git (pero no del filesystem)
git rm -r --cached .next/ dist/ build/ --force

# Commit
git commit -m "Remove build outputs from git history"

# Force garbage collection
git gc --aggressive --prune=now
```

**Tiempo:** 15 minutos
**Nota:** Esto no afecta el filesystem local

---

## 📊 RESUMEN DE CAMBIOS REQUERIDOS

| # | Acción | Severidad | Tiempo | Impacto |
|---|--------|-----------|--------|---------|
| 1 | Revocar credenciales | 🔴 | 30m | Seguridad |
| 2 | Eliminar carpeta copia | 🔴 | 10m | Limpieza |
| 3 | Actualizar pnpm workspace | 🔴 | 15m | Monorepo |
| 4 | Eliminar package-lock.json | 🔴 | 10m | Consistencia |
| 5 | Fix @iorana/lib path | 🔴 | 20m | CI/CD |
| 6 | TypeScript strict mode | 🟠 | 2-3h | Calidad |
| 7 | GitHub Actions CI/CD | 🟠 | 3-4h | Automación |
| 8 | Git hooks (Husky) | 🟠 | 1h | Validación |
| 9 | Tailwind CSS v4 | 🟡 | 1h | Modernización |
| 10 | React 19 upgrade | 🟡 | 2h | Modernización |
| 11 | Node.js version | 🟡 | 30m | Consistencia |
| 12 | Documentación | 🟡 | 3h | Mantenibilidad |
| 13 | .gitignore consolidado | 🟡 | 30m | Limpieza |
| 14 | Remove build outputs | 🟠 | 15m | Limpieza |

**Tiempo Total:** ~18-20 horas distribuidas

---

## ✅ PRÓXIMOS PASOS

**Ahora (Hoy):**
1. ✅ Revocar credenciales (1. CRÍTICO)
2. ✅ Eliminar carpeta copia (2. CRÍTICO)
3. ✅ Actualizar pnpm workspace (3. CRÍTICO)

**Esta Semana:**
4. ✅ Eliminar package-lock.json
5. ✅ Fix @iorana/lib path
6. ✅ GitHub Actions CI/CD
7. ✅ Git Hooks

**Próximas 2 Semanas:**
8. ✅ TypeScript strict mode
9. ✅ Tailwind CSS v4
10. ✅ Documentación central
11. ✅ Consolidar .gitignore

---

**Documento Generado:** 2026-05-29  
**Revisor:** Claude Code  
**Status:** Pending Implementation
