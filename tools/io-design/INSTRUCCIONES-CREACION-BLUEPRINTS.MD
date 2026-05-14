# 🔍 INSTRUCCIONES-CREACION-BLUEPRINTS.MD
## Cómo Crear Nuevos Blueprints Analizando Landings Web Exitosas

---

## ⚙️ PASO 0: PREPARAR ENTORNO LOCAL

**ANTES de ejecutar cualquier PROMPT, haz esto:**

### 0.1 Ubicación Correcta

```powershell
# Navega a la carpeta raíz del proyecto
cd E:\git\tools\io-design\

# Verifica que ves estos archivos:
dir

# Debes ver:
# - CLAUDE.md
# - COMPONENTS.md
# - blueprints/ (carpeta)
# - components/ (carpeta)
# - src/ (carpeta)
# - package.json
# - next.config.ts
```

### 0.2 Verificar que npm install está hecho

```powershell
# Si ves "node_modules" carpeta, estás listo
dir

# Si NO está, ejecuta:
npm install

# Debe decir: "up to date" o "added X packages"
```

### 0.3 Verificar que Next.js funciona

```powershell
# Ejecuta servidor de desarrollo
npm run dev

# Debe mostrar:
# ▲ Next.js 16.2.6
# - Local:         http://localhost:3000
# ✓ Ready in XXXms

# Puedes presionar Ctrl+C para detener (no lo hagas aún)
```

### 0.4 Abrir Claude Code

**En la MISMA terminal donde corre `npm run dev`**, abre OTRA terminal:

```powershell
# Abre PowerShell nueva (NO cierres la de npm run dev)
# Navega a la carpeta
cd E:\git\tools\io-design\

# Abre Claude Code
claude-code .

# Debería ver el contexto:
# - CLAUDE.md
# - COMPONENTS.md
# - blueprints/
# - components/
# - src/
```

### 0.5 Entorno Listo ✅

Cuando veas que Claude Code tiene acceso a:
```
✓ CLAUDE.md (reglas maestras)
✓ COMPONENTS.md (componentes disponibles)
✓ blueprints/ (carpeta para nuevos blueprints)
✓ components/ (librería .tsx)
✓ src/ (código)
```

**Entonces puedes empezar con PROMPT 1.**

---

### ⚠️ IMPORTANTE: Dos Ventanas Activas

```
VENTANA 1: npm run dev (MANTÉN ABIERTA)
├── Corre Next.js en puerto 3000
├── NO cierres esta ventana
└── Puedes ignorarla

VENTANA 2: claude-code . (AQUÍ EJECUTAS PROMPTS)
├── Aquí pegas los PROMPTS
├── Aquí ejecutas la creación
└── Esta es tu ventana de trabajo
```

---

## 📌 INTRODUCCIÓN

Los 3 blueprints actuales (servicios-locales, clinicas-salud, saas-tecnologico) son **plantillas base**.

Pero existen **CIENTOS de variantes** que necesitan blueprints específicos:

```
NUEVOS SECTORES NO CUBIERTOS:
├── Retail / eCommerce
├── Inmobiliario
├── Restaurantes / Gastronomía
├── Educación / Cursos
├── Abogados / Asesoría Legal
├── Agencias Creativas
├── Constructoras
├── Fitness / Gyms
├── Hotels / Turismo
├── Marketplaces
└── ...INFINITOS MÁS

¿SOLUCIÓN?
Analizar landings REALES exitosas
Extraer patrones
Crear blueprints nuevos automáticamente
```

**Este documento te enseña cómo hacerlo.**

---

## 🎯 FLUJO GENERAL: ANÁLISIS → BLUEPRINT

```
PASO 1: ENCONTRAR LANDING EXITOSA
    ↓
PASO 2: SCRAPEAR HTML + CSS
    ↓
PASO 3: ANALIZAR ESTRUCTURA
    ↓
PASO 4: EXTRAER PATRÓN
    ↓
PASO 5: CREAR BLUEPRINT
    ↓
PASO 6: VALIDAR Y DOCUMENTAR
    ↓
PASO 7: GUARDAR EN SUPABASE
    ↓
NUEVO BLUEPRINT LISTO PARA USAR ✅
```

**Tiempo estimado: 30-45 minutos por blueprint**

---

## 🏆 PASO 1: ENCONTRAR LANDING EXITOSA

### 1.1 ¿Dónde buscar?

**A. Galerías de Inspiración:**
```
1. Awwwards.com - Diseños premiados
2. Dribbble.com - Trabajos freelancers
3. Behance.net - Portafolios Adobe
4. Landingfolio.com - Solo landings
5. Tldv.io - Landing específicas
6. Lapa.ninja - Landings recopiladas
7. Mobbin.com - Mobile design patterns
```

**B. Búsqueda Google Estratégica:**
```
Searches efectivas:
- "[SECTOR] landing page design"
- "[SECTOR] website homepage"
- "[SECTOR] SaaS landing example"
- "[SECTOR] conversion landing"
- "[SECTOR] best landing pages"

Ejemplos:
- "ecommerce landing page examples"
- "real estate website design"
- "law firm homepage design"
- "fitness studio landing page"
- "restaurant website layout"
```

**C. Competencia Real:**
```
Estrategia: Buscar competidores del cliente
1. Google: "[sector] [ciudad]"
2. Revisar top 5 resultados
3. Analizar sus landings
4. Extraer patrones comunes
5. Crear blueprint del sector
```

