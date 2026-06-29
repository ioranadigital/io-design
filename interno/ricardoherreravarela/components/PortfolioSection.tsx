import Image from "next/image";

interface Project {
  id: number;
  title: string;
  image: string;
  imageAlt: string;
  description: string[];
  hitos: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Migración Office 365 → Google Workspace",
    image: "/google-workspace.gif",
    imageAlt: "Migración corporativa a Google Workspace",
    description: [
      "Lideré la migración integral hacia SaaS Google Workspace, diseñando una hoja de ruta centrada en la continuidad del negocio y la adopción del usuario.",
      "La compañía operaba bajo un ecosistema de Office 365 con una gobernanza descentralizada. La falta de unificación entre las sedes de España, México, USA e Italia generaba silos de información, problemas de compatibilidad en la colaboración en tiempo real y una carga excesiva para los equipos de soporte técnico.",
    ],
    hitos:
      "Eficiencia en Colaboración | Reducción de Incidencias Técnicas | Unificación de procesos operativos bajo estándares Cloud | Ahorro Operativo",
  },
  {
    id: 2,
    title: "Implementación Jira Services Management",
    image: "/jsm.jpg",
    imageAlt: "Implementación de Jira Service Management para sedes internacionales",
    description: [
      "Diseño y transición de un modelo de comunicación descentralizado hacia una plataforma centralizada (JSM) para sedes internacionales. Transformé flujos de trabajo informales en un sistema de Gobernanza de Datos trazable, logrando una reducción drástica en los tiempos de respuesta.",
      "El proyecto se centró en la estandarización de procesos (SOPs) para eliminar la dispersión de información, optimizando la asignación de recursos y garantizando la trazabilidad total de la operativa interna en entornos complejos y deslocalizados.",
    ],
    hitos:
      "Reducción de latencias operativas | Trazabilidad de solicitudes al 100% | Implementación en Sedes Internacionales",
  },
  {
    id: 3,
    title: "Ingeniería de Procesos y Excelencia Operativa",
    image: "/exelencia-operativa.png",
    imageAlt: "Arquitectura organizacional y excelencia operativa",
    description: [
      "Diseño de arquitectura organizacional escalable, transformando la complejidad de una compañía de más de 400 empleados y 4 sedes internacionales en un sistema eficiente mediante la implementación de SOPs, metodologías ágiles y una sólida gobernanza de datos.",
      "El foco central es optimizar la infraestructura interna para garantizar la trazabilidad total de KPIs, la rentabilidad de los recursos y la alineación de la operativa con los objetivos de negocio, logrando una optimización de la capacidad operativa en un 40%.",
    ],
    hitos:
      "Trazabilidad de KPIs | Optimización de la Rentabilidad de Recursos | Alineación Estratégica con Sedes Internacionales",
  },
];

export function PortfolioSection() {
  return (
    <section
      id="portafolio"
      aria-labelledby="portafolio-heading"
      className="py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4 text-center">
          Proyectos Destacados
        </p>

        <h2
          id="portafolio-heading"
          className="text-4xl font-bold mb-16 text-center"
        >
          Experiencia
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <article
              key={project.id}
              className="glass-card rounded-[2rem] overflow-hidden p-4"
              aria-labelledby={`project-${project.id}-title`}
            >
              {/* Project image */}
              <div className="relative h-48 rounded-2xl mb-6 overflow-hidden shadow-inner bg-slate-100">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  unoptimized={project.image.endsWith(".gif")}
                />
              </div>

              <div className="px-4 pb-4">
                <h3
                  id={`project-${project.id}-title`}
                  className="font-bold text-xl mb-3 text-slate-900"
                >
                  {project.title}
                </h3>

                {project.description.map((para, i) => (
                  <p key={i} className="text-sm text-slate-500 mb-4 leading-relaxed">
                    {para}
                  </p>
                ))}

                <p className="text-sm text-slate-500 leading-relaxed">
                  <strong className="text-slate-900 font-bold">Hitos: </strong>
                  {project.hitos}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
