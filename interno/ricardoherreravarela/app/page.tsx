import type { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { SkillsSection } from "@/components/SkillsSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title:
    "Ricardo Herrera Varela | Digital PM · Consultor SEO · Director de Operaciones",
  description:
    "Digital Project Manager y Consultor SEO Senior especializado en transformación digital, automatización de procesos y excelencia operativa para empresas internacionales. Disponible para proyectos.",
};

// ─── JSON-LD Schemas ───────────────────────────────────────────────────────────

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ricardo Herrera Varela",
  url: "https://ricardoherreravarela.com",
  jobTitle: "Digital Project Manager & Consultor SEO Senior",
  description:
    "Especialista en transformación digital, automatización de procesos y excelencia operativa para empresas con presencia internacional.",
  sameAs: ["https://linkedin.com/in/ricardoherreravarela"],
  knowsAbout: [
    "SEO",
    "Digital Project Management",
    "Google Workspace",
    "Jira Service Management",
    "Automatización de Procesos",
    "N8N",
    "Make",
    "HubSpot",
    "Salesforce",
    "Gestión de Operaciones",
  ],
  image: "https://ricardoherreravarela.com/logoricardoherrera.png",
};

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Ricardo Herrera Varela — Consultoría Digital",
  url: "https://ricardoherreravarela.com",
  description:
    "Servicios de Digital Project Management, Consultoría SEO y Dirección de Operaciones para empresas en proceso de transformación digital.",
  founder: {
    "@type": "Person",
    name: "Ricardo Herrera Varela",
  },
  areaServed: ["ES", "MX", "US", "IT"],
  serviceType: [
    "Digital Project Management",
    "SEO Consulting",
    "Operations Management",
    "Process Automation",
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Inicio",
      item: "https://ricardoherreravarela.com",
    },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Ricardo Herrera Varela | Digital PM · Consultor SEO",
  url: "https://ricardoherreravarela.com",
  description:
    "Portafolio profesional de Ricardo Herrera Varela — Digital Project Manager, Consultor SEO Senior y Director de Operaciones.",
  author: {
    "@type": "Person",
    name: "Ricardo Herrera Varela",
  },
  inLanguage: "es",
  about: {
    "@type": "Person",
    name: "Ricardo Herrera Varela",
  },
};

// ──────────────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(professionalServiceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />

      <NavBar />
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <PortfolioSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
