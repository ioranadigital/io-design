export const dynamic = "force-dynamic";
import React from "react";
import BreadCumb from "../../../Components/Common/BreadCumb";
import HeroBannerPlanes from "../../../Components/HeroBanner/HeroBannerPlanes";
import FeaturesSection from "../../../Components/FeaturesSection/FeaturesSection";
import Pricing3 from "../../../Components/Pricing/Pricing3";
import WebGratisSection from "../../../Components/WebGratis/WebGratisSection";
import ContactIno3 from "../../../Components/ContactInfo/ContactIno3";
import { CheckCircle, TrendingUp, Target } from "lucide-react";

const inicialFeatures = [
  {
    icon: <CheckCircle size={32} />,
    title: "Análisis Completo de tu Web",
    description:
      "Descubre cómo te buscan tus clientes, dónde falla tu sitio y qué hace la competencia. Datos claros para decisiones inteligentes.",
  },
  {
    icon: <Target size={32} />,
    title: "Identifica Oportunidades",
    description:
      "Encuentra las palabras clave con potencial, nichos sin explotar y estrategias que funcionan en tu sector.",
  },
  {
    icon: <TrendingUp size={32} />,
    title: "Plan de Acción Claro",
    description:
      "Recibe recomendaciones prioritarias y un roadmap de qué hacer primero para empezar a crecer.",
  },
];

const PlanesInicio = () => {
  return (
    <div style={{ backgroundColor: "#ffffff" }}>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Planes y Precios"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Planes y Precios", href: "/planes" },
          { label: "Plan Inicial" },
        ]}
      ></BreadCumb>

      <HeroBannerPlanes
        subtitle="Plan Inicial"
        title="Apúntate a Nuestro<br/><span style='color: #4D32A5;'>Plan Inicial</span>"
        content="Aparece más en búsquedas locales, gana visibilidad online y atrae más clientes desde una única plataforma con el respaldo de nuestros expertos"
        img="/assets/img/hero/hero3-main-img.png"
        showBreadcrumb={false}
      ></HeroBannerPlanes>

      <FeaturesSection
        title="¿Qué Incluye el"
        titleHighlight="Plan Inicial?"
        description="Comienza con un diagnóstico sólido de tu presencia digital. Entiende dónde estás, hacia dónde vas y cómo llegamos juntos."
        features={inicialFeatures}
      ></FeaturesSection>

      <Pricing3 highlightedPlan="inicial"></Pricing3>

      <WebGratisSection></WebGratisSection>

      <ContactIno3></ContactIno3>
    </div>
  );
};

export default PlanesInicio;
