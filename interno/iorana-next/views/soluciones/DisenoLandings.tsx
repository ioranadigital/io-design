// app/soluciones/diseno-de-landings/page.tsx
import ServicePageTemplate, { buildMetadata, type ServicePageData } from "@/components/ServicePageTemplate";

const data: ServicePageData = {
  meta: {
    title: "Diseño de Landing Pages",
    description: "Landing pages diseñadas para convertir visitantes en clientes. Cada pixel está pensado para guiar al usuario hacia la acción que genera resultados.",
    ogImage: "/og/diseno-de-landings.jpg",
  },
  hero: {
    title: "Diseño de Landings",
    subtitle: "Landing pages diseñadas para convertir visitantes en clientes. Cada pixel está pensado para guiar al usuario hacia la acción que genera resultados.",
    whyPoints: [
      "Una landing page optimizada puede aumentar conversiones hasta un 300%",
      "El 48% de los marketers construyen una landing nueva para cada campaña",
      "Reducir el tiempo de carga 1 segundo aumenta conversiones en un 7%",
    ],
    ctaLabel: "Solicítanos Más Información",
    ctaHref: "#contacto",
  },
  includes: [
    { text: "Diseño UX/UI orientado a conversión" },
    { text: "Copywriting persuasivo" },
    { text: "Integración con CRM y herramientas de marketing" },
    { text: "Optimización para velocidad y mobile" },
    { text: "Tests A/B y seguimiento de conversiones" },
    { text: "Pixel de seguimiento y analytics" },
  ],
  process: [
    { title: "Briefing", description: "Definimos objetivos, audiencia, propuesta de valor y los mensajes clave que debe comunicar la landing page." },
    { title: "Wireframe", description: "Creamos la estructura y jerarquía de contenido para maximizar el flujo de conversión." },
    { title: "Diseño", description: "Diseñamos la landing con UI/UX de alto impacto, copywriting persuasivo y elementos de prueba social." },
    { title: "Desarrollo", description: "Implementamos con tecnologías de alto rendimiento, optimización mobile-first y velocidad de carga sub-2 segundos." },
    { title: "Lanzamiento", description: "Configuramos tracking, analytics y pixel de conversión para medir resultados desde el día 1." },
    { title: "Optimización", description: "Tests A/B continuos, análisis de heatmaps y optimización iterativa para mejorar la tasa de conversión." },
  ],
  results: [
    { value: "+300%", label: "Tasa de conversión" },
    { value: "-40%", label: "Coste por lead" },
    { value: "<2s", label: "Velocidad de carga" },
    { value: "100%", label: "Mobile optimized" },
  ],
  faq: [
    { q: "¿Cuánto tiempo lleva diseñar una landing page?", a: "Una landing page profesional puede estar lista en 2-3 semanas, incluyendo diseño, desarrollo, copywriting y configuración de analytics." },
    { q: "¿Cuántas revisiones se incluyen?", a: "Incluimos 3 rondas de revisión en la fase de diseño y 2 en la fase de desarrollo para asegurar un resultado perfecto." },
    { q: "¿Se puede integrar con mi CRM o herramienta de email?", a: "Sí, integramos con HubSpot, Mailchimp, ActiveCampaign, Salesforce y prácticamente cualquier plataforma que tenga API o webhooks." },
    { q: "¿Incluye copywriting?", a: "Sí, nuestro servicio incluye copywriting persuasivo orientado a conversión, basado en la propuesta de valor y los mensajes clave definidos en el briefing." },
  ],
  form: { endpoint: "/api/contact" },
};

export const metadata = buildMetadata(data);
export default function Page() { return <ServicePageTemplate data={data} />; }
