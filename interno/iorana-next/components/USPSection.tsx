"use client";
import React from "react";
import { motion } from "framer-motion";
import { UserCheck, MessageSquare, Euro } from "lucide-react";

const pillars = [
  {
    icon: Euro,
    title: "Nos centramos en tus ventas",
    desc: "Olvida las métricas que no entiendes. A nosotros nos importa lo mismo que a ti: que entren más clientes y que tu negocio crezca.",
  },
  {
    icon: UserCheck,
    title: "Trato directo con Profesioanles",
    desc: "Sin secretarias ni intermediarios. Hablarás directamente con la persona que se encarga de que tu web funcione y tus anuncios vendan.",
  },
  {
    icon: MessageSquare,
    title: "Cuentas claras siempre",
    desc: "Te explicamos todo de forma sencilla, sin palabras raras. Sabrás en todo momento qué estamos haciendo y cómo se aprovecha tu inversión.",
  },
];

const USPSection = () => (
  <section className="py-24 relative bg-[#0a2b49] overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        {/* ✅ Texto superior en naranja exacto */}
        <span className="text-sm font-bold text-[#ff8c00] tracking-[0.2em] uppercase">
          ¿Por qué iORANA?
        </span>
        <h2 className="text-3xl md:text-5xl font-heading font-extrabold mt-4 text-[#ebf2f7] tracking-tight">
         Cuidamos de tu negocio <span className="text-[#ff8c00] drop-shadow-[0_0_15px_rgba(255,140,0,0.3)]">como si fuera el nuestro</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {pillars.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            // ✅ Hover con borde naranja exacto
            className="group p-8 rounded-3xl bg-[#08223a] border border-[#ebf2f7]/10 transition-all duration-500 hover:border-[#ff8c00]/40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
          >
            {/* Contenedor del Icono con color exacto */}
            <div className="w-14 h-14 rounded-2xl bg-[#0a2b49] border border-[#ebf2f7]/10 flex items-center justify-center mb-6 shadow-xl group-hover:bg-[#ff8c00]/10 group-hover:border-[#ff8c00]/20 transition-all">
              <p.icon className="h-7 w-7 text-[#ff8c00] drop-shadow-[0_0_8px_rgba(255,140,0,0.4)]" />
            </div>
            
            <h3 className="text-xl font-bold mb-4 text-[#ebf2f7] group-hover:text-white transition-colors">
              {p.title}
            </h3>
            <p className="text-[#ebf2f7]/60 leading-relaxed text-sm md:text-base">
              {p.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Decoración sutil de fondo para coherencia visual */}
    <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#ff8c00]/5 blur-[120px] rounded-full -z-10" />
  </section>
);

export default USPSection;