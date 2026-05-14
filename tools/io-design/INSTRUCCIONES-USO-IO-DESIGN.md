# 📖 INSTRUCCIONES DE USO io-design
## Flujo de Trabajo Completo + Prompts para Claude Code

---

## 🎯 INTRODUCCIÓN

**io-design** es una fábrica automatizada de landing pages que:

1. **Genera componentes** basados en CLAUDE.md (reglas de diseño)
2. **Aplica blueprints** según el sector del cliente
3. **Crea landings** dinámicamente con datos del cliente
4. **Despliega automáticamente** a Vercel con n8n

Este documento te guía paso a paso con prompts listos para copiar en Claude Code.

---

## 📋 TABLA DE CONTENIDOS

1. Arquitectura General
2. Flujo de Trabajo Completo (5 fases)
3. Fase 1: Análisis y Selección de Blueprint
4. Fase 2: Creación de Entidades de Datos
5. Fase 3: Generación de Componentes
6. Fase 4: Aplicación del Blueprint
7. Fase 5: Despliegue y Testing
8. Casos de Uso Completos (3 ejemplos)
9. Troubleshooting

---

## 🏗️ ARQUITECTURA GENERAL

### Flujo de Alto Nivel

```
CLIENTE NUEVO
    ↓
┌─────────────────────────────────────┐
│ FASE 1: ANÁLISIS Y DISCOVERY       │
│ - Recopilar datos del cliente      │
│ - Identificar sector               │
│ - Seleccionar blueprint            │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│ FASE 2: CREAR ENTIDADES DE DATOS   │
│ - ProjectConfig (marca)            │
│ - GeoTarget (ubicación)            │
│ - ConversionBlock (CTA)            │
│ - AuthorityBlock (social proof)    │
│ - SemanticStructure (SEO)          │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│ FASE 3: GENERAR COMPONENTES        │
│ - Adaptar HeroBlock                │
│ - Adaptar Features                 │
│ - Adaptar Forms                    │
│ - Adaptar Sections                 │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│ FASE 4: APLICAR BLUEPRINT          │
│ - Inyectar datos en componentes    │
│ - Generar HTML final               │
│ - Validar schema markup            │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│ FASE 5: DESPLIEGUE Y TESTING       │
│ - Testear en local                 │
│ - Desplegar a Vercel               │
│ - Configurar Google Analytics      │
└─────────────────────────────────────┘
    ↓
LANDING LISTA EN PRODUCCIÓN ✅
```

---

## ⏯️ FASE 1: ANÁLISIS Y SELECCIÓN DE BLUEPRINT

### Objetivo
Recopilar información del cliente e identificar qué blueprint usar.

### Datos a Recopilar

```
1. DATOS BÁSICOS DEL CLIENTE
   ├── Nombre del negocio
   ├── Sector/industria
   ├── Ubicación (ciudad, país)
   ├── Teléfono de contacto
   ├── Email
   └── Website actual (si existe)

2. INFORMACIÓN DEL NEGOCIO
   ├── ¿Qué servicios ofrece?
   ├── ¿Cuál es el principal?
   ├── ¿A quién se dirige? (target audience)
   ├── ¿Cuál es la propuesta de valor?
   └── ¿Cómo quiere el CTA? (Pedir presupuesto, Agendar cita, etc)

3. DATOS DE MARCA
   ├── Colores principales
   ├── Logo (URL o archivo)
   ├── Tipografía preferida
   ├── Tono de comunicación
   └── Ejemplos de competencia

4. DATOS GEOGRÁFICOS
   ├── Ciudad principal
   ├── Barrios de servicio
   ├── ¿Sirven en otras ciudades?
   └── Mapa/coordenadas
```

### PROMPT 1: Recopilar Datos del Cliente

**Copia esto en Claude Code:**

```markdown
# FASE 1: ANÁLISIS Y DISCOVERY - RECOPILAR DATOS DEL CLIENTE

Necesito crear un formulario interactivo en Next.js que recopile información del cliente.

## Requisitos:

### 1. Campos del Formulario:
```
DATOS BÁSICOS
├── Nombre del negocio (text, required)
├── Sector (select: servicios-locales | clinicas-salud | saas-tecnologico)
├── Ciudad principal (text, required)
├── Teléfono (tel, required)
├── Email (email, required)
└── Website actual (url, optional)

INFORMACIÓN DEL NEGOCIO
├── Descripción servicios (textarea)
├── Propuesta de valor (textarea)
├── CTA deseada (select: "Pedir presupuesto" | "Agendar cita" | "Probar gratis" | "Contactar")
├── Target audience (textarea)
└── Ejemplos competencia (url list)

DATOS DE MARCA
├── Color primario (color picker)
├── Color secundario (color picker)
├── Logo URL (text, optional)
├── Tipografía (select: Barlow | Inter)
└── Tono (select: profesional | casual | premium)

DATOS GEOGRÁFICOS
├── Barrios/zonas de servicio (tags input)
├── ¿Múltiples ciudades? (checkbox)
├── Coordenadas Google Maps (text, optional)
└── Información NAP (name, address, phone - auto-filled)
```

### 2. Funcionalidad:

- Validar campos requeridos
- Guardar datos en Supabase tabla `clients`
- Mostrar resumen antes de guardar
- Generar ID único para cliente
- Redirigir a FASE 2 automáticamente

### 3. Stack:
- Next.js 16
- TypeScript
- Tailwind CSS
- Supabase (tabla: clients)
- React Hook Form (validación)

### 4. Ruta:
```
/src/app/onboarding/page.tsx
```

Genera código completo listo para copiar-pegar.
```

---

### PROMPT 2: Identificar Blueprint Automáticamente

**Copia esto en Claude Code después de guardar cliente:**