**D. Estudios de Caso Documentados:**
```
- ConvertKit case studies (SaaS)
- HubSpot blog (Marketing)
- Unbounce inspiration gallery
- OptimizePress examples
- Leadpages templates
- Instapage gallery
```

### 1.2 Criterios de "Landing Exitosa"

**Indicadores de que es buena:**

```
CONTENIDO:
✓ Tiene mucho texto (bueno para SEO)
✓ Tiene múltiples headlines (H1, H2, H3)
✓ Tiene párrafos descriptivos
✓ Tiene CTA claro y múltiple
✓ Tiene FAQ o preguntas comunes

CONVERSIÓN:
✓ Formulario visible (lead capture)
✓ CTAs bien posicionados
✓ Trust signals (reviews, logos, casos)
✓ Urgency / scarcity indicators
✓ Money-back guarantee o similar

DISEÑO:
✓ Mobile responsive
✓ Colores coherentes (paleta definida)
✓ Tipografía legible (2-3 fonts máximo)
✓ Imágenes de calidad
✓ Espacios en blanco (no abarrotado)

TÉCNICA:
✓ Carga rápida (< 3 segundos)
✓ Sem errores en consola
✓ Schema markup presente
✓ Meta tags completos
✓ Sem 404s o broken links
```

### 1.3 Seleccionar la Landing

**Una vez encontrada, guardar:**

```
1. URL completa
2. Screenshot de la página
3. Nota: ¿Por qué es exitosa?
4. Nota: Sector/industria
5. Nota: Features clave observadas
```

---

## 🔨 PASO 2: SCRAPEAR LANDING

### 2.1 PROMPT 1: Scrapear Landing Automáticamente

**COPIA ESTO EN CLAUDE CODE:**

```markdown
# CREAR BLUEPRINT NUEVO - PASO 1: SCRAPEAR LANDING

Necesito analizar una landing exitosa y extraer su estructura HTML + CSS.

## URL DE LA LANDING: https://luxuryrentalsmadrid.com/

```## REQUISITOS:

### 1. ACCEDER A LA LANDING:
- Usar Puppeteer o Firecrawl
- Capturar HTML completo
- Capturar CSS (estilos inline + stylesheets)
- Tomar screenshot (full page)
- Registrar colores usados

### 2. EXTRAER ESTRUCTURA HTML:

```typescript
interface Section {
  tagName: string; // div, section, article, etc
  classes: string[];
  id?: string;
  innerHTML: string;
  children?: Section[];
  computedStyles?: {
    backgroundColor?: string;
    color?: string;
    fontSize?: string;
    fontWeight?: string;
  };
} ```

### 3. ANALIZAR COMPONENTES ENCONTRADOS:

Para cada elemento, identificar:
- ¿Qué es? (Hero, Card, Grid, Form, Button, etc)
- ¿Qué contiene? (texto, imagen, video, etc)
- ¿Qué tamaño tiene?
- ¿Qué color tiene?
- ¿Dónde está posicionado?

### 4. EXTRAER INFORMACIÓN CRÍTICA:

```typescript
interface ScrapedLanding {
  url: string;
  title: string;
  metaDescription: string;
  favicon?: string;
  
  // ESTRUCTURA HTML
  sections: {
    name: string;
    selector: string; // CSS selector
    tagName: string;
    content: string;
    position: number;
    estimatedHeight: number;
  }[];
  
  // COMPONENTES IDENTIFICADOS
  components: {
    type: 'hero' | 'heading' | 'text' | 'image' | 'video' | 'button' | 'form' | 'grid' | 'carousel' | 'card' | 'badge' | 'logo';
    name: string;
    content: string;
    selector: string;
    position: number;
    estimatedSize: 'small' | 'medium' | 'large';
  }[];
  
  // COLORES ENCONTRADOS
  colors: {
    primary?: string; // Color principal
    secondary?: string; // Color secundario
    accent?: string; // Color de acentos
    background?: string; // Fondo principal
    backgroundAlt?: string; // Fondo alternativo
    text?: string; // Texto principal
    textLight?: string; // Texto secundario
    border?: string;
    success?: string;
    error?: string;
  };
  
  // TIPOGRAFÍA
  typography: {
    headingFont?: string; // Font-family de headings
    bodyFont?: string; // Font-family de body
    headingSize?: string; // Font-size de H1
    bodySize?: string; // Font-size de body
    lineHeight?: string;
  };
  
  // IMÁGENES
  images: {
    url: string;
    alt: string;
    isHero?: boolean;
    position: number;
  }[];
  
  // BOTONES Y CTAs
  buttons: {
    text: string;
    color?: string;
    backgroundColor?: string;
    position: number;
    isHighlighted: boolean;
  }[];
  
  // FORMULARIOS
  forms: {
    fields: {
      name: string;
      type: 'text' | 'email' | 'phone' | 'select' | 'textarea';
      placeholder?: string;
      required: boolean;
    }[];
    submitText: string;
    submitButtonColor?: string;
  }[];
  
  // SCHEMA MARKUP
  schemaMarkup?: {
    '@context': string;
    '@type': string;
    [key: string]: any;
  }[];
  
  // METADATA
  meta: {
    og_title?: string;
    og_description?: string;
    og_image?: string;
    twitter_card?: string;
    canonical?: string;
  };
}
### 5. GUARDAR EN SUPABASE: Tabla: `scraped_landings````
- id (UUID)
- url (texto)
- title (texto)
- description (textarea)
- html_structure (JSON)
- components (JSON)
- colors (JSON)
- typography (JSON)
- images (JSON)
- buttons (JSON)
- forms (JSON)
- schema_markup (JSON)
- metadata (JSON)
- screenshot_url (texto)
- industry_guess (texto)
- quality_score (número 0-100)
- scraped_at (timestamp)
- notes (textarea)


