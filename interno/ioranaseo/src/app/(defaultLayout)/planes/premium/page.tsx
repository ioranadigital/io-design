export const dynamic = "force-dynamic";
import React from "react";
import BreadCumb from "../../../Components/Common/BreadCumb";
import HeroBannerPlanes from "../../../Components/HeroBanner/HeroBannerPlanes";
import FeaturesSection from "../../../Components/FeaturesSection/FeaturesSection";
import Pricing3 from "../../../Components/Pricing/Pricing3";
import WebGratisSection from "../../../Components/WebGratis/WebGratisSection";
import ContactIno3 from "../../../Components/ContactInfo/ContactIno3";
import { Crown, Settings, Target } from "lucide-react";

const premiumFeatures = [
  {
    icon: <Crown size={32} />,
    title: "Acompañamiento Estratégico Exclusivo",
    description:
      "Account manager dedicado + reuniones semanales. Estrategia personalizada que evoluciona con tu negocio. Acceso directo a expertos.",
  },
  {
    icon: <Settings size={32} />,
    title: "Stack Tecnológico Completo",
    description:
      "CRM, marketing automation, analytics avanzado y herramientas premium integradas. Todo conectado para máxima eficiencia.",
  },
  {
    icon: <Target size={32} />,
    title: "Dominio Total de tu Mercado",
    description:
      "Posicionamiento multisistema: Google Search, Maps, redes sociales, email y presencia offline. Dominas dónde está tu cliente.",
  },
];

const PremiumPage = () => {
  return (
    <div style={{ backgroundColor: "#ffffff" }}>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Planes y Precios"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Planes y Precios", href: "/planes" },
          { label: "Plan Premium" },
        ]}
      ></BreadCumb>

      <HeroBannerPlanes
        subtitle="Plan Premium"
        title="Elige el Plan Perfecto para tu Negocio"
        content="Nuestros planes están diseñados para adaptarse a las necesidades de tu empresa, desde startups hasta grandes corporaciones."
        img="/assets/img/hero/hero3-main-img.png"
      ></HeroBannerPlanes>

      <FeaturesSection
        title="¿Qué Incluye el"
        titleHighlight="Plan Premium?"
        description="El máximo en soporte, tecnología y estrategia. Para empresas que quieren ser líderes indiscutibles en su mercado."
        features={premiumFeatures}
      ></FeaturesSection>

      <Pricing3 highlightedPlan="premium"></Pricing3>

      <WebGratisSection></WebGratisSection>

      <ContactIno3></ContactIno3>
    </div>
  );
};

export default PremiumPage;
