# 📋 Blueprint: SaaS / Tecnología

**Para:** Apps, plataformas, herramientas software, startups

**Objetivo:** Landing optimizada para conversión SaaS + Freemium trials

---

## 🎯 Estructura de Landing

```
1. Hero(Gradient)
   ├─ Headline: "{ProductName} - {Benefit}"
   ├─ Subheadline: "Automatiza {process} en 5 minutos"
   └─ CTA: "Probar gratis"

2. Features(Bento / Grid)
   ├─ Integración
   ├─ API REST
   ├─ Analytics
   └─ Automación

3. Authority(Logos + Testimonios)
   ├─ Logos empresas que usan
   ├─ Testimonios clientes tech
   └─ "500+ startups confían en nosotros"

4. Pricing(Opcional)
   ├─ Free plan
   ├─ Pro plan
   └─ Enterprise

5. FAQ(Technical)
   ├─ ¿Integra con mi stack?
   ├─ ¿Hay API?
   └─ ¿Soporte 24/7?

6. CTA Final
   └─ "Empezar gratis hoy"
```

---

## 📊 Entidades Recomendadas

### ProjectConfig
```typescript
{
  brandName: "MyApp",
  primaryColor: "#00e5ff",
  secondaryColor: "#ff0080",
  fontFamily: "Barlow",
  blueprint: "saas-tecnologico"
}
```

### ConversionBlock
```typescript
{
  headline: "{appName} - Automatiza {benefit}",
  subheadline: "30 días gratis. No se requiere tarjeta.",
  ctaLabel: "Probar gratis",
  trustSignal: "Usado por 500+ startups",
  mediaType: "none"
}
```

### AuthorityBlock
```typescript
{
  clientLogos: [
    "/logos/stripe.svg",
    "/logos/github.svg",
    "/logos/vercel.svg"
  ],
  reviews: [
    {
      name: "Sarah Chen",
      role: "CEO at StartupX",
      text: "Cambió cómo ejecutamos nuestros workflows",
      stars: 5,
      image: "/avatars/sarah.jpg"
    }
  ]
}
```

### SemanticStructure
```typescript
{
  h2Services: [
    "Integración con 100+ herramientas",
    "API REST completa",
    "Webhooks en tiempo real",
    "Dashboard intuitivo"
  ],
  faqItems: [
    {
      question: "¿Integra con mi stack tech?",
      answer: "Soportamos Stripe, Zapier, GitHub, Vercel, y más..."
    }
  ],
  metaDescription: "MyApp - Plataforma de automatización para startups. 30 días gratis.",
  keywords: ["workflow automation", "api platform", "integration"],
  schema: "SoftwareApplication"
}
```

---

## 🎨 Componentes Recomendados

| Sección | Componente |
|---------|-----------|
| 1. Hero | HeroGradient (limpio, moderno) |
| 2. Features | BentoBox o GridServicios |
| 3. Authority | AuthorityBlock (logos + testimonios) |
| 4. FAQ | FAQAccordion (preguntas técnicas) |
| 5. CTA | LeadGen (email + empresa) |

---

## 📈 SEO + Schema Markup

### Schema: SoftwareApplication
```json
{
  "@context": "schema.org",
  "@type": "SoftwareApplication",
  "name": "{appName}",
  "description": "{description}",
  "applicationCategory": "BusinessApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "category": "Free Trial"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "245"
  }
}
```

### Palabras Clave Típicas
- "automation platform"
- "{feature} api"
- "integrate {tool} with {platform}"
- "workflow automation tool"

---

**Blueprint v1.0 - SaaS Tecnológico**
