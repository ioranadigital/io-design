import ServicePageTemplate, { buildMetadata, type ServicePageData } from "@/components/ServicePageTemplate";

const data: ServicePageData = {
  meta: {
    title: "Google Business Profile & SEO Local",
    description: "Aparece en el Top 3 de Google Maps cuando tu cliente ideal busca lo que ofreces. Optimizamos tu ficha de Google Business y dominamos el posicionamiento local.",
    ogImage: "/og/google-business-local.jpg",
  },
  hero: {
    title: "Google Business Local",
    subtitle: "Aparece en el Top 3 de Google Maps cuando tu cliente ideal busca lo que ofreces. Optimizamos tu ficha de Google Business y dominamos el posicionamiento local.",
    whyPoints: [
      "El 46% de todas las búsquedas en Google tienen intención local — tus clientes te están buscando ahora mismo",
      "El 76% de las personas que hacen una búsqueda local visitan el negocio en 24 horas",
      "Los negocios en el Local Pack de Google reciben el 44% de los clics totales de la página de resultados",
    ],
    ctaLabel: "Solicítanos Más Información",
    ctaHref: "#contacto",
  },
  includes: [
    { text: "Auditoría y optimización completa de Google Business Profile" },
    { text: "Estrategia de keywords locales y geo-targeting" },
    { text: "Gestión activa de reseñas y reputación online" },
    { text: "Publicación de Google Posts y actualizaciones periódicas" },
    { text: "Construcción de citas locales (NAP consistency)" },
    { text: "Seguimiento de posiciones en el Local Pack y Google Maps" },
  ],
  process: [
    { title: "Auditoría Local", description: "Analizamos tu ficha actual, la consistencia NAP en directorios, las reseñas existentes y la posición real de tu negocio en el pack local frente a competidores." },
    { title: "Optimización de Ficha", description: "Completamos y optimizamos cada campo de Google Business: categorías, atributos, servicios, horarios, fotografías profesionales y descripción con keywords locales." },
    { title: "Estrategia de Contenido Local", description: "Creamos un calendario de Google Posts, preguntas y respuestas, y actualizaciones que mantienen la ficha activa y relevante para el algoritmo local." },
    { title: "Gestión de Reseñas", description: "Implementamos un sistema de captación de reseñas auténticas, respondemos a todos los comentarios y neutralizamos el impacto de valoraciones negativas." },
    { title: "Monitorización y Reporting", description: "Reporting mensual con evolución de posición en el pack local, llamadas generadas, visitas a la web desde Maps y comparativa vs. competencia." },
  ],
  results: [
    { value: "+340%", label: "Llamadas orgánicas" },
    { value: "Top 3", label: "Pack local Google" },
    { value: "+180%", label: "Visitas desde Maps" },
    { value: "4.8★", label: "Media de reseñas" },
  ],
  faq: [
    { q: "¿Cuánto tarda en aparecer mi negocio en el Top 3 de Google Maps?", a: "La optimización inicial de la ficha produce mejoras visibles en 2-4 semanas. Para alcanzar el Top 3 en búsquedas competidas, el plazo habitual es de 2-4 meses según la competencia local y el estado de partida." },
    { q: "¿Necesito tener un local físico para hacer SEO local?", a: "No necesariamente. Los negocios a domicilio o con área de servicio (fontaneros, electricistas, etc.) también pueden posicionarse en el pack local. Gestionamos la configuración correcta en Google Business para tu modelo de negocio." },
    { q: "¿Qué diferencia al SEO local del SEO orgánico tradicional?", a: "El SEO local optimiza la presencia en búsquedas con intención geográfica ('fontanero en Madrid') y en Google Maps. El SEO orgánico compite en resultados web generales. Son complementarios: un buen SEO local refuerza también el posicionamiento orgánico." },
    { q: "¿Gestionáis las reseñas negativas?", a: "Sí. Respondemos a todas las reseñas (positivas y negativas) de forma profesional, implementamos estrategias de captación de reseñas auténticas y, cuando corresponde, solicitamos la eliminación de reseñas que incumplen las políticas de Google." },
    { q: "¿Puedo gestionar varias ubicaciones?", a: "Absolutamente. Gestionamos perfiles multi-ubicación con estrategias diferenciadas por zona. Tenemos experiencia con cadenas de hasta 50+ locales con reporting centralizado." },
  ],
  form: { endpoint: "/api/contact" },
};

export const metadata = buildMetadata(data);
export default function GoogleBusinessLocal() { return <ServicePageTemplate data={data} />; }
