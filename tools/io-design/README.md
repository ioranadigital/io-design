# 🎨 io-design v2.0

**Landing Factory con Component Library y Blueprints Verticales**

Crea landings profesionales en minutos con componentes reutilizables y estrategias optimizadas para 3 verticales de negocio.

---

## 🚀 Quick Start

### 1. Instalación
```bash
npm install
```

### 2. Desarrollo Local
```bash
npm run dev
# Abre http://localhost:3000
```

### 3. Build y Deploy
```bash
npm run build
npm start
# O deploya automáticamente a Vercel
```

---

## 📚 Estructura

```
io-design/
├── CLAUDE.md                 ← Reglas maestras (colores, fuentes)
├── COMPONENTS.md             ← Inventario de 12+ componentes
├── components/
│   ├── heros/               (4 variaciones: V1, Video, Gradient, Dual)
│   ├── features/            (GridServicios, BentoBox, FeatureCard)
│   ├── forms/               (LeadGen, Newsletter)
│   └── sections/            (AuthorityBlock, FAQ, Testimonials)
├── blueprints/
│   ├── servicios-locales.md (Fontanería, reformas, servicios)
│   ├── clinicas-salud.md    (Dentistas, fisio, medicina)
│   └── saas-tecnologico.md  (Apps, plataformas software)
├── src/
│   ├── app/                 (Next.js pages + API)
│   ├── types/               (TypeScript interfaces)
│   ├── lib/                 (Utilidades)
│   ├── hooks/               (React hooks)
│   └── styles/              (Global CSS)
└── public/                  (Assets)
```

---

## 🧩 Componentes Disponibles

### Heros (4)
- **HeroV1** - Imagen + Texto (clásico)
- **HeroVideo** - Video de fondo
- **HeroGradient** - Gradiente full-screen
- **HeroDual** - Dos imágenes (beta)

### Features (3)
- **GridServicios** - Grid 3 cols
- **BentoBox** - Layout asimétrico
- **FeatureCard** - Card individual

### Forms (2)
- **LeadGen** - Lead gen flexible
- **Newsletter** - Suscripción simple

### Sections (3)
- **AuthorityBlock** - Logos, reviews, cases
- **FAQAccordion** - FAQ expandible
- **Testimonials** - Carrusel testimonios

---

## 📋 Blueprints (3 Verticales)

### 1. servicios-locales
Para fontanería, reformas, electricidad, etc.

**Flujo:**
```
Hero(Video) → Services(Grid) → Authority(Reviews) → FAQ → LeadGen
```

### 2. clinicas-salud
Para dentistas, fisioterapia, medicina, etc.

**Flujo:**
```
Hero(Imagen) → Specialties(Bento) → Authority(Certs) → FAQ → Appointment
```

### 3. saas-tecnologico
Para apps, plataformas, herramientas software.

**Flujo:**
```
Hero(Gradient) → Features(Bento) → Authority(Logos) → Pricing → CTA
```

---

## 🛠️ Entidades TypeScript

### ProjectConfig
```typescript
{
  brandName: "Mi Empresa",
  primaryColor: "#2563eb",
  secondaryColor: "#f59e0b",
  fontFamily: "Inter",
  blueprint: "servicios-locales"
}
```

### GeoTarget
```typescript
{
  cityName: "Madrid",
  neighborhoods: ["Centro", "Malasaña"],
  mapEmbedUrl: "...",
  napData: { name, address, phone }
}
```

### ConversionBlock
```typescript
{
  headline: "Servicios en {cityName}",
  ctaLabel: "Contactar",
  trustSignal: "Respuesta < 1 hora"
}
```

### AuthorityBlock
```typescript
{
  clientLogos: ["logo1.png", "logo2.png"],
  reviews: [{ name, text, stars }],
  caseStudies: [{ title, metric, image }]
}
```

### SemanticStructure
```typescript
{
  h2Services: ["Servicio 1", "Servicio 2"],
  faqItems: [{ question, answer }],
  metaDescription: "...",
  keywords: ["keyword1", "keyword2"],
  schema: "LocalBusiness" | "MedicalBusiness" | "SoftwareApplication"
}
```

---

## 🎨 Uso de Componentes

### Importación (Recomendado)
```typescript
import { HeroV1, GridServicios } from '@/components/heros';
import { LeadGen } from '@/components/forms';
import { AuthorityBlock } from '@/components/sections';
```

### Ejemplo de Landing
```tsx
export default function Page() {
  return (
    <>
      <HeroV1
        headline="Servicios en Madrid"
        ctaLabel="Contactar"
        image="/hero.jpg"
      />
      <GridServicios
        title="Servicios"
        services={[...]}
      />
      <AuthorityBlock
        clientLogos={[...]}
        reviews={[...]}
      />
    </>
  );
}
```

---

## 📈 SEO y Schema Markup

Todos los componentes soportan schema markup automático:
- LocalBusiness (servicios-locales)
- MedicalBusiness (clinicas-salud)
- SoftwareApplication (saas-tecnologico)
- FAQPage (FAQAccordion)

---

## 🔗 Integración con Stack Iorana v4.0

- ✅ Symlink a E:\master.env
- ✅ Usa variables globales (colores, fuentes)
- ✅ Integrable con n8n para deployment
- ✅ Supabase para almacenar landings
- ✅ Vercel para hosting

---

## 🚀 API Route

**POST /api/generate-landing**

```json
{
  "projectConfig": {...},
  "geoTarget": {...},
  "conversionBlock": {...},
  "authorityBlock": {...},
  "semanticStructure": {...}
}
```

**Response:**
```json
{
  "success": true,
  "landingUrl": "https://...",
  "htmlContent": "...",
  "metadata": {...}
}
```

---

## 📝 Convenciones

### Naming
- Componentes: `PascalCase` (HeroV1.tsx)
- Props: `camelCase` (headlineText)
- Carpetas: `kebab-case` (components, heros)
- Constantes: `UPPER_SNAKE_CASE`

### Props Pattern
```typescript
interface ComponentProps {
  // Heredado
  variant?: 'default' | 'alt1' | 'alt2';
  className?: string;
  
  // Específico del componente
  headline: string;
  ctaLabel: string;
  // ...
}
```

---

## 🎯 Próximas Features

- [ ] Panel Admin para crear ProjectConfigs
- [ ] Editor visual drag & drop
- [ ] Integración n8n para deploy automático
- [ ] Historial de landings con versioning
- [ ] A/B testing builder
- [ ] Google Analytics integration

---

## 📖 Documentación Completa

- **CLAUDE.md** - Reglas maestras, tipografía, paletas
- **COMPONENTS.md** - Documentación detallada de cada componente
- **blueprints/** - Estrategias por vertical (servicios-locales, clinicas, saas)

---

## 🤝 Contribuir

Este proyecto usa Next.js 16 + TypeScript + Tailwind CSS v4.

**Setup:**
```bash
npm install
npm run dev
```

**Linting:**
```bash
npm run lint
npm run type-check
```

---

## 📄 Licencia

Iorana Digital © 2026

---

**io-design v2.0 - Landing Factory**
Última actualización: 2026-05-14
