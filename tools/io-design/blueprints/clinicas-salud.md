# 📋 Blueprint: Clínicas y Salud

**Para:** Dentistas, fisioterapeutas, médicos, veterinarios, clínicas

**Objetivo:** Landing optimizada para Health knowledge panels + Local rankings

---

## 🎯 Estructura de Landing

```
1. Hero(Imagen Pro)
   ├─ Headline: "Tu {specialty} confiable en {cityName}"
   ├─ Subheadline: "Especialistas certificados | Cita misma semana"
   └─ CTA: "Agendar cita"

2. Specialties(Bento)
   ├─ 🦷 Implantes
   ├─ 😁 Estética
   └─ 🧼 Limpieza dental

3. Authority(Certs + Reviews)
   ├─ Certificaciones profesionales
   ├─ Testimonios pacientes con fotos
   └─ Colegio profesional

4. FAQ(Medical)
   ├─ ¿Duele el tratamiento?
   ├─ ¿Cuánto cuesta?
   └─ ¿Aceptan mi seguros?

5. Appointment
   └─ LeadGen → Google Calendar sync

6. Contact
   └─ Direcciones, horarios, teléfono
```

---

## 📊 Entidades Recomendadas

### ProjectConfig
```typescript
{
  brandName: "Dental Clinic Madrid",
  primaryColor: "#10b981",
  secondaryColor: "#06b6d4",
  fontFamily: "Inter",
  blueprint: "clinicas-salud"
}
```

### GeoTarget
```typescript
{
  cityName: "Madrid",
  neighborhoods: ["Centro", "Salamanca"],
  mapEmbedUrl: "...",
  napData: {
    name: "Dental Clinic Madrid",
    address: "Paseo de Recoletos 25",
    phone: "+34 91 555 1234"
  }
}
```

### ConversionBlock
```typescript
{
  headline: "Clínica dental profesional en {cityName}",
  subheadline: "Especialistas colegiados | Cita en 48 horas",
  ctaLabel: "Agendar cita",
  trustSignal: "Primeras 2 consultas gratis",
  mediaType: "image",
  mediaUrl: "/images/clinic.jpg"
}
```

### SemanticStructure
```typescript
{
  h2Services: [
    "Implantes dentales",
    "Blanqueamiento dental",
    "Ortodoncia",
    "Limpieza y revisión"
  ],
  faqItems: [
    {
      question: "¿Duele la limpieza dental?",
      answer: "No, usamos anestesia local. El proceso es indoloro..."
    }
  ],
  metaDescription: "Clínica dental en Madrid. Implantes, blanqueamiento, ortodoncia. Especialistas colegiados.",
  keywords: ["dentista madrid", "implantes dentales", "limpieza dental"],
  schema: "MedicalBusiness"
}
```

---

## 🎨 Componentes Recomendados

| Sección | Componente |
|---------|-----------|
| 1. Hero | HeroV1 (imagen profesional) |
| 2. Specialties | BentoBox (especialidades destacadas) |
| 3. Authority | AuthorityBlock (certificaciones + reviews) |
| 4. FAQ | FAQAccordion (preguntas médicas) |
| 5. Appointment | LeadGen (integración calendario) |

---

## 📈 SEO + Schema Markup

### Schema: MedicalBusiness
```json
{
  "@context": "schema.org",
  "@type": "MedicalBusiness",
  "name": "{clinicName}",
  "medicalSpecialty": [
    "Dentistry",
    "Cosmetic Dentistry"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "{address}",
    "addressLocality": "{cityName}"
  },
  "telephone": "{phone}",
  "url": "https://...",
  "image": "/images/clinic.jpg"
}
```

### Palabras Clave Típicas
- "{specialty} en {cityName}"
- "dentista {neighborhood}"
- "implantes {city}"
- "clínica {specialty} cerca de mí"

---

**Blueprint v1.0 - Clínicas Salud**
