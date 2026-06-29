"use client";
import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Trophy, TrendingUp } from "lucide-react";
import Link from "next/link";

const cases = [
  {
    company: "SaaS Techflow",
    result: "+145% MRR",
    tag: "SEO & Content",
    image: "/cases/saas-case.jpg", // Asegúrate de tener estas imágenes o usa placeholders
    desc: "Escalamos su adquisición orgánica de 2k a 45k visitas mensuales en 8 meses."
  },
  {
    company: "Fintech Pro",
    result: "x3.5 ROAS",
    tag: "PPC Ads",
    image: "/cases/fintech-case.jpg",
    desc: "Optimizamos su inversión en Google Ads reduciendo el CPA un 40%."
  },
  {
    company: "Cloud Service",
    result: "Top 3 Keywords",
    tag: "SEO Técnico",
    image: "/cases/cloud-case.jpg",
    desc: "Dominio total de términos de alta intención de compra en el mercado USA."
  }
];

const CasesSection = () => {
  return (
    <section id="casos" className="w-full py-24 bg-[#0a2b49] overflow-visible">
      <div className="max-w-7xl mx-auto px-6 overflow-visible">
        
        {/* Cabecera */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="text-sm font-bold text-[#ff8c00] tracking-widest uppercase flex items-center gap-2">
              <Trophy className="h-4 w-4" /> Resultados Reales
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-extrabold mt-4 text-[#ebf2f7] tracking-tight">
              Casos de <span className="text-[#ff8c00]">Éxito</span>
            </h2>
          </motion.div>
                    
        </div>

        {/* Grid de Casos */}
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
              {/* Imagen/Overlay */}
              <div className="h-48 bg-[#0a2b49] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#08223a] to-transparent z-10" />
                {/* Aquí iría la imagen <img src={c.image} ... /> */}
                <div className="absolute top-4 right-4 z-20">
                  <span className="px-3 py-1 rounded-full bg-[#0a2b49]/80 border border-white/10 text-[10px] font-bold text-[#ebf2f7] uppercase tracking-widest">
                    {c.tag}
                  </span>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-8 relative z-20 -mt-12">
                <div className="flex items-center gap-2 text-[#ff8c00] mb-2">
                  <TrendingUp className="h-5 w-5" />
                  <span className="text-2xl font-black drop-shadow-[0_0_8px_rgba(255,140,0,0.4)]">
                    {c.result}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#ebf2f7] mb-4">{c.company}</h3>
                <p className="text-[#ebf2f7]/60 text-sm leading-relaxed mb-8">
                  {c.desc}
                </p>
                
                <Link
                  href="/pymes/casos-de-exito"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#ebf2f7] group-hover:text-[#ff8c00] transition-colors"
                >
                  Ver Proyecto <ExternalLink className="h-4 w-4" />
                </Link>
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