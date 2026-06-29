import type { Metadata } from "next";
import PymesSection from "@/components/PymesSection";
export const metadata: Metadata = {
  title: "Pack Digital para Pymes | Google Maps · Web · Soporte — Iorana Digital",
  description:
    "Solución digital integral para pymes: posicionamiento en Google Maps, web de alta conversión y soporte directo. Sin permanencia. Resultados en 90 días.",
  alternates: { canonical: "https://iorana.digital/pymes/todo-para-tu-negocio" },
  openGraph: {
    title: "Pack Digital para Pymes — Iorana Digital",
    description: "Google Maps · Web de Alta Conversión · Soporte Directo. Sin permanencia.",
    url: "https://iorana.digital/pymes/todo-para-tu-negocio",
    siteName: "Iorana Digital",
    locale: "es_ES",
    type: "website",
    images: [{ url: "https://iorana.digital/og/pymes-pack.jpg", width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

export default function TodoParaTuNegocioPage() {
  return (
    <>
      <PymesSection />

      {/* Internal links hacia páginas separadas */}
      <section aria-label="Más sobre el Pack Pyme" className="w-full py-16 bg-[#08223a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                href: "/pymes/proceso",
                eyebrow: "Metodología",
                title: "¿Cómo lo hacemos?",
                desc: "Proceso de 4 pasos para digitalizar tu negocio en 30 días. Sin tecnicismos.",
                cta: "Ver el proceso",
              },
              {
                href: "/pymes/casos-de-exito",
                eyebrow: "Resultados reales",
                title: "Casos de éxito",
                desc: "+80 pymes que ya crecen con Iorana Digital. Resultados medibles.",
                cta: "Ver casos de éxito",
              },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative bg-[#0a2b49] rounded-3xl border border-[#ebf2f7]/5 hover:border-[#ff8c00]/30 transition-all duration-500 p-8 flex flex-col gap-3 overflow-hidden"
              >
                <span className="text-xs font-bold text-[#ff8c00] tracking-widest uppercase">{l.eyebrow}</span>
                <h2 className="text-xl font-heading font-extrabold text-[#ebf2f7] group-hover:text-[#ff8c00] transition-colors">{l.title}</h2>
                <p className="text-sm text-[#ebf2f7]/55 leading-relaxed flex-1">{l.desc}</p>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-[#ebf2f7] group-hover:text-[#ff8c00] transition-colors mt-2">
                  {l.cta}
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </span>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#ff8c00] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
