// app/servicios/ppc-paid-search/page.tsx
import ServicePageTemplate, { buildMetadata, type ServicePageData } from "@/components/ServicePageTemplate";

const data: ServicePageData = {
  meta: {
    title: "PPC & Paid Search",
    description: "Campañas de pago que generan leads cualificados desde el día 1. Maximizamos tu ROAS con gestión experta en Google Ads y Meta Ads.",
    ogImage: "/og/ppc-paid-search.jpg",
  },
  hero: {
    title: "PPC & Paid Search",
    subtitle: "Campañas de pago que generan leads cualificados desde el día 1. Maximizamos tu ROAS con gestión experta en Google Ads y Meta Ads.",
    whyPoints: [
      "El PPC te da resultados inmediatos con un coste de adquisición predecible",
      "Complementa tu estrategia SEO: captas demanda mientras construyes autoridad orgánica",
      "La data de campañas paid es invaluable para informar tu estrategia de contenido",
    ],
    ctaLabel: "Solicítanos Más Información",
    ctaHref: "#contacto",
  },
  includes: [
    { text: "Estrategia y configuración de Google Ads (Search, Display, YouTube)" },
    { text: "Campañas en Meta Ads (Facebook e Instagram) con segmentación avanzada" },
    { text: "Remarketing y audiencias lookalike para maximizar conversiones" },
    { text: "Optimización continua de pujas, CPA y ROAS" },
    { text: "A/B testing de creatividades, copies y landing pages" },
    { text: "Reporting semanal con dashboards en tiempo real" },
  ],
  process: [
    { title: "Análisis y Estrategia", description: "Estudiamos tu mercado, competidores y buyer persona para diseñar una estructura de campañas que maximice el ROI." },
    { title: "Configuración de Campañas", description: "Creamos cuentas, campañas y grupos de anuncios con keyword research, copies persuasivos y extensiones optimizadas." },
    { title: "Landing Pages", description: "Diseñamos o optimizamos landing pages específicas para cada campaña, maximizando la tasa de conversión." },
    { title: "Optimización Continua", description: "Ajustamos pujas, negativizamos keywords, testamos creatividades y escalamos lo que funciona en ciclos semanales." },
    { title: "Reporting y Escalado", description: "Reportes semanales con métricas clave. Identificamos oportunidades de escalar presupuesto en canales rentables." },
  ],
  results: [
    { value: "4.2x", label: "ROAS promedio" },
    { value: "-45%", label: "Reducción CPA" },
    { value: "+180%", label: "Leads cualificados" },
    { value: "98%", label: "Clientes satisfechos" },
  ],
  faq: [
    { q: "¿Cuánto presupuesto necesito para empezar con PPC?", a: "Recomendamos un mínimo de 1.500€/mes en inversión publicitaria para obtener datos suficientes que permitan optimizar. El presupuesto óptimo depende de tu sector y objetivos." },
    { q: "¿Google Ads o Meta Ads? ¿Cuál es mejor?", a: "Depende de tu negocio. Google Ads captura demanda existente (usuarios buscando activamente). Meta Ads genera demanda y es excelente para awareness y remarketing. Generalmente recomendamos una combinación." },
    { q: "¿Cuánto tiempo hasta ver resultados?", a: "Los primeros resultados se ven en 1-2 semanas. Sin embargo, la optimización real comienza tras 4-6 semanas cuando tenemos suficientes datos para tomar decisiones basadas en evidencia." },
    { q: "¿Gestionáis también las creatividades?", a: "Sí, nuestro equipo crea copies, diseños de anuncios y landing pages. También trabajamos con tu equipo de diseño si lo prefieres." },
  ],
  form: { endpoint: "/api/contact" },
};

export const metadata = buildMetadata(data);
export default function Page() { return <ServicePageTemplate data={data} />; }
