export const dynamic = "force-dynamic";
import React from "react";
import BreadCumb from "../../Components/Common/BreadCumb";
import HeroBannerPlanes from "../../Components/HeroBanner/HeroBannerPlanes";
import Pricing3 from "../../Components/Pricing/Pricing3";
import WebGratisSection from "../../Components/WebGratis/WebGratisSection";
import ContactIno3 from "../../Components/ContactInfo/ContactIno3";

const PlanesPage = () => {
  return (
    <div style={{ backgroundColor: "#ffffff" }}>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Planes y Precios"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Planes y Precios" },
        ]}
      ></BreadCumb>

      <HeroBannerPlanes
        subtitle="Planes y Precios"
        title="Elige el Plan Perfecto para tu Negocio"
        content="Nuestros planes están diseñados para adaptarse a las necesidades de tu empresa, desde startups hasta grandes corporaciones."
        img="/assets/img/hero/hero3-main-img.png"
      ></HeroBannerPlanes>

      <Pricing3></Pricing3>

      <WebGratisSection></WebGratisSection>

      <ContactIno3></ContactIno3>
    </div>
  );
};

export default PlanesPage;