```markdown
# FASE 1 - PASO 2: IDENTIFICAR BLUEPRINT AUTOMÁTICO

Tengo datos del cliente guardados en Supabase.
Ahora necesito crear una función que AUTOMÁTICAMENTE seleccione el blueprint correcto.

## Datos disponibles:
```typescript
interface Client {
  sector: 'servicios-locales' | 'clinicas-salud' | 'saas-tecnologico';
  services: string;
  cta: string;
  targetAudience: string;
}
```

## Lógica de Selección:

### Si sector = 'servicios-locales'
- Características: Fontanería, reformas, electricidad, limpieza, etc
- CTA típico: "Pedir presupuesto"
- Hero recomendado: HeroVideo (mostrar trabajo)
- Features: GridServicios (mostrar 3-4 servicios)
- Authority: Reviews + Casos locales
- FAQ: Precios, garantía, disponibilidad
- Schema: LocalBusiness

### Si sector = 'clinicas-salud'
- Características: Dentistas, fisio, medicina, nutrición
- CTA típico: "Agendar cita"
- Hero recomendado: HeroV1 (imagen profesional)
- Features: BentoBox (especialidades)
- Authority: Certificaciones + Reviews
- FAQ: Métodos de pago, seguros, preparación
- Schema: MedicalBusiness

### Si sector = 'saas-tecnologico'
- Características: Apps, software, plataformas
- CTA típico: "Probar gratis"
- Hero recomendado: HeroGradient (moderno)
- Features: GridServicios (features principales)
- Authority: Logos empresas clientes
- FAQ: API, integraciones, soporte
- Schema: SoftwareApplication

## Requisitos:

1. Crear función `selectBlueprint(client: Client): Blueprint`
2. Retornar:
```typescript
{
  id: string;
  type: BlueprintType;
  name: string;
  recommendedComponents: string[];
  defaultCTA: string;
  schemaType: string;
}
```

3. Guardar en Supabase tabla `client_blueprints`
4. Mostrar resumen visual del blueprint seleccionado
5. Permitir cambio manual si necesario

Genera código completo con:
- src/lib/selectBlueprint.ts (lógica)
- src/app/blueprint-review/page.tsx (UI para revisión)
```

---

## 📊 FASE 2: CREAR ENTIDADES DE DATOS

### Objetivo
Generar los 5 objetos de datos que necesita la landing.

### Las 5 Entidades

```typescript
1. ProjectConfig (Identidad visual + SEO)
   ├── brandName
   ├── primaryColor
   ├── fontFamily
   ├── gaId
   └── faviconUrl

2. GeoTarget (Ubicación + NAP)
   ├── cityName
   ├── neighborhoods
   ├── napData (Name, Address, Phone)
   └── mapEmbedUrl

3. ConversionBlock (Hero + CTA)
   ├── headline (con {cityName})
   ├── subheadline
   ├── ctaLabel
   ├── trustSignal
   └── mediaUrl

4. AuthorityBlock (Social Proof)
   ├── clientLogos[]
   ├── reviews[]
   ├── caseStudies[]
   └── certifications[]

5. SemanticStructure (SEO + Schema)
   ├── h1
   ├── h2Services[]
   ├── faqItems[]
   ├── metaDescription
   └── schemaData
```

### PROMPT 3: Generar ProjectConfig

**Copia esto en Claude Code:**

```markdown
# FASE 2 - PASO 1: GENERAR ProjectConfig

He recopilado datos del cliente en Supabase:
```
{
  "brandName": "Mi Fontanería",
  "primaryColor": "#2563eb",
  "secondaryColor": "#10b981",
  "fontFamily": "Inter",
  "gaId": "G-XXXXX",
  "faviconUrl": "https://example.com/favicon.ico"
}
```

Necesito:

1. Crear formulario reactivo donde el cliente pueda:
   - Ver preview en tiempo real
   - Cambiar colores (color picker)
   - Ver cómo se verá con esos colores
   - Guardar cambios en Supabase tabla `project_configs`

2. Componente: src/components/ProjectConfigForm.tsx
   - Input: brandName
   - Color picker: primaryColor
   - Color picker: secondaryColor
   - Select: fontFamily (Barlow | Inter | Custom)
   - Input: gaId
   - Input: faviconUrl
   - Preview en vivo (mostrar colores aplicados)
   - Button: "Guardar y continuar"

3. Guardar en:
```typescript
interface ProjectConfig {
  clientId: string;
  brandName: string;
  primaryColor: string;
  secondaryColor?: string;
  accentColor?: string;
  fontFamily: 'Barlow' | 'Inter' | 'Custom';
  faviconUrl?: string;
  logoUrl?: string;
  gaId?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

4. Redireccionar a siguiente paso (GeoTarget)

Genera código completo.
```

---

### PROMPT 4: Generar GeoTarget

**Copia esto en Claude Code:**

```markdown
# FASE 2 - PASO 2: GENERAR GeoTarget

Tengo ProjectConfig guardado.
Ahora necesito recopilar datos de ubicación.

## Datos necesarios:

```typescript
interface GeoTarget {
  clientId: string;
  cityName: string;
  countryCode: string;
  neighborhoods?: string[];
  latitude?: number;
  longitude?: number;
  mapEmbedUrl?: string;
  napData: {
    name: string;
    address: string;
    phone: string;
    email?: string;
    website?: string;
  };
  serviceRadius?: number;
  createdAt: Date;
}
```

## Componente necesario:

1. **src/components/GeoTargetForm.tsx**
   - Input: cityName (autocomplete con Google Places)
   - Select: countryCode
   - Tags input: neighborhoods (sugerir barrios de la ciudad)
   - Input: NAP > name (auto-filled)
   - Input: NAP > address (auto-filled desde Google Places)
   - Input: NAP > phone
   - Input: NAP > email
   - Input: NAP > website
   - Number: serviceRadius (en km)
   - Mapa visual (Google Maps embed auto-generado)

2. **Funcionalidad:**
   - Integración con Google Places API
   - Auto-complete de ciudades
   - Sugerir barrios basado en ciudad seleccionada
   - Obtener coordenadas automáticas
   - Generar Google Maps embed URL automáticamente
   - Preview de mapa en tiempo real

3. **Validación:**
   - cityName required
   - napData.phone required
   - Al menos 1 neighborhood si es servicios-locales

4. **Guardar en:** Supabase tabla `geo_targets`

5. **Redireccionar a:** ConversionBlock

Genera código completo con integración Google Places API.
```

---

### PROMPT 5: Generar ConversionBlock

**Copia esto en Claude Code:**

```markdown
# FASE 2 - PASO 3: GENERAR ConversionBlock

Tengo GeoTarget guardado.
Ahora necesito crear la sección Hero con CTA.

## Datos necesarios:

```typescript
interface ConversionBlock {
  clientId: string;
  headline: string; // Puede contener {cityName}, {serviceType}
  subheadline?: string;
  ctaLabel: string; // Ya sugiero based on blueprint
  ctaLink?: string;
  trustSignal?: string; // Ej: "Respuesta en < 24h"
  mediaType?: 'image' | 'video' | 'gradient';
  mediaUrl?: string;
  variant?: 'default' | 'alt1' | 'alt2';
  createdAt: Date;
}
```

## Componente necesario:

1. **src/components/ConversionBlockForm.tsx**
   - Textarea: headline (con variable suggester {cityName})
   - Textarea: subheadline
   - Input: ctaLabel (pre-filled based on blueprint)
   - Input: ctaLink (opcional)
   - Input: trustSignal (hint: "Ej: Respuesta en < 24h")
   - Select: mediaType (image | video | gradient)
   - Input: mediaUrl (conditionally shown)
   - Select: variant (default | alt1 | alt2)
   - Preview en vivo mostrando el hero

2. **Funcionalidad:**
   - Auto-sugerir headlines basado en:
     * Blueprint (servicios-locales, clinicas-salud, saas-tecnologico)
     * Sector del cliente
     * Ubicación (cityName)
   - Variables dinámicas sugeridas:
     * {cityName} - Será reemplazado automáticamente
     * {serviceType} - Del cliente
   - Preview en vivo del hero
   - Cambiar variant en tiempo real

3. **Ejemplos de Headlines:**
   
