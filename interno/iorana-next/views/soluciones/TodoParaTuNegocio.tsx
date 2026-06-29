// app/soluciones/todo-para-tu-negocio/page.tsx
import ServicePageTemplate, { buildMetadata, type ServicePageData } from "@/components/ServicePageTemplate";

const data: ServicePageData = {
  meta: {
    title: "Todo para Tu Negocio",
    description: "Una estrategia digital 360° con un único partner. Integramos todos los canales y herramientas para escalar tu negocio de forma consistente y medible.",
    ogImage: "/og/todo-para-tu-negocio.jpg",
  },
  hero: {
    title: "Todo para Tu Negocio",
    subtitle: "Una estrategia digital 360° con un único partner. Integramos todos los canales y herramientas para escalar tu negocio de forma consistente y medible.",
    whyPoints: [
      "Una estrategia integrada genera 3x más leads que canales aislados",
      "Las empresas con marketing automatizado aumentan su revenue un 10% en 6 meses",
      "Tener un solo partner digital elimina fricciones y acelera resultados",
    ],
    ctaLabel: "Solicítanos Más Información",
    ctaHref: "#contacto",
  },
  includes: [
    { text: "Estrategia digital 360°" },
    { text: "SEO + PPC + Contenidos + Redes Sociales" },
    { text: "Automatización de marketing y CRM" },
    { text: "Diseño web y landing pages" },
    { text: "Imagen de marca completa" },
    { text: "Reporting mensual y consultoría estratégica" },
  ],
  process: [
    { title: "Auditoría", description: "Analizamos tu presencia digital actual, competidores y oportunidades de mercado para definir el punto de partida." },
    { title: "Estrategia", description: "Diseñamos un plan integral con objetivos, KPIs, canales y presupuesto alineados con tus metas de negocio." },
    { title: "Implementación", description: "Ejecutamos la estrategia de forma coordinada en todos los canales, asegurando coherencia y sinergia." },
    { title: "Optimización", description: "Analizamos datos en tiempo real para optimizar cada canal y maximizar el retorno de inversión global." },
    { title: "Escala", description: "Identificamos los canales más rentables y escalamos la inversión para acelerar el crecimiento." },
  ],
  results: [
    { value: "3x", label: "ROI global" },
    { value: "+200%", label: "Leads generados" },
    { value: "+150%", label: "Crecimiento tráfico" },
    { value: "-35%", label: "Coste por adquisición" },
  ],
  faq: [
    { q: "¿Qué incluye exactamente el servicio 360°?", a: "Incluye estrategia digital, SEO, PPC, content marketing, redes sociales, automatizaciones, diseño web, branding y reporting mensual con consultoría estratégica." },
    { q: "¿Hay permanencia o compromiso mínimo?", a: "Recomendamos un compromiso mínimo de 6 meses para ver resultados sólidos, pero no exigimos permanencia. Nuestros clientes se quedan por resultados, no por contratos." },
    { q: "¿Cómo se reportan los resultados?", a: "Recibes un dashboard en tiempo real con las métricas clave y un informe mensual detallado con análisis, insights y recomendaciones estratégicas." },
    { q: "¿Puedo empezar con algunos servicios y escalar después?", a: "Absolutamente. Podemos comenzar con los servicios más prioritarios e ir incorporando canales conforme vemos resultados y tu presupuesto lo permite." },
  ],
  form: { endpoint: "/api/contact" },
};

export const metadata = buildMetadata(data);
export default function Page() { return <ServicePageTemplate data={data} />; }
