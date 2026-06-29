// app/servicios/imagen-de-marca/page.tsx
import ServicePageTemplate, { buildMetadata, type ServicePageData } from "@/components/ServicePageTemplate";

const data: ServicePageData = {
  meta: {
    title: "Imagen de Marca",
    description: "Creamos identidades visuales memorables que conectan con tu audiencia y diferencian tu negocio. Tu marca es tu activo más valioso.",
    ogImage: "/og/imagen-de-marca.jpg",
  },
  hero: {
    title: "Imagen de Marca",
    subtitle: "Creamos identidades visuales memorables que conectan con tu audiencia y diferencian tu negocio. Tu marca es tu activo más valioso — diseñémosla para que lo demuestre.",
    whyPoints: [
      "Una marca coherente genera hasta un 33% más de ingresos",
      "El 81% de los consumidores necesitan confiar en una marca antes de comprar",
      "La consistencia visual aumenta el reconocimiento de marca en un 80%",
    ],
    ctaLabel: "Solicítanos Más Información",
    ctaHref: "#contacto",
  },
  includes: [
    { text: "Diseño de logotipo y variantes" },
    { text: "Manual de identidad visual (colores, tipografías, iconografía)" },
    { text: "Diseño de papelería corporativa" },
    { text: "Plantillas para redes sociales" },
    { text: "Guía de tono y voz de marca" },
    { text: "Estrategia de posicionamiento de marca" },
  ],
  process: [
    { title: "Investigación", description: "Analizamos tu mercado, competencia, audiencia y valores de marca para definir el posicionamiento estratégico." },
    { title: "Conceptualización", description: "Desarrollamos conceptos creativos y moodboards que reflejan la personalidad y los objetivos de tu marca." },
    { title: "Diseño", description: "Creamos el logotipo, paleta de colores, tipografías y todos los elementos visuales de tu identidad." },
    { title: "Refinamiento", description: "Iteramos sobre el diseño incorporando tu feedback hasta lograr la identidad perfecta." },
    { title: "Entrega", description: "Entregamos el manual de marca completo con todos los archivos, guías de uso y plantillas listas para implementar." },
  ],
  results: [
    { value: "+33%", label: "Más ingresos" },
    { value: "80%", label: "Reconocimiento" },
    { value: "100%", label: "Consistencia visual" },
    { value: "+50%", label: "Engagement en redes" },
  ],
  faq: [
    { q: "¿Cuánto tiempo lleva crear una identidad de marca?", a: "El proceso completo suele durar entre 4-8 semanas, dependiendo de la complejidad del proyecto y las rondas de revisión necesarias." },
    { q: "¿Cuántas revisiones se incluyen?", a: "Incluimos 3 rondas de revisión en cada fase del proyecto para asegurar que el resultado final esté perfectamente alineado con tu visión." },
    { q: "¿Qué entregables recibo al final?", a: "Recibes el manual de identidad visual completo, archivos del logotipo en todos los formatos, plantillas para redes sociales, papelería corporativa y la guía de tono y voz." },
    { q: "¿Puedo usar la marca en cualquier soporte?", a: "Sí, el manual de marca incluye guías específicas para aplicación en digital, impresión, señalética y cualquier otro soporte que necesites." },
  ],
  form: { endpoint: "/api/contact" },
};

export const metadata = buildMetadata(data);
export default function Page() { return <ServicePageTemplate data={data} />; }
