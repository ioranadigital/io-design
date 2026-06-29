// app/servicios/seo-tecnico/page.tsx
import ServicePageTemplate, { buildMetadata, type ServicePageData } from "@/components/ServicePageTemplate";

const data: ServicePageData = {
  meta: {
    title: "SEO Técnico & On-Page",
    description: "Posiciona tu sitio web donde tu cliente ideal busca soluciones. Optimizamos cada aspecto técnico y de contenido para que Google te premie con tráfico cualificado.",
    ogImage: "/og/seo-tecnico.jpg",
  },
  hero: {
    title: "SEO Técnico & On-Page",
    subtitle: "Posiciona tu sitio web donde tu cliente ideal busca soluciones. Optimizamos cada aspecto técnico y de contenido para que Google te premie con tráfico cualificado.",
    whyPoints: [
      "El 68% de las experiencias online comienzan con un motor de búsqueda",
      "Sin SEO técnico sólido, el mejor contenido del mundo es invisible para Google",
      "Core Web Vitals es factor de ranking directo — la velocidad ya no es opcional",
    ],
    ctaLabel: "Solicítanos Más Información",
    ctaHref: "#contacto",
  },
  includes: [
    { text: "Auditoría técnica completa con +200 checkpoints" },
    { text: "Optimización de Core Web Vitals (LCP, FID, CLS)" },
    { text: "Arquitectura web y estructura de URLs optimizada" },
    { text: "Optimización on-page de páginas clave y landing pages" },
    { text: "Implementación de Schema Markup y datos estructurados" },
    { text: "Estrategia de indexación y gestión de crawl budget" },
  ],
  process: [
    { title: "Auditoría Inicial", description: "Análisis exhaustivo de tu sitio: rastreo, indexación, velocidad, mobile-first, errores técnicos y oportunidades quick-win." },
    { title: "Roadmap Priorizado", description: "Creamos un plan de acción con impacto estimado y esfuerzo necesario para cada mejora, priorizando las acciones de mayor ROI." },
    { title: "Implementación Técnica", description: "Ejecutamos las optimizaciones: velocidad, schema markup, canonical tags, hreflang, estructura de datos y corrección de errores." },
    { title: "Optimización On-Page", description: "Keyword mapping, optimización de títulos, metas, headings, internal linking y contenido de páginas estratégicas." },
    { title: "Monitorización Continua", description: "Seguimiento semanal de posiciones, tráfico orgánico, errores de indexación y Core Web Vitals con reportes automatizados." },
  ],
  results: [
    { value: "+250%", label: "Tráfico orgánico" },
    { value: "95+", label: "PageSpeed Score" },
    { value: "3x", label: "Páginas indexadas" },
    { value: "-60%", label: "Errores técnicos" },
  ],
  faq: [
    { q: "¿Cuánto tarda en verse resultados con SEO técnico?", a: "Los quick wins técnicos (velocidad, errores de indexación) pueden mostrar mejoras en 2-4 semanas. Los resultados en rankings suelen verse entre 2-4 meses, dependiendo de la competencia y el estado actual del sitio." },
    { q: "¿Necesito cambiar mi CMS o tecnología web?", a: "No necesariamente. Trabajamos con cualquier CMS o stack tecnológico. Sin embargo, si detectamos limitaciones graves, te asesoraremos sobre las mejores opciones." },
    { q: "¿Cómo afecta Core Web Vitals al posicionamiento?", a: "Google usa Core Web Vitals como factor de ranking desde 2021. Un sitio con buen rendimiento tiene ventaja sobre competidores más lentos, especialmente en mobile." },
    { q: "¿Qué diferencia hay entre SEO técnico y SEO on-page?", a: "El SEO técnico se centra en la infraestructura del sitio (velocidad, rastreo, indexación). El SEO on-page optimiza el contenido visible (títulos, textos, keywords). Ambos son complementarios y necesarios." },
  ],
  form: { endpoint: "/api/contact" },
};

export const metadata = buildMetadata(data);
export default function Page() { return <ServicePageTemplate data={data} />; }