### 6. GENERAR REPORTE VISUAL:

Mostrar en UI:
- Screenshot de la landing
- Estructura en diagrama
- Paleta de colores visual
- Tipografías usadas
- Componentes encontrados (con íconos)
- Flujo visual de secciones

Genera código completo para scrapear landing.
Retorna: ScrapedLanding object completo.

```

---

## 🔍 PASO 3: ANALIZAR ESTRUCTURA

### 3.1 PROMPT 2: Analizar Patrón de Landing

**COPIA ESTO EN CLAUDE CODE:**

```markdown
# CREAR BLUEPRINT NUEVO - PASO 2: ANALIZAR ESTRUCTURA

Tengo landing scrapada con toda la información.
Ahora necesito identificar el patrón y estructura.

## DATOS DISPONIBLES:

```typescript
const scrapedLanding = {
  url: "https://example.com",
  title: "...",
  sections: [...],
  components: [...],
  colors: {...},
  typography: {...},
  buttons: [...],
  forms: [...]
}
```## REQUISITOS:

### 1. IDENTIFICAR SECCIONES PRINCIPALES:

Para cada sección, categorizar:

```typescript
type SectionType = 
  | 'header'
  | 'hero'
  | 'hero-variant'
  | 'features'
  | 'benefits'
  | 'social-proof'
  | 'reviews'
  | 'testimonials'
  | 'case-studies'
  | 'faq'
  | 'pricing'
  | 'comparison'
  | 'cta'
  | 'footer'
  | 'unknown';

interface SectionAnalysis {
  name: SectionType;
  order: number; // Posición en la página
  purpose: string; // Ej: "Atract attention", "Build trust", "Drive conversion"
  components: string[]; // Componentes que contiene
  textContent: string; // Contenido de texto
  estimatedHeight: number;
  estimatedConversionImpact: 'critical' | 'high' | 'medium' | 'low';
  
  // COMPONENTES ESPECÍFICOS
  hasImage: boolean;
  hasVideo: boolean;
  hasCTA: boolean;
  hasForm: boolean;
  hasCarousel: boolean;
  hasGrid: boolean;
}
```### 2. MAPEAR FLUJO DE CONVERSIÓN:

``` VISITANTE LLEGA
    ↓
[HERO] (Atención)
    "¿Qué es esto?" - 5 segundos
    ↓
[FEATURES/BENEFITS] (Información)
    "¿Qué me ofrece?" - 30 segundos
    ↓
[SOCIAL PROOF] (Confianza)
    "¿Puedo confiar?" - 20 segundos
    ↓
[CTA] (Acción)
    "¿Cómo compro?" - Inmediato
    ↓
CONVERSIÓN ✅
``` Mapear exactamente este flujo en la landing analizada.

### 3. ANALIZAR CADA SECCIÓN:

Para CADA sección, completar:

```typescript
interface DetailedSectionAnalysis {
  // ESTRUCTURA
  sectionType: SectionType;
  headline?: string; // H1, H2, etc
  subheadline?: string;
  bodyText?: string;
  
  // COMPONENTES
  componentsUsed: Array<{
    type: string; // "Hero", "GridServicios", "BentoBox", etc
    variant?: string; // "default", "alt1", etc
    purpose: string;
  }>;
  
  // VISUAL
  backgroundColor?: string;
  textColor?: string;
  layout: 'single-column' | 'two-column' | 'grid' | 'asymmetric';
  
  // FUNCIONALIDAD
  hasButton: boolean;
  buttonText?: string;
  buttonColor?: string;
  hasForm: boolean;
  fieldCount?: number;
  
  // IMPACTO EN CONVERSIÓN
  criticalSection: boolean;
  estimatedDwellTime: string; // "5 seconds", "30 seconds", etc
  estimatedConversionLift: number; // %
  
  // INSIGHTS
  whatMakesItEffective: string[]; // ["High contrast", "Clear CTA", ...]
  improvementSuggestions: string[]; // ["Add trust signal", ...]
}```

### 4. DETECTAR PATRONES REPETIDOS:
``` ¿Se repite el mismo componente?
- ¿Hero aparece 2 veces?
- ¿CTA aparece N veces? (dónde)
- ¿Card se repite en feature? (cuántas)
- ¿Color cambia entre secciones?

Esto ayuda a simplificar blueprint.

``` ### 5. ANALIZAR CTAs:

```typescript
interface CTAAnalysis {
  text: string; // "Get Started", "Buy Now", etc
  color: string;
  position: number; // Primera vez que aparece
  totalCount: number; // Cuántas veces total
  variants: string[]; // ["Primary CTA", "Secondary CTA", ...]
  placement: string[]; // ["Hero", "Features", "Footer", ...]
  estimatedClickThroughRate: number; // % estimado
}
``` ### 6. ANALIZAR FORMULARIOS:

```typescript
interface FormAnalysis {
  position: number;
  fields: string[]; // ["name", "email", "phone", ...]
  fieldCount: number;
  estimatedCompletionRate: number; // %
  submitText: string;
  isConditional: boolean; // ¿Campos dinámicos?
}
``` ### 7. IDENTIFICAR TRUST SIGNALS:

