"use client";

import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const serviceLinks = [
  { label: "SEO Técnico & On-Page",  href: "/servicios/seo-tecnico" },
  { label: "Google Business Local",  href: "/servicios/google-business-local" },
  { label: "PPC & Paid Search",      href: "/servicios/ppc-paid-search" },
  { label: "Content Marketing",      href: "/servicios/content-marketing" },
  { label: "Automatizaciones",       href: "/servicios/automatizaciones" },
  { label: "Desarrollo Web",         href: "/servicios/desarrollo-web" },
  { label: "Imagen de Marca",        href: "/servicios/imagen-de-marca" },
];

const pymesLinks = [
  { label: "Porqué digitalizar",     href: "/pymes/" },
  { label: "Todo para tu negocio",   href: "/pymes/todo-para-tu-negocio" },
  { label: "Proceso de trabajo",     href: "/pymes/proceso" },    
  { label: "Casos de éxito",         href: "/pymes/casos-de-exito" },
];

const scrollLinks = [
  { label: "Nosotros",           href: "/#nosotros" },
  { label: "Como trabajamos",    href: "/#metodologia" },
  { label: "FAQs",               href: "/#faqs" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [openServicios, setOpenServicios] = useState(false);
  const [openPymes, setOpenPymes] = useState(false);
  
  const [mobileSerOpen, setMobileSerOpen] = useState(false);
  const [mobilePymesOpen, setMobilePymesOpen] = useState(false);

  const pathname = usePathname();

  const dropdownClasses = (isOpen: boolean) => `
    absolute top-[70px] left-0 w-64 bg-[#07213a] border border-white/10 rounded-xl shadow-2xl p-4 
    transition-all duration-200 transform
    ${isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"}
  `;

  return (
    <nav className="fixed top-0 left-0 w-full z-[9999] bg-[#0a2b49]/95 backdrop-blur-md border-b border-white/10 font-sans" aria-label="Menú principal">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-6">

        {/* ── LOGO ── */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/iorana-seo-marketing-digital.png"
            alt="iORANA Digital - Agencia de Marketing y SEO"
            width={36} height={36}
            className="object-contain"

          />
          <span className="font-heading text-xl font-bold tracking-tight text-[#ebf2f7]">
            <span className="text-[#ff8c00]">iORANA</span>.digital
          </span>
        </Link>

        {/* ── DESKTOP MENU ── */}
        <div className="hidden md:flex items-center gap-7">
          <Link href="/" className="text-sm text-[#ebf2f7] hover:text-[#ff8c00] transition-colors font-medium">
            Inicio
          </Link>

          {/* DROP DOWN: SERVICIOS */}
          <div 
            className="relative h-20 flex items-center"
            onMouseEnter={() => setOpenServicios(true)}
            onMouseLeave={() => setOpenServicios(false)}
          >
            <button 
              className="flex items-center gap-1 text-sm text-[#ebf2f7] hover:text-[#ff8c00] transition-colors font-medium"
              aria-expanded={openServicios}
              aria-haspopup="true"
            >
              Servicios
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${openServicios ? "rotate-180 text-[#ff8c00]" : ""}`} />
            </button>
            <div className={dropdownClasses(openServicios)}>
              <ul className="space-y-1">
                {serviceLinks.map((s) => (
                  <li key={s.href}>
                    <Link href={s.href} className="block text-sm text-[#ebf2f7]/80 hover:text-[#ff8c00] hover:bg-white/5 px-3 py-2 rounded-lg transition-all">
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* DROP DOWN: PYMES */}
          <div 
            className="relative h-20 flex items-center"
            onMouseEnter={() => setOpenPymes(true)}
            onMouseLeave={() => setOpenPymes(false)}
          >
            <button 
              className="flex items-center gap-1 text-sm text-[#ebf2f7] hover:text-[#ff8c00] transition-colors font-medium"
              aria-expanded={openPymes}
              aria-haspopup="true"
            >
              Pymes
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${openPymes ? "rotate-180 text-[#ff8c00]" : ""}`} />
            </button>
            <div className={dropdownClasses(openPymes)}>
              <ul className="space-y-1">
                {pymesLinks.map((s) => (
                  <li key={s.href}>
                    <Link href={s.href} className="block text-sm text-[#ebf2f7]/80 hover:text-[#ff8c00] hover:bg-white/5 px-3 py-2 rounded-lg transition-all">
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ENLACES DE SCROLL (Nosotros, Metodología, FAQs) */}
          {scrollLinks.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-[#ebf2f7] hover:text-[#ff8c00] transition-colors font-medium">
              {l.label}
            </Link>
          ))}

          {/* INFORME GRATUITO (Posicionado después de FAQs) */}
          <Link 
            href="/informe-sitio-web-gratis" 
            className="text-sm text-[#ebf2f7] hover:text-[#ff8c00] transition-colors font-medium"
          >
            Informe Gratuito
          </Link>
          
          <Link href="/contacto" className="group relative text-sm font-semibold px-5 py-2 rounded-full bg-[#ff8c00] text-[#07213a] hover:bg-white transition-all duration-200 shadow-[0_0_16px_rgba(255,140,0,0.35)] hover:shadow-[0_0_24px_rgba(255,140,0,0.6)] hover:scale-105">
            Contáctanos
          </Link>
        </div>

        {/* ── HAMBURGER ── */}
        <button 
          className="md:hidden text-[#ebf2f7] p-2" 
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ── MOBILE MENU ── */}
      <div className={`md:hidden bg-[#07213a] border-t border-white/10 px-6 py-5 space-y-3 overflow-y-auto max-h-[80vh] transition-all ${open ? "block" : "hidden"}`}>
          <Link href="/" onClick={() => setOpen(false)} className="block w-full text-left text-[#ebf2f7] font-medium py-2">Inicio</Link>

          {/* Mobile Servicios */}
          <div>
            <button onClick={() => setMobileSerOpen(!mobileSerOpen)} className="flex justify-between items-center w-full text-[#ebf2f7] font-medium py-2">
              Servicios <ChevronDown className={`h-4 w-4 transition-transform ${mobileSerOpen ? "rotate-180" : ""}`} />
            </button>
            <div className={`${mobileSerOpen ? "block" : "hidden"} pl-4 space-y-2 pb-2`}>
                {serviceLinks.map((s) => (
                  <Link key={s.href} href={s.href} onClick={() => setOpen(false)} className="block py-1 text-sm text-[#ebf2f7]/70">{s.label}</Link>
                ))}
            </div>
          </div>

          {/* Mobile Pymes */}
          <div>
            <button onClick={() => setMobilePymesOpen(!mobilePymesOpen)} className="flex justify-between items-center w-full text-[#ebf2f7] font-medium py-2">
              Pymes <ChevronDown className={`h-4 w-4 transition-transform ${mobilePymesOpen ? "rotate-180" : ""}`} />
            </button>
            <div className={`${mobilePymesOpen ? "block" : "hidden"} pl-4 space-y-2 pb-2`}>
                {pymesLinks.map((s) => (
                  <Link key={s.href} href={s.href} onClick={() => setOpen(false)} className="block py-1 text-sm text-[#ebf2f7]/70">{s.label}</Link>
                ))}
            </div>
          </div>

          {scrollLinks.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block w-full text-left text-[#ebf2f7] font-medium py-2">{l.label}</Link>
          ))}

          {/* Informe Gratuito Mobile */}
          <Link 
            href="/informe-sitio-web-gratis" 
            onClick={() => setOpen(false)} 
            className="block w-full text-left text-[#ebf2f7] font-medium py-2"
          >
            Informe Gratuito
          </Link>

          <Link href="/contacto" onClick={() => setOpen(false)} className="block w-full text-center mt-4 py-3 rounded-xl bg-[#ff8c00] text-white font-semibold">
            Contáctanos
          </Link>
      </div>
    </nav>
  );
};

export default Navbar;