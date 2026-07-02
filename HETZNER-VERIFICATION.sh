#!/bin/bash
# Verification script for Hetzner deployment
# Run this on Hetzner VPS: ssh root@89.167.103.147 "bash < HETZNER-VERIFICATION.sh"

echo "=========================================="
echo "IORANASEO DEPLOYMENT VERIFICATION"
echo "=========================================="
echo ""

echo "1️⃣ PM2 Status:"
pm2 status
echo ""

echo "2️⃣ Ports in use (checking 3005):"
netstat -tlnp 2>/dev/null | grep -E ':3005|:3010|:3011' || lsof -i -P -n | grep -E ':3005|:3010|:3011'
echo ""

echo "3️⃣ Server health check (port 3005):"
curl -s -I http://localhost:3005 | head -5
echo ""

echo "4️⃣ Application logs:"
pm2 logs ioranaseo --lines 10 --nostream 2>/dev/null || tail -20 /root/.pm2/logs/ioranaseo-out.log
echo ""

echo "5️⃣ Memory & CPU usage:"
pm2 monit 2>/dev/null | head -5 || ps aux | grep node | grep -v grep
echo ""

echo "6️⃣ Directory check:"
ls -la /opt/ioranaseo/interno/ioranaseo/.next/ | head -10
echo ""

echo "=========================================="
echo "VERIFICATION COMPLETE"
echo "=========================================="
