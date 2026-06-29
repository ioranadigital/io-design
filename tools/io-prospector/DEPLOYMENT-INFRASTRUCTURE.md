# 🚀 DEPLOYMENT INFRASTRUCTURE - Complete Setup
**Generated:** 2026-06-26  
**Status:** ✅ Ready for Hetzner Deployment

---

## 📋 WHAT WAS CREATED

This setup provides a complete deployment pipeline for io-prospector:

### 1️⃣ `.env.example` ✅
- **Location:** `.env.example`
- **Status:** Already existed (comprehensive template)
- **Purpose:** Template for production configuration
- **Next Step:** Copy to `.env` and fill with actual values

### 2️⃣ `deploy.ps1` - Windows PowerShell Script ✅
- **Location:** `deploy.ps1`
- **Purpose:** Automated deployment for Windows environments
- **Features:**
  - Validates prerequisites (Docker, docker-compose, .env)
  - Checks required environment variables
  - Builds Docker images
  - Manages container lifecycle
  - Performs health checks
  - Comprehensive logging

**Usage:**
```powershell
.\deploy.ps1 -Environment production
.\deploy.ps1 -Environment staging -NoCache
```

### 3️⃣ `deploy.sh` - Bash Script ✅
- **Location:** `deploy.sh`
- **Purpose:** Automated deployment for Linux/Unix environments
- **Features:** (Same as PowerShell version)
- **Usage:**
```bash
chmod +x deploy.sh
./deploy.sh production
./deploy.sh staging
```

### 4️⃣ `nginx.conf` - Reverse Proxy Configuration ✅
- **Location:** `nginx.conf`
- **Purpose:** Production-ready nginx configuration for Hetzner
- **Features:**
  - SSL/TLS with Let's Encrypt
  - Rate limiting (API, general, scrape endpoints)
  - Gzip compression
  - Security headers (HSTS, X-Frame-Options, etc.)
  - Reverse proxy for both frontend and backend
  - API subdomain support (api.pros.iorana.dev)
  - Health check endpoints
  - Static asset caching

