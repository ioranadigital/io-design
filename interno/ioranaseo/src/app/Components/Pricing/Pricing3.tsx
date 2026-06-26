"use client";
import { useState } from "react";
import PricingCard from "../Card/PricingCard";
import SectionTitle2 from "../Common/SectionTitle2";
import { FC } from "react";

interface Pricing3Props {
  highlightedPlan?: string;
}

const Pricing3: FC<Pricing3Props> = ({ highlightedPlan }) => {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  const plans = [
    {
      id: "inicial",
      title: "Plan Inicial",
      content:
        "Ideal para nuevos negocios o que no aparecen en Google. Ponemos tu negocio en el mapa de internet corrigiendo los fallos y definiendo las palabras exactas por las que te buscarán tus clientes.",
      features: [
        "Revisión y puesta a punto de tu web",
        "Estudio de Palabras Clave de tu negocio",
        "Títulos atractivos para Google",
        "Alta oficial en Google",
        "Informe mensual sencillo",
      ],
      price: "$299",
    },
    {
      id: "basico",
      title: "Plan Básico",
      content:
        "Ideal para empresas locales que necesitan que el teléfono suene todas las semanas. El motor para captar clientes en tu ciudad multiplicando tu presencia en mapas y directorios.",
      features: [
        "Todo del Plan Inicial",
        "Gestión de tu Ficha de Google Maps",
        "Sincronización en Directorios y Mapas",
        "Sistema para conseguir más Reseñas",
        "Textos enfocados a la venta",
        "Soporte técnico mensual",
      ],
      price: "$599",
      badge: "Más Vendido",
    },
    {
      id: "avanzado",
      title: "Plan Avanzado",
      content:
        "Ideal para PYMEs en sectores competitivos que quieren superar a los negocios de toda la vida. Adelanta a tu competencia creando contenidos nuevos todos los meses.",
      features: [
        "Todo del Plan Básico",
        "Vigilancia de tu competencia",
        "2 Artículos al mes para tu Web",
        "Especialistas en búsquedas de Vídeo",
        "Informe de resultados detallado",
      ],
      price: "$799",
    },
    {
      id: "premium",
      title: "Plan Premium",
      content:
        "La solución definitiva para empresas que quieren delegar todo su internet en un profesional sénior. Tu propio departamento de marketing digital con un asesor estratégico.",
      features: [
        "Todo del Plan Avanzado",
        "Asesor Digital Dedicado",
        "4 Artículos al mes para tu Web",
        "Optimización para Asistentes de Voz e IA",
        "Mejora del diseño para vender más",
      ],
      price: "$999",
    },
  ];

  const getOpacity = (planId: string) => {
    if (!highlightedPlan) return 1;
    if (planId === highlightedPlan || hoveredPlan === planId) return 1;
    return 0.5;
  };

  return (
    <div className="pricing3 sp">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 m-auto text-center">
            <div className="heading3">
              <SectionTitle2 Title="Elige tu Plan Inicial"></SectionTitle2>
            </div>
          </div>
        </div>
        <div className="space30"></div>
        <div className="row">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="col-lg-3 col-md-6"
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
              style={{
                opacity: getOpacity(plan.id),
                transition: "opacity 0.3s ease",
              }}
            >
              <PricingCard
                addclass={`pricing-box ${plan.id === highlightedPlan || (highlightedPlan && hoveredPlan === plan.id) ? "active" : ""}`}
                title={plan.title}
                content={plan.content}
                FeatureList={plan.features}
                price={plan.price}
                pricename="Mes"
                btnurl="/pricing"
                btnname="Me Interesa →"
                badge={plan.badge}
              ></PricingCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing3;