   **Si servicios-locales en Madrid:**
   - "Servicios de fontanería en Madrid"
   - "Reparaciones rápidas en {cityName}"
   - "{serviceType} profesional en {cityName}"
   
   **Si clinicas-salud en Barcelona:**
   - "Tu dentista de confianza en Barcelona"
   - "Clínica de {specialty} en {cityName}"
   
   **Si SaaS:**
   - "Automatiza {benefit} con {appName}"
   - "{appName} - La solución para {problem}"

4. **Guardar en:** Supabase tabla `conversion_blocks`

5. **Redireccionar a:** AuthorityBlock

Genera código completo con sugerencias dinámicas.
```

---

### PROMPT 6: Generar AuthorityBlock

**Copia esto en Claude Code:**

```markdown
# FASE 2 - PASO 4: GENERAR AuthorityBlock

Tengo ConversionBlock guardado.
Ahora necesito recopilar "social proof" del cliente.

## Datos necesarios:

```typescript
interface AuthorityBlock {
  clientId: string;
  clientLogos?: string[]; // URLs de clientes/empresas
  reviews?: {
    name: string;
    text: string;
    stars: 1 | 2 | 3 | 4 | 5;
    image?: string;
  }[];
  caseStudies?: {
    title: string;
    client: string;
    metricBefore: string;
    metricAfter: string;
    improvement: number; // %
    image?: string;
  }[];
  certifications?: {
    name: string;
    image?: string;
  }[];
  createdAt: Date;
}
```

## Componente necesario:

1. **src/components/AuthorityBlockForm.tsx**
   - Sección: Client Logos
     * URL inputs con drag-drop
     * Preview de logos en grid
     * Max 8 logos
   
   - Sección: Reviews
     * Dynamic form para añadir reviews:
       - Input: name
       - Textarea: text
       - Star rating picker (1-5)
       - Input: image URL (opcional)
       - Button: "+ Añadir review"
     * Max 6 reviews
     * Preview en grid tipo carrusel
   
   - Sección: Case Studies
     * Dynamic form:
       - Input: title
       - Input: client
       - Input: metric before (ej: "100 visitas/mes")
       - Input: metric after (ej: "5000 visitas/mes")
       - Auto-calcular improvement %
       - Input: image URL (opcional)
       - Button: "+ Añadir case study"
     * Max 3 case studies
   
   - Sección: Certifications
     * Dynamic form:
       - Input: name (ej: "Google Premier Partner")
       - Input: image URL (badge)
       - Button: "+ Añadir certificación"
     * Max 5 certificaciones

2. **Funcionalidad:**
   - Drag-drop para reordenar
   - Preview en vivo
   - Validar URLs (que sean válidas)
   - Eliminar items individuales
   - Sugerir valores basado en blueprint

3. **Sugerencias por Blueprint:**
   
   **servicios-locales:**
   - Sugerir: Reviews tipo Google, Casos locales
   
   **clinicas-salud:**
   - Sugerir: Certificaciones médicas prominentes
   
   **saas-tecnologico:**
   - Sugerir: Logos de empresas clientes

4. **Guardar en:** Supabase tabla `authority_blocks`

5. **Redireccionar a:** SemanticStructure

Genera código completo.
```

---

### PROMPT 7: Generar SemanticStructure

**Copia esto en Claude Code:**

```markdown
# FASE 2 - PASO 5: GENERAR SemanticStructure

Tengo AuthorityBlock guardado.
Ahora necesito crear estructura semántica (SEO + Schema).

## Datos necesarios:

```typescript
interface SemanticStructure {
  clientId: string;
  h1: string; // H1 principal
  h2Services?: {
    title: string;
    description: string;
  }[];
  faqItems?: {
    question: string;
    answer: string;
  }[];
  metaDescription: string;
  keywords?: string[];
  schemaType: 'LocalBusiness' | 'MedicalBusiness' | 'SoftwareApplication';
  schemaData?: Record<string, any>;
  createdAt: Date;
}
```

## Componente necesario:

1. **src/components/SemanticStructureForm.tsx**
   - Input: H1 (pre-filled con ConversionBlock.headline)
   - Textarea: metaDescription (max 160 chars, contador)
   - Tags input: keywords (auto-sugerir basado en sector)
   
