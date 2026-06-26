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
  ArrowRight, 
  TrendingUp 
} from "lucide-react";
import Link from "next/link";

const services = [
  { 
    icon: Search, 
    subtitle: "Visibilidad",
    title: "SEO Técnico & On-Page", 
    desc: "Hacemos que tu página web sea fácil de encontrar para que, cuando alguien busque lo que ofreces, tú seas la primera opción.", 
    href: "/servicios/seo-tecnico",
    linkText: "Posicionamiento SEO" // Texto personalizado
  },
  { 
    icon: BarChart3, 
    subtitle: "Publicidad",
    title: "PPC & Paid Search", 
    desc: "Creamos campañas en Google y Redes Sociales diseñadas para atraer a personas interesadas en comprar tus productos o servicios hoy mismo.", 
    href: "/servicios/ppc-paid-search",
    linkText: "PPC"
  },
  { 
    icon: PenTool, 
    subtitle: "Contenido",
    title: "Content Marketing", 
    desc: "Escribimos y creamos materiales que explican el valor de tu negocio, generan confianza y convencen a tus visitas de elegirte a ti.", 
    href: "/servicios/content-marketing",
    linkText: "Crear contenido"
  },
  { 
    icon: Zap, 
    subtitle: "Eficiencia",
    title: "Automatizaciones", 
    desc: "Conectamos tus herramientas para que no pierdas tiempo en tareas repetitivas y puedas centrarte en atender a tus nuevos clientes.", 
    href: "/servicios/automatizaciones",
    linkText: "Ahorrar tiempo"
  },
  { 
    icon: MousePointer2, 
    subtitle: "Conversión",
    title: "Desarrollo Web (CRO)", 
    desc: "Diseñamos páginas modernas, rápidas y muy fáciles de usar, pensadas exclusivamente para que tus visitas se conviertan en ventas.", 
    href: "/servicios/desarrollo-web",
    linkText: "Como Mejorar mi web"
  },
  { 
    icon: Palette, 
    subtitle: "Pymes",
    title: "Todo para Tu Negocio", 
    desc: "Creamos una identidad visual que transmite seriedad y confianza desde el primer segundo, haciendo que tu marca sea inolvidable.", 
    href: "/pymes/todo-para-tu-negocio",
    linkText: "Renovar mi imagen"
  },
];

const ServicesSection = () => (
  <section id="servicios" className="w-full py-24 bg-[#0a2b49] overflow-visible">
    <div className="max-w-7xl mx-auto px-6 overflow-visible">
      
      {/* Cabecera de la sección */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <span className="text-sm font-bold text-[#ff8c00] tracking-widest uppercase">
          Qué hacemos por ti
        </span>
        <h2 className="text-3xl md:text-5xl font-heading font-extrabold mt-4 text-[#ebf2f7] tracking-tight leading-tight">
          Nuestros <span className="text-[#ff8c00] drop-shadow-[0_0_10px_rgba(255,140,0,0.3)]">Servicios</span>
        </h2>
        <p className="mt-6 text-lg text-[#ebf2f7]/70">
          Soluciones claras y directas para que tu negocio destaque en internet y consigas más clientes cada día.
        </p>
      </motion.div>

      {/* Grid de Servicios */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-visible">
        {services.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group flex flex-col justify-between p-8 rounded-2xl bg-[#08223a] border border-[#ebf2f7]/10 transition-all duration-300 hover:border-[#ff8c00]/30 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#ff8c00]/10"
          >
            <div>
              {/* Icono Principal */}
              <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-[#0a2b49] border border-[#ebf2f7]/5 mb-6 group-hover:bg-[#ff8c00]/10 transition-colors">
                <s.icon className="h-6 w-6 text-[#ff8c00] drop-shadow-[0_0_5px_rgba(255,140,0,0.3)]" />
              </div>

              {/* Subtítulo Naranja con Icono de Tendencia */}
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-3.5 w-3.5 text-[#ff8c00]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff8c00]">
                  {s.subtitle}
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#ebf2f7] mb-3 group-hover:text-white transition-colors">
                {s.title}
              </h3>
              <p className="text-sm text-[#ebf2f7]/60 leading-relaxed mb-6">
                {s.desc}
              </p>
            </div>
            
            {/* Enlace con texto personalizado por servicio */}
            <Link 
              href={s.href} 
              className="text-sm font-bold text-[#ff8c00] flex items-center gap-1.5 pt-4 group-hover:gap-2 transition-all"
            >
              {s.linkText} <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;