export const dynamic = "force-dynamic";
import React from "react";
import BreadCumb from "../../../Components/Common/BreadCumb";
import HeroBannerPlanes from "../../../Components/HeroBanner/HeroBannerPlanes";
import FeaturesSection from "../../../Components/FeaturesSection/FeaturesSection";
import Pricing3 from "../../../Components/Pricing/Pricing3";
import WebGratisSection from "../../../Components/WebGratis/WebGratisSection";
import ContactIno3 from "../../../Components/ContactInfo/ContactIno3";
import { Zap, BarChart3, TrendingUp } from "lucide-react";

const avanzadoFeatures = [
  {
    icon: <Zap size={32} />,
    title: "Automatización Inteligente",
    description:
      "Sistemas automáticos que trabajan 24/7. Lead capture, seguimiento de clientes y nurturing sin intervención manual.",
  },
  {
    icon: <BarChart3 size={32} />,
    title: "Análisis en Tiempo Real",
    description:
      "Dashboard personalizado con métricas que importan. Ve exactamente qué tráfico generan llamadas, cuántos clientes vienen de cada fuente.",
  },
  {
    icon: <TrendingUp size={32} />,
    title: "Escalamiento Sostenido",
    description:
      "Estrategia probada que adapta constantemente. A medida que creces, el sistema se ajusta para mantener rentabilidad y crecimiento.",
  },
];

const AvanzadoPage = () => {
  return (
    <div style={{ backgroundColor: "#ffffff" }}>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Planes y Precios"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Planes y Precios", href: "/planes" },
          { label: "Plan Avanzado" },
        ]}
      ></BreadCumb>

      <HeroBannerPlanes
        subtitle="Plan Avanzado"
        title="Elige el Plan Perfecto para tu Negocio"
        content="Nuestros planes están diseñados para adaptarse a las necesidades de tu empresa, desde startups hasta grandes corporaciones."
        img="/assets/img/hero/hero3-main-img.png"
      ></HeroBannerPlanes>

      <FeaturesSection
        title="¿Qué Incluye el"
        titleHighlight="Plan Avanzado?"
        description="Crecimiento acelerado con automatización, análisis profundo y estrategia de escalamiento. Para empresas con ambiciones de expansión."
        features={avanzadoFeatures}
      ></FeaturesSection>

      <Pricing3 highlightedPlan="avanzado"></Pricing3>

      <WebGratisSection></WebGratisSection>

      <ContactIno3></ContactIno3>
    </div>
  );
};

export default AvanzadoPage;