   - Sección: H2 Services
     * Dynamic form:
       - Input: title
       - Textarea: description
       - Button: "+ Añadir servicio"
     * Max 6 servicios
   
   - Sección: FAQ Items
     * Dynamic form:
       - Input: question
       - Textarea: answer
       - Button: "+ Añadir pregunta"
     * Sugerir FAQs basado en blueprint
     * Max 8 FAQs
   
   - Display: schemaType (read-only, basado en blueprint)
   - JSON preview: schemaData auto-generado

2. **Funcionalidad:**
   - Auto-generar keywords basado en:
     * Sector del cliente
     * Ciudad (GeoTarget)
     * Servicios (AuthorityBlock)
   - Validar metaDescription (max 160 chars)
   - Preview en tiempo real del schema JSON
   - Generar schema automático based on blueprint

3. **FAQ Sugerencias:**
   
   **servicios-locales:**
   - "¿Cuál es el costo de vuestros servicios?"
   - "¿Ofrecen garantía en los trabajos?"
   - "¿Están disponibles en fines de semana?"
   - "¿Hacen presupuestos sin compromiso?"
   
   **clinicas-salud:**
   - "¿Qué seguros aceptan?"
   - "¿Es necesario agendar cita con anticipación?"
   - "¿Cuáles son los horarios de atención?"
   - "¿Ofrecen tratamientos de emergencia?"
   
   **saas-tecnologico:**
   - "¿Tienen período de prueba gratuito?"
   - "¿Qué métodos de pago aceptan?"
   - "¿Cómo es el onboarding?"
   - "¿Cuentan con soporte técnico 24/7?"

4. **Schema Auto-generado:**
   
   ```typescript
   // Para servicios-locales
   {
     "@context": "schema.org",
     "@type": "LocalBusiness",
     "name": projectConfig.brandName,
     "address": geoTarget.napData.address,
     "telephone": geoTarget.napData.phone,
     "areaServed": {
       "@type": "City",
       "name": geoTarget.cityName
     }
   }
   ```

5. **Guardar en:** Supabase tabla `semantic_structures`

6. **Redireccionar a:** FASE 3 (generación componentes)

Genera código completo con auto-generación inteligente.
```

---

## 🎨 FASE 3: GENERAR COMPONENTES

### Objetivo
Adaptar y generar los componentes específicos según blueprint.

### PROMPT 8: Generar Hero Component

**Copia esto en Claude Code:**

```markdown
# FASE 3 - PASO 1: GENERAR HERO COMPONENT

Tengo todas las entidades de datos de FASE 2.
Ahora necesito generar el componente Hero específico.

## Datos disponibles:

```typescript
{
  blueprint: 'servicios-locales' | 'clinicas-salud' | 'saas-tecnologico',
  conversionBlock: ConversionBlock,
  projectConfig: ProjectConfig,
  geoTarget: GeoTarget
}
```

## Requisitos:

1. **Crear componente dinámico:** src/components/HeroBlock.tsx
   - Recibir blueprint como prop
   - Renderizar hero diferente según blueprint
   - Inyectar variables dinámicas

2. **Variantes del Hero:**
   
   **servicios-locales → HeroVideo**
   ```jsx
   <HeroVideo
     videoUrl={conversionBlock.mediaUrl}
     headline={conversionBlock.headline}
     subheadline={conversionBlock.subheadline}
     ctaLabel={conversionBlock.ctaLabel}
     overlayOpacity="0.5"
   />
   ```
   
   **clinicas-salud → HeroV1**
   ```jsx
   <HeroV1
     imageUrl={conversionBlock.mediaUrl}
     headline={conversionBlock.headline}
     ctaLabel={conversionBlock.ctaLabel}
     variant="imageRight"
   />
   ```
   
   **saas-tecnologico → HeroGradient**
   ```jsx
   <HeroGradient
     headline={conversionBlock.headline}
     ctaLabel={conversionBlock.ctaLabel}
     gradient="vibrante"
     accentColor={projectConfig.primaryColor}
   />
   ```

3. **Inyectar variables dinámicamente:**
   - {cityName} → geoTarget.cityName
   - {serviceType} → del cliente data
   - {appName} → projectConfig.brandName

4. **Aplicar estilos de ProjectConfig:**
   - primaryColor
   - secondaryColor
   - fontFamily
   - Tailwind CSS

5. **Guardar componente renderizado en:** Supabase tabla `generated_heros`

Genera componente HeroBlock.tsx que decida automáticamente qué hero usar.
```

---

### PROMPT 9: Generar Features Component

**Copia esto en Claude Code:**

```markdown
# FASE 3 - PASO 2: GENERAR FEATURES COMPONENT

Tengo Hero generado.
Ahora necesito generar Features section.

## Datos disponibles:

```typescript
{
  blueprint: BlueprintType,
  semanticStructure: SemanticStructure,
  projectConfig: ProjectConfig
}
```

## Requisitos:

1. **Crear componente dinámico:** src/components/FeaturesBlock.tsx
   - Recibir blueprint como prop
   - Renderizar features diferente según blueprint

2. **Variantes:**
   
   **servicios-locales → GridServicios**
   ```jsx
   <GridServicios
     title="Nuestros Servicios"
     services={semanticStructure.h2Services.map(s => ({
       icon: getIconForService(s.title),
       title: s.title,
       description: s.description
     }))}
     columns={3}
   />
   ```
   
