"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Search,
  BarChart3,
  PenTool,
  Zap,
  MousePointer2,
  Palette,
  MapPin,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Search,
    subtitle: "Visibilidad",
    title: "SEO Técnico",
    desc: "Primeros resultados cuando tus clientes te buscan.",
    href: "/servicios/seo-tecnico",
    linkText: "Mejorar mi ranking",
  },
  {
    icon: MapPin,
    subtitle: "SEO Local",
    title: "Google Business",
    desc: "Top 3 en Maps. Más llamadas y visitas locales.",
    href: "/servicios/google-business-local",
    linkText: "Posicionamiento local",
  },
  {
    icon: BarChart3,
    subtitle: "Publicidad",
    title: "Google & Social Ads",
    desc: "Tráfico cualificado y ventas desde el primer día.",
    href: "/servicios/ppc-paid-search",
    linkText: "Captar clientes ya",
  },
  {
    icon: PenTool,
    subtitle: "Contenido",
    title: "Content Marketing",
    desc: "Contenido que genera confianza y convierte visitas.",
    href: "/servicios/content-marketing",
    linkText: "Ver estrategia",
  },
  {
    icon: Zap,
    subtitle: "Eficiencia",
    title: "Automatizaciones",
    desc: "Elimina tareas repetitivas con herramientas 24/7.",
    href: "/servicios/automatizaciones",
    linkText: "Optimizar procesos",
  },
  {
    icon: MousePointer2,
    subtitle: "Conversión",
    title: "Diseño Web CRO",
    desc: "Webs rápidas que convierten visitas en clientes.",
    href: "/servicios/desarrollo-web",
    linkText: "Vender más",
  },
  {
    icon: Palette,
    subtitle: "Identidad",
    title: "Branding para Pymes",
    desc: "Imagen profesional que transmite seriedad y valor.",
    href: "/pymes/todo-para-tu-negocio",
    linkText: "Renovar mi marca",
  },
];

const ServicesSection = () => (
  <section id="servicios" className="w-full py-20 bg-[#0a2b49] overflow-visible">
    <div className="max-w-7xl mx-auto px-6">

      {/* Cabecera */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto mb-12"
      >
        <span className="text-xs font-bold text-[#ff8c00] tracking-widest uppercase">
          Impulsa tu crecimiento
        </span>
        <h2 className="text-3xl md:text-5xl font-heading font-extrabold mt-3 text-[#ebf2f7] tracking-tight leading-tight">
          Soluciones <span className="text-[#ff8c00]">Estratégicas</span>
        </h2>
        <p className="mt-4 text-base text-[#ebf2f7]/60">
          Todo lo que tu negocio necesita para dominar su mercado digital.
        </p>
      </motion.div>

      {/* Grid 4 columnas desktop / 2 tablet / 1 móvil */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className={`group relative flex flex-col justify-between p-6 rounded-3xl border border-white/10 bg-[#08223a] backdrop-blur-sm overflow-hidden shadow-md shadow-black/20 transition-all duration-500 hover:bg-[#0d3355]/60 hover:border-[#ff8c00]/30 hover:shadow-2xl hover:shadow-[#ff8c00]/8${
              i === 6 ? " lg:col-span-2" : ""
            }`}
          >
            <div>
              {/* Icono */}
              <div className="flex items-center justify-center h-10 w-10 rounded-xl border border-white/10 mb-5 group-hover:border-[#ff8c00]/30 group-hover:bg-[#ff8c00]/10 transition-colors duration-500">
                <s.icon className="h-5 w-5 text-[#ff8c00]" />
              </div>

              {/* Subtítulo */}
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#ff8c00]/70 mb-2 block">
                {s.subtitle}
              </span>

              <h3 className="text-base font-bold text-[#ebf2f7] mb-2 leading-snug group-hover:text-white transition-colors duration-500">
                {s.title}
              </h3>
              <p className="text-sm text-[#ebf2f7]/50 leading-relaxed">
                {s.desc}
              </p>
            </div>

            <Link
              href={s.href}
              className="mt-5 text-sm font-bold text-[#ff8c00] flex items-center justify-end gap-1.5 group-hover:gap-2.5 transition-all duration-300"
            >
              {s.linkText} <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            {/* Barra naranja inferior — igual que Metodología */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-[#ff8c00] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
