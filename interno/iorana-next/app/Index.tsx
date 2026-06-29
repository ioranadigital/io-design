// app/Index.tsx
"use client";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import USPSection from "@/components/USPSection";
import ServicesSection from "@/components/ServicesSection";
{/*import AboutSection from "@/components/AboutSection";*/}
import Metodologia from "@/components/Metodologia";
{/*import CasesSection from "@/components/CasesSection";*/}
{/*import CertificationsSection from "@/components/CertificationsSection";*/}
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "Iorana Digital | Agencia de Marketing Digital";
  }, []);

  return (
    <>
      <Navbar />
      <main
        style={{ width: "100vw", maxWidth: "100vw", overflowX: "hidden" }}
      >
        <HeroSection />

        <div id="servicios">
          <ServicesSection />
        </div>

        {/* <AboutSection /> */}

        <div id="metodologa">
          <Metodologia />
        </div>

        {/* <CasesSection /> */}
        
        {/* <div id="certificaciones">
          <CertificationsSection />
        </div> */}

        <div id="nosotros">
          <USPSection />
        </div>

        <div id="faqs">
          <FAQSection />
        </div>

        {/* <ContactSection /> */}
      </main>
    </>
  );
};

export default Index;