   **clinicas-salud → BentoBox**
   ```jsx
   <BentoBox
     title="Especialidades"
     items={semanticStructure.h2Services.map((s, i) => ({
       title: s.title,
       description: s.description,
       size: i === 0 ? 'large' : 'small'
     }))}
   />
   ```
   
   **saas-tecnologico → GridServicios**
   ```jsx
   <GridServicios
     title="Features Principales"
     services={semanticStructure.h2Services.map(s => ({
       icon: getIconForFeature(s.title),
       title: s.title,
       description: s.description
     }))}
     columns={3}
   />
   ```

3. **Funcionalidad:**
   - Auto-sugerir iconos basado en título
   - Aplicar colores de projectConfig
   - Responsive grid
   - Animaciones en hover

4. **Guardar en:** Supabase tabla `generated_features`

Genera componente FeaturesBlock.tsx.
```

---

### PROMPT 10: Generar Forms Component

**Copia esto en Claude Code:**

```markdown
# FASE 3 - PASO 3: GENERAR FORMS COMPONENT

Tengo Features generado.
Ahora necesito generar Form de conversión.

## Datos disponibles:

```typescript
{
  blueprint: BlueprintType,
  conversionBlock: ConversionBlock,
  projectConfig: ProjectConfig,
  geoTarget: GeoTarget
}
```

## Requisitos:

1. **Crear componente dinámico:** src/components/FormBlock.tsx
   - Recibir blueprint como prop
   - Mostrar formulario adaptado al CTA

2. **Variantes:**
   
   **servicios-locales + "Pedir presupuesto" → LeadGen**
   ```jsx
   <LeadGen
     headline="Solicita tu presupuesto"
     fields={['nombre', 'email', 'telefono', 'descripcion']}
     ctaLabel="Pedir presupuesto"
     onSubmit={handleSubmit}
   />
   ```
   
   **clinicas-salud + "Agendar cita" → AppointmentForm**
   ```jsx
   <AppointmentForm
     headline="Agenda tu cita"
     fields={['nombre', 'email', 'telefono', 'servicio', 'fecha']}
     ctaLabel="Agendar"
     integrations={['google-calendar', 'calendly']}
     onSubmit={handleSubmit}
   />
   ```
   
   **saas-tecnologico + "Probar gratis" → NewsletterForm**
   ```jsx
   <NewsletterForm
     headline="Comienza tu prueba gratuita"
     fields={['email', 'compañia']
     ctaLabel="Probar gratis"
     subText="30 días sin tarjeta de crédito"
     onSubmit={handleSubmit}
   />
   ```

3. **Funcionalidad:**
   - Validación de campos
   - Honeypot (anti-spam)
   - Guardar leads en Supabase tabla `leads`
   - Email de confirmación al cliente
   - Notificar al dueño del negocio

4. **Campos dinámicos según blueprint:**
   
   **servicios-locales:**
   - Nombre, Teléfono, Email, Descripción del problema
   
   **clinicas-salud:**
   - Nombre, Email, Teléfono, Servicio (select), Fecha preferida
   
   **saas-tecnologico:**
   - Email, Compañía, Plan (select)

5. **Guardar en:** Supabase tabla `generated_forms`

Genera componente FormBlock.tsx.
```

---

### PROMPT 11: Generar Sections Component

**Copia esto en Claude Code:**

```markdown
# FASE 3 - PASO 4: GENERAR SECTIONS COMPONENT

Tengo Form generado.
Ahora necesito generar secciones: Authority, FAQ, Testimonials.

## Datos disponibles:

```typescript
{
  authorityBlock: AuthorityBlock,
  semanticStructure: SemanticStructure,
  projectConfig: ProjectConfig
}
```

## Requisitos:

1. **Crear 3 componentes dinámicos:**

   **src/components/AuthoritySection.tsx**
   ```jsx
   <AuthorityBlock
     clientLogos={authorityBlock.clientLogos}
     reviews={authorityBlock.reviews}
     caseStudies={authorityBlock.caseStudies}
     certifications={authorityBlock.certifications}
   />
   ```
   
   **src/components/FAQSection.tsx**
   ```jsx
   <FAQAccordion
     items={semanticStructure.faqItems}
     schema="FAQPage"
   />
   ```
   
   **src/components/TestimonialsSection.tsx**
   ```jsx
   <Testimonials
     testimonials={authorityBlock.reviews}
     autoplay={true}
   />
   ```

2. **Funcionalidad:**
   - Logos: Grid responsive
   - Reviews: Carrusel con rating
   - Case Studies: Cards con métricas
   - Certifications: Badges
   - FAQ: Accordion expandible
   - Testimonials: Carrusel con navegación

3. **Schema Markup:**
   - FAQPage schema en FAQ
   - Review schema en testimonios
   - AggregateRating si hay rating promedio

4. **Aplicar estilos:**
   - Colors de ProjectConfig
   - Responsive design
   - Animaciones smooth

5. **Guardar en:** Supabase tabla `generated_sections`

Genera 3 componentes.
```

---

## 🔗 FASE 4: APLICAR BLUEPRINT

### Objetivo
Combinar todos los componentes en una landing completa según blueprint.

### PROMPT 12: Generar Landing HTML Final

**Copia esto en Claude Code:**

```markdown
# FASE 4: APLICAR BLUEPRINT Y GENERAR LANDING HTML FINAL

Tengo todos los componentes generados en FASE 3.
Ahora necesito combinarlos en una landing HTML completa.

## Datos disponibles:

```typescript
{
  clientId: string,
  projectConfig: ProjectConfig,
  geoTarget: GeoTarget,
  conversionBlock: ConversionBlock,
  authorityBlock: AuthorityBlock,
  semanticStructure: SemanticStructure,
  blueprint: Blueprint,
  components: {
    hero: string, // HTML
    features: string, // HTML
    form: string, // HTML
    authority: string, // HTML
    faq: string, // HTML
  }
}
```

## Requisitos:

1. **Crear función:** src/lib/generateLandingHTML.ts

2. **Estructura HTML por blueprint:**
   