``` ¿Dónde están los trust signals?
- Reviews (¿cuántas? ¿dónde?)
- Logos de clientes (¿cuántos?)
- Certificaciones (¿cuáles?)
- Casos de éxito (¿cuántos?)
- Garantía/Money-back (¿presente?)
- Awards/Premios (¿cuáles?)
  
```  ### 8. GUARDAR ANÁLISIS EN SUPABASE:

Tabla: `landing_structure_analysis`

``` - id (UUID)
- scraped_landing_id (FK)
- sections_analysis (JSON)
- cta_analysis (JSON)
- form_analysis (JSON)
- trust_signals (JSON)
- conversion_flow (JSON)
- estimated_conversion_rate (número)
- key_success_factors (JSON array)
- improvement_suggestions (JSON array)
- analyzed_at (timestamp)
  
``` ### 9. GENERAR REPORTE VISUAL:

Mostrar:
- Flujo de conversión visual (diagrama)
- Secciones en orden (lista con colores)
- Componentes por sección
- CTAs destacados
- Forms identificados
- Trust signals marcados

Genera análisis completo.
Retorna: DetailedAnalysis object.
```

---

## 🎨 PASO 4: EXTRAER PATRÓN → BLUEPRINT

### 4.1 PROMPT 3: Generar Blueprint Nuevo

**COPIA ESTO EN CLAUDE CODE:**

```markdown
# CREAR BLUEPRINT NUEVO - PASO 3: GENERAR BLUEPRINT

Tengo análisis completo de la landing exitosa.
Ahora genero un blueprint reutilizable.

## DATOS DISPONIBLES:

```typescript
const analysis = {
  sectionsAnalysis: [...],
  ctaAnalysis: {...},
  formAnalysis: {...},
  trustSignals: {...},
  conversionFlow: {...},
  colors: {...},
  typography: {...}
}
``` ## REQUISITOS:

### 1. CREAR ESTRUCTURA DE BLUEPRINT:

```typescript
interface BlueprintNew {
  // META
  id: string; // UUID auto-generado
  version: string; // "1.0.0"
  createdFrom: string; // URL original analizada
  
  // IDENTIFICACIÓN
  type: string; // Ej: "ecommerce-retail", "law-firm", "gym", etc
  name: string; // Ej: "eCommerce - Fashion Retail"
  description: string; // Descripción clara
  category: string; // "servicios-locales" | "clinicas-salud" | "saas-tecnologico" | "new"
  
  // SECTORES Y AUDIENCIAS
  industries: string[]; // Ej: ["Fashion", "Retail", "eCommerce"]
  targetAudiences: string[]; // Ej: ["B2C", "Direct-to-consumer", "Online shoppers"]
  geographicRelevance: string[]; // Ej: ["Global", "North America", "Europe"]
  
  // ESTRUCTURA (ORDEN DE SECCIONES)
  sections: Array<{
    id: string; // "hero", "features", "faq", etc
    name: string;
    displayName: string;
    purpose: string;
    
    // CONFIGURACIÓN
    order: number; // Posición (1, 2, 3...)
    required: boolean; // ¿Es obligatoria?
    estimatedConversionWeight: number; // 1-10
    
    // COMPONENTE RECOMENDADO
    recommendedComponent: string; // "HeroV1", "GridServicios", etc
    alternativeComponents?: string[]; // ["HeroVideo", "HeroGradient"]
    
    // CONTENIDO
    defaultHeadline?: string;
    defaultSubheadline?: string;
    defaultDescription?: string;
    
    // VISUAL
    backgroundColor?: string; // "primary", "secondary", "white", etc
    textColor?: string;
    hasImage: boolean;
    hasVideo: boolean;
  }>;
  
  // COMPONENTES RECOMENDADOS
  recommendedComponents: {
    hero: string[]; // [HeroV1, HeroVideo, HeroGradient, HeroDual]
    features: string[]; // [GridServicios, BentoBox, FeatureCard]
    forms: string[]; // [LeadGen, Newsletter, ContactForm, AppointmentForm]
    sections: string[]; // [AuthorityBlock, FAQ, Testimonials, etc]
  };
  
  // DATOS DE EJEMPLO (para el cliente)
  exampleData: {
    projectConfig: {
      brandName: string;
      primaryColor: string;
      secondaryColor?: string;
      fontFamily: 'Barlow' | 'Inter';
    };
    conversionBlock: {
      headline: string;
      subheadline?: string;
      ctaLabel: string;
      trustSignal?: string;
    };
    h2Services?: string[];
    faqItems?: Array<{ question: string; answer: string }>;
    reviews?: Array<{ name: string; text: string; stars: number }>;
  };
  
  // COLORES Y TIPOGRAFÍA
  designTokens: {
    colors: {
      primary: string;
      secondary?: string;
      accent?: string;
      background: string;
      text: string;
      textLight?: string;
    };
    typography: {
      headingFont: 'Barlow' | 'Inter';
      bodyFont: 'Barlow' | 'Inter';
      headingSize: string; // "2.5rem", "32px", etc
      bodySize: string;
    };
  };
  
  // CTA ESTRATEGIA
  ctaStrategy: {
    primaryCTA: string; // Ej: "Buy Now", "Get Started", "Book Consultation"
    ctaPlacements: string[]; // Ej: ["hero", "features", "footer"]
    ctaVariant: 'button' | 'link' | 'form';
    trustSignalPlacement: 'below-cta' | 'side-cta' | 'hero-footer' | 'section-end';
    ctaColor: string; // "primary", "accent", etc
    secondaryCTA?: string;
  };
  
  // FORMULARIOS
  forms: Array<{
    id: string;
    name: string;
    position: 'hero' | 'section' | 'footer';
    fields: string[];
    submitText: string;
    submitAction: 'email' | 'supabase' | 'webhook';
  }>;
  
  // SEO Y SCHEMA
  seo: {
    schemaType: 'LocalBusiness' | 'MedicalBusiness' | 'SoftwareApplication' | 'Product' | 'Organization' | 'Custom';
    recommendedKeywords: string[];
    h1Pattern: string; // Template para H1
    metaDescriptionPattern?: string;
  };
  
  // VALIDACIONES Y SCORES
  metrics: {
    estimatedConversionRate: number; // %
    estimatedBounceRate: number; // %
    avgTimeOnPage: string; // "2m 30s"
    recommendedPageLength: 'short' | 'medium' | 'long';
    mobileOptimized: boolean;
    accessibilityScore: number; // 0-100
  };
  
  // HISTORIA
  metadata: {
    createdAt: Date;
    createdFromUrl: string;
    createdFromTitle: string;
    sourceBlueprint?: string; // Si es derivado
    successFactors: string[]; // Por qué funciona
    improvementOpportunities: string[]; // Qué se puede mejorar
    notes: string;
  };
}
``` ### 2. COMPLETAR CADA CAMPO:

