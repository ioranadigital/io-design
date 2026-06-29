"use client";

import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  servicios: [
    { label: "SEO Técnico",          href: "/servicios/seo-tecnico" },
    { label: "Google Business Local",href: "/servicios/google-business-local" },
    { label: "PPC & Paid Search",    href: "/servicios/ppc-paid-search" },
    { label: "Content Marketing",    href: "/servicios/content-marketing" },
    { label: "Automatizaciones",     href: "/servicios/automatizaciones" },
    { label: "Desarrollo Web",       href: "/servicios/desarrollo-web" },
    { label: "Imagen de Marca",      href: "/servicios/imagen-de-marca" },
  ],
  pymes: [
    { label: "Porqué digitalizar", href: "/pymes/" },
    { label: "Todo para tu negocio", href: "/pymes/todo-para-tu-negocio" },
    { label: "Proceso de trabajo", href: "/pymes/proceso" },
    { label: "Casos de éxito", href: "/pymes/casos-de-exito" },
  ],
  legal: [
    { label: "Aviso Legal", href: "/legal/terminos" },
    { label: "Privacidad", href: "/legal/privacidad" },
    { label: "Cookies", href: "/legal/cookies" },
  ]
};

const Footer = () => {
  return (
    <footer className="bg-[#0a2b49]/95 backdrop-blur-md border-t border-white/15 pt-16 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Columna 1: Logo y Bio */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/iorana-seo-marketing-digital.png"
                alt="iORANA Digital - Agencia SEO y Marketing"
                width={32} height={32}
              />
              <span className="text-xl font-bold text-white">
                <span className="text-[#ff8c00]">iORANA</span>.digital
              </span>
            </Link>
            <p className="text-[#ebf2f7]/60 text-sm leading-relaxed">
              Especialistas en digitalización acelerada para pymes y estrategias SEO de alto rendimiento.
            </p>
          </div>

          {/* Columna 2: Servicios */}
          <div>
            <h3 className="text-[#ff8c00] font-bold mb-5 uppercase tracking-wider text-xs">
              Servicios SEO
            </h3>
            <ul className="space-y-2"> {/* Interlineado ajustado de 4 a 2 */}
              {footerLinks.servicios.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#ebf2f7]/60 hover:text-[#ff8c00] text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Soluciones Pymes */}
          <div>
            <h3 className="text-[#ff8c00] font-bold mb-5 uppercase tracking-wider text-xs">
              Soluciones Pymes
            </h3>
            <ul className="space-y-2"> {/* Interlineado ajustado de 4 a 2 */}
              {footerLinks.pymes.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#ebf2f7]/60 hover:text-[#ff8c00] text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4: Legal */}
          <div>
            <h3 className="text-[#ff8c00] font-bold mb-5 uppercase tracking-wider text-xs">
              Legal
            </h3>
            <ul className="space-y-2"> {/* Interlineado ajustado de 4 a 2 */}
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#ebf2f7]/60 hover:text-[#ff8c00] text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
      {/* Bottom Bar */}
<div className="pt-8 border-t border-white/5 flex flex-col items-center justify-center gap-4">
  <p className="text-[#ebf2f7]/40 text-xs text-center">
    © {new Date().getFullYear()} Iorana Digital. Todos los derechos reservados.
  </p>
</div>
      </div>
    </footer>
  );
};

export default Footer;
