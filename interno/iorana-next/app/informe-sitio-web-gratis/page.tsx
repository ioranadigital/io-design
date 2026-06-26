// app/informe-sitio-web-gratis/page.tsx
"use client";

import { useState } from "react";
import { insertLead } from '@/lib/leads';
import { Check, CheckCircle2, Sparkles, Send, Phone } from "lucide-react";

export default function InformeGratisPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const website = formData.get("website") as string;
    const email = formData.get("email") as string;
    const nombre = formData.get("nombre") as string;
    const telefono = formData.get("telefono") as string;

    try {
      await insertLead({
        nombre: nombre,
        email: email,
        telefono: telefono,
        empresa: website, 
        mensaje: `Auditoría: ${website} | Competidor: ${formData.get("competidor")} | Nota: ${formData.get("duda")} | Newsletter: ${formData.get("marketing") === "on" ? 'Sí' : 'No'}`,
        fuente: 'informe-gratis',
        consentimiento_rgpd: true
      });
      setSubmitted(true);
    } catch (err) {
      setError("Error al enviar. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a2b49] selection:bg-[#ff8c00]/30 relative overflow-hidden font-sans">
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#ff8c00]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-20 lg:pt-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          
          {/* Bloque Izquierdo */}
          <div className="lg:sticky lg:top-24">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff8c00]/10 border border-[#ff8c00]/20 text-[#ff8c00] text-xs font-bold uppercase tracking-wider mb-8">
              INFORME GRATUITO
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black text-white leading-[1.1] tracking-tight mb-8">
              ¿Cómo está <br/>
              <span className="text-[#ff8c00]">optimizada tu web?</span>
            </h1>
            
            <p className="text-lg text-[#ebf2f7]/60 leading-relaxed max-w-xl mb-12">
              Descubre el verdadero rendimiento de tu sitio web. Analizamos tu velocidad, SEO técnico, experiencia móvil y oportunidades de conversión — completamente gratis y sin compromiso.
            </p>

            <div className="space-y-8">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                ¿Qué incluye el <span className="text-[#ff8c00]">informe</span>?
              </h3>
              <ul className="space-y-5">
                {[
                  "Análisis de velocidad de carga y rendimiento",
                  "Detección de errores técnicos SEO críticos",
                  "Evaluación de experiencia móvil y usabilidad",
                  "Oportunidades de mejora y quick wins",
                  "Análisis básico de competencia digital"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-[#ebf2f7]/80 group">
                    <CheckCircle2 className="w-5 h-5 text-[#ff8c00] shrink-0" />
                    <span className="text-lg font-medium group-hover:text-white transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-16 flex flex-wrap gap-x-8 gap-y-4 pt-8 border-t border-white/5">
              {[
                "SIN COMPROMISO",
                "RESPUESTA EN 24-48H",
                "100% GRATUITO"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[10px] font-semibold text-[#ebf2f7]/35 uppercase tracking-widest">
                  <Check className="w-4 h-4 text-[#ebf2f7]/25" strokeWidth={3} /> {text}
                </div>
              ))}
            </div>
          </div>

          {/* Bloque Formulario / Éxito */}
          <div className="relative min-h-[600px]">
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#ff8c00]/20 to-transparent blur-3xl opacity-10" />
            <div className="relative bg-[#08223a] p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-3xl h-full flex flex-col justify-center">
              
              {!submitted ? (
                <>
                  <h2 className="text-3xl font-bold text-white mb-8">Solicita <span className="text-[#ff8c00]">tu informe</span></h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-[#ebf2f7]/40 uppercase tracking-widest ml-1 tracking-[0.1em]">NOMBRE DE CONTACTO *</label>
                        <input name="nombre" type="text" required placeholder="Tu nombre" className="w-full text-sm bg-[#0a2b49]/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#ff8c00]/50 transition-all placeholder:text-[#ebf2f7]/20" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-[#ebf2f7]/40 uppercase tracking-widest ml-1 tracking-[0.1em]">TELÉFONO DE CONTACTO *</label>
                        <input name="telefono" type="tel" required placeholder="Tu teléfono" className="w-full text-sm bg-[#0a2b49]/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#ff8c00]/50 transition-all placeholder:text-[#ebf2f7]/20" />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-[#ebf2f7]/40 uppercase tracking-widest ml-1 tracking-[0.1em]">EMAIL CORPORATIVO *</label>
                        <input name="email" type="email" required placeholder="tu@empresa.com" className="w-full text-sm bg-[#0a2b49]/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#ff8c00]/50 transition-all placeholder:text-[#ebf2f7]/20" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-[#ebf2f7]/40 uppercase tracking-widest ml-1 tracking-[0.1em]">URL DE TU SITIO WEB *</label>
                        <input name="website" type="url" required placeholder="https://tusitio.com" className="w-full text-sm bg-[#0a2b49]/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#ff8c00]/50 transition-all placeholder:text-[#ebf2f7]/20" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-[#ebf2f7]/40 uppercase tracking-widest ml-1 tracking-[0.1em]">¿QUIÉN ES TU MAYOR COMPETIDOR? (OPCIONAL)</label>
                      <input name="competidor" type="text" placeholder="Ej: competencia.com" className="w-full text-sm bg-[#0a2b49]/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#ff8c00]/50 transition-all placeholder:text-[#ebf2f7]/20" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-[#ebf2f7]/40 uppercase tracking-widest ml-1 tracking-[0.1em]">¿QUÉ TE PREOCUPA DE TU WEB HOY? *</label>
                      <textarea name="duda" required rows={3} placeholder="Cuéntanos brevemente tu situación actual" className="w-full text-sm bg-[#0a2b49]/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#ff8c00]/50 transition-all resize-none placeholder:text-[#ebf2f7]/20" />
                    </div>

                    <div className="space-y-4 pt-2">
                      <div className="flex items-center gap-3">
                        <input id="legal" type="checkbox" required className="w-4 h-4 rounded bg-[#0a2b49] border-white/10 text-[#ff8c00] focus:ring-[#ff8c00] accent-[#ff8c00] cursor-pointer" />
                        <label htmlFor="legal" className="text-xs text-[#ebf2f7]/40 leading-none">
                          Acepto el tratamiento de mis datos según la <a href="/legal/privacidad" className="text-[#ff8c00] hover:underline font-medium underline-offset-2 italic">Política de Privacidad</a>. *
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#ff8c00] hover:bg-white text-[#08223a] font-bold py-5 rounded-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 text-base group shadow-xl"
                    >
                      {loading ? "Preparando análisis..." : "Quiero mi informe gratuito"}
                      {!loading && <Send className="w-4 h-4" strokeWidth={2.5} />}
                    </button>

                    {error && <p className="text-sm text-red-400 text-center font-bold mt-4">{error}</p>}
                  </form>
                </>
              ) : (
                /* Mensaje de éxito dentro del cajetín */
                <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-[#ff8c00]/10 rounded-full flex items-center justify-center mx-auto mb-8">
                    <Sparkles className="w-10 h-10 text-[#ff8c00]" />
                  </div>
                  <h2 className="text-4xl font-black text-white mb-6">¡Análisis solicitado!</h2>
                  <p className="text-lg text-[#ebf2f7]/60 leading-relaxed mb-10 max-w-sm mx-auto">
                    Estamos escaneando tu sitio web. En un plazo de **24-48 horas** recibirás el informe detallado en tu email corporativo.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="bg-[#ff8c00] text-[#08223a] font-bold px-10 py-4 rounded-xl hover:bg-white transition-colors text-sm uppercase tracking-widest"
                  >
                    Volver a intentarlo
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}