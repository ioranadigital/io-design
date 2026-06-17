"use client";
import { CheckCircle, Zap, Award } from "lucide-react";
import { FC } from "react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeaturesSection: FC = () => {
  const features: Feature[] = [
    {
      icon: <CheckCircle size={32} />,
      title: "Estrategia Personalizada",
      description:
        "Diseñamos una estrategia SEO Local única para tu negocio, basada en tu sector, competencia y objetivos específicos.",
    },
    {
      icon: <Zap size={32} />,
      title: "Resultados Rápidos",
      description:
        "Implementamos técnicas probadas que generan visibilidad en Google Local dentro de las primeras semanas de trabajo.",
    },
    {
      icon: <Award size={32} />,
      title: "Garantía de Posicionamiento",
      description:
        "Te posicionamos en el Local Pack de Google o ajustamos nuestra estrategia sin costo adicional hasta lograrlo.",
    },
  ];

  return (
    <section
      style={{
        padding: "80px 20px",
        backgroundColor: "#ffffff",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ marginBottom: "60px" }}>
          <h2
            style={{
              fontSize: "42px",
              fontWeight: "700",
              color: "#1a1a1a",
              marginBottom: "16px",
              lineHeight: "1.3",
              margin: "0 0 16px 0",
            }}
          >
            ¿Por qué elegir{" "}
            <span style={{ color: "#4D32A5" }}>Iorana SEO?</span>
          </h2>
          <div
            style={{
              height: "4px",
              width: "120px",
              backgroundColor: "#4D32A5",
              borderRadius: "2px",
              marginBottom: "24px",
            }}
          ></div>
          <p
            style={{
              maxWidth: "600px",
              color: "#666",
              fontSize: "16px",
              lineHeight: "1.6",
              margin: "0",
            }}
          >
            Somos especialistas en posicionar negocios locales en Google. Con
            más de 80 proyectos exitosos, sabemos exactamente qué funciona.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            alignItems: "center",
          }}
        >
          {/* Left Column - Features */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "40px",
            }}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "64px",
                    height: "64px",
                    minWidth: "64px",
                    borderRadius: "12px",
                    backgroundColor: "#EDE9FE",
                    color: "#4D32A5",
                    flexShrink: 0,
                  }}
                >
                  {feature.icon}
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "#1a1a1a",
                      marginBottom: "8px",
                      margin: "0 0 8px 0",
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    style={{
                      color: "#666",
                      fontSize: "15px",
                      lineHeight: "1.6",
                      margin: "0",
                    }}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Image/Logos */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#F3F4F6",
              borderRadius: "16px",
              padding: "60px 40px",
              minHeight: "400px",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                  color: "#4D32A5",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: "24px",
                  margin: "0 0 24px 0",
                }}
              >
                Confían en Nosotros
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "24px",
                  justifyItems: "center",
                }}
              >
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: "120px",
                      height: "80px",
                      backgroundColor: "#ffffff",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#999",
                      fontSize: "13px",
                      fontWeight: "600",
                      border: "1px solid #E5E7EB",
                    }}
                  >
                    Logo {i}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
