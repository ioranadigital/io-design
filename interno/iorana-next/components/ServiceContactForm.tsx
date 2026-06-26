// components/ServiceContactForm.tsx
"use client";

import { useState } from "react";
// Importación necesaria para que funcione el envío
import { insertLead } from '@/lib/leads';

const SERVICIOS = [
  "SEO Técnico & On-Page",
  "PPC & Paid Search",
  "Content Marketing",
  "Automatizaciones y CRM",
  "Desarrollo Web",
  "Imagen de Marca",
];

interface Props { service: string; }

export default function ServiceContactForm({ service }: Props) {
  const [loading,   setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error,     setError]     = useState<string | null>(null);
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState<string[]>([]);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const inputCls =
    "w-full bg-[#0a2b49] border border-white/10 rounded-lg px-4 py-3 text-sm text-[#ebf2f7] placeholder:text-[#7fa8c9] focus:outline-none focus:border-[#ff8c00] transition-colors";

  const toggleServicio = (s: string) =>
    setServiciosSeleccionados((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!acceptedTerms) { 
      setError("Por favor, acepta los términos legales para continuar."); 
      return; 
    }
    
    setLoading(true);
    setError(null);

    const form    = e.currentTarget;
    const data    = new FormData(form);
    const nombre  = data.get("name")    as string;
    const email   = data.get("email")   as string;
    const empresa = data.get("company") as string;
    const mensaje = data.get("message") as string;

    // Preparamos el array de servicios (Fase 1: TEXT[])
    const serviciosFinal: string[] = [
      service,  // El servicio principal de la página
      ...serviciosSeleccionados.filter(s => s !== service),
    ];

    const { error: sbError } = await insertLead({
      nombre,
      email,
      empresa:             empresa || null,
      servicios:           serviciosFinal,
      mensaje:             mensaje || null,
      fuente:              'servicios-detalle', // Identificador para páginas de servicio
      consentimiento_rgpd: true,
      acepta_marketing:    false 
    });

    setLoading(false);

    if (sbError) { 
      setError("Ha ocurrido un error. Inténtalo de nuevo."); 
      return; 
    }

    setSubmitted(true);
    form.reset();
    setServiciosSeleccionados([]);
    setAcceptedTerms(false);
  }

  if (submitted) {
    return (
      <div className="text-center py-10">
        <div className="w-14 h-14 rounded-full bg-[#ff8c00]/15 border border-[#ff8c00]/30 flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-[#ff8c00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-[#ebf2f7] mb-1">¡Mensaje recibido!</h3>
        <p className="text-sm text-[#7fa8c9]">Te respondemos en menos de 48h.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left" noValidate>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="sr-only" htmlFor="sf-name">Nombre</label>
          <input id="sf-name" name="name" type="text" placeholder="Nombre *" required className={inputCls} />
        </div>
        <div>
          <label className="sr-only" htmlFor="sf-email">Email</label>
          <input id="sf-email" name="email" type="email" placeholder="Email *" required className={inputCls} />
        </div>
      </div>

      <input id="sf-company" name="company" type="text" placeholder="Empresa / Web" className={inputCls} />

      {/* Selección múltiple de servicios */}
      <div>
        <p className="text-xs font-bold text-[#7fa8c9] uppercase tracking-widest mb-2">
          ¿Qué otros servicios te interesan?
        </p>
        <div className="flex flex-wrap gap-2">
          {SERVICIOS.map((s) => {
            const active = serviciosSeleccionados.includes(s) || s === service;
            const isMain = s === service;
            return (
              <button
                key={s}
                type="button"
                disabled={isMain}
                onClick={() => !isMain && toggleServicio(s)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200 ${
                  active
                    ? "bg-[#ff8c00] border-[#ff8c00] text-[#08223a] font-bold"
                    : "bg-transparent border-white/10 text-[#7fa8c9] hover:border-[#ff8c00]/40 hover:text-[#ff8c00]"
                } ${isMain ? "cursor-default" : "cursor-pointer"}`}
              >
                {active && "✓ "}{s}
              </button>
            );
          })}
        </div>
      </div>

      <textarea
        id="sf-message" name="message" rows={4} required
        placeholder="Cuéntanos sobre tu proyecto..."
        className={`${inputCls} resize-y`}
      />

      {/* Legal */}
      <div className="flex items-start gap-2.5">
        <input
          type="checkbox"
          id="sf-legal"
          required
          checked={acceptedTerms}
          onChange={(e) => setAcceptedTerms(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-white/10 bg-[#0a2b49] accent-[#ff8c00] cursor-pointer"
        />
        <label htmlFor="sf-legal" className="text-[11px] leading-snug text-[#ebf2f7]/60 cursor-pointer">
          He leído y acepto la{" "}
          <a href="/legal/privacidad" className="text-[#ff8c00] underline underline-offset-2 hover:opacity-80">Política de Privacidad</a>
          {" "}y los{" "}
          <a href="/legal/terminos" className="text-[#ff8c00] underline underline-offset-2 hover:opacity-80">Términos y Condiciones</a>.
          {" "}También puedes consultar nuestra{" "}
          <a href="/legal/cookies" className="text-[#ff8c00] underline underline-offset-2 hover:opacity-80">Política de Cookies</a>.
        </label>
      </div>

      {error && <p className="text-sm text-red-400 text-center bg-red-400/10 py-2 rounded-lg">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-6 font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 bg-[#ff8c00] hover:bg-white text-[#08223a] cursor-pointer disabled:opacity-60"
      >
        {loading ? "Enviando…" : "Enviar mensaje"}
        {!loading && (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        )}
      </button>
    </form>
  );
}