   **servicios-locales:**
   ```
   ├── Header (sticky nav)
   ├── Hero (HeroVideo)
   ├── GeoSection (mapa + barrios)
   ├── Services (GridServicios)
   ├── AuthorityBlock (reviews + casos)
   ├── FAQ (preguntas frecuentes)
   ├── Form (presupuesto)
   ├── CTA Final
   └── Footer
   ```
   
   **clinicas-salud:**
   ```
   ├── Header
   ├── Hero (HeroV1)
   ├── Specialties (BentoBox)
   ├── AuthorityBlock (certificaciones + reviews)
   ├── FAQ (consultas)
   ├── AppointmentForm
   ├── Testimonials
   ├── CTA Final
   └── Footer
   ```
   
   **saas-tecnologico:**
   ```
   ├── Header
   ├── Hero (HeroGradient)
   ├── Features (GridServicios)
   ├── Pricing (si aplica)
   ├── AuthorityBlock (logos clientes)
   ├── FAQ (técnicas)
   ├── TrialForm
   ├── CTA Final
   └── Footer
   ```

3. **Inyectar:**
   - Colores de projectConfig
   - Variables dinámicas ({cityName}, etc)
   - Google Analytics ID
   - Schema Markup JSON-LD
   - Favicon
   - OG meta tags

4. **Incluir:**
   - Tailwind CSS inline
   - Google Fonts
   - Responsive meta viewport
   - Charset UTF-8

5. **Optimizaciones:**
   - Minify CSS
   - Minify JS (si hay)
   - Lazy loading en imágenes
   - Alt text en imágenes
   - Semantic HTML

6. **Guardar en:**
   - Supabase tabla `generated_landings`
   - Campo: html (texto completo)
   - Campo: clientId
   - Campo: blueprintId
   - Campo: generatedAt

Genera función que retorne HTML completo listo para desplegar.
```

---

### PROMPT 13: Validar Landing

**Copia esto en Claude Code:**

```markdown
# FASE 4 - PASO 2: VALIDAR LANDING ANTES DE DESPLEGAR

Tengo HTML generado.
Necesito validaciones antes de poner en producción.

## Validaciones a ejecutar:

1. **HTML Validation:**
   - Validar con W3C HTML Validator
   - No debe haber errores críticos
   - Warnings son aceptables

2. **SEO Validation:**
   - ✓ Title tag presente (max 60 chars)
   - ✓ Meta description presente (120-160 chars)
   - ✓ H1 única
   - ✓ H2s presentes y en orden
   - ✓ Keywords mentions > 2
   - ✓ Alt text en imágenes
   - ✓ Internal links (si aplica)

3. **Mobile Responsive:**
   - Testeado en 375px (mobile)
   - Testeado en 768px (tablet)
   - Testeado en 1440px (desktop)
   - No hay horizontal scroll

4. **Accessibility (WCAG 2.1):**
   - ✓ Contrast ratio >= 4.5:1
   - ✓ Focus visible en inputs
   - ✓ Buttons son accesibles (size >= 44x44px)
   - ✓ Formulario tiene labels
   - ✓ Color no es único indicador

5. **Performance:**
   - Page Load Time < 3s
   - Lighthouse Score > 80
   - First Contentful Paint < 1.5s
   - Cumulative Layout Shift < 0.1

6. **Schema Markup:**
   - Validar JSON-LD con schema.org
   - No debe haber errores de schema
   - Según blueprint (LocalBusiness, MedicalBusiness, SoftwareApplication)

## Crear función: src/lib/validateLanding.ts

Retornar:
```typescript
{
  isValid: boolean,
  errors: {
    html?: string[],
    seo?: string[],
    responsive?: string[],
    accessibility?: string[],
    performance?: string[],
    schema?: string[],
  },
  warnings: string[],
  report: {
    htmlScore: number,
    seoScore: number,
    accessibilityScore: number,
    performanceScore: number,
    overallScore: number,
  }
}
```

## Interfaz para mostrar validación:

1. **src/app/validate/page.tsx**
   - Mostrar scores (0-100)
   - Listar errores por categoría
   - Listar warnings
   - Botón: "Reparar automáticamente" (si aplica)
   - Botón: "Proceder a despliegue"

Genera función de validación completa.
```

---

## 🚀 FASE 5: DESPLIEGUE Y TESTING

### PROMPT 14: Configurar Despliegue Automático

**Copia esto en Claude Code:**

```markdown
# FASE 5 - PASO 1: CONFIGURAR DESPLIEGUE A VERCEL

Landing validada.
Ahora necesito desplegar automáticamente a Vercel.

## Requisitos:

1. **Integración Vercel:**
   - Conectar API token de Vercel
   - Crear proyecto automático en Vercel
   - Configurar dominio (si el cliente tiene)
   - Configurar SSL automático

2. **Crear función:** src/lib/deployToVercel.ts

```typescript
interface DeployConfig {
  landingId: string,
  clientId: string,
  brandName: string,
  html: string,
  customDomain?: string,
}

function deployToVercel(config: DeployConfig): Promise<{
  url: string,
  status: 'deployed' | 'failed',
  error?: string,
  deploymentId: string,
  timestamp: Date,
}>
```

3. **Pasos:**
   - Crear proyecto en Vercel: `io-design-[clientId]`
   - Crear archivo `index.html` con contenido
   - Commit a repositorio temporal
   - Push a Vercel
   - Retornar URL pública

4. **Configuraciones en Vercel:**
   - Environment variables:
     * VITE_GA_ID (Google Analytics)
     * VITE_API_URL (API endpoint)
   - Build command: none (es HTML estático)
   - Output: ./

5. **Guardar en Supabase tabla `deployments`:**
   - clientId
   - landingUrl
   - deploymentId
   - status
   - deployedAt

6. **Notificar cliente:**
   - Email con URL de su landing
   - Incluir credenciales acceso (si hay admin panel)

Genera función deployToVercel.
```

---

### PROMPT 15: Configurar Google Analytics

**Copia esto en Claude Code:**

```markdown
# FASE 5 - PASO 2: CONFIGURAR GOOGLE ANALYTICS

Landing desplegada en Vercel.
Ahora configurar Google Analytics para tracking.

## Requisitos:

1. **Si el cliente ya tiene GA ID:**
   - Usar el que proporcionó
   - Validar formato: G-XXXXXXXXXX

2. **Si no tiene:**
   - Crear cuenta GA4 automáticamente (si tenemos credenciales)
   - Generar GA ID
   - Guardar en projectConfig

3. **Configurar en landing:**
   - Insertar script de GA en <head>
   - Tracking: pageviews
   - Tracking: conversiones (form submission)
   - Tracking: CTA clicks

4. **Setup en Google Analytics:**
   - Crear conversión: "Lead Generated"
   - Crear conversión: "CTA Clicked"
   - Crear evento: "Form Submitted"
   - Crear audiencia: "Landing Visitors"

5. **Crear función:** src/lib/setupGoogleAnalytics.ts

```typescript
function setupGoogleAnalytics(config: {
  gaId?: string,
  clientId: string,
  landingUrl: string,
  ctas: string[],
  formId: string,
}): Promise<{
  gaId: string,
  conversionSetup: boolean,
  trackingScript: string,
}>
```

6. **Guardar en Supabase:**
   - projectConfig.gaId
   - analytics_config tabla

Genera función setupGoogleAnalytics.
```

---

### PROMPT 16: Testing y QA

**Copia esto en Claude Code:**

```markdown
# FASE 5 - PASO 3: TESTING Y QA CHECKLIST

Landing en producción con Analytics.
Ahora ejecutar QA completo.

## Checklist de Testing:

### 1. Funcionalidad
```
[ ] Landing carga sin errores (F12 → Console)
[ ] Todos los links funcionan
[ ] Formulario se envía correctamente
[ ] Datos del formulario llegan a Supabase
[ ] Email de confirmación se envía
[ ] Notificación a dueño del negocio funciona
```

### 2. Mobile
```
[ ] Responsive en 375px
[ ] Responsive en 768px
[ ] Responsive en 1440px
[ ] Touch targets >= 44px
[ ] No hay horizontal scroll
[ ] Formulario funciona en mobile
```

### 3. SEO
```
[ ] Title correcto en pestaña
[ ] Meta description visible en Google
[ ] H1 es único
[ ] H2s presentes
[ ] Imagen con alt text
[ ] Structured data validado (schema.org)
[ ] Sitemap creado (si multi-página)
```

### 4. Performance
```
[ ] Page Load < 3s
[ ] Lighthouse > 80
[ ] Imágenes optimizadas
[ ] CSS minified
[ ] No hay console errors
```

### 5. Analytics
```
[ ] Google Analytics recibe pageviews
[ ] Conversión "Lead Generated" se registra
[ ] Evento "Form Submitted" se captura
[ ] CTA tracking funciona
```

### 6. Security
```
[ ] Honeypot en formulario
[ ] CSRF protection
[ ] Validación server-side de formulario
[ ] No hay datos sensibles en URLs
[ ] SSL/HTTPS funciona
```

## Crear componente: src/components/QAChecklist.tsx

Mostrar checklist interactivo con:
- Cada item con checkbox
- Estado: ✓ Passed / ✗ Failed / ⏳ Pending
- Botón: "Generar reporte QA"
- Botón: "Marcar como completado"

Genera componente QAChecklist.tsx.
```

---

## 📚 CASOS DE USO COMPLETOS

### CASO 1: Fontanería en Madrid

**PROMPT EJECUTABLE COMPLETO:**

```markdown
# CASO DE USO COMPLETO: Fontanería en Madrid

## Paso 1: Crear Cliente

Ejecuta FASE 1 PROMPT 1:
```
Necesito registrar un nuevo cliente:
- Nombre: "Madrid Fontanería"
- Sector: servicios-locales
- Ciudad: Madrid
- Teléfono: +34 912 345 678
- Email: info@madridfontaneria.com
- Servicios: Reparaciones, instalaciones, mantenimiento
- CTA: "Pedir presupuesto"
- Barrios: Chamberí, Retiro, Pozuelo
```

## Paso 2: Generar Entidades

Ejecuta FASE 2 PROMPTS 3-7:

1. ProjectConfig:
   - Color: #2563eb (azul)
   - Font: Inter
   - Logo: [URL del logo]

2. GeoTarget:
   - Ubicación: Madrid
   - Barrios: Chamberí, Retiro, Pozuelo
   - Teléfono: +34 912 345 678
   - Dirección: Calle Principal 123, Madrid

3. ConversionBlock:
   - Headline: "Servicios de fontanería en Madrid"
   - CTA: "Pedir presupuesto"
   - Trust: "Respuesta en < 1 hora"
   - Media: Video URL

4. AuthorityBlock:
   - Reviews: 3 reviews de Google
   - Cases: 2 casos de éxito
   - Cert: "Instalador autorizado"

5. SemanticStructure:
   - H1: "Servicios de fontanería en Madrid"
   - H2s: Reparaciones, Instalaciones, Mantenimiento
   - FAQs: 6 preguntas típicas

## Paso 3: Generar Componentes

Ejecuta FASE 3 PROMPTS 8-11:
- Hero (HeroVideo)
- Features (GridServicios)
- Form (LeadGen)
- Sections (Authority, FAQ)

## Paso 4: Aplicar Blueprint

Ejecuta FASE 4 PROMPTS 12-13:
- Combinar componentes
- Validar landing
- Chequear score > 80

## Paso 5: Despliegue

Ejecuta FASE 5 PROMPTS 14-16:
- Deploy a Vercel
- Setup GA4
- QA completo

## RESULTADO:
Landing en: https://io-design-[clientId].vercel.app
Cliente recibe email con acceso
```

---

### CASO 2: Dentista en Barcelona

**PROMPT EJECUTABLE SIMPLIFICADO:**

```markdown
# CASO DE USO: Dentista en Barcelona

Cliente: "Clínica Dental Sonrisas"
Sector: clinicas-salud
CTA: "Agendar cita"

EJECUTAR SECUENCIA:
1. FASE 1: Discovery (sector detectado automáticamente)
2. FASE 2: Crear entidades (especialidades: Ortodoncia, Implantes, Periodoncia)
3. FASE 3: Generar Hero (HeroV1 + imagen profesional)
4. FASE 3: Generar Features (BentoBox + especialidades)
5. FASE 3: Generar Form (AppointmentForm integrado con Calendly)
6. FASE 3: Generar Sections (Certificaciones médicas prominentes)
7. FASE 4: Validar (schema MedicalBusiness)
8. FASE 5: Deploy + Analytics

Todos los prompts se adaptan automáticamente al sector.
```

---

### CASO 3: SaaS App

**PROMPT EJECUTABLE:**

```markdown
# CASO DE USO: SaaS App

Cliente: "TaskFlow - App de productividad"
Sector: saas-tecnologico
CTA: "Probar gratis"

EJECUTAR SECUENCIA:
1. FASE 1: Discovery (sector SaaS automático)
2. FASE 2: Crear entidades (features: Colaboración, Automatización, Analítica)
3. FASE 3: Generar Hero (HeroGradient + moderno)
4. FASE 3: Generar Features (GridServicios de features)
5. FASE 3: Generar Form (Trial Form: email + compañía)
6. FASE 3: Generar Sections (Logos clientes: Uber, Netflix, etc)
7. FASE 4: Validar (schema SoftwareApplication)
8. FASE 5: Deploy + Setup pricing page (si aplica)

Prompts automatizados para SaaS.
```

---

## 🔧 TROUBLESHOOTING

### PROMPT 17: Reparar Landing Fallida

**Si la landing no se carga o falla:**

```markdown
# TROUBLESHOOTING: Landing Fallida

Tengo un cliente con landing que no funciona.

Problemas reportados:
1. ¿Landing no carga? (timeout, 404, error)
2. ¿Formulario no envía datos?
3. ¿Imágenes no cargan?
4. ¿Mobile responsive broken?
5. ¿Analytics no registra?

## Diagnóstico automático:

Ejecutar función: src/lib/diagnoseIssues.ts

```typescript
function diagnoseIssues(landingId: string): Promise<{
  issues: Issue[],
  recommendations: string[],
  autoFixApplied: boolean,
  newLandingHtml?: string,
}>
```

## Pasos para reparar:

1. **Landing no carga:**
   - Verificar HTML syntax (validar con W3C)
   - Verificar Vercel deployment status
   - Revisar error logs en Vercel

2. **Formulario no envía:**
   - Verificar endpoint API
   - Verificar Supabase conexión
   - Verificar CORS headers

3. **Imágenes no cargan:**
   - Verificar URLs (deben ser https)
   - Verificar permisos de imagen
   - Reemplazar con placeholder si falla

4. **Mobile responsive:**
   - Regenerar con media queries correctas
   - Testeado en Chrome DevTools
   - Aplicar CSS fixes

5. **Analytics:**
   - Verificar GA ID en HTML
   - Verificar script de GA4 presente
   - Verificar no hay blockers (uBlock, etc)

Genera función diagnoseIssues que repare automáticamente.
```

---

## 📊 RESUMEN DE PROMPTS

### Lista de Prompts por Fase:

**FASE 1 (Análisis):**
- PROMPT 1: Recopilar datos cliente
- PROMPT 2: Identificar blueprint automático

**FASE 2 (Entidades):**
- PROMPT 3: Generar ProjectConfig
- PROMPT 4: Generar GeoTarget
- PROMPT 5: Generar ConversionBlock
- PROMPT 6: Generar AuthorityBlock
- PROMPT 7: Generar SemanticStructure

**FASE 3 (Componentes):**
- PROMPT 8: Generar Hero
- PROMPT 9: Generar Features
- PROMPT 10: Generar Forms
- PROMPT 11: Generar Sections

**FASE 4 (Aplicar Blueprint):**
- PROMPT 12: Generar Landing HTML Final
- PROMPT 13: Validar Landing

**FASE 5 (Despliegue):**
- PROMPT 14: Deploy a Vercel
- PROMPT 15: Setup Google Analytics
- PROMPT 16: Testing y QA

**Extra:**
- PROMPT 17: Troubleshooting

---

## 🎯 FLUJO RÁPIDO (Versión simplificada)

Si quieres ir rápido, ejecuta así:

```
1. Copiar PROMPT 1 → Recopilar datos
2. Copiar PROMPT 2 → Blueprint automático
3. Copiar PROMPTS 3-7 → Generar entidades (tab a tab)
4. Copiar PROMPTS 8-11 → Generar componentes (parallel)
5. Copiar PROMPT 12 → Landing final
6. Copiar PROMPT 13 → Validar
7. Copiar PROMPT 14 → Deploy
8. Copiar PROMPT 16 → QA

TIEMPO TOTAL: ~2-3 horas para experto
TIEMPO TOTAL: ~4-5 horas para principiante
```

---

## ✅ CHECKLIST FINAL

```
[ ] Cliente registrado en Supabase
[ ] Blueprint seleccionado
[ ] 5 entidades creadas
[ ] 4 componentes generados
[ ] HTML validado (score > 80)
[ ] Landing deployada en Vercel
[ ] Google Analytics configurado
[ ] QA completado
[ ] Cliente notificado con URL
[ ] Landing en producción ✅
```

---

**Este es el workflow completo. Copia los prompts paso a paso en Claude Code.** 🚀

