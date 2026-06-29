"use client";

import { motion } from "framer-motion";

const sections = [
  {
    title: "1. Introducción y Datos del Responsable",
    content: `El presente documento establece la Política de Privacidad de iORANA Digital (en adelante, "la empresa"), con domicilio en Asturias, España. Nos comprometemos a proteger la privacidad de nuestros usuarios y a tratar sus datos personales de conformidad con el Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica de Protección de Datos y Garantía de los Derechos Digitales (LOPDGDD).

Responsable del tratamiento: iORANA Digital
Email de contacto: hola@ioranadigital.com`,
  },
  {
    title: "2. Datos que Recopilamos",
    content: `Recopilamos los siguientes tipos de datos personales:

• Datos de identificación: nombre, apellidos, email, teléfono y empresa, proporcionados a través de formularios de contacto.
• Datos de navegación: dirección IP, tipo de navegador, páginas visitadas, tiempo de permanencia y datos de interacción, recopilados mediante cookies y herramientas de analítica.
• Datos proporcionados voluntariamente: cualquier información adicional que el usuario decida compartir en comunicaciones directas.`,
  },
  {
    title: "3. Finalidad del Tratamiento de Datos",
    content: `Los datos personales recopilados se utilizan para las siguientes finalidades:

• Gestionar y responder solicitudes de contacto y consultoría.
• Prestar los servicios contratados de marketing digital.
• Enviar comunicaciones comerciales relacionadas con nuestros servicios (previo consentimiento).
• Analizar el comportamiento de navegación para mejorar la experiencia del usuario.
• Cumplir con obligaciones legales y contractuales.`,
  },
  {
    title: "4. Base Legal del Tratamiento",
    content: `El tratamiento de datos se fundamenta en las siguientes bases legales conforme al RGPD:

• Consentimiento del interesado (Art. 6.1.a RGPD): para el envío de comunicaciones comerciales y la recopilación de cookies no esenciales.
• Ejecución de un contrato (Art. 6.1.b RGPD): para la prestación de servicios contratados.
• Interés legítimo (Art. 6.1.f RGPD): para la mejora de nuestros servicios y la seguridad del sitio web.
• Obligación legal (Art. 6.1.c RGPD): para el cumplimiento de obligaciones fiscales y legales.`,
  },
  {
    title: "5. Derechos del Usuario",
    content: `De conformidad con el RGPD y la LOPDGDD, los usuarios tienen los siguientes derechos:

• Derecho de acceso: conocer qué datos personales tratamos.
• Derecho de rectificación: solicitar la corrección de datos inexactos.
• Derecho de supresión: solicitar la eliminación de sus datos.
• Derecho de portabilidad: recibir sus datos en un formato estructurado y de uso común.
• Derecho de oposición: oponerse al tratamiento de sus datos para determinadas finalidades.
• Derecho a la limitación del tratamiento: solicitar que se restrinja el tratamiento en determinadas circunstancias.

Para ejercer estos derechos, puede contactarnos en: hola@ioranadigital.com`,
  },
  {
    title: "6. Uso de Cookies y Herramientas de Terceros",
    content: `Nuestro sitio web utiliza cookies y herramientas de terceros para analítica y publicidad:

• Google Analytics: para analizar el tráfico y comportamiento de navegación.
• Meta Pixel (Facebook): para medir la efectividad de campañas publicitarias.
• Cookies técnicas: necesarias para el funcionamiento del sitio web.
• Cookies de preferencias: para recordar configuraciones del usuario.

El usuario puede gestionar sus preferencias de cookies a través del banner de cookies al acceder al sitio, o a través de la configuración de su navegador.`,
  },
  {
    title: "7. Conservación de Datos",
    content: `Los datos personales se conservarán durante el tiempo necesario para cumplir con la finalidad para la que fueron recogidos y para determinar posibles responsabilidades derivadas de dicha finalidad y del tratamiento de los datos. En general:

• Datos de clientes: se conservan durante la relación contractual y los plazos legales posteriores (hasta 5 años para obligaciones fiscales).
• Datos de contacto de leads: se conservan durante un máximo de 2 años desde la última interacción.
• Datos de navegación: se conservan durante un máximo de 26 meses.`,
  },
  {
    title: "8. Contacto",
    content: `Para cualquier consulta relacionada con nuestra política de privacidad o el tratamiento de sus datos personales, puede contactarnos en:

Email: hola@ioranadigital.com
Dirección: Asturias, España

Última actualización: Marzo 2026`,
  },
];

const NAV_LINKS = [
  { href: "/legal/privacidad", label: "Privacidad" },
  { href: "/legal/terminos",   label: "Aviso Legal" },
  { href: "/legal/cookies",    label: "Cookies" },
];

export default function PrivacidadView() {
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
            Política de <span className="text-[#ff8c00]">Privacidad</span>
          </h1>
          <p className="text-[#ebf2f7]/50 text-sm mb-8">Última actualización: Marzo 2026</p>

          <nav aria-label="Secciones legales" className="flex gap-2 flex-wrap">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  l.href === "/legal/privacidad"
                    ? "bg-[#ff8c00] text-[#08223a]"
                    : "bg-[#08223a] border border-[#ebf2f7]/10 text-[#ebf2f7]/60 hover:text-[#ff8c00] hover:border-[#ff8c00]/30"
                }`}
                aria-current={l.href === "/legal/privacidad" ? "page" : undefined}
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

