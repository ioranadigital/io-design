import Link from "next/link";

export function HeroSection() {
  return (
    <section
      aria-label="Presentación"
      className="min-h-screen flex flex-col justify-center items-center px-6 pt-20"
    >
      <div className="max-w-4xl text-center">
        <p className="text-blue-600 font-bold uppercase tracking-[0.2em] text-xs mb-4">
          Disponible para Proyectos
        </p>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-slate-900 tracking-tight">
          Ricardo Herrera Varela
        </h1>

        <p className="text-4xl md:text-5xl font-semibold mb-8 text-gradient">
          Digital Project Manager, Consultor SEO y Eficiencia Operativa.
        </p>

        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Especialista en convertir ideas complejas en interfaces digitales
          funcionales, asegurando que cada proceso, desde la gestión de
          proyectos internos hasta la supervisión administrativa, funcione con
          precisión.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link
            href="#contacto"
            className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold shadow-2xl shadow-blue-200 hover:scale-105 transition-transform"
          >
            Contacto
          </Link>
          <Link
            href="#portafolio"
            className="bg-white border border-slate-200 px-10 py-4 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Ver Trabajos
          </Link>
        </div>
      </div>
    </section>
  );
}
