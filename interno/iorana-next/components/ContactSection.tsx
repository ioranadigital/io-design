// components/ContactSection.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { insertLead } from '@/lib/leads';

const SERVICIOS = [
  "SEO Técnico & On-Page",
  "PPC & Paid Search",
  "Content Marketing",
  "Automatizaciones y CRM",
  "Desarrollo Web",
  "Imagen de Marca",
];

const ContactSection = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState<string[]>([]);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputCls =
    "w-full p-4 rounded-xl bg-[#0a2b49] border border-[#ebf2f7]/10 text-white placeholder:text-[#ebf2f7]/30 focus:outline-none focus:border-[#ff8c00] transition-colors";

  const toggleServicio = (s: string) =>
    setServiciosSeleccionados((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) {
      setError("Por favor, acepta los términos legales para continuar.");
      return;
    }
    if (!formData.nombre || !formData.email) {
      setError("Por favor, rellena los campos obligatorios.");
      return;
    }
    setLoading(true);
    setError(null);

    const { error: sbError } = await insertLead({
      nombre: formData.nombre,
      email: formData.email,
      telefono: null, // No existen en tu estado actual, se envían null
      empresa: null,  // No existen en tu estado actual, se envían null
      servicios: serviciosSeleccionados, 
      mensaje: formData.mensaje || null,
      fuente: 'home', 
      consentimiento_rgpd: true,
      acepta_marketing: false, // Cambiado de variable inexistente a valor por defecto
    });

    setLoading(false);
    if (sbError) { 
      setError("Error al enviar. Inténtalo de nuevo."); 
      return; 
    }
    
    setSubmitted(true);
    setFormData({ nombre: "", email: "", mensaje: "" });
    setServiciosSeleccionados([]);
    setAcceptedTerms(false);
  };

  return (
    <section id="contacto" className="w-full py-24 bg-[#0a2b49] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Columna izquierda */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff8c00]/10 border border-[#ff8c00]/20 text-[#ff8c00] text-xs font-bold uppercase tracking-widest mb-6">
              HABLEMOS DE TU PROYECTO
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-black mt-4 text-white leading-[1.1]">
              ¿Listo para <br /><span className="text-[#ff8c00]">crecer juntos?</span>
            </h2>
            <p className="mt-6 text-lg text-[#ebf2f7]/70 leading-relaxed mb-10 max-w-lg">
              Cuéntanos tu proyecto y en menos de 48h te contactamos con una propuesta adaptada.
            </p>
          </motion.div>

          {/* Formulario */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 md:p-10 rounded-3xl bg-[#08223a] border border-[#ebf2f7]/5 shadow-2xl"
          >
            {submitted ? (
              <div className="text-center py-10">
                <CheckCircle2 className="w-14 h-14 text-[#ff8c00] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">¡Recibido!</h3>
                <p className="text-[#ebf2f7]/50">Te escribiremos muy pronto.</p>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit} noValidate>

                <input
                  type="text" placeholder="Nombre de contacto *" required
                  className={inputCls}
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                />
                <input
                  type="email" placeholder="tu@email.com *" required
                  className={inputCls}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />

                {/* Selección múltiple de servicios */}
                <div>
                  <p className="text-xs font-bold text-[#ebf2f7]/40 uppercase tracking-widest mb-2">
                    ¿Qué servicios te interesan?
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SERVICIOS.map((s) => {
                      const active = serviciosSeleccionados.includes(s);
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => toggleServicio(s)}
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

                <textarea
                  placeholder="¿En qué podemos ayudarte?" rows={3}
                  className={`${inputCls} resize-none`}
                  value={formData.mensaje}
                  onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                />

                {/* Legal */}
                <div className="flex items-start gap-3">
                  <input
                    id="cs-legal"
                    type="checkbox"
                    required
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-white/10 bg-[#0a2b49] accent-[#ff8c00] cursor-pointer"
                  />
                  <label htmlFor="cs-legal" className="text-[11px] leading-snug text-[#ebf2f7]/60 cursor-pointer">
                    He leído y acepto la{" "}
                    <a href="/legal/privacidad" className="text-[#ff8c00] underline hover:opacity-80">Política de Privacidad</a>
                    {" "}y los{" "}
                    <a href="/legal/terminos" className="text-[#ff8c00] underline hover:opacity-80">Términos y Condiciones</a>.
                    {" "}También puedes consultar nuestra{" "}
                    <a href="/legal/cookies" className="text-[#ff8c00] underline hover:opacity-80">Política de Cookies</a>.
                  </label>
                </div>

                {error && (
                  <p className="text-sm text-red-400 font-medium text-center bg-red-400/10 py-2 rounded-lg">{error}</p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="w-full bg-[#ff8c00] hover:bg-white text-[#08223a] font-bold rounded-xl h-14 transition-all hover:scale-[1.02] shadow-[0_10px_30px_rgba(255,140,0,0.3)] disabled:opacity-60"
                >
                  {loading ? "Enviando…" : "Enviar mensaje"}
                  {!loading && <ArrowRight className="ml-2 h-5 w-5" />}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;