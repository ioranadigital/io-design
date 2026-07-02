# 🏗️ Monorepo Architecture

## Overview

This is a **pnpm workspace monorepo** with strict separation of concerns:

- **lib/** — Shared library (@iorana/lib)
- **tools/** — Core utilities & tools
- **interno/** — Internal applications
- **clientes/** — Client projects
- **scripts/** — Python, n8n, utilities

## Design Principles

### 1. Single Responsibility

Each package has ONE clear purpose:

- `lib` = types, components, utilities (shared)
- `io-semantico` = semantic analysis (tool)
- `iorana-next` = web app UI (app)

### 2. Dependency Graph

```
lib (independent)
 ↑
 ├── tools/* (may depend on lib)
 ├── interno/* (may depend on lib)
 └── clientes/* (may depend on lib)

Rule: Nothing depends on tools, interno, clientes
```

### 3. No Duplication

- One source of truth per concept
- Shared code lives in `lib`
- Tool-specific code stays in `tools/*`

## Package Relationships

### @iorana/lib

**Purpose:** Core library (React components, hooks, types, utilities)

**Exports:**

```typescript
export { Button, Card, Modal } from './components';
export { useLocalStorage } from './hooks';
export { cn, formatDate } from './utils';
export type { ButtonProps } from './components';
```

**Consumers:** All other packages

**Build:** `pnpm --filter @iorana/lib build`

### tools/

**Purpose:** Specialized tools & utilities

**Examples:**

- `io-semantico` — Semantic analysis
- `io-design` — Design system
- `io-neruda` — Content generation
- `io-crm` — CRM system
- `io-kw` — Keyword research

**Dependency:** May depend on `@iorana/lib`

**Build:** `pnpm --filter io-{name} build`

### interno/

**Purpose:** Internal web applications

**Examples:**

- `iorana-next` — Main web app
- `iorana-dev` — Dev portal
- `iorana-surf` — Surf app

**Dependency:** Depend on `@iorana/lib` and optionally `tools/*`

**Build:** `pnpm --filter {name} build`

### clientes/

**Purpose:** Client/customer projects

**Examples:**

- `resogar` — Resogar project

**Dependency:** Depend on `@iorana/lib`

**Build:** `pnpm --filter resogar build`

## Workspace Configuration

**pnpm-workspace.yaml:**

```yaml
packages:
  - 'lib'
  - 'tools/**'
  - 'interno/**'
  - 'clientes/**'
  - 'scripts/**'
```

This tells pnpm to treat all these folders as a single workspace.

## Development Flow

### 1. Change in lib/

```bash
# Edit lib/src/components/Button.tsx
# No need to rebuild - pnpm watches automatically
# Changes appear in all consuming packages immediately
```

### 2. Change in tools/io-semantico/

```bash
# Edit tools/io-semantico/src/index.ts
# If iorana-next depends on it:
# → Changes hot-reload in browser
```

### 3. Change in interno/iorana-next/

```bash
# Edit interno/iorana-next/src/app/page.tsx
# Browser auto-refreshes
```

## Build Order (Topological)

pnpm builds packages in dependency order:

```
1. lib (no deps)
   ↓
2. tools/* (depend on lib)
   ↓
3. interno/* (depend on lib + tools)
   ↓
4. clientes/* (depend on lib)
```

Run:

```bash
pnpm build  # Respects this order automatically
```

## Shared Dependencies

### Duplicated Across Packages?

No. pnpm deduplicates in node_modules/ at the root level.

Example: If both `lib` and `interno/iorana-next` need React:

- Installed once: `E:\git\node_modules\react\`
- Both packages reference same version
- Single `pnpm-lock.yaml` ensures version consistency

### Adding New Dependency

```bash
# Add to lib
cd E:\git\lib
pnpm add lodash

# Add to a tool
cd E:\git\tools\io-semantico
pnpm add lodash

# Add to an app
cd E:\git\interno\iorana-next
pnpm add lodash

# All go to same E:\git\node_modules\
# One pnpm-lock.yaml tracks all versions
```

## Environment Variables

**Single master file:** `E:\master.env`

Read from any package:

```typescript
import { config } from 'dotenv';
config({ path: 'E:/master.env' });

const SUPABASE_URL = process.env.SUPABASE_URL;
```

## TypeScript Configuration

**Root:** `E:\git\tsconfig.json` (shared base)

**Per-package:** `{package}/tsconfig.json` (extends root)

Validate all:

```bash
pnpm type-check
```

## CI/CD Pipeline

Workflows in `.github/workflows/`:

1. **test.yml** — Run on every push
   - `pnpm install`
   - `pnpm type-check`
   - `pnpm test`

2. **build.yml** — Run before merge to main
   - `pnpm build`
   - Check for build errors

3. **deploy.yml** — Run on tag
   - `pnpm build`
   - Deploy to Vercel/Hetzner/etc

## Scaling the Monorepo

### Adding a New Tool

```bash
mkdir tools/io-newname
cd tools/io-newname
pnpm init -y
# Create src/, package.json, CLAUDE.md
pnpm install  # From root
```

### Adding a New App

```bash
mkdir interno/newapp
cd interno/newapp
pnpm init -y
# Create src/, package.json, CLAUDE.md
# Add dependency: pnpm add @iorana/lib
pnpm install  # From root
```

### Adding a New Client Project

```bash
mkdir clientes/clientname
cd clientes/clientname
pnpm init -y
# Create src/, package.json, CLAUDE.md
# Add dependency: pnpm add @iorana/lib
pnpm install  # From root
```

## Performance Tips

1. **Parallel dev servers**

   ```bash
   pnpm dev  # Runs all in parallel
   ```

2. **Filter to specific package**

   ```bash
   pnpm --filter @iorana/lib build
   pnpm --filter iorana-next dev
   ```

3. **Watch for changes**
   ```bash
   pnpm build --watch  # Rebuilds on file change
   ```

## Troubleshooting

### "Cannot find module '@iorana/lib'"

```bash
# Ensure lib is built
pnpm --filter @iorana/lib build

# Ensure workspace is installed
pnpm install
```

### "pnpm-lock.yaml is corrupt"

```bash
pnpm clean:all
pnpm install
```

### "Port already in use"

```bash
# Check E:\master.env for port numbers
# Kill process or change port in .env
```

## Resources

- [pnpm workspace docs](https://pnpm.io/workspaces)
- [TypeScript monorepos](https://www.typescriptlang.org/docs/handbook/project-references.html)
- Package-specific docs: `{package}/CLAUDE.md`
