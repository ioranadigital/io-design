# ⚡ Quick Start (5 minutes)

Get the monorepo running in 5 minutes.

## Step 1: Install (1 min)

```bash
cd E:\git
pnpm install
```

## Step 2: Type Check (1 min)

```bash
pnpm type-check
```

If no errors, continue.

## Step 3: Start Dev Servers (1 min)

```bash
pnpm dev
```

Wait for servers to start. You should see:

```
> iorana-next dev
> io-semantico dev
> [other servers]...
```

## Step 4: Open Browser (1 min)

- **Main app**: http://localhost:3000
- **Other apps**: Check terminal output for ports

## Step 5: Start Coding (1 min)

1. Edit a file in `lib/src/utils/` or `interno/iorana-next/src/`
2. See hot reload in browser automatically
3. Done! 🎉

## 🚫 Troubleshooting

**Ports already in use?**

```bash
# Check E:\master.env for port definitions
# Kill process or change port
```

**pnpm install fails?**

```bash
pnpm clean:all
pnpm install
```

**TypeScript errors?**

```bash
pnpm type-check
```

## 📖 Next Steps

- Read [ARCHITECTURE.md](./architecture.md) to understand the structure
- Read [SETUP.md](./setup.md) for full installation details
- Check `{package}/CLAUDE.md` for package-specific docs