Basado en el análisis, llenar:

**type:**
``` Convención: "[categoria]-[subcategoria]"

Ejemplos:
- "retail-fashion"
- "retail-electronics"
- "real-estate-property"
- "real-estate-agency"
- "food-restaurant"
- "food-cafe"
- "education-course"
- "education-bootcamp"
- "legal-firm"
- "legal-solo-practitioner"
- "fitness-gym"
- "fitness-trainer"
- "hotel-chain"
- "hotel-boutique"
  
``` **name:**
``` Formato: "[Sector] - [Descripción específica]"

Ejemplos:
- "Retail - Fashion Ecommerce"
- "Real Estate - Property Listings"
- "Restaurant - Fine Dining"
- "Education - Online Bootcamp"
- "Legal - Law Firm Services"
- "Fitness - Gym Membership"
- "Hotel - Luxury Resort"
  
``` **industries:**
```Array de industrias que usan este patrón:
["Fashion", "Apparel", "Retail"]
["Real Estate", "Property", "Realty"]
["Restaurants", "Cafes", "Catering"]

``` **sections:**

``` Extraer del análisis.
Orden debe ser: cómo aparece en la landing.

Ejemplo:
[
  {
    id: "hero",
    name: "Hero Section",
    displayName: "Hero",
    purpose: "Capture attention and communicate main value",
    order: 1,
    required: true,
    estimatedConversionWeight: 10,
    recommendedComponent: "HeroV1",
    alternativeComponents: ["HeroVideo", "HeroGradient"],
    hasImage: true,
    hasVideo: false
  },
  {
    id: "features",
    name: "Features Section",
    displayName: "Our Features",
    purpose: "Showcase key benefits and features",
    order: 2,
    required: true,
    estimatedConversionWeight: 7,
    recommendedComponent: "GridServicios",
    alternativeComponents: ["BentoBox"],
    hasImage: false,
    hasVideo: false
  },
  ...más secciones
]
``` **recommendedComponents:**
``` Basado en componentes encontrados:
{
  hero: ["HeroV1", "HeroVideo", "HeroGradient"],
  features: ["GridServicios", "BentoBox", "FeatureCard"],
  forms: ["LeadGen", "Newsletter"],
  sections: ["AuthorityBlock", "FAQAccordion"]
}
``` **designTokens:**
``` Extraer de colors y typography:
{
  colors: {
    primary: "#2563eb", // Del análisis
    secondary: "#10b981",
    accent: "#f59e0b",
    background: "#ffffff",
    text: "#1f2937"
  },
  typography: {
    headingFont: "Inter",
    bodyFont: "Inter",
    headingSize: "2.5rem",
    bodySize: "1rem"
  }
}

``` **ctaStrategy:**
``` Basado en CTAAnalysis:
{
  primaryCTA: "Buy Now",
  ctaPlacements: ["hero", "features-end", "footer"],
  ctaVariant: "button",
  trustSignalPlacement: "below-cta",
  ctaColor: "primary"
} ```

### 3. VALIDAR BLUEPRINT:

Checklist:
``` [ ] Todas las secciones tienen orden único
[ ] Sección 1 es siempre "hero"
[ ] Tiene al menos 3 secciones
[ ] Tiene máximo 8 secciones
[ ] Componentes recomendados están disponibles
[ ] Colors están en formato hex
[ ] Existe exampleData para cada campo importante
[ ] Schema type es válido
[ ] estimatedConversionRate entre 0-100

``` ### 4. GUARDAR EN SUPABASE:

Tabla: `blueprints_custom`

``` - id (UUID)
- type (texto, unique)
- name (texto)
- description (textarea)
- category (texto)
- industries (JSON array)
- sections (JSON)
- recommended_components (JSON)
- design_tokens (JSON)
- cta_strategy (JSON)
- forms (JSON)
- seo (JSON)
- metrics (JSON)
- metadata (JSON)
- created_from_url (texto)
- created_at (timestamp)
- status (enum: 'draft', 'published', 'deprecated')
  
``` ### 5. GENERAR DOCUMENTACIÓN:

