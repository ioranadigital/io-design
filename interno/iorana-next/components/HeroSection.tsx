// components/HeroSection.tsx
"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const stats = [
  { value: "+250%", label: "Tráfico orgánico promedio" },
  { value: "3x",    label: "ROI en 6 meses" },
  { value: "50+",   label: "SaaS escalados" },
];

const HeroSection = () => {
  const router = useRouter();

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center overflow-hidden"
    >
      {/* ── FONDO COMPLETO ──
          - position: fixed NO, porque el scroll lo dejaría estático
          - Usamos inset-0 + w-screen centrado para romper el align-items:center del body
          - La imagen cubre todo con object-cover vía background-size: cover
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url("/assets/hero-bg.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Overlay degradado: oscurece más abajo para que el contenido sea legible */}
      <div
        aria-hidden="true"
        className="absolute inset-0 w-full h-full"
        style={{
          background:
            "linear-gradient(to right, rgba(10,43,73,0.93) 0%, rgba(10,43,73,0.78) 45%, rgba(10,43,73,0.28) 100%), linear-gradient(to bottom, rgba(10,43,73,0.20) 0%, rgba(10,43,73,0.55) 65%, rgba(10,43,73,0.95) 100%)",
        }}
      />

      {/* ── CONTENIDO ── */}
      <div
        className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        style={{
          paddingLeft: 'max(1.5rem, calc((100vw - 80rem) / 2 + 1.5rem))',
          paddingRight: 'max(1.5rem, calc((100vw - 80rem) / 2 + 1.5rem))',
          paddingTop: '8rem',
          paddingBottom: '5rem',
        }}
      >
        {/* Columna izquierda — texto */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-7 text-left"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#ff8c00]/30 bg-[#ff8c00]/10 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#ff8c00] animate-pulse" aria-hidden="true" />
            <span className="text-xs font-medium text-[#ebf2f7]">
              Posicionamiento SEO y Diseño web
            </span>
          </div>

          {/* H1 */}
          <h1 className="font-heading font-black leading-[1.1] text-5xl sm:text-6xl md:text-7xl mb-6 text-[#ebf2f7]">
            <span className="text-[#ff8c00]">Posiciona tu negocio</span>
            <br />
            donde tus clientes te buscan.
          </h1>

          <p className="text-lg md:text-xl text-[#ebf2f7]/75 max-w-2xl mb-10 leading-relaxed">
            Ayudamos a las empresas a multiplicar sus ventas con estrategias SEO
            basadas en datos, PPC de alto rendimiento y contenido que posiciona de verdad.
          </p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap gap-6 sm:gap-10 pt-8 border-t border-[#ebf2f7]/10"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-2xl md:text-3xl font-heading font-black text-[#ff8c00]">
                  {s.value}
                </div>
                <div className="text-sm text-[#ebf2f7]/55 mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Columna derecha — CTA */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-5 flex justify-center lg:justify-end"
        >
          <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-[#0d3355]/60 backdrop-blur-sm p-8 flex flex-col items-center gap-6 text-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#ff8c00] mb-2">Diagnóstico gratuito</p>
              <h2 className="text-xl font-black text-[#ebf2f7] leading-snug mb-2">
                ¿Cómo está tu sitio web?
              </h2>
              <p className="text-sm text-[#ebf2f7]/55 leading-relaxed">
                Analizamos tu presencia digital en menos de 48h. Sin compromiso.
              </p>
            </div>
            <Link
              href="/informe-sitio-web-gratis"
              className="inline-flex items-center gap-2 w-full justify-center px-6 py-4 rounded-full bg-[#ff8c00] text-[#07213a] font-bold text-sm hover:bg-white transition-all duration-200 shadow-[0_0_16px_rgba(255,140,0,0.35)] hover:shadow-[0_0_24px_rgba(255,140,0,0.6)] hover:scale-105"
            >
              Informe Gratuito <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="text-[11px] text-[#ebf2f7]/30">Sin registro · Resultado en 48h</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
