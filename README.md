# 🚀 Iorana Digital Monorepo

Monorepo centralizado con pnpm workspace para tools, aplicaciones internas y proyectos cliente.

## 📂 Estructura

```
E:\git/
├── lib/                    # @iorana/lib - Core shared library
│   ├── src/components/     # React components
│   ├── src/hooks/          # Custom React hooks
│   ├── src/utils/          # Utility functions
│   ├── src/types/          # TypeScript types
│   └── CLAUDE.md
│
├── tools/                  # Core tools & utilities
│   ├── io-design/          # Design system CLI
│   ├── io-semantico/       # Semantic analysis engine
│   ├── io-neruda/          # Content generation
│   ├── io-crm/             # CRM system
│   ├── io-kw/              # Keyword research
│   ├── io-ads/             # Ads management
│   └── [otros]/
│
├── interno/                # Internal applications
│   ├── iorana-next/        # Main web app (Next.js)
│   ├── iorana-dev/         # Development portal
│   ├── iorana-surf/        # Surf app
│   └── [otros]/
│
├── clientes/               # Client projects
│   └── resogar/            # Resogar project
│
├── scripts/                # Scripts & workflows
│   ├── python/             # Python utilities
│   └── n8n-workflows/      # n8n automations
│
└── docs/                   # Monorepo documentation
    ├── setup.md            # Installation guide
    ├── architecture.md     # Architecture docs
    └── QUICK-START.md      # Quick start guide
```

## 🔧 Setup

### Prerequisites

- **Node.js**: >=18.0.0
- **pnpm**: >=8.0.0
- **Git**: Latest

### Installation

```bash
cd E:\git
pnpm install
```

### First Run

```bash
# List all packages
pnpm ws:list

# Type check all packages
pnpm type-check

# Build all packages
pnpm build
```

## 📜 Scripts

| Command                | Description                       |
| ---------------------- | --------------------------------- |
| `pnpm dev`             | Start all dev servers in parallel |
| `pnpm build`           | Build all packages                |
| `pnpm test`            | Run tests in all packages         |
| `pnpm lint`            | Lint all packages                 |
| `pnpm type-check`      | TypeScript validation             |
| `pnpm clean`           | Clean build artifacts             |
| `pnpm lib:dev`         | Start only @iorana/lib dev        |
| `pnpm iorana-next:dev` | Start only iorana-next            |
| `pnpm ws:list`         | List all workspace packages       |

## 🗂️ Package Locations

**Development ports** are defined in `E:\master.env`:

- **iorana-next**: 3000 (main app)
- **iorana-dev**: 3002
- **iorana-surf**: 3003
- **io-semantico**: 3004
- **Backend APIs**: 4000+
- **Redis**: 6379

## 📖 Documentation

- **[QUICK-START.md](./docs/QUICK-START.md)** — Get running in 5 minutes
- **[ARCHITECTURE.md](./docs/architecture.md)** — Monorepo design & decisions
- **[SETUP.md](./docs/setup.md)** — Full installation guide

For package-specific docs, see `{package}/CLAUDE.md`

## 🚀 Quick Start

```bash
# 1. Install dependencies (one time)
pnpm install

# 2. Start development servers
pnpm dev

# 3. Open browser
# → http://localhost:3000 (iorana-next)

# 4. Develop
# → Edit files in lib/, interno/, tools/
# → Changes hot-reload automatically via pnpm workspace
```

## 📦 Monorepo Benefits

✅ **Single lock file** — All dependencies in sync  
✅ **Hot reload** — Changes in lib/ instantly visible in apps  
✅ **Shared types** — One source of truth for TypeScript  
✅ **Parallel builds** — Faster compilation  
✅ **Unified testing** — Test all packages at once

## 🔗 Dependencies

```
@iorana/lib (core)
  ↑
  ├── iorana-next (consumer)
  ├── io-semantico (consumer)
  ├── io-crm (consumer)
  └── [others] (consumers)
```

**Rule**: lib never depends on other packages.

## 🛠️ Troubleshooting

### pnpm install fails

```bash
pnpm clean:all
pnpm install
```

### Type errors

```bash
pnpm type-check
```

### Build fails

```bash
pnpm clean
pnpm build
```

## 📧 Environment Setup

Master configuration: `E:\master.env`

Copy template:

```bash
cp .env.example .env.local
```

## 📝 License

MIT © 2026 Iorana Digital
