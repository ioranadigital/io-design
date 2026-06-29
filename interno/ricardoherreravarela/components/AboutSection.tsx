const experiences = [
  {
    years: "+8 años",
    title: "Consultor SEO Senior",
    description:
      "Estratega Digital especializado en cuentas de alta autoridad (Seguros, Travel, Educación, Productos Consumo). Experto en diseñar arquitecturas de información orientadas a la conversión y visibilidad orgánica masiva.",
  },
  {
    years: "+4 años",
    title: "Digital Project Leader",
    description:
      "Especialista en liderar proyectos complejos bajo presión, reduciendo tiempos de entrega mediante metodologías ágiles y optimizando la rentabilidad de cada iniciativa digital.",
  },
  {
    years: "+6 años",
    title: "Head of Internal Operations",
    description:
      "Responsable de procesos y la gestión de flujos de información para asegurar la escalabilidad operativa interna de la compañía en mercados globales, integrando soluciones de automatización.",
  },
];

export function AboutSection() {
  return (
    <section
      id="sobre-mi"
      aria-labelledby="sobre-mi-heading"
      className="py-32 px-6 bg-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-16 items-start">
        {/* Left — sticky description */}
        <div className="lg:col-span-5 lg:sticky lg:top-32">
          <p className="text-sm font-bold text-blue-600 uppercase tracking-[0.2em] mb-6">
            Experiencia
          </p>

          <h2
            id="sobre-mi-heading"
            className="text-4xl md:text-5xl font-bold mb-8 text-slate-900 leading-tight"
          >
            Escalabilidad sin deuda técnica.
          </h2>

          <p className="text-slate-500 leading-relaxed mb-6 text-lg">
            Como Digital Project Manager y Consultor SEO Senior con una
            trayectoria consolidada en la intersección entre tecnología,
            arquitectura de la información y gestión de operaciones.
          </p>

          <p className="text-slate-500 leading-relaxed mb-6 text-lg">
            Como Head Internal Operations &amp; Integration puedo abordar los
            proyectos desde una perspectiva única: la organización inteligente
            de la información.
          </p>

          <p className="text-slate-500 leading-relaxed mb-6 text-lg">
            Entiendo el ciclo operativo completo y tengo la capacidad de
            aterrizar ideas complejas en procesos ejecutables que permiten a la
            dirección centrarse en el negocio mientras el backoffice funciona
            con precisión.
          </p>

          <blockquote className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100">
            <p className="text-sm text-slate-500 italic">
              &ldquo;Con una base sólida en ciencias de la información,
              operaciones, marketing y tecnología, ayudo a marcas a navegar la
              transformación digital.&rdquo;
            </p>
          </blockquote>
        </div>

        {/* Right — experience cards */}
        <div
          id="experiencia"
          className="lg:col-span-7 glass-card p-8 md:p-12 rounded-[3rem] border-blue-50 shadow-2xl"
          aria-label="Trayectoria profesional"
        >
          {experiences.map((exp, idx) => (
            <article
              key={exp.title}
              className={idx > 0 ? "mt-12 pt-10 border-t border-slate-100" : ""}
            >
              <p className="text-blue-600 font-bold text-4xl mb-3 tracking-tighter">
                {exp.years}
              </p>
              <h3 className="font-bold text-slate-900 mb-2 text-2xl">
                {exp.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {exp.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
