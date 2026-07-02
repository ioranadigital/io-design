# 🚀 IoranaSEO - Deployment a Hetzner

**Status:** Listo para producción
**IP Hetzner:** 89.167.103.147
**Puerto:** 3005
**Domain:** iorana.dev

---

## 📋 Opción 1: Deployment Automático (Recomendado)

### Desde tu Windows (Local)

```powershell
cd E:\git\interno\ioranaseo

# Ejecutar script PowerShell
.\deploy-hetzner.ps1 -SSHHost "root@89.167.103.147" -DeployPath "/opt/ioranaseo" -Port 3005
```

**Qué hace el script:**

1. ✅ Conecta via SSH
2. ✅ Clona/actualiza repositorio
3. ✅ Instala dependencias (pnpm, Node.js)
4. ✅ Ejecuta build
5. ✅ Inicia con PM2
6. ✅ Verifica que está corriendo

---

## 📋 Opción 2: SSH Manual (Step by Step)

### Paso 1: Conectar a Hetzner

```bash
ssh root@89.167.103.147
```

### Paso 2: Preparar directorio

```bash
mkdir -p /opt/ioranaseo
cd /opt/ioranaseo
```

### Paso 3: Clonar/actualizar repositorio

```bash
git clone https://github.com/ioranadigital/io-design.git .
cd interno/ioranaseo
git pull origin main
```

### Paso 4: Instalar dependencias

```bash
# Instalar Node.js si no existe
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar pnpm
npm install -g pnpm

# Instalar proyecto
pnpm install --frozen-lockfile
```

### Paso 5: Build

```bash
export NODE_ENV=production
pnpm build
```

### Paso 6: Instalar PM2 (Process Manager)

```bash
npm install -g pm2
```

### Paso 7: Iniciar aplicación

```bash
pm2 start pnpm --name "ioranaseo" -- start
pm2 save
pm2 startup
```

### Paso 8: Verificar

```bash
# Ver logs
pm2 logs ioranaseo

# Ver estado
pm2 status

# Probar locally
curl http://localhost:3005
```

---

## 📋 Opción 3: Coolify (Panel Visual)

**URL:** http://89.167.103.147:8000  
**Token:** (en master.env)

```bash
ssh root@89.167.103.147
docker ps | grep coolify
```

Dentro de Coolify:

1. New Project → Select from git
2. Repo: ioranadigital/io-design
3. Branch: main
4. Path: interno/ioranaseo/
5. Port: 3005
6. Deploy

---

## ✅ Verificación Post-Deploy

```bash
# 1. SSH a Hetzner
ssh root@89.167.103.147

# 2. Ver estado
pm2 status

# 3. Ver logs en vivo
pm2 logs ioranaseo -f

# 4. Probar server
curl http://localhost:3005

# 5. Acceder por navegador
# https://iorana.dev (si DNS está configurado)
```

---

## 🔄 Comandos Útiles (en Hetzner)

```bash
# Ver proceso
pm2 status

# Reiniciar
pm2 restart ioranaseo

# Parar
pm2 stop ioranaseo

# Eliminar proceso
pm2 delete ioranaseo

# Ver logs
pm2 logs ioranaseo

# Monitoreo en vivo
pm2 monit

# Actualizar desde git
cd /opt/ioranaseo/interno/ioranaseo
git pull origin main
pnpm build
pm2 restart ioranaseo
```

---

## 🌐 Configurar Nginx Reverse Proxy (Opcional)

Si quieres acceder por puerto 80/443:

```bash
# Instalar Nginx
sudo apt-get install -y nginx

# Crear config
sudo nano /etc/nginx/sites-available/ioranaseo
```

```nginx
server {
    listen 80;
    server_name iorana.dev www.iorana.dev;

    location / {
        proxy_pass http://localhost:3005;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Habilitar sitio
sudo ln -s /etc/nginx/sites-available/ioranaseo /etc/nginx/sites-enabled/

# Probar config
sudo nginx -t

# Reiniciar Nginx
sudo systemctl restart nginx
```

---

## 🔐 Configurar SSL (Let's Encrypt)

```bash
sudo apt-get install -y certbot python3-certbot-nginx

sudo certbot --nginx -d iorana.dev -d www.iorana.dev
```

---

## ❌ Si algo falla...

### Problema: "Connection refused"

```bash
ssh root@89.167.103.147
pm2 logs ioranaseo
# Ver error específico
```

### Problema: "Port 3005 already in use"

```bash
ssh root@89.167.103.147
lsof -i :3005
kill -9 <PID>
pm2 restart ioranaseo
```

### Problema: "Git permission denied"

```bash
# Configurar git key en servidor
ssh-keyscan github.com >> ~/.ssh/known_hosts
# Agregar SSH key de Hetzner a GitHub
```

### Rollback a versión anterior

```bash
cd /opt/ioranaseo/interno/ioranaseo
git log --oneline | head -5
git reset --hard <commit-hash>
pnpm build
pm2 restart ioranaseo
```

---

## 📊 Monitoreo Continuo

```bash
# En tu máquina local (monitoreo remoto)
watch -n 5 'ssh root@89.167.103.147 pm2 status'

# O en Hetzner
pm2 monit
```

---

## 🎯 Checklist Final

- [ ] Repo clonado en Hetzner
- [ ] Node.js + pnpm instalados
- [ ] Build completado sin errores
- [ ] PM2 iniciado y salvado
- [ ] Servidor respondiendo en puerto 3005
- [ ] Nginx configurado (si aplica)
- [ ] SSL configurado (si aplica)
- [ ] Logs monitoreados
- [ ] DNS apuntando a 89.167.103.147

---

**¿Listo?** Ejecuta:

```powershell
.\deploy-hetzner.ps1 -SSHHost "root@89.167.103.147"
```

O conecta manualmente:

```bash
ssh root@89.167.103.147
```
