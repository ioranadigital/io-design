export const dynamic = "force-dynamic";
import React from "react";
import BreadCumb from "../../../Components/Common/BreadCumb";
import HeroBannerPlanes from "../../../Components/HeroBanner/HeroBannerPlanes";
import FeaturesSection from "../../../Components/FeaturesSection/FeaturesSection";
import Pricing3 from "../../../Components/Pricing/Pricing3";
import WebGratisSection from "../../../Components/WebGratis/WebGratisSection";
import ContactIno3 from "../../../Components/ContactInfo/ContactIno3";
import { Zap, Layers, Rocket } from "lucide-react";

const basicoFeatures = [
  {
    icon: <Zap size={32} />,
    title: "Web Optimizada y Rápida",
    description:
      "Eliminamos problemas técnicos que ralentizan tu sitio. Velocidad de carga, móvil-friendly y estructura perfecta.",
  },
  {
    icon: <Layers size={32} />,
    title: "Contenido que Convierte",
    description:
      "Textos, imágenes y CTA estratégicos diseñados para guiar a visitantes hacia la acción. De curiosos a clientes.",
  },
  {
    icon: <Rocket size={32} />,
    title: "Resultados en Semanas",
    description:
      "Empieza a ver mejoras en posicionamiento y conversiones en las primeras 4-6 semanas. Crecimiento real y medible.",
  },
];

const Inicio2Page = () => {
  return (
    <div style={{ backgroundColor: "#ffffff" }}>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Planes y Precios"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Planes y Precios", href: "/planes" },
          { label: "Plan Básico" },
        ]}
      ></BreadCumb>

      <HeroBannerPlanes
        subtitle="Planes y Precios"
        title="Elige el Plan Perfecto para tu Negocio"
        content="Nuestros planes están diseñados para adaptarse a las necesidades de tu empresa, desde startups hasta grandes corporaciones."
        img="/assets/img/hero/hero3-main-img.png"
      ></HeroBannerPlanes>

      <FeaturesSection
        title="¿Qué Incluye el"
        titleHighlight="Plan Básico?"
        description="Optimización completa de tu web y presencia online. Desde lo técnico hasta el contenido que convierte."
        features={basicoFeatures}
      ></FeaturesSection>

      <Pricing3 highlightedPlan="basico"></Pricing3>

      <WebGratisSection></WebGratisSection>

      <ContactIno3></ContactIno3>
    </div>
  );
};

export default Inicio2Page;
