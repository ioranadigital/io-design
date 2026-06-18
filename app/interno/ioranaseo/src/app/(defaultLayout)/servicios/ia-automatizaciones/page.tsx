import React from "react";
import BreadCumb from "@/app/Components/Common/BreadCumb";
import HeroBannerPlanes from "@/app/Components/HeroBanner/HeroBannerPlanes";
import FeaturesSection from "@/app/Components/FeaturesSection/FeaturesSection";
import NuestroProcesoLocal from "@/app/Components/NuestroProcesoLocal/NuestroProcesoLocal";
import ContactIno3 from "@/app/Components/ContactInfo/ContactIno3";

const IAAutomatizacionesPage = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="IA y Automatizaciones"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Servicios", href: "/servicios" },
          { label: "IA y Automatizaciones" },
        ]}
      ></BreadCumb>

      <div style={{ fontSize: "0.85em" }} className="ficha-hero">
        <HeroBannerPlanes
          subtitle="Servicios Digitales"
          title="Implementamos <span style='color: #4D32A5;'>IA y Automatizaciones</span>"
          content="Automatiza tus procesos con inteligencia artificial. Reduce tiempos, aumenta eficiencia y ahorra costos operacionales."
          img="/assets/img/hero/hero3-main-img.png"
          showImage={false}
        ></HeroBannerPlanes>
      </div>

      <FeaturesSection
        title="¿Es Necesario implementar"
        titleHighlight="IA y Automatizaciones?"
        description="La inteligencia artificial es el futuro. Automatizar tus procesos te permite enfocarte en lo que realmente importa: el crecimiento de tu negocio y la satisfacción de tus clientes."
      ></FeaturesSection>

      <NuestroProcesoLocal
        title="¿Cómo Implementaremos"
        titleHighlight="IA y Automatizaciones?"
        description="Proceso probado en más de 80 proyectos. Soluciones inteligentes que transforman tu operación."
      ></NuestroProcesoLocal>

      <ContactIno3></ContactIno3>
    </div>
  );
};

export default IAAutomatizacionesPage;
