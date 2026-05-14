# 📚 io-design - COMPONENTS.md (Inventario de Piezas)

**Última actualización:** 2026-05-14
**Total de componentes:** 12 stable + 1 beta

---

## 🎯 Convención de Documentación

Cada componente incluye:
- **Descripción:** Qué hace y cuándo usarlo
- **Props:** TypeScript interface
- **Variantes:** Opciones disponibles
- **Ejemplo:** Código de uso
- **Estado:** ✅ Stable | 🟡 Beta | 🔴 Deprecated

---

## 📌 HEROS (4 componentes)

### 1. HeroV1.tsx ✅ Stable (v1.2.1)

**Descripción:** Hero clásico con imagen a la derecha. El más versátil y usado.

**Props:**
```typescript
interface HeroV1Props {
  headline: string;           // "Servicios de {type} en {city}"
  subheadline?: string;       // "⭐ 4.9/5 (120+ reseñas)"
  ctaLabel: string;           // "Solicitar presupuesto"
  ctaHref?: string;           // URL o #formulario
  image: string;              // URL imagen
  variant?: 'imageRight' | 'imageLeft' | 'imageTop';
  trustSignal?: string;       // "Respuesta en < 1 hora"
  className?: string;
}
```

**Variantes:**
- `imageRight` - Imagen a la derecha (default)
- `imageLeft` - Imagen a la izquierda
- `imageTop` - Imagen arriba (mobile)

**Ejemplo:**
```tsx
<HeroV1
  headline="Servicios de fontanería en Madrid"
  subheadline="⭐ 4.9/5 (120+ reseñas) | 👥 5000+ clientes"
  ctaLabel="Solicitar presupuesto"
  image="/images/plumber.jpg"
  trustSignal="Respuesta en < 1 hora"
/>
```

**Uso en Blueprints:**
- clinicas-salud → Imagen profesional
- servicios-locales → Equipo trabajando
- saas-tecnologico → Producto demo

---

### 2. HeroVideo.tsx ✅ Stable (v1.1.0)

**Descripción:** Hero con video de fondo + overlay. Muy impactante para servicios.

**Props:**
```typescript
interface HeroVideoProps {
  videoUrl: string;           // URL del video
  headline: string;
  subheadline?: string;
  ctaLabel: string;
  overlayOpacity?: 0.3 | 0.5 | 0.7;
  overlayColor?: string;      // hex color
  className?: string;
}
```

**Variantes:**
- `overlayOpacity: 0.3` - Overlay ligero (video visible)
- `overlayOpacity: 0.5` - Overlay medio (equilibrado)
- `overlayOpacity: 0.7` - Overlay fuerte (texto legible)

**Ejemplo:**
```tsx
<HeroVideo
  videoUrl="https://videos.example.com/plumber.mp4"
  headline="Reparaciones rápidas y garantizadas"
  ctaLabel="Agendar"
  overlayOpacity={0.5}
/>
```

**Uso en Blueprints:**
- servicios-locales → Video trabajando en vivo
- clinicas-salud → Consultorio moderno
- saas-tecnologico → Producto en acción

---

### 3. HeroGradient.tsx ✅ Stable (v1.0.0)

**Descripción:** Hero con gradiente full-screen sin media. Limpio y moderno.

**Props:**
```typescript
interface HeroGradientProps {
  headline: string;
  subheadline?: string;
  ctaLabel: string;
  ctaHref?: string;
  gradient: 'vibrante' | 'corporativo' | 'minimalista';
  contentPosition?: 'center' | 'left' | 'right';
  className?: string;
}
```

**Gradientes predefinidos:**
- `vibrante` - Cyan → Magenta (energético)
- `corporativo` - Blue → Amber (profesional)
- `minimalista` - Gray → Dark (elegante)

**Ejemplo:**
```tsx
<HeroGradient
  headline="SaaS Platform para Automación"
  subheadline="Automatiza workflows en segundos"
  ctaLabel="Probar gratis"
  gradient="vibrante"
  contentPosition="center"
/>
```

**Uso en Blueprints:**
- saas-tecnologico → Perfecto (limpio, enfoque)
- servicios-locales → Alternativa a video
- clinicas-salud → Menos usado

---

### 4. HeroDual.tsx 🟡 Beta (v0.9.0)

**Descripción:** Hero con dos imágenes simétricas. En desarrollo, cambios posibles.

**Props:**
```typescript
interface HeroDualProps {
  headline: string;
  imageLeft: string;          // URL imagen izquierda
  imageRight: string;         // URL imagen derecha
  ctaLabel: string;
  ctaHref?: string;
  variant?: 'side-by-side' | 'overlapped' | 'cards';
  className?: string;
}
```

**Estado:** 🟡 Todavía en testing. Usar con precaución.

---

## 🎨 FEATURES (3 componentes)

