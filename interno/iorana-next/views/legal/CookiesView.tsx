"use client";

import { motion } from "framer-motion";

const sections = [
  {
    title: "1. ¿Qué son las Cookies?",
    content: `Las cookies son pequeños archivos de texto que los sitios web almacenan en el dispositivo del usuario cuando los visita. Estos archivos permiten que el sitio web recuerde información sobre su visita, como su idioma preferido y otras opciones, con el objetivo de facilitar su próxima visita y hacer que el sitio le resulte más útil.

Las cookies son ampliamente utilizadas por los propietarios de sitios web para que sus sitios funcionen, o funcionen de manera más eficiente, así como para proporcionar información de elaboración de informes.`,
  },
  {
    title: "2. Tipos de Cookies que Utilizamos",
    content: `En iORANA Digital utilizamos los siguientes tipos de cookies:

• Cookies técnicas o estrictamente necesarias: son imprescindibles para que el sitio web funcione correctamente. No requieren consentimiento del usuario y no pueden desactivarse.

• Cookies de preferencias o personalización: permiten recordar información para que el usuario acceda al servicio con determinadas características (idioma, región, configuración de accesibilidad, etc.).

• Cookies analíticas o de rendimiento: recopilan información sobre cómo los usuarios utilizan el sitio web, qué páginas visitan con más frecuencia y si reciben mensajes de error. Toda la información es anónima y se utiliza para mejorar el sitio.

• Cookies de marketing o publicitarias: se utilizan para mostrar anuncios relevantes y personalizados según los intereses del usuario dentro y fuera de nuestro sitio web.`,
  },
  {
    title: "3. Cookies de Terceros que Utilizamos",
    content: `Nuestro sitio web puede utilizar cookies de los siguientes terceros:

• Google Analytics (analítica): recopila datos de uso anónimos para analizar el comportamiento de los visitantes. Política de privacidad: https://policies.google.com/privacy

• Google Ads (publicidad): mide el rendimiento de las campañas publicitarias y permite la personalización de anuncios. Política de privacidad: https://policies.google.com/privacy

• Meta Pixel / Facebook (publicidad): mide la efectividad de campañas en Facebook e Instagram y permite la creación de audiencias personalizadas. Política de privacidad: https://www.facebook.com/privacy/policy

• LinkedIn Insight Tag (analítica y publicidad): permite el análisis de campañas en LinkedIn y la segmentación de audiencias profesionales. Política de privacidad: https://www.linkedin.com/legal/privacy-policy`,
  },
  {
    title: "4. Duración de las Cookies",
    content: `Las cookies pueden clasificarse según su duración en:

• Cookies de sesión: son cookies temporales que expiran cuando el usuario cierra su navegador. Se utilizan para gestionar la sesión activa del usuario en el sitio.

• Cookies persistentes: permanecen en el dispositivo del usuario durante un período determinado después de cerrar el navegador. Su duración varía según su finalidad:
  - Cookies técnicas: hasta 12 meses.
  - Cookies analíticas: hasta 26 meses (según la configuración de Google Analytics).
  - Cookies publicitarias: hasta 24 meses.`,
  },
  {
    title: "5. Cómo Gestionar tus Cookies",
    content: `Puedes controlar y gestionar el uso de cookies de las siguientes maneras:

• Banner de cookies: al acceder por primera vez a nuestro sitio web, verás un banner que te permite aceptar o rechazar las cookies no esenciales.

• Configuración del navegador: puedes configurar tu navegador para que bloquee o elimine las cookies. A continuación te indicamos cómo hacerlo en los navegadores más comunes:
  - Google Chrome: Configuración > Privacidad y seguridad > Cookies y otros datos de sitios.
  - Mozilla Firefox: Opciones > Privacidad y seguridad > Cookies y datos del sitio.
  - Safari: Preferencias > Privacidad > Gestionar datos de sitios web.
  - Microsoft Edge: Configuración > Cookies y permisos del sitio.

• Herramientas de opt-out de terceros: puedes desactivar las cookies de Google Analytics en https://tools.google.com/dlpage/gaoptout y las de publicidad personalizada de Google en https://adssettings.google.com.

Ten en cuenta que deshabilitar ciertas cookies puede afectar a la funcionalidad y experiencia de uso de nuestro sitio web.`,
  },
  {
    title: "6. Base Legal del Uso de Cookies",
    content: `El uso de cookies en nuestro sitio web se fundamenta en las siguientes bases legales:

• Cookies técnicas: interés legítimo (Art. 6.1.f RGPD), ya que son estrictamente necesarias para el funcionamiento del sitio web. No requieren consentimiento previo.

• Cookies analíticas, de preferencias y publicitarias: consentimiento del usuario (Art. 6.1.a RGPD y Art. 22 de la Ley 34/2002 de Servicios de la Sociedad de la Información). Solo se activarán si el usuario otorga su consentimiento a través del banner de cookies.`,
  },
  {
    title: "7. Actualizaciones de esta Política",
    content: `iORANA Digital se reserva el derecho de actualizar esta Política de Cookies en cualquier momento para adaptarla a novedades legislativas, tecnológicas o cambios en los servicios ofrecidos. Cualquier modificación será publicada en esta misma página.

Te recomendamos revisar esta política periódicamente para estar informado sobre el uso de cookies en nuestro sitio web.`,
  },
  {
    title: "8. Contacto",
    content: `Si tienes alguna pregunta sobre nuestra Política de Cookies o deseas ejercer tus derechos en relación con el tratamiento de tus datos personales, puedes contactarnos en:

Email: hola@ioranadigital.com
Dirección: Asturias, España

Última actualización: Marzo 2026`,
  },
];

const NAV_LINKS = [
  { href: "/legal/cookies",    label: "Cookies" },
  { href: "/legal/privacidad", label: "Privacidad" },
  { href: "/legal/terminos",   label: "Aviso Legal" },
];

export default function CookiesView() {
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
            Política de <span className="text-[#ff8c00]">Cookies</span>
          </h1>
          <p className="text-[#ebf2f7]/50 text-sm mb-8">Última actualización: Marzo 2026</p>

          <nav aria-label="Secciones legales" className="flex gap-2 flex-wrap">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  l.href === "/legal/cookies"
                    ? "bg-[#ff8c00] text-[#08223a]"
                    : "bg-[#08223a] border border-[#ebf2f7]/10 text-[#ebf2f7]/60 hover:text-[#ff8c00] hover:border-[#ff8c00]/30"
                }`}
                aria-current={l.href === "/legal/cookies" ? "page" : undefined}
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