Crear archivo: `blueprints/[type].md`

```markdown
# Blueprint: [Name]

## Descripción
[Description]

## Industrias
- [Industria 1]
- [Industria 2]

## Estructura
[Secciones en orden]

## Componentes Recomendados
- Hero: [Components]
- Features: [Components]
- Forms: [Components]

## Colores
- Primary: [Color]
- Secondary: [Color]

## CTA Estrategia
[CTA details]

## Ejemplo de Datos
[Example data]

## Fuente
Analizado de: [URL original]
Fecha: [Date]

``` Genera blueprint completo.
Retorna: BlueprintNew object + archivo .md
```

---

## ✅ PASO 5: VALIDAR Y DOCUMENTAR

### 5.1 PROMPT 4: Validar Blueprint

**COPIA ESTO EN CLAUDE CODE:**

```markdown
# CREAR BLUEPRINT NUEVO - PASO 4: VALIDAR BLUEPRINT

Tengo blueprint nuevo generado.
Ahora necesito validarlo antes de publicar.

## DATOS DISPONIBLES:

```typescript
const blueprint = {
  id: "...",
  type: "...",
  name: "...",
  sections: [...],
  recommendedComponents: {...},
  ...
}
``` ## VALIDACIONES A EJECUTAR:

### 1. VALIDACIÓN ESTRUCTURAL:

```typescript
function validateBlueprintStructure(blueprint): ValidationResult {
  const checks = {
    // IDs y nombres
    hasId: blueprint.id && blueprint.id.length > 0,
    hasType: blueprint.type && blueprint.type.length > 0,
    hasName: blueprint.name && blueprint.name.length > 0,
    
    // Secciones
    hasSections: blueprint.sections && blueprint.sections.length >= 3,
    maxSections: blueprint.sections && blueprint.sections.length <= 8,
    sectionsHaveOrder: blueprint.sections.every(s => typeof s.order === 'number'),
    uniqueOrders: new Set(blueprint.sections.map(s => s.order)).size === blueprint.sections.length,
    firstSectionIsHero: blueprint.sections[0].id === 'hero',
    
    // Componentes
    hasRecommendedComponents: blueprint.recommendedComponents && Object.keys(blueprint.recommendedComponents).length > 0,
    
    // Diseño
    hasDesignTokens: blueprint.designTokens && blueprint.designTokens.colors && blueprint.designTokens.typography,
    validColors: Object.values(blueprint.designTokens?.colors || {}).every(c => /^#[0-9A-F]{6}$/i.test(c)),
    
    // CTA
    hasCTAStrategy: blueprint.ctaStrategy && blueprint.ctaStrategy.primaryCTA,
    
    // Métricas
    validConversionRate: blueprint.metrics.estimatedConversionRate >= 0 && blueprint.metrics.estimatedConversionRate <= 100,
  };
  
  return {
    isValid: Object.values(checks).every(v => v),
    checks,
    errors: Object.entries(checks)
      .filter(([_, value]) => !value)
      .map(([key, _]) => `Failed: ${key}`)
  };
}
``` ### 2. VALIDACIÓN DE COMPONENTES:

``` Verificar que cada componente recomendado existe:

DISPONIBLES:
- Heros: HeroV1, HeroVideo, HeroGradient, HeroDual
- Features: GridServicios, BentoBox, FeatureCard
- Forms: LeadGen, Newsletter, ContactForm, AppointmentForm
- Sections: AuthorityBlock, FAQAccordion, Testimonials

¿Todos los componentes en blueprint existen?

``` ### 3. VALIDACIÓN DE SECTORES:

``` ¿El blueprint cubre un sector real?
- ¿Industries está documentada?
- ¿targetAudiences es realista?
- ¿Es diferente de blueprints existentes?
  
``` ### 4. VALIDACIÓN DE CONTENIDO:

``` ¿El blueprint tiene ejemplos de datos?
- ¿exampleData tiene headline?
- ¿exampleData tiene CTA?
- ¿exampleData tiene servicios (si aplica)?
- ¿exampleData tiene FAQ (si aplica)?
  
``` ### 5. VALIDACIÓN DE FUENTE:

``` ¿Se puede rastrear dónde vino?
- createdFromUrl válida?
- sourceBlueprint documentado (si aplica)?
- successFactors documentados?
  
``` ### 6. SCORING DEL BLUEPRINT:

```typescript
function scoreBlueprint(blueprint): number {
  const criteria = {
    structure: validateStructure() ? 25 : 0,
    components: validateComponents() ? 20 : 0,
    documentation: hasDocumentation() ? 20 : 0,
    relevance: hasValidIndustries() ? 15 : 0,
    uniqueness: isUnique() ? 10 : 0,
    examples: hasExampleData() ? 10 : 0,
  };
  
  return Object.values(criteria).reduce((a, b) => a + b, 0);
}

// Score needed: >= 80/100 to publish
``` ### 7. GENERAR REPORTE DE VALIDACIÓN:

Mostrar:
- ✅ Checks pasados
- ❌ Checks fallidos (si hay)
- 📊 Score final (0-100)
- 💡 Recomendaciones de mejora
- 🟢 Estado: "Ready to publish" o "Needs fixes"

### 8. SI ESTÁ VÁLIDO:

Cambiar estado a "published" en Supabase
Guardar blueprint en blueprints/ folder
Enviar notificación: "New blueprint available"