**Structure:**
- Main server: `pros.iorana.dev` (frontend + /api proxy)
- API subdomain: `api.pros.iorana.dev` (backend only)
- HTTP to HTTPS redirect (via Let's Encrypt)

### 5️⃣ `test-build.ps1` - Local Build Testing ✅
- **Location:** `test-build.ps1`
- **Purpose:** Validates your local setup before deployment
- **Tests:**
  - Node.js and npm installation
  - Backend dependencies and syntax
  - Frontend build process
  - Docker image builds
  - Configuration files

**Usage:**
```powershell
.\test-build.ps1
.\test-build.ps1 -SkipDockerTest  # Skip Docker if not needed
.\test-build.ps1 -NoCache         # Force rebuild without cache
```

---

## 🔄 DEPLOYMENT WORKFLOW

### Step 1: Prepare Environment
```bash
# 1. Copy template and configure
cp .env.example .env

# 2. Edit .env with Hetzner values:
# - SUPABASE_URL, SUPABASE_KEY
# - NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
# - FRONTEND_URL, NEXT_PUBLIC_API_URL
# - Email configuration
# - Google API keys (if needed)

vi .env
```

### Step 2: Test Locally
```powershell
# Run test build to validate everything
.\test-build.ps1

# Verify output - should see all ✅ checks
```

### Step 3: Deploy to Hetzner
```powershell
# Option A: PowerShell (on Windows)
.\deploy.ps1 -Environment production

# Option B: Bash (on Linux VPS)
chmod +x deploy.sh
./deploy.sh production
```

### Step 4: Verify Deployment
```bash
# Check services
docker-compose -f docker-compose.coolify.yml ps

# Check logs
docker-compose logs -f

# Health check
curl http://localhost:3004  # Frontend
curl http://localhost:4006/health  # Backend API
```

---

## 📊 ARCHITECTURE OVERVIEW

```
┌─────────────────────────────────────────────────────┐
│                   HETZNER VPS                        │
│  (2-4 GB RAM, 2 cores, Ubuntu 20.04+)              │
└─────────────────────────────────────────────────────┘
                           │
        ┌──────────────────┴──────────────────┐
        │                                     │
    ┌───▼────────────┐          ┌───────────▼────┐
    │   NGINX        │          │  DOCKER        │
    │ (Port 80/443)  │          │                │
    └───┬────────────┘          │                │
        │                        │                │
        │  ┌─────────────────────┼─────┐        │
        │  │                     │     │        │
        ▼  ▼                     ▼     ▼        │
    ┌──────────────┐  ┌──────────────┐         │
    │  Frontend    │  │  Backend     │  ┌─────▼────┐
    │  (3004)      │  │  (4006)      │  │  Redis   │
    │  Next.js     │  │  Node.js     │  │ (6379)   │
    └──────────────┘  └──────────────┘  └──────────┘
         │                    │
         └────────┬───────────┘
                  │
           ┌──────▼──────┐
           │  SUPABASE   │
           │  (Cloud DB) │
           └─────────────┘
```

---

## 🔐 SSL/TLS SETUP

The `nginx.conf` is configured for **Let's Encrypt** certificates:

```bash
# On Hetzner VPS, install certbot:
apt-get update && apt-get install certbot python3-certbot-nginx

# Get certificate for main domain:
certbot certonly --webroot -w /var/www/certbot \
  -d pros.iorana.dev -d api.pros.iorana.dev

# Certs are placed in: /etc/letsencrypt/live/pros.iorana.dev/
# Nginx config already points to these paths
```

Auto-renewal is handled by systemd timer (usually pre-configured).

---

## 🌐 DOMAIN CONFIGURATION (Hetzner DNS)

Update your DNS records:

```
Hostname                  Type    Value
─────────────────────────────────────────────────
pros.iorana.dev           A       YOUR_VPS_IP
api.pros.iorana.dev       A       YOUR_VPS_IP
www.pros.iorana.dev       CNAME   pros.iorana.dev
```

---

## 📈 PERFORMANCE & MONITORING

### Expected Performance
- **Frontend Response:** < 200ms (cached assets)
- **API Response:** < 500ms (average)
- **Startup Time:** 30-45 seconds

### Monitoring Commands
```bash
# Real-time stats
docker stats

# Logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Health check
curl http://localhost:3004/health
curl http://localhost:4006/health

# Nginx metrics
curl http://localhost/health
```

---

## ⚠️ CRITICAL CHECKLIST BEFORE DEPLOY

- [ ] `.env` configured with actual Hetzner secrets
- [ ] Supabase credentials verified
- [ ] Email credentials working (tested)
- [ ] Domain DNS records pointing to VPS IP
- [ ] `test-build.ps1` passes all checks locally
- [ ] Let's Encrypt certificates configured
- [ ] Nginx config matches your domain
- [ ] Redis service included in docker-compose
- [ ] Backend environment variables set correctly
- [ ] Frontend build completes without errors

---

## 🆘 TROUBLESHOOTING

### Issue: "Backend failed to connect to Redis"
**Solution:** Ensure Redis service is in docker-compose.yml and REDIS_URL is set

### Issue: "CORS errors in frontend"
**Solution:** Check FRONTEND_URL and NEXT_PUBLIC_API_URL in .env match your domain

### Issue: "SSL certificate errors"
**Solution:** Run `certbot certonly` for your domain, ensure nginx paths match

### Issue: "Port already in use"
**Solution:** Kill existing process or use different port in .env

---

## 📋 QUICK START (TL;DR)

```bash
# 1. SSH to Hetzner VPS
ssh root@YOUR_VPS_IP

# 2. Clone project
cd /opt
git clone <your-repo> io-prospector
cd io-prospector

# 3. Configure
cp .env.example .env
nano .env  # Edit with your values

# 4. Deploy
chmod +x deploy.sh
./deploy.sh production

# 5. Verify
docker-compose ps
curl https://pros.iorana.dev
```

---

## 📚 RELATED DOCUMENTATION

- **Main Deployment Guide:** `DEPLOY-GUIDE.md`
- **Hetzner Checklist:** `DEPLOY-HETZNER-CHECKLIST.md`
- **Project Config:** `CLAUDE.md`
- **Corrections Summary:** `CORRECTIONS-SUMMARY.md`

---

## 🎯 NEXT IMMEDIATE STEPS

1. **Configure `.env`** with your Hetzner secrets
2. **Run `test-build.ps1`** to validate setup
3. **Set up DNS** records for your domain
4. **Install Let's Encrypt** on VPS
5. **Run `deploy.ps1`** or `deploy.sh`
6. **Monitor logs:** `docker-compose logs -f`

---

**Generated by Claude Code**  
**Date:** 2026-06-26  
**Version:** 1.0

