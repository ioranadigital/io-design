// components/PymesContactForm.tsx
"use client";

import { useState } from "react";
import { insertLead } from '@/lib/leads';

const SERVICIOS = [
  "Posicionamiento en Google Maps",
  "Web de Alta Conversión para Pymes",
  "Soporte Directo sin Intermediarios",
  "Pack completo (los 3 servicios)",
];

export default function PymesContactForm() {
  const [formData, setFormData] = useState({
    nombre: "", email: "", telefono: "", empresa: "", mensaje: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState<string[]>([]);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) { 
      setError("Por favor, acepta los términos legales para continuar."); 
      return; 
    }
    if (!formData.nombre || !formData.email) { 
      setError("Rellena los campos obligatorios."); 
      return; 
    }
    setLoading(true);
    setError(null);

    // Llamada corregida a la función centralizada de la Fase 2
    const { error: sbError } = await insertLead({
      nombre: formData.nombre,
      email: formData.email,
      telefono: formData.telefono || null,
      empresa: formData.empresa || null,
      servicios: serviciosSeleccionados, 
      mensaje: formData.mensaje || null,
      fuente: 'pymes-pack', // Fuente específica para este formulario
      consentimiento_rgpd: true,
      acepta_marketing: false, // Valor por defecto ya que no hay checkbox de marketing
    });

    setLoading(false);
    
    if (!sbError) { 
      setSubmitted(true); 
      setServiciosSeleccionados([]); 
      setFormData({ nombre: "", email: "", telefono: "", empresa: "", mensaje: "" });
    } else { 
      setError("Error al enviar. Inténtalo de nuevo."); 
    }
  };

  return (
    <section
      id="contacto"
      aria-labelledby="form-section-h2"
      className="w-full py-24 bg-[#0a2b49]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-start">

          {/* ── Copy izquierda ── */}
          <div className="lg:w-5/12">
            <span className="text-sm font-bold text-[#ff8c00] tracking-widest uppercase flex items-center gap-2 mb-5">
              Hablemos de tu proyecto
            </span>
            <h2
              id="form-section-h2"
              className="text-3xl md:text-5xl font-heading font-extrabold text-[#ebf2f7] tracking-tight leading-tight mb-6"
            >
              ¿Listo para{" "}
              <span className="text-[#ff8c00]">crecer juntos?</span>
            </h2>
            <p className="text-[#ebf2f7]/60 text-base leading-relaxed mb-8">
              Cuéntanos tu proyecto y en menos de 48h te contactamos con un análisis
              inicial y una propuesta adaptada a tus objetivos.
            </p>

            <p className="text-sm font-bold text-[#ebf2f7]/70 mb-4">
              ¿En qué podemos <span className="text-[#ff8c00]">ayudarte</span>?
            </p>
            <ul className="space-y-3 mb-10">
              {SERVICIOS.map((s) => (
                <li key={s} className="flex items-center gap-3 text-sm text-[#ebf2f7]/60">
                  <svg className="w-4 h-4 text-[#ff8c00] shrink-0" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0z" />
                  </svg>
                  {s}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-6 text-xs text-[#ebf2f7]/30 uppercase tracking-widest">
              <span>Sin compromiso</span>
              <span className="text-[#ff8c00]/30">✓</span>
              <span>Respuesta en 24–48h</span>
              <span className="text-[#ff8c00]/30">✓</span>
              <span>Primera consulta gratis</span>
            </div>
          </div>

          {/* ── Formulario derecha ── */}
          <div className="lg:w-7/12 w-full">
            <div className="bg-[#08223a] rounded-3xl border border-[#ebf2f7]/5 p-8 lg:p-10">
              {submitted ? (
                <div role="alert" className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-[#ff8c00]/15 border border-[#ff8c00]/30 flex items-center justify-center mx-auto mb-5">
                    <svg className="w-8 h-8 text-[#ff8c00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-heading font-extrabold text-[#ebf2f7] mb-2">¡Mensaje recibido!</h3>
                  <p className="text-[#ebf2f7]/50 text-sm">Te contactamos en menos de 48h.</p>
                </div>
              ) : (
                <form noValidate onSubmit={handleSubmit} className="space-y-5" aria-label="Formulario Pack Pyme">
                  <p className="text-lg font-heading font-extrabold text-[#ebf2f7] mb-2">
                    Envíanos tu <span className="text-[#ff8c00]">consulta</span>
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="cf-nombre" className="block text-[10px] font-bold text-[#ebf2f7]/40 mb-1.5 uppercase tracking-widest">
                        Nombre de contacto *
                      </label>
                      <input
                        id="cf-nombre" type="text" required autoComplete="name"
                        placeholder="Tu nombre"
                        value={formData.nombre}
                        onChange={(e) => setFormData((f) => ({ ...f, nombre: e.target.value }))}
                        className="w-full bg-[#0a2b49] border border-[#ebf2f7]/10 rounded-xl px-4 py-3 text-sm text-[#ebf2f7] placeholder-[#ebf2f7]/25 focus:outline-none focus:border-[#ff8c00]/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="cf-email" className="block text-[10px] font-bold text-[#ebf2f7]/40 mb-1.5 uppercase tracking-widest">
                        Email *
                      </label>
                      <input
                        id="cf-email" type="email" required autoComplete="email"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))}
                        className="w-full bg-[#0a2b49] border border-[#ebf2f7]/10 rounded-xl px-4 py-3 text-sm text-[#ebf2f7] placeholder-[#ebf2f7]/25 focus:outline-none focus:border-[#ff8c00]/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="cf-tel" className="block text-[10px] font-bold text-[#ebf2f7]/40 mb-1.5 uppercase tracking-widest">
                        Teléfono (opcional)
                      </label>
                      <input
                        id="cf-tel" type="tel" autoComplete="tel"
                        placeholder="+34 600 000 000"
                        value={formData.telefono}
                        onChange={(e) => setFormData((f) => ({ ...f, telefono: e.target.value }))}
                        className="w-full bg-[#0a2b49] border border-[#ebf2f7]/10 rounded-xl px-4 py-3 text-sm text-[#ebf2f7] placeholder-[#ebf2f7]/25 focus:outline-none focus:border-[#ff8c00]/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="cf-empresa" className="block text-[10px] font-bold text-[#ebf2f7]/40 mb-1.5 uppercase tracking-widest">
                        Empresa / Web
                      </label>
                      <input
                        id="cf-empresa" type="text" autoComplete="organization"
                        placeholder="tuempresa.com"
                        value={formData.empresa}
                        onChange={(e) => setFormData((f) => ({ ...f, empresa: e.target.value }))}
                        className="w-full bg-[#0a2b49] border border-[#ebf2f7]/10 rounded-xl px-4 py-3 text-sm text-[#ebf2f7] placeholder-[#ebf2f7]/25 focus:outline-none focus:border-[#ff8c00]/50 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Selección múltiple de servicios */}
                  <div>
                    <p className="block text-[10px] font-bold text-[#ebf2f7]/40 mb-2 uppercase tracking-widest">
                      ¿Qué servicios te interesan? (selección múltiple)
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {SERVICIOS.map((s) => {
                        const active = serviciosSeleccionados.includes(s);
                        return (
                          <button
                            key={s}
                            type="button"
                            onClick={() =>
                              setServiciosSeleccionados((prev) =>
                                prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
                              )
                            }
                            className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200 ${
                              active
                                ? "bg-[#ff8c00] border-[#ff8c00] text-[#08223a] font-bold"
                                : "bg-transparent border-[#ebf2f7]/15 text-[#ebf2f7]/55 hover:border-[#ff8c00]/40 hover:text-[#ff8c00]"
                            }`}
                          >
                            {active && "✓ "}{s}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cf-msg" className="block text-[10px] font-bold text-[#ebf2f7]/40 mb-1.5 uppercase tracking-widest">
                      Cuéntanos tu proyecto *
                    </label>
                    <textarea
                      id="cf-msg" rows={4}
                      placeholder="¿Cuál es tu objetivo principal? ¿Qué retos tienes ahora mismo?"
                      value={formData.mensaje}
                      onChange={(e) => setFormData((f) => ({ ...f, mensaje: e.target.value }))}
                      className="w-full bg-[#0a2b49] border border-[#ebf2f7]/10 rounded-xl px-4 py-3 text-sm text-[#ebf2f7] placeholder-[#ebf2f7]/25 focus:outline-none focus:border-[#ff8c00]/50 transition-colors resize-none"
                    />
                  </div>

                  {/* Legal */}
                  <div className="flex items-start gap-3">
                    <input
                      id="pcf-legal"
                      type="checkbox"
                      required
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-white/10 bg-[#0a2b49] accent-[#ff8c00] cursor-pointer"
                    />
                    <label htmlFor="pcf-legal" className="text-[11px] leading-snug text-[#ebf2f7]/60 cursor-pointer">
                      He leído y acepto la{" "}
                      <a href="/legal/privacidad" className="text-[#ff8c00] underline hover:opacity-80">Política de Privacidad</a>
                      {" "}y los{" "}
                      <a href="/legal/terminos" className="text-[#ff8c00] underline hover:opacity-80">Términos y Condiciones</a>.
                      {" "}También puedes consultar nuestra{" "}
                      <a href="/legal/cookies" className="text-[#ff8c00] underline hover:opacity-80">Política de Cookies</a>.
                    </label>
                  </div>

                  {error && (
                    <p className="text-sm text-red-400 text-center bg-red-400/10 py-2 rounded-lg">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-2xl font-heading font-extrabold text-base text-[#08223a] bg-[#ff8c00] hover:bg-white hover:text-[#08223a] transition-all focus:outline-none focus:ring-2 focus:ring-[#ff8c00] focus:ring-offset-2 focus:ring-offset-[#08223a] flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {loading ? "Enviando…" : "Enviar mensaje"}
                    {!loading && (
                      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                        <path d="M3 8h10M9 4l4 4-4 4" />
                      </svg>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}