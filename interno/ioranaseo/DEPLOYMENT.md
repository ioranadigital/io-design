# 🚀 Guía de Deployment - IoranaSEO en Hetzner

## Información del Servidor

- **IP**: 89.167.103.147
- **Usuario**: root
- **SSH Port**: 22
- **Plataforma**: Coolify (ya instalado)

## Opción 1: Deployment con Coolify (Recomendado)

### Paso 1: Crear .hetzner_token

Crea un archivo `.hetzner_token` en la raíz del proyecto:

```bash
COOLIFY_URL=http://89.167.103.147:8000
COOLIFY_TOKEN=<tu-token-aqui>
```

### Paso 2: Ejecutar script de deployment

```bash
chmod +x deploy-coolify.sh
./deploy-coolify.sh
```

### Paso 3: Acceder a Coolify

- URL: http://89.167.103.147:8000
- Configurar variables de entorno en la UI
- Activar auto-deployment desde GitHub

---

## Opción 2: Deployment Manual con SSH + Docker

### Paso 1: Conectar al servidor

```bash
ssh root@89.167.103.147
```

### Paso 2: Clonar repositorio

```bash
cd /opt
git clone https://github.com/ioranadigital/io-design.git
cd io-design/app/interno/ioranaseo
```

### Paso 3: Crear .env.production

```bash
cat > .env.production << EOF
NEXT_PUBLIC_SUPABASE_URL=https://zvehtloitnuglyjtxwye.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_B0gQyDyf-p2vDg2UhytfDg_H54mWXbB
NEXTAUTH_URL=https://tu-dominio.com
NEXTAUTH_SECRET=<tu-secret>
NODE_ENV=production
PORT=3005
EOF
```

### Paso 4: Iniciar con Docker Compose

```bash
docker-compose up -d
```

### Paso 5: Verificar logs

```bash
docker-compose logs -f app
```

---

## Variables de Entorno Requeridas

```env
# Supabase (Obligatorio)
NEXT_PUBLIC_SUPABASE_URL=https://zvehtloitnuglyjtxwye.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_B0gQyDyf-p2vDg2UhytfDg_H54mWXbB

# NextAuth (Obligatorio)
NEXTAUTH_URL=https://tu-dominio.com
NEXTAUTH_SECRET=<generar-con-openssl>

# Node
NODE_ENV=production
PORT=3005
```

### Generar NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

---

## Configurar Dominio (DNS + SSL)

### 1. Configurar DNS en Hetzner Cloud

```
Tipo: A
Nombre: ioranaseo.tu-dominio.com
Valor: 89.167.103.147
TTL: 3600
```

### 2. Configurar SSL (Let's Encrypt)

Coolify lo hace automáticamente si configuras el dominio en la UI.

O manualmente con Certbot:

```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx -y
sudo certbot certonly --standalone -d ioranaseo.tu-dominio.com
```

---

## Monitoring & Logs

### Ver logs de la aplicación

```bash
docker-compose logs -f app
```

### Ver estado de contenedores

```bash
docker-compose ps
```

### Reiniciar aplicación

```bash
docker-compose restart app
```

### Actualizar código

```bash
git pull origin main
docker-compose up -d --build
```

---

## Troubleshooting

### Puerto 3005 ya en uso

```bash
docker-compose down
docker-compose up -d
```

### Memoria insuficiente

```bash
# Aumentar límites en docker-compose.yml
deploy:
  resources:
    limits:
      memory: 2G
```

### Logs muestran errores de Supabase

- Verificar NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY
- Confirmar que las claves están activas en el dashboard de Supabase

---

## Backups

### Backup de datos

```bash
# Si usas Supabase, los datos están en la nube (seguro)
# Solo respaldar .env.production
mkdir -p /backups
cp .env.production /backups/ioranaseo-env-$(date +%Y%m%d).bak
```

---

## Performance

### Requisitos mínimos

- CPU: 2 cores
- RAM: 2GB
- Almacenamiento: 20GB

### Recomendado

- CPU: 4 cores
- RAM: 4GB
- Almacenamiento: 50GB

---

## Soporte

- **Coolify Docs**: https://coolify.io/docs
- **Docker Compose**: https://docs.docker.com/compose/
- **Next.js Deployment**: https://nextjs.org/docs/deployment

---

**Última actualización**: 2026-06-19
