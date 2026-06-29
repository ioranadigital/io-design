// components/ServicePageTemplate.tsx
import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ChevronDown } from "lucide-react";
import ServiceContactForm from "@/components/ServiceContactForm";

const C = {
  bg:           "bg-[#0a2b49]",
  panel:         "bg-[#07213a]",
  panelAlt:      "bg-[#0d3355]",
  border:        "border-white/10",
  text:          "text-[#ebf2f7]",
  muted:         "text-white",
  accent:        "text-[#ff8c00]",
  accentBg:      "bg-[#ff8c00]",
  accentHover:   "hover:bg-[#e67e00]",
} as const;

export interface ServicePageData {
  meta: { title: string; description: string; ogImage?: string };
  hero: {
    title: string;
    subtitle: string;
    whyPoints: string[];
    ctaLabel?: string;
    ctaHref?: string;
  };
  includes: { text: string }[];
  process:  { title: string; description: string }[];
  results:  { value: string; label: string }[];
  faq:      { q: string; a: string }[];
  form?:    { endpoint: string };
}

export function buildMetadata(data: ServicePageData): Metadata {
  return {
    title: `${data.meta.title} | iORANA Digital`,
    description: data.meta.description,
    openGraph: {
      title: data.meta.title,
      description: data.meta.description,
      images: data.meta.ogImage ? [data.meta.ogImage] : [],
      type: "website",
    },
    twitter: { card: "summary_large_image", title: data.meta.title },
  };
}

function SplitTitle({ text, center = false, size = "text-3xl md:text-4xl" }: { text: string; center?: boolean; size?: string }) {
  const words = text.trim().split(" ");
  const first = words[0];
  const rest  = words.slice(1).join(" ");
  return (
    <span className={`block font-extrabold leading-tight ${size} ${center ? "text-center" : ""}`}>
      <span className="text-white">{first}</span>
      {rest && <> <span className="text-[#ff8c00]">{rest}</span></>}
    </span>
  );
}

