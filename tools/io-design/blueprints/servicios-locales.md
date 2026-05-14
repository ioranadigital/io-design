# 📋 Blueprint: Servicios Locales

**Para:** Fontanería, reformas, electricidad, limpiezas, cerrajería, etc.

**Objetivo:** Landing optimizada para Google Maps + GMB + Local Pack

---

## 🎯 Estructura de Landing

```
1. Hero(Video)
   ├─ Headline: "Servicios de {serviceType} en {cityName}"
   ├─ Subheadline: "Respuesta en < 1 hora | ⭐ 4.9/5 (120+ reseñas)"
   └─ CTA: "Pedir presupuesto"

2. Services(Grid 3 cols)
   ├─ 🔧 Reparaciones - Rápidas y garantizadas
   ├─ ⚡ Instalaciones - Sistemas modernos
   └─ 🛡️ Garantía - 5 años en trabajos

3. GeoTarget Section
   ├─ Neighborhoods: Centro, Malasaña, Chamberí
   ├─ Google Maps embed
   └─ NAP: Dirección, teléfono, horarios

4. Authority(Reviews + Cases)
   ├─ Logos clientes locales
   ├─ 3-5 testimonios con stars
   └─ 2-3 casos antes/después

5. FAQ(Accordion)
   ├─ ¿Cuál es el precio?
   ├─ ¿Tienen garantía?
   └─ ¿Atienden los domingos?

6. Final CTA
   └─ LeadGen form (Presupuesto)
```

---

## 📊 Entidades Recomendadas

### ProjectConfig
```typescript
{
  brandName: "Mi Fontanería",
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
  neighborhoods: ["Centro", "Malasaña", "Chueca"],
  mapEmbedUrl: "https://maps.google.com/...",
  napData: {
    name: "Mi Fontanería Madrid",
    address: "Calle Principal 123",
    phone: "+34 91 234 5678"
  }
}
```

### ConversionBlock
```typescript
{
  headline: "Reparaciones de fontanería en {cityName}",
  subheadline: "⭐ 4.9/5 (120+ reseñas) | Respuesta en < 1 hora",
  ctaLabel: "Solicitar presupuesto",
  trustSignal: "Presupuesto GRATIS",
  mediaType: "video",
  mediaUrl: "https://videos.example.com/plumber.mp4"
}
```

### AuthorityBlock
```typescript
{
  clientLogos: [
    "/logos/client1.png",
    "/logos/client2.png"
  ],
  reviews: [
    {
      name: "Juan Pérez",
      text: "Excelente servicio, muy rápido",
      stars: 5
    }
  ],
  caseStudies: [
    {
      title: "Casa moderna",
      metric: "✅ Terminado en 2 semanas",
      image: "/cases/case1.jpg"
    }
  ]
}
```

### SemanticStructure
```typescript
{
  h2Services: [
    "Reparaciones de tuberías",
    "Instalaciones sanitarias",
    "Mantenimiento preventivo"
  ],
  faqItems: [
    {
      question: "¿Cuánto cuesta una reparación?",
      answer: "Desde €50 hasta €500 según complejidad..."
    }
  ],
  metaDescription: "Fontanería profesional en Madrid. Respuesta rápida, garantía 5 años.",
  keywords: ["fontanería madrid", "plomería", "tuberías"],
  schema: "LocalBusiness"
}
```

---

## 🎨 Componentes Recomendados

| Sección | Componente | Razón |
|---------|-----------|-------|
| 1. Hero | HeroVideo | Video trabajando en vivo genera confianza |
| 2. Services | GridServicios | Grid 3 cols limpio |
| 3. Authority | AuthorityBlock | Reviews locales + antes/después |
| 4. FAQ | FAQAccordion | Responde objeciones comunes |
| 5. CTA | LeadGen | Captura nombre, teléfono, ubicación |

---

## 📈 SEO + Schema Markup

### Schema: LocalBusiness
```json
{
  "@context": "schema.org",
  "@type": "LocalBusiness",
  "name": "{brandName}",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "{address}",
    "addressLocality": "{cityName}",
    "postalCode": "{postalCode}"
  },
  "telephone": "{phone}",
  "areaServed": {
    "@type": "City",
    "name": "{cityName}"
  },
  "priceRange": "€€"
}
```

### Palabras Clave Típicas
- "{serviceType} en {cityName}"
- "fontanería" / "reparaciones" / "plomería"
- "{service} {neighborhood}"
- "Urgente {service}"

---

## 🔗 Integración Google My Business

- NAP exacto (Name, Address, Phone) → Ranking local
- Categorías: Plumber, Repair Service, etc
- Fotos de trabajos realizados
- Reviews y respuestas

---

**Blueprint v1.0 - Servicios Locales**
