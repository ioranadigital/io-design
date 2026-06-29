// app/servicios/desarrollo-web/page.tsx
import ServicePageTemplate, { buildMetadata, type ServicePageData } from "@/components/ServicePageTemplate";

const data: ServicePageData = {
  meta: {
    title: "Desarrollo Web",
    description: "Diseño y desarrollo web profesional orientado a conversión. Landing pages, webs corporativas y optimización de velocidad para empresas.",
    ogImage: "/og/desarrollo-web.jpg",
  },
  hero: {
    title: "Desarrollo Web",
    subtitle: "Diseño y desarrollo web profesional orientado a conversión. Construimos sitios que no solo se ven bien, sino que convierten visitantes en clientes.",
    whyPoints: [
      "El 75% de los usuarios juzgan la credibilidad de un negocio por su diseño web",
      "Una web lenta pierde el 53% de visitantes móviles en los primeros 3 segundos",
      "Un diseño CRO-optimizado puede doblar tu tasa de conversión sin más tráfico",
    ],
    ctaLabel: "Solicítanos Más Información",
    ctaHref: "#contacto",
  },
  includes: [
    { text: "Diseño UX/UI orientado a conversión" },
    { text: "Desarrollo con Next.js o tecnología de alto rendimiento" },
    { text: "Optimización de Core Web Vitals y velocidad de carga" },
    { text: "SEO técnico integrado desde el inicio" },
    { text: "Integración con CRM, analytics y herramientas de marketing" },
    { text: "Mantenimiento y soporte mensual" },
  ],
  process: [
    { title: "Briefing y Estrategia", description: "Definimos objetivos, audiencia, estructura de información y los KPIs que medirán el éxito del proyecto." },
    { title: "Diseño UX/UI", description: "Creamos wireframes y diseño visual de alta fidelidad, priorizando la experiencia de usuario y la conversión." },
    { title: "Desarrollo", description: "Construimos el sitio con tecnologías de alto rendimiento, mobile-first y optimizado para buscadores desde el primer día." },
    { title: "QA y Optimización", description: "Testamos en múltiples dispositivos y navegadores, optimizamos la velocidad y verificamos todos los flujos de conversión." },
    { title: "Lanzamiento", description: "Configuramos hosting, SSL, analytics, pixel de conversión y desplegamos con proceso de CI/CD para zero downtime." },
  ],
  results: [
    { value: "<2s", label: "Velocidad de carga" },
    { value: "95+", label: "PageSpeed Score" },
    { value: "+200%", label: "Tasa de conversión" },
    { value: "100%", label: "Mobile optimized" },
  ],
  faq: [
    { q: "¿Cuánto tarda en entregarse un proyecto web?", a: "Una landing page puede estar lista en 2-3 semanas. Un sitio corporativo completo entre 6-10 semanas. Los plazos exactos dependen de la complejidad y el proceso de feedback." },
    { q: "¿Puedo editar el contenido yo mismo después?", a: "Sí, podemos integrarlo con un CMS headless o tradicional para que gestiones el contenido sin necesidad de tocar código." },
    { q: "¿Incluye hosting y mantenimiento?", a: "Ofrecemos planes de hosting gestionado y mantenimiento mensual que incluyen actualizaciones, backups, monitorización y soporte técnico." },
    { q: "¿Trabajáis con mi diseño existente o creáis uno nuevo?", a: "Podemos partir de tu identidad de marca existente o crear un diseño desde cero. Adaptamos el proceso a tu situación." },
  ],
  form: { endpoint: "/api/contact" },
};

export const metadata = buildMetadata(data);
export default function Page() { return <ServicePageTemplate data={data} />; }
