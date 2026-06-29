// app/soluciones/como-esta-optimizado-mi-web/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Send, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "¿Cómo está optimizada tu web? Informe Gratuito | iORANA Digital",
  description: "Descubre el verdadero rendimiento de tu sitio web. Analizamos velocidad, SEO técnico, experiencia móvil y oportunidades de conversión — gratis y sin compromiso.",
  openGraph: {
    title: "Informe SEO Gratuito | iORANA Digital",
    description: "Análisis gratuito de tu web: velocidad, SEO técnico, mobile y conversión.",
    type: "website",
  },
};

const includes = [
  "Análisis de velocidad de carga y rendimiento",
  "Detección de errores técnicos SEO críticos",
  "Evaluación de experiencia móvil y usabilidad",
  "Oportunidades de mejora y quick wins",
  "Análisis básico de competencia digital",
];

export default function ComoEstaOptimizadoMiWeb() {
  return (
    <main className="bg-[#0a2b49] text-[#ebf2f7] min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* ── COLUMNA IZQUIERDA ── */}
        <div className="space-y-8">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff8c00]/10 border border-[#ff8c00]/20 text-[#ff8c00] text-xs font-bold uppercase tracking-widest">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Informe Gratuito
          </div>

          {/* H1 */}
          <h1 className="text-5xl md:text-6xl font-heading font-black leading-[1.1]">
            ¿Cómo está <br />
            <span className="text-[#ff8c00]">optimizada tu web?</span>
          </h1>

          <p className="text-lg text-[#ebf2f7]/70 max-w-lg leading-relaxed">
            Descubre el verdadero rendimiento de tu sitio web. Analizamos tu velocidad, SEO técnico, experiencia móvil y oportunidades de conversión — completamente gratis y sin compromiso.
          </p>

          {/* Qué incluye */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">
              ¿Qué incluye el{" "}
              <span className="text-[#ff8c00]">informe</span>?
            </h2>
            <ul role="list" className="grid gap-3">
              {includes.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[#ebf2f7]/80">
                  <CheckCircle2 className="text-[#ff8c00] h-5 w-5 shrink-0" aria-hidden="true" />
                  <span className="text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-6 pt-4 text-[11px] uppercase tracking-[0.2em] font-bold text-[#ebf2f7]/40">
            <span>✓ Sin compromiso</span>
            <span>✓ Respuesta en 24-48h</span>
            <span>✓ 100% gratuito</span>
          </div>
        </div>

        {/* ── COLUMNA DERECHA: FORMULARIO ── */}
        <div className="bg-[#07213a] p-8 md:p-10 rounded-2xl border border-white/10 shadow-2xl">
          <h2 className="text-2xl font-bold mb-8 text-white">
            Solicita <span className="text-[#ff8c00]">tu informe</span>
          </h2>

          <form
            action="/api/informe-web"
            method="POST"
            aria-label="Formulario solicitud informe gratuito"
            className="space-y-5"
          >
            {/* Nombre */}
            <div className="space-y-1.5">
              <label htmlFor="iw-name" className="block text-[10px] uppercase tracking-widest font-bold text-[#ebf2f7]/50">
                Nombre de contacto *
              </label>
              <input
                id="iw-name" name="name" type="text" required
                placeholder="Tu nombre"
                className="w-full bg-[#0a2b49] border border-white/10 rounded-xl h-12 px-4 text-sm text-[#ebf2f7] placeholder:text-[#7fa8c9] focus:outline-none focus:border-[#ff8c00]/50 transition-colors"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="iw-email" className="block text-[10px] uppercase tracking-widest font-bold text-[#ebf2f7]/50">
                Email *
              </label>
              <input
                id="iw-email" name="email" type="email" required
                placeholder="tu@email.com"
                className="w-full bg-[#0a2b49] border border-white/10 rounded-xl h-12 px-4 text-sm text-[#ebf2f7] placeholder:text-[#7fa8c9] focus:outline-none focus:border-[#ff8c00]/50 transition-colors"
              />
            </div>

            {/* Teléfono + URL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="iw-phone" className="block text-[10px] uppercase tracking-widest font-bold text-[#ebf2f7]/50">
                  Teléfono (opcional)
                </label>
                <input
                  id="iw-phone" name="phone" type="tel"
                  placeholder="+34 600 000 000"
                  className="w-full bg-[#0a2b49] border border-white/10 rounded-xl h-12 px-4 text-sm text-[#ebf2f7] placeholder:text-[#7fa8c9] focus:outline-none focus:border-[#ff8c00]/50 transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="iw-url" className="block text-[10px] uppercase tracking-widest font-bold text-[#ebf2f7]/50">
                  URL de tu sitio web
                </label>
                <input
                  id="iw-url" name="url" type="url"
                  placeholder="https://tusitio.com"
                  className="w-full bg-[#0a2b49] border border-white/10 rounded-xl h-12 px-4 text-sm text-[#ebf2f7] placeholder:text-[#7fa8c9] focus:outline-none focus:border-[#ff8c00]/50 transition-colors"
                />
              </div>
            </div>

            {/* Comentarios */}
            <div className="space-y-1.5">
              <label htmlFor="iw-message" className="block text-[10px] uppercase tracking-widest font-bold text-[#ebf2f7]/50">
                Comentarios *
              </label>
              <textarea
                id="iw-message" name="message" required rows={4}
                placeholder="Cuéntanos sobre tu negocio y qué mejorarías de tu web"
                className="w-full bg-[#0a2b49] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#ebf2f7] placeholder:text-[#7fa8c9] focus:outline-none focus:border-[#ff8c00]/50 transition-colors resize-y"
              />
            </div>

            {/* Legal */}
            <div className="flex items-start gap-3 pt-1">
              <input
                type="checkbox" id="iw-legal" required
                className="mt-1 w-3.5 h-3.5 accent-[#ff8c00] shrink-0"
              />
              <label htmlFor="iw-legal" className="text-[10px] text-[#ebf2f7]/40 leading-relaxed cursor-pointer">
                He leído y acepto la{" "}
                <Link href="/privacidad" className="text-[#ff8c00] underline underline-offset-2">
                  Política de Privacidad
                </Link>{" "}
                y los{" "}
                <Link href="/terminos" className="text-[#ff8c00] underline underline-offset-2">
                  Términos y Condiciones
                </Link>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-[#ff8c00] hover:bg-white text-[#08223a] font-bold rounded-xl h-14 text-base transition-all duration-300 cursor-pointer mt-2 group"
            >
              Quiero mi informe gratuito
              <Send className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" aria-hidden="true" />
            </button>
          </form>
        </div>

      </div>
    </main>
  );
}