### 5. GridServicios.tsx ✅ Stable (v1.3.0)

**Descripción:** Grid de 3 columnas para servicios/características. El workhorse.

**Props:**
```typescript
interface GridServiciosProps {
  title?: string;             // "Nuestros Servicios"
  services: {
    icon: string;             // Emoji o SVG URL
    title: string;
    description: string;
  }[];
  columns?: 3 | 4;            // Default: 3
  className?: string;
}
```

**Ejemplo:**
```tsx
<GridServicios
  title="Servicios"
  columns={3}
  services={[
    {
      icon: "🔧",
      title: "Reparaciones",
      description: "Arreglamos cualquier problema"
    },
    {
      icon: "⚡",
      title: "Instalaciones",
      description: "Instalamos sistemas modernos"
    },
    {
      icon: "🛡️",
      title: "Garantía",
      description: "Garantía de 5 años en trabajos"
    }
  ]}
/>
```

**Uso en Blueprints:**
- servicios-locales → 3 cols servicios principales
- clinicas-salud → 3 cols especialidades
- saas-tecnologico → 3-4 features principales

---

### 6. BentoBox.tsx ✅ Stable (v1.1.0)

**Descripción:** Layout asimétrico tipo Bento. Visualmente impactante.

**Props:**
```typescript
interface BentoBoxProps {
  items: {
    title: string;
    description?: string;
    image?: string;
    size: 'small' | 'medium' | 'large' | 'hero';
  }[];
  className?: string;
}
```

**Layout automático:** Acomoda items en grid asimétrico

**Ejemplo:**
```tsx
<BentoBox
  items={[
    { title: "Especialidad 1", size: "large", image: "..." },
    { title: "Especialidad 2", size: "medium" },
    { title: "Especialidad 3", size: "small" }
  ]}
/>
```

**Uso en Blueprints:**
- clinicas-salud → Especialidades destacadas
- saas-tecnologico → Features principales
- servicios-locales → Servicios premium

---

### 7. FeatureCard.tsx ✅ Stable (v1.0.0)

**Descripción:** Card individual para feature. Reutilizable como átomo.

**Props:**
```typescript
interface FeatureCardProps {
  icon: string;               // Emoji o SVG
  title: string;
  description: string;
  variant?: 'icon-top' | 'icon-left' | 'icon-right';
  className?: string;
}
```

**Variantes:**
- `icon-top` - Icono arriba (default, vertical)
- `icon-left` - Icono a izquierda (horizontal)
- `icon-right` - Icono a derecha (horizontal)

**Ejemplo:**
```tsx
<FeatureCard
  icon="🚀"
  title="Rápido"
  description="Iniciamos en 24 horas"
  variant="icon-top"
/>
```

---

## 📝 FORMS (3 componentes)

### 8. LeadGen.tsx ✅ Stable (v1.2.0)

**Descripción:** Formulario flexible para capturar leads. Configurable.

**Props:**
```typescript
interface LeadGenProps {
  headline?: string;          // "Solicitar presupuesto"
  fields: ('email' | 'phone' | 'name' | 'service' | 'message')[];
  ctaLabel: string;           // "Enviar"
  onSubmit: (data: any) => Promise<void>;
  honeypot?: boolean;         // Anti-spam
  className?: string;
}
```

**Campos disponibles:**
- `email` - Input email
- `phone` - Input tel
- `name` - Input text
- `service` - Select dropdown
- `message` - Textarea

**Ejemplo:**
```tsx
<LeadGen
  headline="Solicitar presupuesto"
  fields={['name', 'phone', 'service', 'message']}
  ctaLabel="Enviar"
  onSubmit={async (data) => {
    await fetch('/api/leads', { method: 'POST', body: JSON.stringify(data) });
  }}
  honeypot={true}
/>
```

**Uso en Blueprints:**
- servicios-locales → Presupuestos, CTA
- clinicas-salud → Agendar cita
- saas-tecnologico → Lead capture

---

### 9. Newsletter.tsx ✅ Stable (v1.0.0)

**Descripción:** Suscripción newsletter simple y rápida.

**Props:**
```typescript
interface NewsletterProps {
  placeholder?: string;       // "tu@email.com"
  ctaLabel?: string;          // "Suscribirse"
  onSubmit: (email: string) => Promise<void>;
  className?: string;
}
```

**Ejemplo:**
```tsx
<Newsletter
  placeholder="tu@email.com"
  ctaLabel="Suscribirse"
  onSubmit={async (email) => {
    await fetch('/api/newsletter', { 
      method: 'POST',
      body: JSON.stringify({ email })
    });
  }}
/>
```

---

### 10. ContactForm.tsx ✅ Stable (v1.1.0)

**Descripción:** Contacto completo con validación y honeypot.