Si hay errores:
- Listar específicamente qué falló
- Sugerir cómo arreglar
- No publicar hasta que score >= 80

Genera validador completo.
Retorna: ValidationReport
```

---

## 🚀 PASO 6: DESPLEGAR BLUEPRINT

### 6.1 PROMPT 5: Hacer Blueprint Disponible

**COPIA ESTO EN CLAUDE CODE:**

```markdown
# CREAR BLUEPRINT NUEVO - PASO 5: DESPLEGAR BLUEPRINT

Blueprint validado.
Ahora necesito hacerlo disponible en el sistema.

## DATOS DISPONIBLES:

```typescript
const blueprint = {
  id: "...",
  type: "...",
  name: "...",
  // ... todos los datos
}
``` ## REQUISITOS:

### 1. ACTUALIZAR BASE DE DATOS:

Tabla: `blueprints`
``` INSERT INTO blueprints (
  id, type, name, description, 
  sections, recommended_components, design_tokens,
  metrics, metadata, status
) VALUES (...)

``` ### 2. CREAR ARCHIVO DE DOCUMENTACIÓN:

Ubicación: `E:\git\tools\io-design\blueprints\apartamentos.md`

Contenido:
```markdown
# Blueprint: [name]

## Descripción
[description]

## Casos de Uso
- [use case 1]
- [use case 2]

## Estructura
### 1. [Section 1]
[Details]

### 2. [Section 2]
[Details]

...

## Componentes
[List of recommended]

## Datos de Ejemplo
[Example data]

## Colores
[Color palette]

## CTA Estrategia
[CTA details]

## Fuente Original
URL: [source url]
Analizado: [date]

## Versión
1.0.0 - [date]

``` ### 3. REGISTRAR EN BLUEPRINTS REGISTRY:

Actualizar archivo: `E:\git\tools\io-design\BLUEPRINTS.json`

```json
{
  "blueprints": [
    {
      "id": "servicios-locales",
      "type": "servicios-locales",
      "name": "Servicios Locales",
      "status": "published",
      "version": "1.0.0"
    },
    ...
    {
      "id": "[nuevo-blueprint]",
      "type": "[nuevo-type]",
      "name": "[nuevo-name]",
      "status": "published",
      "version": "1.0.0",
      "createdAt": "[date]",
      "createdFromUrl": "[source]"
    }
  ]
}
``` ### 4. ACTUALIZAR SELECTOR DE BLUEPRINT:

Actualizar función: `src/lib/selectBlueprint.ts`

```typescript
if (client.sector === '[new-sector]') {
  return getBlueprint('[new-type]');
}
``` ### 5. ACTUALIZAR DOCUMENTATION:

Archivo: `E:\git\tools\io-design\BLUEPRINTS.md`

Agregar sección para nuevo blueprint:
```markdown
## [nombre del blueprint]

- **Tipo:** [type]
- **Industrias:** [industries]
- **Audiencias:** [audiences]
- **Secciones:** [number]
- **Componentes:** [list]

[Descripción]

``` ### 6. NOTIFICAR AL SISTEMA:

Webhook o evento que:
- Invalida cache de blueprints
- Notifica UI de nuevo blueprint disponible
- Registra en analytics

### 7. GUARDAR EN SUPABASE:

Tabla: `blueprint_deployments`

``` - id (UUID)
- blueprint_id (FK)
- deployed_at (timestamp)
- version (texto)
- status (enum: 'active', 'archived')
- deployment_notes (textarea)
  
``` ### 8. GENERAR CONFIRMACIÓN:

Mostrar:
- ✅ Blueprint registrado
- ✅ Documentación creada
- ✅ Disponible en selector
- 📊 Blueprint URL
- 🔗 Documentación URL
- 📈 Stats: "Ready to use"

Genera proceso de deployment completo.
``` 

---

## 📊 RESUMEN: FLUJO COMPLETO EN 5 PROMPTS

```
PROMPT 1: Scrapear landing
  Input: URL
  Output: ScrapedLanding object

PROMPT 2: Analizar estructura
  Input: ScrapedLanding
  Output: DetailedAnalysis object

PROMPT 3: Generar blueprint
  Input: DetailedAnalysis
  Output: BlueprintNew object + .md file

PROMPT 4: Validar blueprint
  Input: BlueprintNew
  Output: ValidationReport (score 0-100)

PROMPT 5: Desplegar blueprint
  Input: BlueprintNew (validated)
  Output: Blueprint en producción ✅
```

---

## ⏱️ TIEMPO ESTIMADO

```
Por cada blueprint nuevo:

PROMPT 1 (Scrapear): 3 minutos
PROMPT 2 (Analizar): 5 minutos
PROMPT 3 (Generar): 10 minutos
PROMPT 4 (Validar): 2 minutos
PROMPT 5 (Desplegar): 2 minutos

TOTAL: ~22 minutos por blueprint

