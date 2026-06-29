"use client";

import { motion } from "framer-motion";

const sections = [
  {
    title: "1. Identificación del Prestador de Servicios",
    content: `Los presentes Términos y Condiciones regulan el uso del sitio web y los servicios ofrecidos por iORANA Digital (en adelante, "la empresa"), con domicilio en Asturias, España.

Email de contacto: hola@ioranadigital.com`,
  },
  {
    title: "2. Objeto y Aceptación de los Términos",
    content: `Los presentes términos regulan la relación entre iORANA Digital y los usuarios de este sitio web y/o clientes de nuestros servicios de marketing digital. El acceso y uso del sitio web implica la aceptación plena y sin reservas de todos los términos aquí recogidos. Si no está de acuerdo con alguno de estos términos, le rogamos que no utilice el sitio web.`,
  },
  {
    title: "3. Descripción de los Servicios Ofrecidos",
    content: `iORANA Digital ofrece servicios profesionales de marketing digital que incluyen, entre otros:

• SEO Técnico y On-Page: auditorías, optimización y posicionamiento orgánico.
• PPC y Paid Search: gestión de campañas en Google Ads, Meta Ads y otras plataformas.
• Content Marketing: estrategia de contenidos, copywriting SEO y lead magnets.
• Automatizaciones: automatización de procesos de marketing y ventas.
• Desarrollo Web: diseño y desarrollo de sitios web orientados a conversión.

El alcance específico de cada servicio se definirá en el presupuesto o propuesta comercial aceptada por el cliente.`,
  },
  {
    title: "4. Condiciones de Contratación y Pago",
    content: `• Los servicios se contratan mediante la aceptación de una propuesta comercial o presupuesto.
• Los precios no incluyen IVA salvo indicación expresa en contrario.
• Las formas de pago aceptadas se especificarán en cada propuesta comercial.
• El pago se realizará según los plazos establecidos en la propuesta: habitualmente mensual por adelantado.
• El retraso en el pago podrá suponer la suspensión temporal de los servicios contratados.
• iORANA Digital se reserva el derecho de modificar sus tarifas, lo cual será comunicado al cliente con un mínimo de 30 días de antelación.`,
  },
  {
    title: "5. Propiedad Intelectual",
    content: `• Todos los contenidos del sitio web (textos, imágenes, diseño, logotipos, código fuente) son propiedad de iORANA Digital o se utilizan con la debida autorización.
• Queda prohibida la reproducción, distribución o modificación de los contenidos sin autorización expresa.
• Los entregables creados para el cliente en el marco de un proyecto contratado serán propiedad del cliente una vez realizado el pago completo de los servicios.
• Las herramientas, metodologías y frameworks propios de iORANA Digital permanecerán como propiedad de la empresa.`,
  },
  {
    title: "6. Limitación de Responsabilidad",
    content: `• iORANA Digital no garantiza resultados específicos de posicionamiento, tráfico o conversiones, ya que estos dependen de múltiples factores externos al control de la empresa.
• No nos hacemos responsables de interrupciones en el servicio por causas de fuerza mayor, fallos técnicos de terceros o decisiones del cliente que afecten a la estrategia acordada.
• La responsabilidad máxima de iORANA Digital se limitará al importe total facturado por los servicios contratados durante los 12 meses anteriores al hecho que origina la reclamación.
• El usuario es responsable de la veracidad de los datos proporcionados.`,
  },
  {
    title: "7. Ley Aplicable y Jurisdicción",
    content: `Los presentes Términos y Condiciones se rigen por la legislación española vigente. Para la resolución de cualquier controversia derivada de estos términos, las partes se someten a la jurisdicción de los Juzgados y Tribunales de Asturias, España, con renuncia a cualquier otro fuero que pudiera corresponderles.`,
  },
  {
    title: "8. Modificaciones de los Términos",
    content: `iORANA Digital se reserva el derecho de modificar los presentes Términos y Condiciones en cualquier momento. Las modificaciones entrarán en vigor desde su publicación en el sitio web. Se recomienda a los usuarios revisar periódicamente esta página.

Para clientes con servicios contratados, cualquier modificación sustancial será notificada con un mínimo de 30 días de antelación por email.

Última actualización: Marzo 2026`,
  },
];

const NAV_LINKS = [
  { href: "/legal/terminos",   label: "Aviso Legal" },
  { href: "/legal/privacidad", label: "Privacidad" },
  { href: "/legal/cookies",    label: "Cookies" },
];

export default function TerminosView() {
  return (
    <section className="pt-24 pb-16 px-4 md:pb-24 min-h-screen bg-[#0a2b49]">
      <div className="container max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span className="text-xs font-bold text-[#ff8c00] tracking-widest uppercase mb-3 block">
            Información Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-[#ebf2f7] mb-4">
            Aviso <span className="text-[#ff8c00]">Legal</span>
          </h1>
          <p className="text-[#ebf2f7]/50 text-sm mb-8">Última actualización: Marzo 2026</p>

          <nav aria-label="Secciones legales" className="flex gap-2 flex-wrap">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  l.href === "/legal/terminos"
                    ? "bg-[#ff8c00] text-[#08223a]"
                    : "bg-[#08223a] border border-[#ebf2f7]/10 text-[#ebf2f7]/60 hover:text-[#ff8c00] hover:border-[#ff8c00]/30"
                }`}
                aria-current={l.href === "/legal/terminos" ? "page" : undefined}
              >
                {l.label}
              </a>
            ))}
          </nav>
        </motion.div>

        <div className="space-y-10">
          {sections.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <h2 className="text-xl font-heading font-bold text-[#ebf2f7] mb-4">{s.title}</h2>
              <div className="text-[#ebf2f7]/70 leading-relaxed whitespace-pre-line text-sm">
                {s.content}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

