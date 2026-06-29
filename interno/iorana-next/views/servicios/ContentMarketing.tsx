// app/servicios/content-marketing/page.tsx
import ServicePageTemplate, { buildMetadata, type ServicePageData } from "@/components/ServicePageTemplate";

const data: ServicePageData = {
  meta: {
    title: "Content Marketing",
    description: "Contenido estratégico que educa, posiciona y convierte. Creamos un motor de contenido que atrae a tu buyer persona y lo guía por tu funnel.",
    ogImage: "/og/content-marketing.jpg",
  },
  hero: {
    title: "Content Marketing",
    subtitle: "Contenido estratégico que educa, posiciona y convierte. Creamos un motor de contenido que atrae a tu buyer persona y lo guía por tu funnel.",
    whyPoints: [
      "El content marketing genera 3x más leads que el marketing tradicional con un coste 62% menor",
      "Las empresas con blog generan un 67% más de leads mensuales",
      "El contenido de calidad es una inversión que se compone con el tiempo",
    ],
    ctaLabel: "Solicítanos Más Información",
    ctaHref: "#contacto",
  },
  includes: [
    { text: "Estrategia de contenidos basada en topic clusters y buyer journey" },
    { text: "Creación de artículos de blog optimizados para SEO" },
    { text: "Copywriting persuasivo para landing pages y emails" },
    { text: "Diseño de funnel de contenido (TOFU, MOFU, BOFU)" },
    { text: "Creación de lead magnets: ebooks, guías, whitepapers" },
    { text: "Calendario editorial y gestión de publicaciones" },
  ],
  process: [
    { title: "Investigación y Estrategia", description: "Analizamos tu ICP, competidores y keywords para definir pilares de contenido y topic clusters alineados con tus objetivos de negocio." },
    { title: "Calendario Editorial", description: "Creamos un calendario editorial con frecuencia, temas, formatos y canales de distribución definidos para los próximos 3-6 meses." },
    { title: "Producción de Contenido", description: "Nuestros redactores especializados crean contenido optimizado para SEO y conversión, revisado por editores y expertos del sector." },
    { title: "Distribución y Promoción", description: "Publicamos, distribuimos y promocionamos cada pieza de contenido para maximizar su alcance e impacto." },
    { title: "Análisis y Optimización", description: "Medimos el rendimiento de cada contenido y optimizamos la estrategia basándonos en datos reales de tráfico, engagement y conversiones." },
  ],
  results: [
    { value: "+320%", label: "Tráfico del blog" },
    { value: "3x", label: "Leads generados" },
    { value: "+85%", label: "Tiempo en página" },
    { value: "62%", label: "Menor coste/lead" },
  ],
  faq: [
    { q: "¿Con qué frecuencia se publica contenido?", a: "Depende de tu estrategia y presupuesto. Generalmente recomendamos un mínimo de 4-8 artículos al mes para construir autoridad rápidamente." },
    { q: "¿Los contenidos están optimizados para SEO?", a: "Absolutamente. Cada pieza se crea con keyword research previo, optimización on-page completa y estructura de internal linking estratégica." },
    { q: "¿Puedo revisar el contenido antes de publicarlo?", a: "Sí, cada contenido pasa por un proceso de revisión donde puedes aportar feedback y solicitar ajustes antes de la publicación." },
    { q: "¿Creáis contenido para redes sociales también?", a: "Sí, como extensión del servicio podemos adaptar cada pieza para LinkedIn, X y newsletters, maximizando la distribución." },
  ],
  form: { endpoint: "/api/contact" },
};

export const metadata = buildMetadata(data);
export default function Page() { return <ServicePageTemplate data={data} />; }
