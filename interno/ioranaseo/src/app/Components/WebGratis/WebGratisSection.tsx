"use client";
import { FC, useRef } from "react";

const WebGratisSection: FC = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openModal = () => {
    dialogRef.current?.showModal();
  };

  const closeModal = () => {
    dialogRef.current?.close();
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "#4D32A5",
          padding: "32px 20px",
          marginTop: "40px",
          marginBottom: "0",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center" }}>
            <h2
              style={{
                fontSize: "32px",
                fontWeight: "700",
                color: "#ffffff",
                margin: "0 0 16px 0",
              }}
            >
              ¿Aún no tienes página web o tienda online?{" "}
              <span style={{ color: "#FF8C00" }}>¡Te la creamos!</span>
            </h2>

            <p
              style={{
                fontSize: "15px",
                color: "#f0f0f0",
                maxWidth: "700px",
                margin: "0 auto 24px",
                lineHeight: "1.6",
              }}
            >
              Si contratas cualquiera de nuestros planes de posicionamiento
              mensual, nosotros nos encargamos de diseñar tu página web o tienda
              online totalmente gratis, rápido y fácil.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "20px",
                marginBottom: "24px",
                maxWidth: "800px",
                margin: "0 auto 24px",
              }}
            >
              <div style={{ textAlign: "left" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "8px",
                    marginBottom: "6px",
                  }}
                >
                  <span
                    style={{
                      color: "#FF8C00",
                      fontSize: "18px",
                      fontWeight: "bold",
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </span>
                  <h3
                    style={{
                      color: "#ffffff",
                      fontSize: "14px",
                      fontWeight: "700",
                      margin: "0",
                    }}
                  >
                    Lista en tiempo récord
                  </h3>
                </div>
              </div>

              <div style={{ textAlign: "left" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "8px",
                    marginBottom: "6px",
                  }}
                >
                  <span
                    style={{
                      color: "#FF8C00",
                      fontSize: "18px",
                      fontWeight: "bold",
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </span>
                  <h3
                    style={{
                      color: "#ffffff",
                      fontSize: "14px",
                      fontWeight: "700",
                      margin: "0",
                    }}
                  >
                    Hecha para vender
                  </h3>
                </div>
              </div>

              <div style={{ textAlign: "left" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "8px",
                    marginBottom: "6px",
                  }}
                >
                  <span
                    style={{
                      color: "#FF8C00",
                      fontSize: "18px",
                      fontWeight: "bold",
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </span>
                  <h3
                    style={{
                      color: "#ffffff",
                      fontSize: "14px",
                      fontWeight: "700",
                      margin: "0",
                    }}
                  >
                    Adaptada al móvil
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        style={{
          maxWidth: "500px",
          width: "90%",
          padding: "0",
          border: "none",
          borderRadius: "20px",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
          backgroundColor: "rgba(245, 240, 250, 0.95)",
          margin: "auto",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <button
          onClick={closeModal}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            width: "40px",
            height: "40px",
            backgroundColor: "#ffffff",
            border: "none",
            borderRadius: "50%",
            fontSize: "24px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#333",
            zIndex: 10,
          }}
        >
          ✕
        </button>

        <div
          style={{
            padding: "40px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "700",
              color: "#4D32A5",
              margin: "0 0 16px 0",
            }}
          >
            ¡Llámanos Ahora!
          </h2>

          <p
            style={{
              color: "#666",
              fontSize: "14px",
              lineHeight: "1.6",
              margin: "0 0 32px 0",
            }}
          >
            Nuestro equipo está listo para explicarte cómo conseguir tu web
            gratis y responder todas tus preguntas.
          </p>

          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "24px",
              borderRadius: "12px",
              border: "2px solid #4D32A5",
              marginBottom: "24px",
            }}
          >
            <p
              style={{
                fontSize: "12px",
                color: "#666",
                margin: "0 0 8px 0",
              }}
            >
              Teléfono:
            </p>
            <p
              style={{
                fontSize: "28px",
                fontWeight: "700",
                color: "#FF8C00",
                margin: "0",
              }}
            >
              +34 603 149 158
            </p>
          </div>

          <p
            style={{
              color: "#666",
              fontSize: "13px",
              marginBottom: "24px",
            }}
          >
            Disponibles de lunes a viernes, de 9:00 a 18:00
          </p>

          <button
            onClick={closeModal}
            style={{
              padding: "12px 32px",
              backgroundColor: "#4D32A5",
              color: "#ffffff",
              border: "none",
              borderRadius: "20px",
              fontWeight: "700",
              fontSize: "14px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#3A2580";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#4D32A5";
            }}
          >
            Cerrar
          </button>
        </div>
      </dialog>
    </>
  );
};

export default WebGratisSection;
