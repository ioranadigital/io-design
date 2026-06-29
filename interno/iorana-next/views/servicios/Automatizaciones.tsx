// app/servicios/automatizaciones/page.tsx
import ServicePageTemplate, { buildMetadata, type ServicePageData } from "@/components/ServicePageTemplate";

const data: ServicePageData = {
  meta: {
    title: "Automatizaciones de Marketing",
    description: "Elimina tareas manuales y escala tus operaciones de marketing y ventas. Conectamos tus herramientas para que tu equipo se enfoque en lo que realmente importa.",
    ogImage: "/og/automatizaciones.jpg",
  },
  hero: {
    title: "Automatizaciones de Procesos",
    subtitle: "Elimina tareas manuales y escala tus operaciones de marketing y ventas. Conectamos tus herramientas para que tu equipo se enfoque en lo que realmente importa.",
    whyPoints: [
      "Las empresas que automatizan experimentan un aumento del 451% en leads cualificados",
      "Elimina errores humanos y garantiza seguimiento consistente de cada lead",
      "Un workflow bien diseñado trabaja 24/7, incluso cuando tu equipo descansa",
    ],
    ctaLabel: "Solicítanos Más Información",
    ctaHref: "/contacto",
  },
  includes: [
    { text: "Automatización de flujos de marketing (email sequences, nurturing)" },
    { text: "Integración y configuración de CRM (HubSpot, Salesforce, Pipedrive)" },
    { text: "Workflows personalizados con Make, Zapier o n8n" },
    { text: "Automatización de reporting y dashboards" },
    { text: "Sincronización de datos entre plataformas" },
    { text: "Chatbots y respuestas automáticas inteligentes" },
  ],
  process: [
    { title: "Auditoría de Procesos", description: "Mapeamos todos tus procesos actuales de marketing y ventas para identificar cuellos de botella y oportunidades de automatización." },
    { title: "Diseño de Workflows", description: "Diseñamos los flujos automatizados con lógica condicional, triggers y acciones alineados con tu customer journey." },
    { title: "Integración de Herramientas", description: "Conectamos tu CRM, email marketing, analytics y todas las herramientas necesarias en un ecosistema unificado." },
    { title: "Implementación y Testing", description: "Construimos cada automatización, la testamos exhaustivamente y la ponemos en producción con monitorización activa." },
    { title: "Optimización Continua", description: "Analizamos el rendimiento de cada workflow y lo optimizamos para mejorar tasas de conversión y eficiencia operativa." },
  ],
  results: [
    { value: "80%", label: "Menos tareas manuales" },
    { value: "+451%", label: "Leads cualificados" },
    { value: "24/7", label: "Operación continua" },
    { value: "15h", label: "Ahorro semanal" },
  ],
  faq: [
    { q: "¿Con qué herramientas trabajáis?", a: "Trabajamos con Make (Integromat), Zapier, n8n, HubSpot, ActiveCampaign, Mailchimp, Salesforce y prácticamente cualquier herramienta que tenga API." },
    { q: "¿Necesito cambiar mi CRM actual?", a: "No necesariamente. Nos adaptamos a tu stack actual. Si detectamos que tu CRM actual tiene limitaciones, te asesoraremos sobre alternativas." },
    { q: "¿Cuánto tiempo lleva implementar las automatizaciones?", a: "Depende de la complejidad. Automatizaciones simples pueden estar listas en 1-2 semanas. Proyectos más complejos con múltiples integraciones pueden llevar 4-8 semanas." },
    { q: "¿Qué pasa si algo falla en la automatización?", a: "Configuramos alertas y monitorizamos cada workflow. Si algo falla, lo detectamos rápidamente y lo solucionamos. También incluimos lógica de error handling para evitar pérdida de datos." },
  ],
  form: { endpoint: "/api/contact" },
};

export const metadata = buildMetadata(data);
export default function Page() { return <ServicePageTemplate data={data} />; }
