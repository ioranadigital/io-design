import React from "react";
import BreadCumb from "@/app/Components/Common/BreadCumb";
import HeroBannerPlanes from "@/app/Components/HeroBanner/HeroBannerPlanes";
import PymesProcess from "@/app/Components/PymesProcess";
import Faq1 from "@/app/Components/Faq/Faq1";
import ContactIno3 from "@/app/Components/ContactInfo/ContactIno3";

const ReservasOnlinePage = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Reservas Online"
      ></BreadCumb>

      <div style={{ fontSize: "0.85em" }} className="ficha-hero">
        <HeroBannerPlanes
          subtitle="Servicios Digitales"
          title="Reservas Online"
          content="Sistema de reservas y citas online para tu negocio. Facilita que tus clientes reserven sin necesidad de llamadas."
          img="/assets/img/hero/hero3-main-img.png"
        ></HeroBannerPlanes>
      </div>

      <PymesProcess></PymesProcess>

      <Faq1></Faq1>

      <ContactIno3></ContactIno3>
    </div>
  );
};

export default ReservasOnlinePage;
