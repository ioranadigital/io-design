# Ricardo Herrera Varela — Next.js Portfolio

Portfolio profesional migrado de Lovable (Vite + HTML estático) a **Next.js App Router** con SEO completo.

## Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS 4**
- **Formspree** (formulario de contacto sin backend)

---

## Estructura del proyecto

```
app/
  layout.tsx          → RootLayout + fuentes + metadata base global
  page.tsx            → Home page (Server Component) + 4 JSON-LD schemas
  globals.css         → Glass, text-gradient, skill-card, animaciones
  sitemap.ts          → Sitemap dinámico (MetadataRoute)
components/
  NavBar.tsx          → Server Component — next/image logo + next/link
  HeroSection.tsx     → Server Component — H1 + CTAs
  AboutSection.tsx    → Server Component — experiencia sticky layout
  SkillsSection.tsx   → Server Component — grid de competencias
  PortfolioSection.tsx→ Server Component — proyectos con next/image
  ContactSection.tsx  → ⚡ Client Component — formulario Formspree async
  Footer.tsx          → Server Component
public/
  robots.txt
  logoricardoherrera.png   ← copiar desde repo original
  google-workspace.gif     ← copiar desde repo original
  jsm.jpg                  ← copiar desde repo original
  exelencia-operativa.png  ← copiar desde repo original
  og-image.png             ← crear imagen OG 1200×630px
```

---

## SEO implementado

### Metadata API (Next.js)
- `title` con template `%s | Ricardo Herrera Varela`
- `description`, `keywords`, `authors`, `creator`
- `robots` con directivas para Googlebot
- `openGraph` completo (og:title, og:description, og:image 1200×630)
- `twitter:card` summary_large_image
- `alternates.canonical`

### JSON-LD Schemas (4 schemas en `page.tsx`)
1. **Person** — nombre, jobTitle, sameAs LinkedIn, knowsAbout
2. **ProfessionalService** — servicios, areaServed (ES/MX/US/IT)
3. **BreadcrumbList** — navegación estructurada
4. **WebPage** — descripción de la página, autor, idioma

### Técnico
- `sitemap.ts` → `/sitemap.xml` automático
- `robots.txt` → `public/robots.txt`
- `lang="es"` en `<html>`
- `aria-label` y roles semánticos (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<blockquote>`)
- `<h1>` único, jerarquía H1→H2→H3 correcta
- `alt` text descriptivos en todas las imágenes
- `next/image` con `priority` en logo (LCP)
- `next/link` en todos los CTAs y navegación

---

## Instalación

```bash
# 1. Copiar archivos al repositorio ioranadigital/Ricardoherreravarela
# 2. Instalar dependencias (ya están en package.json)
npm install

# 3. Desarrollo local
npm run dev

# 4. Build producción
npm run build
npm start
```

## Assets a copiar desde el proyecto original

```bash
cp {origen}/logoricardoherrera.png public/
cp {origen}/google-workspace.gif   public/
cp {origen}/jsm.jpg                public/
cp {origen}/exelencia-operativa.png public/
```

## OG Image

Crear `public/og-image.png` de **1200×630px** con el nombre y título del profesional para que las redes sociales lo muestren correctamente al compartir el enlace.

---

## Formulario de contacto

El formulario usa **Formspree** (`https://formspree.io/f/mlgprwgg`).  
No requiere backend. Respuestas → llegan al email configurado en la cuenta Formspree.

El `ContactSection` es el único `"use client"` del proyecto — el resto son Server Components puros, maximizando rendimiento y SEO.
