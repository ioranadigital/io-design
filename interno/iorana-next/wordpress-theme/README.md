# Iorana Blog — WordPress Child Theme

Child theme de **Astra** que replica el diseño oscuro de iorana-next.

## Instalación en el VPS

```bash
# 1. Copia el directorio al servidor
scp -r wordpress-theme/iorana-blog user@hetzner-ip:/var/www/html/blog/wp-content/themes/

# 2. Activa el theme desde WP Admin
# Apariencia → Temas → Iorana Blog → Activar

# 3. (Opcional) Activa desde WP-CLI
wp theme activate iorana-blog --path=/var/www/html/blog
```

## Tokens de diseño aplicados

| Token | Valor | Uso |
|-------|-------|-----|
| `--ior-bg` | `#0a2b49` | Fondo base |
| `--ior-surface` | `#08223a` | Cards, header |
| `--ior-orange` | `#ff8c00` | Acento principal, CTAs |
| `--ior-indigo` | `#818cf8` | Badges de categoría |
| `--ior-text` | `#ebf2f7` | Texto principal |
| `--ior-muted` | `rgba(235,242,247,0.55)` | Texto secundario |

## Clase CSS reutilizable — CTA Box

Dentro de un post Gutenberg, añade un bloque "Grupo" con clase `.ior-cta-box`:

```html
<div class="ior-cta-box">
  <h3>¿Quieres resultados similares?</h3>
  <p>Analizamos tu web gratis y te decimos exactamente qué mejorar.</p>
  <a href="https://iorana.digital/informe-sitio-web-gratis" class="ior-btn">
    Solicitar diagnóstico gratuito →
  </a>
</div>
```
