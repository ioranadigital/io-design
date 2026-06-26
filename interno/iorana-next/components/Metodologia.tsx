"use client";
import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Trophy, TrendingUp } from "lucide-react";
import Link from "next/link";

const cases = [
  {
    company: "Análisis 360°",
    result: "DIAGNÓSTICO",
    desc: "Identificamos cada fuga de tráfico y conversión en tu web antes de mover un solo píxel."
  },
  {
    company: "Ejecución Ágil",
    result: "IMPLEMENTACIÓN",
    desc: "Configuramos tus campañas y SEO técnico con precisión de ingeniería para ver resultados rápidos."
  },
  {
    company: "Optimización ROI",
    result: "CRECIMIENTO",
    desc: "Escalamos lo que funciona y cortamos lo que no. Tu presupuesto siempre bajo control y rentable."
  }
];

const CasesSection = () => {
  return (
    <section id="metodologia" className="w-full py-24 bg-[#0a2b49] overflow-visible">
      <div className="max-w-7xl mx-auto px-6 overflow-visible">
        
        {/* Cabecera - Restaurado mb-16 para separar del grid */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="text-sm font-bold text-[#ff8c00] tracking-widest uppercase flex items-center gap-2">
              <Trophy className="h-4 w-4" /> Nuestro Adn
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-extrabold mt-4 text-[#ebf2f7] tracking-tight">
              Nuestra <span className="text-[#ff8c00]">Metodología</span>        
            </h2>
            <p className="text-lg md:text-xl text-[#ebf2f7]/70 max-w-2xl mt-6 leading-relaxed font-normal">
              Ayudamos a las empresas a multiplicar sus ventas con estrategias SEO
              basadas en datos, PPC de alto rendimiento y contenido que posiciona de verdad.
            </p>
          </motion.div>
        </div>

        {/* Grid de metodologia - Restaurado gap-8 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 overflow-visible">
          {cases.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-[#08223a] rounded-3xl border border-[#ebf2f7]/5 overflow-hidden hover:border-[#ff8c00]/30 transition-all duration-500 shadow-2xl"
            >
              {/* Contenido - Restaurado p-8 y espaciado mb-4 */}
              <div className="p-8 relative z-20">
                <div className="flex items-center gap-2 text-[#ff8c00] mb-4">
                  <TrendingUp className="h-5 w-5" />
                  <span className="text-2xl font-black drop-shadow-[0_0_8px_rgba(255,140,0,0.4)]">
                    {c.result}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#ebf2f7] mb-4">{c.company}</h3>
                <p className="text-[#ebf2f7]/60 text-sm leading-relaxed mb-8">
                  {c.desc}
                </p>
                
                {/*<Link 
                  href="/metodologia" 
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#ebf2f7] group-hover:text-[#ff8c00] transition-colors"
                >
                  Saber Más <ExternalLink className="h-4 w-4" />
                </Link> */}
              </div>

              {/* Decoración Hover */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#ff8c00] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CasesSection;