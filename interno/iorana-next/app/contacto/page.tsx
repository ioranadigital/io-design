// app/contacto/page.tsx
"use client";

import { useState } from "react";
import { insertLead } from '@/lib/leads';
import { CheckCircle2, Sparkles, Send, Check } from "lucide-react";

export default function ContactoPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    
    const { error: sbError } = await insertLead({
      nombre: formData.get("nombre") as string,
      email: formData.get("email") as string,
      empresa: formData.get("empresa") as string,
      telefono: formData.get("telefono") as string,
      mensaje: `Perfil: ${formData.get("perfil")} | Servicios: ${formData.get("servicios")} | Urgencia: ${formData.get("urgencia")} | Interés: ${formData.get("interes")} | Detalle: ${formData.get("mensaje")}`,
      fuente: 'pagina-contacto',
      consentimiento_rgpd: true
    });

    setLoading(false);
    if (sbError) {
      setError("Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.");
    } else {
      setSubmitted(true);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a2b49] selection:bg-[#ff8c00]/30 relative overflow-hidden font-sans">
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#ff8c00]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-20 lg:pt-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          
          {/* Columna Izquierda: Se mantiene siempre visible */}
          <div className="lg:sticky lg:top-24">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff8c00]/10 border border-[#ff8c00]/20 text-[#ff8c00] text-[10px] font-bold uppercase tracking-wider mb-8">
              <span className="w-2 h-2 bg-[#ff8c00] rounded-full animate-pulse" /> HABLEMOS DE TU PROYECTO
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight mb-8">
              ¿Listo para <br/>
              <span className="text-[#ff8c00]">crecer juntos?</span>
            </h1>
            
            <p className="text-lg text-[#ebf2f7]/60 leading-relaxed max-w-md mb-12">
              Cuéntanos tu proyecto y en menos de 48h te contactamos con un análisis inicial y una propuesta adaptada a tus objetivos.
            </p>

            <div className="space-y-8">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                ¿En qué podemos <span className="text-[#ff8c00]">ayudarte</span>?
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                {[
                  "SEO Técnico & On-Page",
                  "PPC & Paid Search",
                  "Content Marketing",
                  "Automatizaciones y CRM",
                  "Desarrollo Web",
                  "Imagen de Marca"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#ebf2f7]/80 group">
                    <CheckCircle2 className="w-5 h-5 text-[#ff8c00] shrink-0" />
                    <span className="text-base font-medium group-hover:text-white transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Columna Derecha: Contenedor del Formulario / Éxito */}
          <div className="relative min-h-[600px]">
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#ff8c00]/20 to-transparent blur-3xl opacity-10" />
            
            <div className="relative bg-[#08223a] p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-3xl h-full flex flex-col justify-center">
              
              {!submitted ? (
                <>
                  <h2 className="text-3xl font-bold text-white mb-8">Envíanos <span className="text-[#ff8c00]">tu consulta</span></h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <input name="nombre" type="text" required placeholder="Nombre de contacto *" className="w-full text-sm bg-[#0a2b49]/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#ff8c00]/50 transition-all placeholder:text-[#ebf2f7]/30" />
                      <input name="email" type="email" required placeholder="tu@email.com *" className="w-full text-sm bg-[#0a2b49]/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#ff8c00]/50 transition-all placeholder:text-[#ebf2f7]/30" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <input name="telefono" type="tel" placeholder="Teléfono (Opcional)" className="w-full text-sm bg-[#0a2b49]/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#ff8c00]/50 transition-all placeholder:text-[#ebf2f7]/30" />
                      <input name="empresa" type="text" placeholder="Empresa / Web" className="w-full text-sm bg-[#0a2b49]/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#ff8c00]/50 transition-all placeholder:text-[#ebf2f7]/30" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <select name="perfil" required defaultValue="" className="w-full text-sm bg-[#0a2b49]/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none appearance-none cursor-pointer">
                        <option value="" disabled>Perfil de empresa *</option>
                        <option value="pyme">PYME / Autonómo</option>
                        <option value="startup">Startup</option>
                        <option value="corporativo">Gran Empresa</option>
                      </select>
                      <select name="servicios" defaultValue="" className="w-full text-sm bg-[#0a2b49]/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none appearance-none cursor-pointer">
                        <option value="" disabled>¿Qué servicios necesitas?</option>
                        <option value="seo">SEO</option>
                        <option value="ads">Publicidad (SEM)</option>
                        <option value="web">Diseño Web</option>
                        <option value="all">Estrategia 360º</option>
                      </select>
                    </div>

                    <textarea name="mensaje" required rows={4} placeholder="¿Cuál es tu objetivo principal? ¿Qué retos tienes ahora mismo?" className="w-full text-sm bg-[#0a2b49]/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#ff8c00]/50 transition-all resize-none placeholder:text-[#ebf2f7]/30" />

                    <div className="flex items-start gap-3 pt-2">
                      <input id="legal" type="checkbox" required className="mt-1 w-4 h-4 rounded border-white/10 bg-[#0a2b49] text-[#ff8c00] focus:ring-[#ff8c00] accent-[#ff8c00]" />
                      <label htmlFor="legal" className="text-[11px] text-[#ebf2f7]/40 leading-tight">
                        He leído y acepto la <a href="/legal/privacidad" className="text-[#ff8c00] hover:underline">Política de Privacidad</a> y los <a href="/legal/terminos" className="text-[#ff8c00] hover:underline">Términos y Condiciones</a>.
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#ff8c00] hover:bg-white text-[#08223a] font-bold py-5 rounded-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 mt-4 shadow-xl group"
                    >
                      {loading ? "Enviando consulta..." : "Enviar mensaje"}
                      {!loading && <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
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
                  <h2 className="text-4xl font-black text-white mb-6">¡Mensaje enviado!</h2>
                  <p className="text-lg text-[#ebf2f7]/60 leading-relaxed mb-10 max-w-sm mx-auto">
                    Gracias por contactar. Un consultor SEO revisará tu mensaje y te responderá en menos de **48 horas**.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="bg-[#ff8c00] text-[#08223a] font-bold px-10 py-4 rounded-xl hover:bg-white transition-colors text-sm uppercase tracking-widest"
                  >
                    Volver al inicio
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