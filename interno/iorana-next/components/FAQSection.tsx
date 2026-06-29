"use client";
import { motion } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  MessageSquare, 
  Search, 
  BarChart3, 
  Settings, 
  ShieldCheck, 
  AlertCircle 
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const faqs = [
  { 
    question: "¿Cuánto se tarda en ver resultados SEO?", 
    answer: "El SEO es una inversión a medio plazo. Los cambios técnicos suelen mostrar impacto en 4-12 semanas, consolidándose entre los 6 y 9 meses de trabajo continuo.",
    icon: Search 
  },
  { 
    question: "¿Por qué necesito SEO Técnico?", 
    answer: "Es el motor de tu web. Sin una base técnica sólida (WPO, Indexación, Arquitectura), Google no mostrará tu contenido por muy bueno que sea.",
    icon: Settings 
  },
  { 
    question: "¿Diferencia entre SEO y PPC?", 
    answer: "El PPC da visibilidad inmediata pagada; el SEO construye autoridad orgánica recurrente. Combinarlos maximiza el ROI y reduce costes a largo plazo.",
    icon: BarChart3 
  },
  { 
    question: "¿Realizan auditorías previas?", 
    answer: "Sí. Todo proyecto en iorana.digital inicia con un diagnóstico profundo de tu web y competencia para trazar una hoja de ruta personalizada y real.",
    icon: ShieldCheck 
  },
  { 
    question: "¿Cómo miden el éxito?", 
    answer: "Nos enfocamos en KPIs de negocio: incremento de conversiones, reducción del CPA (Coste por Adquisición) y mejora real del retorno de inversión.",
    icon: MessageSquare 
  },
  { 
    question: "¿Recuperan tráfico caído?", 
    answer: "Identificamos si es una penalización algorítmica, un error técnico de rastreo o un cambio en la intención de búsqueda para ejecutar un plan de recuperación.",
    icon: AlertCircle 
  },
];

const FAQSection = () => {
  const [current, setCurrent] = useState(0);
  const total = faqs.length;

  const next = useCallback(() => setCurrent((p) => (p + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + total) % total), [total]);

  useEffect(() => {
    const interval = setInterval(next, 5000); 
    return () => clearInterval(interval);
  }, [next]);

  const getVisibleIndices = (count: number) => {
    const indices: number[] = [];
    for (let i = 0; i < count; i++) {
      indices.push((current + i) % total);
    }
    return indices;
  };

  return (
    <section id="faqs" className="section-padding relative overflow-hidden bg-[#0a2b49] py-20">
      <div className="container mx-auto px-6">
        
        {/* Cabecera */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-sm font-medium text-[#ebf2f7] tracking-widest uppercase opacity-80">
            Resolvemos tus dudas
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mt-4 text-[#ebf2f7]">
            Preguntas <span className="text-[#ff8c00]">Frecuentes</span>
          </h2>
          <p className="text-[#ebf2f7]/60 mt-6 max-w-2xl mx-auto text-lg">
            Estrategia, claridad y resultados. Todo lo que necesitas saber sobre cómo impulsamos el crecimiento de iorana.digital.
          </p>
        </motion.div>

        <div className="relative">
          {/* Navegación */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 w-12 h-12 rounded-full bg-[#0a2b49] border border-[#ebf2f7]/20 flex items-center justify-center text-[#ebf2f7] hover:border-[#ff8c00] hover:text-[#ff8c00] transition-all hidden xl:flex"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 w-12 h-12 rounded-full bg-[#0a2b49] border border-[#ebf2f7]/20 flex items-center justify-center text-[#ebf2f7] hover:border-[#ff8c00] hover:text-[#ff8c00] transition-all hidden xl:flex"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="mx-auto max-w-7xl">
            {/* Mobile: 1 tarjeta */}
            <div className="flex md:hidden justify-center">
              {getVisibleIndices(1).map((idx) => (
                <div key={`m-${idx}`} className="w-full">
                  <FAQCard faq={faqs[idx]} />
                </div>
              ))}
            </div>

            {/* Tablet: 2 tarjetas */}
            <div className="hidden md:flex lg:hidden justify-center gap-8">
              {getVisibleIndices(2).map((idx) => (
                <div key={`t-${idx}`} className="w-1/2">
                  <FAQCard faq={faqs[idx]} />
                </div>
              ))}
            </div>

            {/* Desktop: 3 tarjetas */}
            <div className="hidden lg:flex justify-center gap-8">
              {getVisibleIndices(3).map((idx) => (
                <div key={`d-${idx}`} className="w-1/3">
                  <FAQCard faq={faqs[idx]} />
                </div>
              ))}
            </div>
          </div>

          {/* Indicadores */}
          <div className="flex justify-center gap-3 mt-14">
            {faqs.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === current ? "bg-[#ff8c00] w-10" : "bg-[#ebf2f7]/20 hover:bg-[#ebf2f7]/40 w-2.5"
                }`}
                aria-label={`Ver pregunta ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQCard = ({ faq }: { faq: { question: string; answer: string; icon: any } }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex flex-col p-6 rounded-2xl border border-white/10 bg-[#0d3355]/60 backdrop-blur-sm hover:border-[#ff8c00]/30 hover:bg-[#0a2b49] transition-all duration-500 h-full min-h-[200px] shadow-md shadow-black/20"
  >
    <div className="w-10 h-10 rounded-xl bg-[#ff8c00]/10 border border-[#ff8c00]/20 flex items-center justify-center mb-5">
      <faq.icon className="h-5 w-5 text-[#ff8c00]" />
    </div>
    <h3 className="text-base font-bold text-[#ebf2f7] mb-3 leading-snug">
      {faq.question}
    </h3>
    <p className="text-sm leading-relaxed text-[#ebf2f7]/60">
      {faq.answer}
    </p>
  </motion.div>
);

export default FAQSection;