**Props:**
```typescript
interface ContactFormProps {
  title?: string;
  fields: string[];           // ['name', 'email', 'subject', 'message']
  honeypot?: boolean;
  onSubmit: (data: any) => Promise<void>;
  className?: string;
}
```

---

## 🎪 SECTIONS (3 componentes)

### 11. AuthorityBlock.tsx ✅ Stable (v1.2.0)

**Descripción:** Bloque de confianza: logos, reviews, casos de éxito.

**Props:**
```typescript
interface AuthorityBlockProps {
  clientLogos?: string[];     // URLs de logos
  reviews?: {
    name: string;
    text: string;
    stars: 1 | 2 | 3 | 4 | 5;
    image?: string;           // Avatar
  }[];
  caseStudies?: {
    title: string;
    description?: string;
    metric?: string;          // "↑ 300% traffic"
    image?: string;
  }[];
  layout?: 'stacked' | 'grid' | 'carousel';
  className?: string;
}
```

**Ejemplo:**
```tsx
<AuthorityBlock
  clientLogos={['/logos/client1.png', '/logos/client2.png']}
  reviews={[
    {
      name: "Juan Pérez",
      text: "Excelente servicio, muy rápido",
      stars: 5,
      image: "/avatars/juan.jpg"
    }
  ]}
  caseStudies={[
    {
      title: "Casa moderna",
      metric: "✅ Terminado en 2 semanas",
      image: "/cases/case1.jpg"
    }
  ]}
/>
```

---

### 12. FAQAccordion.tsx ✅ Stable (v1.1.0)

**Descripción:** FAQ accordion con soporte schema markup.

**Props:**
```typescript
interface FAQAccordionProps {
  title?: string;             // "Preguntas Frecuentes"
  items: {
    question: string;
    answer: string;           // Soporte markdown
  }[];
  variant?: 'default' | 'cards' | 'nested';
  generateSchema?: boolean;   // Auto-genera FAQPage schema
  className?: string;
}
```

**Ejemplo:**
```tsx
<FAQAccordion
  title="Preguntas Frecuentes"
  generateSchema={true}
  items={[
    {
      question: "¿Duele la limpieza?",
      answer: "No, usamos anestesia local..."
    },
    {
      question: "¿Cuánto cuesta?",
      answer: "Desde $50 hasta $200 según..."
    }
  ]}
/>
```

---

### 13. Testimonials.tsx ✅ Stable (v1.0.0)

**Descripción:** Carrusel de testimonios con navegación.

**Props:**
```typescript
interface TestimonialsProps {
  testimonials: {
    name: string;
    role?: string;            // "CEO at StartupX"
    text: string;
    image?: string;           // Avatar
    stars?: 1 | 2 | 3 | 4 | 5;
  }[];
  autoplay?: boolean;
  autoplayInterval?: number;  // ms
  className?: string;
}
```

---

## 📊 Matriz de Uso por Blueprint

| Componente | servicios-locales | clinicas-salud | saas-tecnologico |
|-----------|-----------------|-----------------|-----------------|
| HeroV1 | ✅ | ✅ | ❌ |
| HeroVideo | ✅ | ❌ | ❌ |
| HeroGradient | ❌ | ❌ | ✅ |
| HeroDual | 🟡 | 🟡 | 🟡 |
| GridServicios | ✅ | ✅ | ✅ |
| BentoBox | 🟡 | ✅ | ✅ |
| FeatureCard | ✅ | ✅ | ✅ |
| LeadGen | ✅ | ✅ | ✅ |
| Newsletter | ❌ | ❌ | ✅ |
| ContactForm | ✅ | ✅ | ✅ |
| AuthorityBlock | ✅ | ✅ | ✅ |
| FAQAccordion | ✅ | ✅ | ✅ |
| Testimonials | 🟡 | ✅ | ✅ |

**Leyenda:** ✅ Recomendado | 🟡 Opcional | ❌ No aplica

---

## 🔄 Versionado de Componentes

- ✅ **Stable** - Listo para producción, cambios mínimos
- 🟡 **Beta** - En desarrollo, cambios posibles próximas versiones
- 🔴 **Deprecated** - No usar, migrar a alternativa

**Changelog esperado:**
- Mensual: fixes de bugs
- Trimestral: nuevas variantes
- Anual: big features

---

## 📦 Importación Recomendada

```typescript
// ✅ Recomendado (desde barrels)
import { HeroV1, HeroVideo } from '@/components/heros';
import { GridServicios, BentoBox } from '@/components/features';
import { LeadGen } from '@/components/forms';
import { AuthorityBlock, FAQAccordion } from '@/components/sections';

// ✅ También válido
import { HeroV1 } from '@/components';

// ❌ Evitar (importación larga)
import HeroV1 from '@/components/heros/HeroV1';
```

---

**COMPONENTS.md v2.0**
Próxima actualización: 2026-08-14
