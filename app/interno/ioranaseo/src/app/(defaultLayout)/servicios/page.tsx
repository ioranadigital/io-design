import BreadCumb from "@/app/Components/Common/BreadCumb";
import HeroBannerPlanes from "@/app/Components/HeroBanner/HeroBannerPlanes";
import Services6 from "@/app/Components/Services/Services6";
import ContactIno3 from "@/app/Components/ContactInfo/ContactIno3";
import React from "react";

const page = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Nuestros Servicios"
      ></BreadCumb>

      <HeroBannerPlanes
        subtitle="Servicios Digitales"
        title="Servicios SEO y Marketing Digital para tu Negocio"
        content="Ofrecemos soluciones digitales completas que te ayudan a posicionar tu marca, aumentar tráfico y convertir visitantes en clientes. Desde SEO hasta publicidad digital."
        img="/assets/img/hero/hero3-main-img.png"
      ></HeroBannerPlanes>

      <Services6></Services6>

      <ContactIno3></ContactIno3>
    </div>
  );
};

export default page;
