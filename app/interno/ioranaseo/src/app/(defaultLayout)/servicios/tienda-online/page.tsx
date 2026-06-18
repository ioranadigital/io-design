import React from "react";
import BreadCumb from "@/app/Components/Common/BreadCumb";
import HeroBannerPlanes from "@/app/Components/HeroBanner/HeroBannerPlanes";
import FeaturesSection from "@/app/Components/FeaturesSection/FeaturesSection";
import NuestroProcesoLocal from "@/app/Components/NuestroProcesoLocal/NuestroProcesoLocal";
import ContactIno3 from "@/app/Components/ContactInfo/ContactIno3";

const TiendaOnlinePage = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Tienda Online"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Servicios", href: "/servicios" },
          { label: "Tienda Online" },
        ]}
      ></BreadCumb>

      <div style={{ fontSize: "0.85em" }} className="ficha-hero">
        <HeroBannerPlanes
          subtitle="Servicios Digitales"
          title="Tienda Online : <span style='color: #4D32A5;'>E-Commerce</span>"
          content="Plataformas de e-commerce seguras y escalables. Vende productos online y multiplica tus ingresos con nuestra solución integral."
          img="/assets/img/hero/hero3-main-img.png"
          showImage={false}
        ></HeroBannerPlanes>
      </div>

      <FeaturesSection
        title="¿Por qué tener una"
        titleHighlight="Tienda Online?"
        description="Vender online es el futuro del comercio. Con una tienda online profesional, alcanzas clientes 24/7, aumentas tus ventas y escalas tu negocio sin límites geográficos."
      ></FeaturesSection>

      <NuestroProcesoLocal></NuestroProcesoLocal>

      <ContactIno3></ContactIno3>
    </div>
  );
};

export default TiendaOnlinePage;