export default function ServicePageTemplate({ data }: { data: ServicePageData }) {
  const { hero, includes, process, faq } = data;

  return (
    /* Reducido pt-20 a pt-6 para maximizar Above the Fold */
    <main className={`w-full ${C.bg} ${C.text} font-body pt-6`}>

      {/* ── HERO: Reducido pt-12 a pt-6 ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="mb-4">
              <SplitTitle text={hero.title} size="text-4xl sm:text-5xl md:text-6xl" />
            </h1>
            <p className={`${C.muted} text-base max-w-lg leading-relaxed`}>{hero.subtitle}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <aside className="group relative bg-[#08223a] rounded-3xl border border-[#ebf2f7]/5 hover:border-[#ff8c00]/30 transition-all duration-500 shadow-2xl overflow-hidden p-7">
            <h2 className="flex items-center gap-2 text-xl font-bold text-[#ff8c00] mb-5">
              ¿Por qué <em className="not-italic ml-1">importa</em>?
            </h2>
            <ul role="list" className="space-y-4">
              {hero.whyPoints.map((p, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white">
                  <span aria-hidden="true" className="mt-1.5 w-2.5 h-2.5 rounded-full bg-[#ff8c00] shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-[#ff8c00] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </aside>

          <a
            href="/informe-sitio-web-gratis"
            className="block w-full text-center py-3 px-5 rounded-xl bg-[#ff8c00] hover:bg-white text-[#07213a] text-sm font-semibold transition-colors shadow-lg"
          >
            Empezar el diagnóstico gratuito →
          </a>
        </div>
      </section>

      {/* ── QUÉ INCLUYE ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <h2 className="mb-6">
          <SplitTitle text="¿Qué incluye?" size="text-2xl md:text-3xl" />
        </h2>
        <ul role="list" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {includes.map((item, i) => (
            <li
              key={i}
              className="group relative flex flex-col items-center text-center gap-4 rounded-3xl px-5 py-8 text-xs text-white leading-snug transition-all duration-500 shadow-2xl overflow-hidden hover:-translate-y-1 hover:shadow-black/30"
              style={{
                background: "rgba(129,140,248,0.06)",
                border: "1px solid rgba(129,140,248,0.18)",
              }}
            >
              <CheckCircle2 size={28} className="text-[#ff8c00] shrink-0" />
              <span className="text-sm font-medium leading-relaxed">{item.text}</span>
              {/* Decoración Hover */}
              <div
                className="absolute bottom-0 left-0 w-full h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ background: "#ff8c00" }}
              />
            </li>
          ))}
        </ul>
      </section>

      {/* ── PROCESO ── */}
      <section className="w-full bg-[#07213a] py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-14">
            <SplitTitle text="Nuestro proceso" center size="text-3xl md:text-4xl" />
          </h2>

          {/* Desktop: grid horizontal con línea conectora */}
          <div
            className="hidden md:grid gap-6 relative"
            style={{ gridTemplateColumns: `repeat(${process.length}, 1fr)` }}
          >
            <div
              aria-hidden="true"
              className="absolute top-[26px] left-[8%] right-[8%] h-px opacity-25"
              style={{ background: "linear-gradient(to right,#ff8c00,#818cf8,#34d399,#fbbf24,#f472b6)" }}
            />
            {process.map((step, i) => {
              const COLORS = ["#ff8c00","#818cf8","#34d399","#fbbf24","#f472b6"];
              const c = COLORS[i % COLORS.length];
              return (
                <div key={i} className="flex flex-col items-center text-center">
                  <div
                    className="relative z-10 w-[52px] h-[52px] rounded-2xl flex items-center justify-center mb-5 border font-black text-xl"
                    style={{ background:`${c}14`, borderColor:`${c}35`, color:c, boxShadow:`0 0 24px ${c}18` }}
                  >
                    {i + 1}
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full" style={{ background:c }} />
                  </div>
                  <h3 className="text-sm font-bold text-[#ff8c00] mb-2 leading-snug">{step.title}</h3>
                  <p className="text-xs text-white leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>

          {/* Mobile: timeline vertical */}
          <ol className="md:hidden space-y-8 relative" role="list">
            <div
              aria-hidden="true"
              className="absolute left-[27px] top-0 bottom-0 w-px opacity-20"
              style={{ background: "linear-gradient(to bottom,#ff8c00,#818cf8,#34d399,#fbbf24)" }}
            />
            {process.map((step, i) => {
              const COLORS = ["#ff8c00","#818cf8","#34d399","#fbbf24","#f472b6"];
              const c = COLORS[i % COLORS.length];
              return (
                <li key={i} className="relative flex gap-5">
                  <div
                    className="relative z-10 shrink-0 w-[54px] h-[54px] rounded-2xl flex items-center justify-center border font-black text-lg"
                    style={{ background:`${c}12`, borderColor:`${c}30`, color:c }}
                  >
                    {i + 1}
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-base font-bold text-[#ff8c00] mb-1">{step.title}</h3>
                    <p className="text-sm text-white leading-relaxed">{step.description}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ── FAQ + CONTACTO ── */}
      <section id="contacto" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="w-full">
            <div className="mb-10"> 
              <h2 className="mb-2">
                <SplitTitle text="Preguntas frecuentes" size="text-3xl md:text-4xl" />
              </h2>
              <p className={`${C.muted} text-sm`}>Resolvemos tus principales dudas.</p>
            </div>
            <dl className="flex flex-col gap-4">
              {faq.map((item, i) => (
                <div key={i} className={`${C.panel} border ${C.border} rounded-xl overflow-hidden`}>
                  <details className="group">
                    <summary className="flex justify-between items-center px-5 py-4 cursor-pointer text-sm font-semibold list-none text-[#adbac4]">
                      {item.q}
                      <ChevronDown size={18} className="text-[#adbac4] shrink-0 transition-transform duration-200 group-open:rotate-180" />
                    </summary>
                    <dd className="px-5 pb-5 text-sm text-[#ebf2f7] leading-relaxed">{item.a}</dd>
                  </details>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:sticky lg:top-28 w-full flex flex-col">
            <div className="mb-6">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-2">
                ¿Tienes <span className="text-[#ff8c00]">preguntas?</span>
              </h2>
              <p className={`${C.muted} text-sm`}>Estudiaremos tu caso sin compromiso.</p>
            </div>
            <div className="bg-[#07213a] border border-white/15 rounded-2xl p-8 shadow-2xl">
              <ServiceContactForm service={hero.title} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}