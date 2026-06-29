// app/legal/[seccion]/page.tsx
// URLs: /legal/terminos · /legal/privacidad · /legal/cookies
// Una sola página dinámica que renderiza la sección correcta

import type { Metadata } from "next";
import { notFound } from "next/navigation";

/* ── Contenido legal ──────────────────────────────────────── */
const SECCIONES = {
  terminos: {
    titulo: "Aviso Legal",
    subtitulo: "Términos y condiciones de uso",
    contenido: [
      {
        h2: "1. Datos identificativos",
        texto: `En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSICE), se informa que el titular del sitio web iorana.digital es Iorana Digital, con domicilio en Asturias, España. Email de contacto: hola@iorana.digital.`,
      },
      {
        h2: "2. Objeto y ámbito de aplicación",
        texto: `El presente Aviso Legal regula el acceso y uso del sitio web iorana.digital, sus subdominios y los servicios disponibles a través de él. El acceso al sitio implica la aceptación plena y sin reservas de las presentes condiciones. Iorana Digital se reserva el derecho a modificar este aviso en cualquier momento, siendo responsabilidad del usuario consultarlo periódicamente.`,
      },
      {
        h2: "3. Propiedad intelectual e industrial",
        texto: `Todos los contenidos del sitio web — incluyendo textos, fotografías, gráficos, imágenes, iconos, tecnología, software, links y demás contenidos audiovisuales — son propiedad intelectual de Iorana Digital o de terceros, sin que pueda entenderse cedido al usuario ningún derecho sobre los mismos. Queda expresamente prohibida la reproducción, distribución o modificación sin autorización expresa.`,
      },
      {
        h2: "4. Exclusión de responsabilidades",
        texto: `Iorana Digital no se hace responsable de los daños o perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo: errores u omisiones en los contenidos, falta de disponibilidad del portal o la transmisión de virus o programas maliciosos a través del sitio web. El usuario es responsable del uso que haga del sitio y de los contenidos.`,
      },
      {
        h2: "5. Legislación aplicable y jurisdicción",
        texto: `Las relaciones entre Iorana Digital y el usuario se rigen por la normativa española vigente. Para la resolución de cualquier controversia, ambas partes se someten, con renuncia expresa a cualquier otro fuero, a los Juzgados y Tribunales competentes conforme a la legislación española.`,
      },
    ],
  },
  privacidad: {
    titulo: "Política de Privacidad",
    subtitulo: "Tratamiento de datos personales — RGPD (UE) 2016/679",
    contenido: [
      {
        h2: "1. Responsable del tratamiento",
        texto: `Iorana Digital, con domicilio en Asturias, España. Email: hola@iorana.digital. En cumplimiento del Reglamento General de Protección de Datos (RGPD) UE 2016/679 y la Ley Orgánica 3/2018 de Protección de Datos Personales (LOPDGDD).`,
      },
      {
        h2: "2. Datos que recopilamos",
        texto: `Recopilamos los datos que el usuario facilita voluntariamente a través de los formularios de contacto del sitio: nombre, dirección de correo electrónico, teléfono (opcional), empresa o web (opcional) y el mensaje o consulta enviada. No recopilamos datos sensibles ni datos de menores de 14 años.`,
      },
      {
        h2: "3. Finalidad y base legal",
        texto: `Los datos se tratan con las siguientes finalidades: (a) Gestionar y responder las consultas recibidas — base legal: consentimiento del interesado. (b) Enviar información sobre servicios solicitados — base legal: ejecución de un precontrato. (c) Cumplir obligaciones legales — base legal: obligación legal. No realizamos decisiones automatizadas ni elaboración de perfiles.`,
      },
      {
        h2: "4. Conservación de datos",
        texto: `Los datos se conservarán durante el tiempo necesario para la finalidad para la que fueron recabados y, en todo caso, durante los plazos legalmente establecidos. Una vez finalizada la relación, los datos serán bloqueados y posteriormente suprimidos conforme a los plazos de prescripción legal aplicables.`,
      },
      {
        h2: "5. Cesión de datos y transferencias internacionales",
        texto: `Los datos no serán cedidos a terceros salvo obligación legal. Los servicios de alojamiento web se encuentran en servidores ubicados en territorio de la Unión Europea, por lo que no se realizan transferencias internacionales de datos fuera del Espacio Económico Europeo.`,
      },
      {
        h2: "6. Derechos del interesado",
        texto: `El usuario puede ejercer en cualquier momento sus derechos de acceso, rectificación, supresión, portabilidad, limitación y oposición al tratamiento, dirigiéndose a hola@iorana.digital con el asunto "Derechos RGPD" y adjuntando copia de su DNI. Tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).`,
      },
    ],
  },
  cookies: {
    titulo: "Política de Cookies",
    subtitulo: "Información sobre el uso de cookies en iorana.digital",
    contenido: [
      {
        h2: "1. ¿Qué son las cookies?",
        texto: `Las cookies son pequeños archivos de texto que los sitios web almacenan en el dispositivo del usuario cuando los visita. Permiten que el sitio recuerde información sobre la visita, como el idioma preferido y otras opciones, lo que facilita la próxima visita y hace el sitio más útil.`,
      },
      {
        h2: "2. Tipos de cookies que utilizamos",
        texto: `Cookies técnicas o esenciales: necesarias para el funcionamiento del sitio web. Sin ellas, el sitio no puede funcionar correctamente. No requieren consentimiento. Cookies analíticas: nos permiten cuantificar el número de usuarios y analizar su navegación para mejorar los servicios. Cookies de personalización: permiten recordar preferencias del usuario como el idioma o la región.`,
      },
      {
        h2: "3. Cookies de terceros",
        texto: `Este sitio puede utilizar servicios de terceros que instalan sus propias cookies, entre ellos: Google Analytics (análisis de tráfico web), Google Search Console (rendimiento en buscadores). Estos terceros tienen sus propias políticas de privacidad sobre las que Iorana Digital no tiene control.`,
      },
      {
        h2: "4. Gestión y desactivación de cookies",
        texto: `El usuario puede configurar su navegador para rechazar todas las cookies, aceptar solo cookies de primera parte o recibir una notificación cuando se envía una cookie. Tenga en cuenta que si rechaza las cookies, algunas funcionalidades del sitio pueden no estar disponibles. Puede gestionar las cookies desde la configuración de su navegador: Chrome, Firefox, Safari, Edge, Opera.`,
      },
      {
        h2: "5. Actualizaciones de la política",
        texto: `Iorana Digital puede modificar esta Política de Cookies en función de exigencias legislativas o reglamentarias, o con el fin de adaptar dicha política a las instrucciones dictadas por la Agencia Española de Protección de Datos. Se recomienda al usuario revisar esta política periódicamente. Última actualización: abril 2026.`,
      },
    ],
  },
};

