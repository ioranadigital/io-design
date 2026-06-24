"use client";

import { usePathname } from "next/navigation";
import { FC, useState } from "react";

const WhatsappCTA: FC = () => {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  const phoneNumber = "34603149158";
  const message =
    "Hola, quiero saber más sobre los planes de posicionamiento en Google y obtener mi web gratis.";
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  const handleClick = () => {
    // Dispara evento de Google Analytics
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "generate_lead", {
        pathname: pathname,
        campaign: "whatsapp_cta",
      });
    }

    // Abre WhatsApp
    window.open(whatsappUrl, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        backgroundColor: isHovered ? "#1FAE56" : "#25D366",
        color: "#ffffff",
        border: "none",
        borderRadius: "50px",
        padding: "12px 16px",
        fontSize: "14px",
        fontWeight: "700",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        zIndex: 9999,
        maxWidth: "320px",
        boxShadow: isHovered
          ? "0 20px 40px rgba(37, 211, 102, 0.4)"
          : "0 10px 25px rgba(37, 211, 102, 0.2)",
        transform: isHovered ? "scale(1.05)" : "scale(1)",
        transition: "all 0.3s ease-in-out",
        whiteSpace: "nowrap",
      }}
      title="Contacta por WhatsApp"
    >
      {/* Icono oficial de WhatsApp */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        style={{ flexShrink: 0 }}
      >
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.148.522 4.183 1.442 5.963L.454 24l6.386-2.119C9.606 23.149 10.761 23.5 12 23.5c6.627 0 12-5.373 12-12S18.627 0 12 0zm5.894 18.055c-.793.263-3.176.863-7.055-.788-.98-.432-2.165-1.029-2.838-1.703-.673-.674-.907-1.441-1.707-3.081-.8-1.64-2.268-4.241-2.268-6.431 0-2.19 1.415-3.265 1.912-3.762.497-.497 1.035-.622 1.381-.622.347 0 .693.001 1.037-.01.346-.013.81.129 1.268.981.458.853.906 2.27.986 2.46.081.19.132.41.022.65-.11.24-.562.512-.818.792-.256.28-.512.56-.793.84-.271.268-.545.559-.237.903.308.344.793.734 1.304 1.193.511.459 1.177 1.016 2.158 1.604.981.588 1.749 1.078 2.002 1.418.253.34.449.598.631.789.181.191.362.381.631.589.27.208.508.391.746.574.238.183.488.376.72.6.232.224.405.449.55.689.145.24.125.41.041.55-.084.14-.505.336-1.063.598z" />
      </svg>
      <span>Quiero mi web gratis ahora</span>
    </button>
  );
};

export default WhatsappCTA;
