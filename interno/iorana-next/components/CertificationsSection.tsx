"use client";
import { motion } from "framer-motion";
import { Award, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

// Lista de certificaciones con la misma estructura original
const certifications = [
  { name: "Google Partner", icon: Award },
  { name: "Meta Business Partner", icon: Award },
  { name: "HubSpot Certified", icon: Award },
  { name: "Semrush Academy", icon: Award },
  { name: "Google Analytics Certified", icon: Award },
];

const CertificationsSection = () => {
  const [current, setCurrent] = useState(0);
  const total = certifications.length;

  const next = useCallback(() => setCurrent((p) => (p + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + total) % total), [total]);

  // Rotación automática cada 3 segundos
  useEffect(() => {
    const interval = setInterval(next, 3000);
    return () => clearInterval(interval);
  }, [next]);

  // Función para obtener los índices visibles para el carrusel infinito
  const getVisibleIndices = (count: number) => {
    const indices: number[] = [];
    for (let i = 0; i < count; i++) {
      indices.push((current + i) % total);
    }
    return indices;
  };

  return (
    <section className="section-padding relative overflow-hidden bg-[#05192d] py-20">
      <div className="container mx-auto px-4">
        {/* Cabecera de la sección */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-[#ebf2f7] tracking-widest uppercase opacity-80">
            Confianza
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mt-3 text-[#ebf2f7]">
            Certificaciones & <span className="text-[#ff8c00]">Partnerships</span>
          </h2>
          <p className="text-[#ebf2f7]/60 mt-4 max-w-lg mx-auto text-center">
            Respaldados por las principales plataformas digitales
          </p>
        </motion.div>

        {/* Contenedor del Carrusel */}
        <div className="relative">
          {/* Botones de navegación (Flechas) */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-[#0a2b49] border border-[#ebf2f7]/20 flex items-center justify-center text-[#ebf2f7] hover:border-[#ff8c00] hover:text-[#ff8c00] transition-all hidden md:flex"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-[#0a2b49] border border-[#ebf2f7]/20 flex items-center justify-center text-[#ebf2f7] hover:border-[#ff8c00] hover:text-[#ff8c00] transition-all hidden md:flex"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Grid de Tarjetas - Adaptable por breakpoint */}
          <div className="mx-auto max-w-6xl px-4">
            {/* Móvil: Muestra 2 tarjetas */}
            <div className="flex md:hidden justify-center gap-4">
              {getVisibleIndices(2).map((idx, i) => (
                <div key={`m-${idx}-${i}`} className="w-[calc(50%-1rem)] min-w-[140px]">
                  <CertCard cert={certifications[idx]} />
                </div>
              ))}
            </div>

            {/* Tablet: Muestra 3 tarjetas */}
            <div className="hidden md:flex lg:hidden justify-center gap-6">
              {getVisibleIndices(3).map((idx, i) => (
                <div key={`t-${idx}-${i}`} className="w-1/3">
                  <CertCard cert={certifications[idx]} />
                </div>
              ))}
            </div>

            {/* Desktop: Muestra 5 tarjetas */}
            <div className="hidden lg:flex justify-center gap-6">
              {getVisibleIndices(5).map((idx, i) => (
                <div key={`d-${idx}-${i}`} className="flex-1">
                  <CertCard cert={certifications[idx]} />
                </div>
              ))}
            </div>
          </div>

          {/* Indicadores de Paginación (Puntos) */}
          <div className="flex justify-center gap-2 mt-12">
            {certifications.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === current ? "bg-[#ff8c00] w-8" : "bg-[#ebf2f7]/30 hover:bg-[#ebf2f7]/50"
                }`}
                aria-label={`Ir a certificación ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Componente secundario para la tarjeta individual
const CertCard = ({ cert }: { cert: { name: string; icon: typeof Award } }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    className="flex flex-col items-center justify-center p-6 md:p-10 lg:p-12 rounded-2xl border border-[#ebf2f7]/10 bg-[#0a2b49]/60 backdrop-blur-sm hover:border-[#ff8c00]/40 transition-all duration-300 h-full text-center"
  >
    <div className="w-16 h-16 rounded-xl bg-[#ff8c00]/10 border border-[#ff8c00]/20 flex items-center justify-center mb-8">
      <cert.icon className="h-8 w-8 text-[#ff8c00]" />
    </div>
    <span className="text-sm font-medium text-[#ebf2f7]/80 text-center leading-tight">
      {cert.name}
    </span>
  </motion.div>
);

export default CertificationsSection;