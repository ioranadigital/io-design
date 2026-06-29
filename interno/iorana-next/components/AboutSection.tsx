"use client";
import React from "react";
import { motion } from "framer-motion";
import { Rocket, Users, Brain, Shield } from "lucide-react";

const values = [
  { icon: Rocket, label: "Velocidad", desc: "Iteramos rápido para conseguir resultados antes" },
  { icon: Brain, label: "Estrategia", desc: "Cada acción responde a un plan con datos" },
  { icon: Users, label: "Partnership", desc: "Somos una extensión de tu equipo" },
  { icon: Shield, label: "Transparencia", desc: "Reportes claros, sin métricas vanidosas" },
];

const AboutSection = () => (
  <section id="nosotros" className="w-full py-24 bg-[#0a2b49] overflow-visible">
    <div className="max-w-7xl mx-auto px-6 overflow-visible">
      
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center overflow-visible">
        
        {/* BLOQUE IZQUIERDO: TEXTOS */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="overflow-visible"
        >
          {/* Subtítulo en naranja exacto */}
          <span className="text-sm font-bold text-[#ff8c00] tracking-widest uppercase">
            Nosotros
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold mt-4 text-[#ebf2f7] leading-tight tracking-tight">
            Impulsamos el crecimiento de tu empresa <span className="text-[#ff8c00] drop-shadow-[0_0_10px_rgba(255,140,0,0.3)]">como si fuera la nuestra. </span>
          </h2>

          <div className="mt-8 space-y-4">
            <p className="text-[#ebf2f7]/70 text-lg leading-relaxed">
             iORANA Digital nace para ofrecer a empresas ambiciosas la ejecución técnica que el mercado actual exige. No creemos en fórmulas genéricas; creemos en estrategias diseñadas a medida para dominar tu sector desde el primer día.
            </p>
            <p className="text-[#ebf2f7]/70 text-lg leading-relaxed mb-10">
              Más que una agencia, somos tus aliados en la escalada de ingresos. Entendemos que en la nueva economía digital, el ROI y el crecimiento sostenible son los únicos indicadores que definen el éxito.
            </p>
          </div>

          {/* Grid de Valores */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
            {values.map((v, i) => (
              <motion.div
                key={v.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-6 rounded-2xl bg-[#08223a] border border-[#ebf2f7]/10 shadow-xl transition-all duration-300 hover:border-[#ff8c00]/30 hover:-translate-y-1 group"
              >
                <div className="flex items-center justify-center p-2 rounded-lg bg-[#0a2b49] group-hover:scale-110 transition-transform">
                  <v.icon className="h-6 w-6 text-[#ff8c00]" />
                </div>
                <div>
                  <div className="font-bold text-[#ebf2f7] mb-1 group-hover:text-[#ff8c00] transition-colors">
                    {v.label}
                  </div>
                  <div className="text-[#ebf2f7]/60 text-sm leading-snug">
                    {v.desc}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* BLOQUE DERECHO: TARJETA DE ESTADÍSTICAS (Card Neon) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative overflow-visible"
        >
          <div className="bg-[#08223a] p-6 md:p-10 rounded-3xl border border-[#ebf2f7]/10 shadow-2xl relative overflow-hidden">
            {/* Brillo de fondo naranja */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#ff8c00]/10 blur-3xl rounded-full" />
            
            {/* Número grande con resplandor */}
            <div className="text-6xl font-black text-[#ff8c00] mb-2 drop-shadow-[0_0_15px_rgba(255,140,0,0.4)]">
              50+
            </div>
            <div className="text-xl font-bold text-[#ebf2f7] mb-8">Empresas escaladas</div>
            
            <div className="space-y-8">
              {/* Barra 1 */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#ebf2f7]/80 font-medium">Renovación de Clientes</span>
                  <span className="text-[#ff8c00] font-bold text-lg">92%</span>
                </div>
                <div className="w-full bg-[#0a2b49] rounded-full h-2.5 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "92%" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="bg-[#ff8c00] h-full rounded-full shadow-[0_0_10px_rgba(255,140,0,0.3)]" 
                  />
                </div>
              </div>

              {/* Barra 2 */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#ebf2f7]/80 font-medium">ROI Medio Conseguido</span>
                  <span className="text-[#ff8c00] font-bold text-lg">x4.5</span>
                </div>
                <div className="w-full bg-[#0a2b49] rounded-full h-2.5 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "85%" }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                    className="bg-[#ff8c00] h-full rounded-full shadow-[0_0_10px_rgba(255,140,0,0.3)]" 
                  />
                </div>
              </div>

              <p className="text-xs text-[#ebf2f7]/40 italic pt-4 text-center">
                * Datos auditados basados en el último año fiscal.
              </p>
            </div>
          </div>
          
          {/* Elemento decorativo flotante bajo la tarjeta */}
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#ff8c00]/20 blur-3xl rounded-full -z-10" />
        </motion.div>

      </div>
    </div>
  </section>
);

export default AboutSection;