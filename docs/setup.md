# 🔧 Full Setup Guide

Complete installation and configuration guide.

## Prerequisites

### System Requirements

- **OS:** Windows 11 / macOS / Linux
- **Node.js:** >=18.0.0 (verify: `node --version`)
- **pnpm:** >=8.0.0 (install: `npm install -g pnpm@latest`)
- **Git:** Latest (verify: `git --version`)

### Verify Installation

```powershell
node --version    # Should be v18.x or higher
pnpm --version    # Should be 8.x or higher
git --version     # Should be latest
```

## Step 1: Clone Repository

```bash
cd E:\
git clone https://github.com/ioranadigital/io-monorepo.git
cd git
```

## Step 2: Install Dependencies

```bash
pnpm install
```

This will:

- Install all packages in the monorepo
- Create `node_modules/` at root
- Generate `pnpm-lock.yaml`

**Time:** ~5-10 minutes (depends on internet speed)

### Troubleshooting Install

**Error: "Cannot find pnpm"**

```bash
npm install -g pnpm@latest
```

**Error: "Port already in use"**
Edit `E:\master.env` and change port numbers.

**Error: ".pnpm-lock.yaml is corrupt"**

```bash
pnpm clean:all
pnpm install
```

## Step 3: Environment Setup

### Copy Environment Template

```bash
cp .env.example .env.local
```

### Configure E:\master.env

Master configuration file with ports and secrets:

```env
# Ports (development)
MAIN_FRONTEND_PORT=3000
IORANA_DEV_PORT=3002
IORANA_SURF_PORT=3003
SEMANTICO_FRONTEND_PORT=3004

SEMANTICO_BACKEND_PORT=4000
NERUDA_BACKEND_PORT=4005
PROSPECTOR_BACKEND_PORT=4006

REDIS_PORT=6379

# Secrets (from Supabase/external)
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx

OPENAI_API_KEY=sk-xxx
N8N_WEBHOOK_URL=https://n8n.xxx.com/webhook

# Database
DATABASE_URL=postgresql://user:pass@host/db
REDIS_URL=redis://localhost:6379
```

**Important:** Never commit E:\master.env (add to .gitignore)

## Step 4: Validate Installation

### Type Check

```bash
pnpm type-check
```

Should pass with no errors.

### List All Packages

```bash
pnpm ws:list
```

Should show all packages:

```
@iorana/lib
@iorana/io-semantico
@iorana/io-design
...
iorana-next
iorana-dev
...
resogar
```

### Try Build

```bash
pnpm build
```

Should complete without errors.

## Step 5: Start Development

### Start All Servers

```bash
pnpm dev
```

Wait for all packages to start. You should see:

```
> @iorana/lib dev
> @iorana/io-semantico dev
> iorana-next dev
> [other servers...]

✓ Ready to accept requests
```

### Start Specific Package

```bash
# Start only lib
pnpm lib:dev

# Start only iorana-next
pnpm iorana-next:dev

# Start only a tool
pnpm --filter @iorana/io-semantico dev
```

### Open in Browser

- **Main app:** http://localhost:3000
- **Other apps:** Check ports in E:\master.env

## Step 6: Verify Workspace

### Test Hot Reload

1. Edit `lib/src/utils/cn.ts`
2. Change a function
3. See the change reflect in browser instantly (hot reload)

This confirms the workspace is working correctly.

## Common Tasks

### Add a New Dependency

```bash
# To lib
cd E:\git\lib
pnpm add lodash

# To a tool
cd E:\git\tools\io-semantico
pnpm add axios

# To an app
cd E:\git\interno\iorana-next
pnpm add react-icons
```

All dependencies go to shared `E:\git\node_modules/`

### Add a New Package

```bash
mkdir E:\git\tools\io-newname
cd E:\git\tools\io-newname
pnpm init -y

# Edit package.json with proper name
# Create src/ directory
# Add to pnpm-workspace.yaml if not auto-detected

pnpm install  # From root
```

### Update All Dependencies

```bash
pnpm update
pnpm install
```

### Clean Everything

```bash
pnpm clean:all
pnpm install
```

## IDE Setup

### VS Code

Install extensions:

- ESLint
- Prettier
- TypeScript Vue Plugin
- pnpm

### VS Code Workspace

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

## Debugging

### Enable Debug Logging

```bash
DEBUG=* pnpm dev
```

### Check Workspace Health

```bash
pnpm ws:list
pnpm ls -r --depth 0
```

### Validate TypeScript

```bash
pnpm type-check --verbose
```

## Deployment

### Build for Production

```bash
pnpm build
```

### Run Production Build

```bash
# For iorana-next
cd E:\git\interno\iorana-next
pnpm start
```

### Deploy to Vercel

Each package can have its own Vercel deployment:

```bash
# From package directory
pnpm build
vercel deploy
```

## Security

### .env Files

Never commit:

- `.env.local`
- `.env.production.local`
- `E:\master.env`

These should only exist locally.

### Secrets Management

Use Supabase or environment secrets for sensitive data.

## Support

- Read package-specific `CLAUDE.md` files
- Check [QUICK-START.md](./QUICK-START.md) for faster setup
- Check [ARCHITECTURE.md](./architecture.md) for design details

## Next Steps

1. ✅ Complete this setup
2. 📖 Read [QUICK-START.md](./QUICK-START.md)
3. 🏗️ Read [ARCHITECTURE.md](./architecture.md)
4. 📝 Review package-specific docs in `{package}/CLAUDE.md`
5. 🚀 Start coding!
