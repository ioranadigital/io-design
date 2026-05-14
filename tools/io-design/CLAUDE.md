# 🎨 io-design - CLAUDE.md (Reglas Maestras)

**Última actualización:** 2026-05-14
**Versión:** v2.0 - Component Library + Blueprint System
**Estado:** Production Ready ✅

---

## 🎭 Identidad Visual

### Tipografía Global
| Uso | Fuente | Weight | Tamaño |
|-----|--------|--------|--------|
| **Headings (H1-H3)** | Barlow | Bold (700) | 32px - 64px |
| **Subheadings (H4-H6)** | Barlow | SemiBold (600) | 18px - 28px |
| **Body Text** | Inter | Regular (400) | 14px - 16px |
| **Emphasis** | Inter | Medium (500) | Var |
| **Code** | JetBrains Mono | Regular (400) | 12px - 14px |

### Paletas de Colores Disponibles

#### Opción 1: Corporativo (DEFAULT)
```
Primary:    #2563eb (Blue-600)      → CTAs, buttons principales
Secondary:  #f59e0b (Amber-500)     → Accents, highlights
Accent:     #06b6d4 (Cyan-500)      → Links, hovers
Danger:     #ef4444 (Red-500)       → Alertas, errores
Success:    #10b981 (Emerald-500)   → Confirmaciones
```

#### Opción 2: Vibrante
```
Primary:    #00e5ff (Cyan)          → Moderno, energético
Secondary:  #ff0080 (Magenta)       → Bold
Accent:     #00ff88 (Neon Green)    → Ultra contraste
```

#### Opción 3: Minimalista
```
Primary:    #1f2937 (Gray-800)      → Elegante
Secondary:  #6b7280 (Gray-500)      → Neutral
Accent:     #374151 (Gray-700)      → Sutil
```

### Tokens Tailwind v4
```css
@theme {
  --color-primary: var(--vite-color-primary, #2563eb);
  --color-secondary: var(--vite-color-secondary, #f59e0b);
  --color-accent: var(--vite-color-accent, #06b6d4);
  --color-danger: #ef4444;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  
  --font-heading: 'Barlow', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

---

## 🧩 Componentes Disponibles

### HEROS (Variaciones Hero Section)
- **HeroV1.tsx** - Imagen + Texto (clásico, imagen derecha)
- **HeroVideo.tsx** - Video de fondo con overlay
- **HeroGradient.tsx** - Gradiente full-screen sin media
- **HeroDual.tsx** - Dos imágenes simétricas (beta)

### FEATURES (Grillas de Características)
- **GridServicios.tsx** - Grid 3 cols para servicios
- **BentoBox.tsx** - Layout asimétrico tipo Bento
- **FeatureCard.tsx** - Card individual feature

### FORMS (Captura de Datos)
- **LeadGen.tsx** - Formulario lead generation flexible
- **Newsletter.tsx** - Suscripción newsletter simple
- **ContactForm.tsx** - Contacto completo con validación

### SECTIONS (Bloques de Confianza y FAQ)
- **AuthorityBlock.tsx** - Logos, reviews, case studies
- **FAQAccordion.tsx** - FAQ expandible con schema
- **Testimonials.tsx** - Carrusel testimonios clientes

---

## 📋 Blueprints (Estrategias por Vertical)

### 1. servicios-locales
**Para:** Fontanería, reformas, electricidad, limpiezas, etc.
**Flujo:**
```
Hero(Video) → Services(Grid 3) → Authority(Reviews) → FAQ → LeadGen(Presupuesto)
```
**Schema:** LocalBusiness
**CTA Principal:** "Pedir presupuesto"

### 2. clinicas-salud
**Para:** Dentistas, fisioterapia, medicina, veterinaria
**Flujo:**
```
Hero(Imagen Pro) → Specialties(Bento) → Authority(Certs+Reviews) → FAQ → Appointment
```
**Schema:** MedicalBusiness
**CTA Principal:** "Agendar cita"

### 3. saas-tecnologico
**Para:** Apps, plataformas, herramientas software
**Flujo:**
```
Hero(Gradient) → Features(Bento) → Authority(Logos) → Pricing → CTA(Free Trial)
```
**Schema:** SoftwareApplication
**CTA Principal:** "Probar gratis"

---

## 🔧 Entidades de Datos (TypeScript)

### ProjectConfig
```typescript
interface ProjectConfig {
  brandName: string;                    // "Dental Clinic Madrid"
  primaryColor: string;                 // "#2563eb"
  secondaryColor: string;               // "#f59e0b"
  fontFamily: 'Barlow' | 'Inter' | ...;
  faviconUrl?: string;
  gaId?: string;
  blueprint: 'servicios-locales' | 'clinicas-salud' | 'saas-tecnologico';
}
```

### GeoTarget
```typescript
interface GeoTarget {
  cityName: string;                     // "Madrid"
  neighborhoods?: string[];             // ["Centro", "Malasaña"]
  mapEmbedUrl?: string;
  napData?: {
    name: string;
    address: string;
    phone: string;
  };
}
```

### ConversionBlock
```typescript
interface ConversionBlock {
  headline: string;                     // "Servicios en {cityName}" → reemplazar
  subheadline?: string;
  ctaLabel: string;                     // "Solicitar presupuesto"
  trustSignal?: string;                 // "Respuesta en < 1 hora"
  mediaType: 'image' | 'video' | 'none';
  mediaUrl?: string;
}
```

### AuthorityBlock
```typescript
interface AuthorityBlock {
  clientLogos?: string[];               // URLs de logos
  reviews?: {
    name: string;
    text: string;
    stars: 1 | 2 | 3 | 4 | 5;
    image?: string;
  }[];
  caseStudies?: {
    title: string;
    description: string;
    metric: string;
    image?: string;
  }[];
}
```

### SemanticStructure
```typescript
interface SemanticStructure {
  h2Services?: string[];                // ["Limpieza", "Implantes", ...]
  faqItems?: {
    question: string;
    answer: string;
  }[];
  metaDescription: string;
  keywords: string[];
  schema: 'LocalBusiness' | 'MedicalBusiness' | 'SoftwareApplication';
}
```

---

## 📐 Espaciado Base (Tailwind)

```
2xs: 4px    → gap-1
xs:  8px    → gap-2
sm:  12px   → gap-3
md:  16px   → gap-4 (default)
lg:  24px   → gap-6
xl:  32px   → gap-8
2xl: 48px   → gap-12
3xl: 64px   → gap-16
```

---

## 📱 Responsive Breakpoints

| Dispositivo | Rango | Breakpoint | Uso |
|-------------|-------|-----------|-----|
| Mobile | 320px - 640px | sm | Teléfonos |
| Tablet | 640px - 1024px | md | Tablets |
| Laptop | 1024px - 1536px | lg | Desktops |
| XL | 1536px+ | xl | Ultra-wide |

**Mobile-First Approach:** Comenzar mobile, agregar `md:`, `lg:` para mayores

---

## 🎯 Convenciones de Código

### Nombres
- **Components:** PascalCase (HeroV1.tsx, GridServicios.tsx)
- **Props:** camelCase (headlineText, ctaLabel, clientLogos)
- **Folders:** kebab-case (heros/, features/, forms/)
- **Constants:** UPPER_SNAKE_CASE (BLUEPRINT_TYPES)

### Importación
```typescript
// Desde barrels (recomendado)
import { HeroV1, HeroVideo } from '@/components/heros';
import { GridServicios } from '@/components/features';
import { LeadGen } from '@/components/forms';
import { AuthorityBlock } from '@/components/sections';

