const skills = [
  { category: "SEO", tools: "Semrush / GA4 / GEO / AEO / Sfrog" },
  { category: "WEB", tools: "HTML5 / CSS3 / JS" },
  { category: "SaaS", tools: "Google Workspace" },
  { category: "Seguridad", tools: "Keeper / Lastpass" },
  { category: "BPA / RPA", tools: "N8N / Make" },
  { category: "ITSM", tools: "Jira Services Management" },
  { category: "Ads", tools: "Meta / Google Ads" },
  { category: "CRM", tools: "Hubspot / Salesforce" },
];

export function SkillsSection() {
  return (
    <section
      id="habilidades"
      aria-labelledby="habilidades-heading"
      className="py-24 px-6 bg-slate-50"
    >
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">
          Ecosistema Tecnológico
        </p>

        <h2
          id="habilidades-heading"
          className="text-3xl md:text-4xl font-bold mb-16"
        >
          Herramientas &amp; Competencias
        </h2>

        <ul
          className="grid grid-cols-2 md:grid-cols-4 gap-6 list-none p-0"
          aria-label="Listado de herramientas y competencias"
        >
          {skills.map(({ category, tools }) => (
            <li
              key={category}
              className="skill-card"
            >
              <p className="text-3xl mb-4 text-blue-500 font-bold uppercase">
                {category}
              </p>
              <p className="text-sm font-bold text-slate-700">{tools}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
