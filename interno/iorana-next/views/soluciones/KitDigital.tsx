// app/soluciones/kit-digital/page.tsx
import ServicePageTemplate, { buildMetadata, type ServicePageData } from "@/components/ServicePageTemplate";

const data: ServicePageData = {
  meta: {
    title: "Kit Digital",
    description: "Digitaliza tu negocio con ayudas de hasta 12.000€ del Gobierno de España. Como Agente Digitalizador homologado, gestionamos todo el proceso por ti.",
    ogImage: "/og/kit-digital.jpg",
  },
  hero: {
    title: "Kit Digital",
    subtitle: "Digitaliza tu negocio con ayudas de hasta 12.000€ del Gobierno de España. Como Agente Digitalizador homologado, gestionamos todo el proceso por ti.",
    whyPoints: [
      "Subvención oficial del programa Kit Digital para pymes y autónomos",
      "Sin coste inicial: la ayuda cubre el 100% del servicio",
      "Iorana Digital es Agente Digitalizador homologado",
    ],
    ctaLabel: "Solicítanos Más Información",
    ctaHref: "#contacto",
  },
  includes: [
    { text: "Gestión de redes sociales y comunidad online" },
    { text: "Diseño y desarrollo de sitio web con SEO básico" },
    { text: "Presencia en internet y posicionamiento local" },
    { text: "Comercio electrónico" },
    { text: "Publicidad digital segmentada" },
    { text: "Elegibilidad para ayudas del Gobierno de España (hasta 12.000€)" },
  ],
  process: [
    { title: "Diagnóstico", description: "Evaluamos tu nivel de madurez digital y determinamos qué soluciones del Kit Digital se adaptan mejor a tu negocio." },
    { title: "Solicitud de Bono", description: "Te guiamos paso a paso en la solicitud del bono digital en Acelera Pyme, gestionando toda la documentación necesaria." },
    { title: "Selección de Soluciones", description: "Definimos juntos qué categorías de solución implementar para maximizar el impacto en tu negocio." },
    { title: "Implementación", description: "Desarrollamos e implementamos las soluciones seleccionadas con los estándares de calidad exigidos por el programa." },
    { title: "Seguimiento", description: "Monitorizamos el rendimiento y te acompañamos durante todo el periodo de prestación del servicio." },
  ],
  results: [
    { value: "500+", label: "Empresas beneficiadas" },
    { value: "12.000€", label: "Ahorro máximo" },
    { value: "100%", label: "Subvencionado" },
    { value: "<30 días", label: "Implementación" },
  ],
  faq: [
    { q: "¿Quién puede solicitar el Kit Digital?", a: "Pueden solicitarlo pymes (de 0 a 49 empleados) y autónomos con domicilio fiscal en España, que estén dados de alta y cumplan los requisitos de antigüedad mínima." },
    { q: "¿Cuánto tarda el proceso de solicitud?", a: "La solicitud del bono puede resolverse en 1-2 semanas. Una vez aprobado, comenzamos la implementación inmediatamente." },
    { q: "¿Qué cubre exactamente la ayuda?", a: "Dependiendo del segmento de tu empresa (por número de empleados), la ayuda puede cubrir desde 2.000€ hasta 12.000€ en soluciones de digitalización como web, SEO, redes sociales, e-commerce y publicidad digital." },
    { q: "¿Hay algún coste para mi empresa?", a: "No. La subvención del Kit Digital cubre el 100% del coste de las soluciones contratadas dentro de los importes máximos establecidos por categoría." },
  ],
  form: { endpoint: "/api/contact" },
};

export const metadata = buildMetadata(data);
export default function Page() { return <ServicePageTemplate data={data} />; }