// O directo
import HeroV1 from '@/components/heros/HeroV1';
```

### Props Pattern
```typescript
interface ComponentProps {
  // Heredado
  variant?: 'default' | 'alt1' | 'alt2';
  className?: string;
  
  // Específico
  headline: string;
  subheadline?: string;
  // ...
}

export default function Component({ 
  variant = 'default',
  className = '',
  headline,
  ...rest 
}: ComponentProps) {
  // ...
}
```

---

## 🚀 API Route: /api/generate-landing

**Endpoint:** POST `/api/generate-landing`

**Input:**
```json
{
  "projectConfig": { ... },
  "geoTarget": { ... },
  "conversionBlock": { ... },
  "authorityBlock": { ... },
  "semanticStructure": { ... }
}
```

**Output:**
```json
{
  "success": true,
  "landingUrl": "https://...",
  "htmlContent": "...",
  "metadata": { ... }
}
```

---

## 📊 Workflow de Generación

```
1. Dashboard Builder
   ↓
2. Seleccionar Blueprint (servicios-locales | clinicas-salud | saas-tecnologico)
   ↓
3. Completar ProjectConfig (marca, colores, SEO)
   ↓
4. Agregar GeoTarget (ciudad, barrios, NAP)
   ↓
5. Customizar ConversionBlock (headlines, CTA)
   ↓
6. Agregar AuthorityBlock (logos, reviews, cases)
   ↓
7. Definir SemanticStructure (servicios, FAQ, schema)
   ↓
8. Preview en tiempo real
   ↓
9. Generate → API /generate-landing
   ↓
10. Landing generada (HTML + CSS + JS)
    ↓
11. Deploy a Vercel (vía n8n webhook)
    ↓
12. Live en production
```

---

## ✅ WCAG 2.1 AA Compliance

- ✅ Contraste ≥4.5:1 (textos normales)
- ✅ Focus rings visibles (outline 2px)
- ✅ Keyboard nav completa (Tab, Enter, ESC)
- ✅ Semantic HTML (header, main, section, footer)
- ✅ Alt text en imágenes
- ✅ ARIA labels donde necesario

---

## 🔗 Integración con io-lib

**Reutilizar de E:\git\interno\io-lib\:**
- Components: Button, Card, Input, Modal
- Hooks: useToast, useIndexedDB, useAsync
- Types: User, Page, Config
- Utils: cn() (classname merge), formatting

---

## 🎁 Propósito Final

**io-design = Component Library + Landing Factory**

- ✅ Biblioteca de componentes reutilizables
- ✅ Documentación clara (COMPONENTS.md)
- ✅ 3 blueprints verticales (negocios listos para crecer)
- ✅ API para generar landings dinámicamente
- ✅ Dashboard builder visual + panel admin
- ✅ Integración con E:\master.env + n8n

**Resultado:** Fábrica de landings escalable, documentada y profesional 🚀