Si haces 3 blueprints nuevos: 66 minutos
Si haces 5 blueprints nuevos: 110 minutos
```

---

## 🎯 CASOS DE USO: CREAR 5 BLUEPRINTS NUEVOS

### CASO 1: Real Estate / Inmobiliario

**URL exitosa a analizar:**
```
https://www.zillow.com/
https://www.idealista.com/
https://www.redfin.com/
```

**Resultado esperado:**
- Blueprint type: "real-estate-property"
- Industrias: ["Real Estate", "Property", "Realty"]
- Componentes: [HeroV1 (imágenes), GridServicios (properties), FAQ]

### CASO 2: Restaurant / Restaurante

**URL exitosa a analizar:**
```
https://www.cheesecakeactory.com/
https://www.dominosng.com/
https://www.subwaymeneu.com/
```

**Resultado esperado:**
- Blueprint type: "food-restaurant"
- Industrias: ["Restaurants", "Cafes"]
- Componentes: [HeroVideo (comida), GridServicios (menu), LeadGen (reserva)]

### CASO 3: SaaS Analytics

**URL exitosa a analizar:**
```
https://www.mixpanel.com/
https://www.amplitude.com/
https://www.segment.com/
```

**Resultado esperado:**
- Blueprint type: "saas-analytics"
- Industrias: ["Analytics", "Data", "Business Intelligence"]
- Componentes: [HeroGradient, BentoBox (features), FAQ técnicas]

### CASO 4: Online Education / Cursos

**URL exitosa a analizar:**
```
https://www.udemy.com/
https://www.coursera.org/
https://www.masterclass.com/
```

**Resultado esperado:**
- Blueprint type: "education-course"
- Industrias: ["Education", "E-learning"]
- Componentes: [HeroV1 (instructor), GridServicios (cursos), Testimonials]

### CASO 5: Legal Services / Abogados

**URL exitosa a analizar:**
```
https://www.amlaw.com/ (ejemplo)
https://lawfirm.example.com/
https://attorney.example.com/
```

**Resultado esperado:**
- Blueprint type: "legal-firm"
- Industrias: ["Legal", "Law", "Consulting"]
- Componentes: [HeroV1 (profesional), GridServicios (servicios), FAQ (legal)]

---

## 🔄 WORKFLOW REPETIBLE

Una vez domines el proceso:

```
1. Abre Claude Code
2. Copia PROMPT 1 (Scrapear)
   - Pasa URL
   - Obtén ScrapedLanding
   
3. Copia PROMPT 2 (Analizar)
   - Pasa ScrapedLanding
   - Obtén DetailedAnalysis
   
4. Copia PROMPT 3 (Generar)
   - Pasa DetailedAnalysis
   - Obtén BlueprintNew
   
5. Copia PROMPT 4 (Validar)
   - Pasa BlueprintNew
   - Valida score >= 80
   
6. Copia PROMPT 5 (Desplegar)
   - Pasa BlueprintNew
   - Blueprint en producción ✅

TIEMPO: 22 minutos
RESULTADO: Nuevo blueprint listo para clientes
```

---

## 💡 TIPS Y BUENAS PRÁCTICAS

### ✅ HACER:

```
✓ Analizar múltiples landing del mismo sector
✓ Tomar lo mejor de cada una
✓ Documentar de dónde viene cada patrón
✓ Validar que el blueprint es diferente de existentes
✓ Crear ejemplos de datos realistas
✓ Guardar URL fuente para futuras referencias
✓ Versionar blueprints (v1.0, v1.1, etc)
```

### ❌ NO HACER:

```
✗ Copiar blueprint existente y cambiar nombre
✗ Crear blueprint sin validación
✗ Usar URL de landing fallida/muerta
✗ Olvidad documentar fuente
✗ No crear ejemplo de datos
✗ Publicar con score < 80
```

---

## 📈 ESCALABILIDAD

Una vez domines el proceso, puedes:

```
Día 1: Crear 3 blueprints nuevos (1 hora)
Día 2: Crear 5 blueprints nuevos (2 horas)
Mes 1: Tener 30+ blueprints documentados

Resultado: Cobertura de 30+ industrias
Capacidad: Servir a prácticamente cualquier sector
```

---

## ✨ EJEMPLO REAL: Crear Blueprint de Ecommerce

### PASO 1: Encontrar landing exitosa

```
Google: "shopify store examples"
Resultado: https://www.fashionnova.com/
```

### PASO 2: Scrapear (PROMPT 1)

```
URL: https://www.fashionnova.com/

Resultado:
- 8 secciones principales
- Hero con video
- Grid de productos
- Testimonials con carrusel
- FAQ
- Newsletter form
- 4 CTAs ("Shop", "Sale", etc)
```

### PASO 3: Analizar (PROMPT 2)

```
Flujo:
Hero (5s) → Products (30s) → Reviews (20s) → CTA (10s) → Purchase

Componentes:
- HeroVideo
- GridServicios (productos)
- Testimonials (carrusel)
- FAQAccordion
- Newsletter form

Colors: Primary #FFD700, Secondary #000000
```

### PASO 4: Generar Blueprint (PROMPT 3)

```
type: "ecommerce-fashion"
name: "eCommerce - Fashion Retail"
industries: ["Fashion", "Apparel", "Retail"]

sections:
1. hero (HeroVideo)
2. featured-products (GridServicios)
3. reviews (Testimonials)
4. newsletter (Newsletter form)
5. faq (FAQAccordion)

designTokens:
- primary: #FFD700
- secondary: #000000
- accent: #FF6B9D
```

### PASO 5: Validar (PROMPT 4)

```
Score: 92/100 ✅
Status: "Ready to publish"
```

### PASO 6: Desplegar (PROMPT 5)

```
Blueprint en producción ✅
Disponible en selector
Documentación creada
Ready para clientes
```

---

**¡AHORA TIENES TODO PARA CREAR BLUEPRINTS ILIMITADOS! 🚀**

Cada nuevo sector = nuevo blueprint = más clientes servidos.

