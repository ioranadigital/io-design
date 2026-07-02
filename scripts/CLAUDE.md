# E:\git\scripts\CLAUDE.md — Scripts & Utilities

**Level:** 3 (Package-specific) | **Subordinate to:** E:\git\CLAUDE.md

---

## 📦 Purpose

Python scripts, n8n workflows, and utilities for Iorana Digital.

---

## 🏗️ Structure

```
scripts/
├── python/          # Python utilities
│   ├── scrapers/
│   ├── processors/
│   └── automation/
└── n8n-workflows/   # n8n workflows
    ├── content-pipeline/
    ├── data-sync/
    └── scheduled-tasks/
```

---

## 🚀 Getting Started

### Python Scripts

```bash
# Install dependencies
cd E:\git\scripts\python
pip install -r requirements.txt

# Run a script
python scrapers/scraper.py
```

### n8n Workflows

```bash
# Start n8n
n8n start

# Access dashboard
# http://localhost:5678
```

---

## 📝 Creating a New Python Script

1. Create file in `scripts/python/`
2. Add to `requirements.txt`
3. Test locally
4. Document in README

---

## 📝 Creating n8n Workflow

1. Create workflow in n8n dashboard
2. Export JSON
3. Save to `scripts/n8n-workflows/`
4. Document workflow

---

## 📚 Resources

- Root CLAUDE.md: `E:\git\CLAUDE.md`