type Seccion = keyof typeof SECCIONES;

/* ── Metadata dinámica ────────────────────────────────────── */
export async function generateMetadata(
  { params }: { params: { seccion: string } }
): Promise<Metadata> {
  const data = SECCIONES[params.seccion as Seccion];
  if (!data) return { title: "No encontrado" };
  return {
    title: `${data.titulo} — Iorana Digital`,
    description: data.subtitulo,
    robots: { index: false, follow: false },
  };
}

export function generateStaticParams() {
  return [
    { seccion: "terminos" },
    { seccion: "privacidad" },
    { seccion: "cookies" },
  ];
}

/* ── Página ───────────────────────────────────────────────── */
export default function LegalPage({ params }: { params: { seccion: string } }) {
  const data = SECCIONES[params.seccion as Seccion];
  if (!data) notFound();

  const tabs: { key: Seccion; label: string }[] = [
    { key: "terminos",   label: "Aviso Legal" },
    { key: "privacidad", label: "Privacidad" },
    { key: "cookies",    label: "Cookies" },
  ];

  return (
    <div className="pt-20 min-h-screen bg-[#0a2b49]">

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-6 py-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-xs text-[#ebf2f7]/35">
            <li><a href="/" className="hover:text-[#ff8c00] transition-colors">Inicio</a></li>
            <li aria-hidden="true" className="text-[#ebf2f7]/20">/</li>
            <li className="text-[#ff8c00]">{data.titulo}</li>
          </ol>
        </nav>
      </div>

      {/* Header */}
      <header className="max-w-4xl mx-auto px-6 pb-10">
        <span className="text-xs font-bold text-[#ff8c00] tracking-widest uppercase mb-3 block">
          Información Legal
        </span>
        <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-[#ebf2f7] mb-2">
          {data.titulo}
        </h1>
        <p className="text-[#ebf2f7]/50 text-sm">{data.subtitulo}</p>
      </header>

      {/* Tabs de navegación entre secciones */}
      <nav
        aria-label="Secciones legales"
        className="max-w-4xl mx-auto px-6 mb-10"
      >
        <div className="flex gap-2 flex-wrap">
          {tabs.map((tab) => (
            <a
              key={tab.key}
              href={`/legal/${tab.key}`}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                params.seccion === tab.key
                  ? "bg-[#ff8c00] text-[#08223a]"
                  : "bg-[#08223a] border border-[#ebf2f7]/10 text-[#ebf2f7]/60 hover:text-[#ff8c00] hover:border-[#ff8c00]/30"
              }`}
              aria-current={params.seccion === tab.key ? "page" : undefined}
            >
              {tab.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Contenido */}
      <article className="max-w-4xl mx-auto px-6 pb-20">
        <div className="bg-[#08223a] rounded-3xl border border-[#ebf2f7]/5 p-8 lg:p-12 space-y-10">
          {data.contenido.map((bloque, i) => (
            <section key={i}>
              <h2 className="text-lg font-heading font-extrabold text-[#ebf2f7] mb-3">
                {bloque.h2}
              </h2>
              <p className="text-sm text-[#ebf2f7]/60 leading-relaxed">
                {bloque.texto}
              </p>
            </section>
          ))}

          {/* Contacto legal */}
          <div className="pt-6 border-t border-[#ebf2f7]/8">
            <p className="text-xs text-[#ebf2f7]/35 leading-relaxed">
              Para cualquier consulta relacionada con esta información legal, contacta con nosotros en{" "}
              <a href="mailto:hola@iorana.digital" className="text-[#ff8c00] hover:underline">
                hola@iorana.digital
              </a>
              {" "}o visita nuestra{" "}
              <a href="/contacto" className="text-[#ff8c00] hover:underline">
                página de contacto
              </a>.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
