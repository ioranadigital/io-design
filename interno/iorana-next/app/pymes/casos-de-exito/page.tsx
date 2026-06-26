// app/pymes/casos-de-exito/page.tsx
// ✅ SIN Navbar ni Footer — los gestiona app/layout.tsx globalmente
// URL: https://iorana.digital/pymes/casos-de-exito

import type { Metadata } from "next";
import PymesCases from "@/components/PymesCases";
import PymesContactForm from "@/components/PymesContactForm";
export const metadata: Metadata = {
  title: "Casos de éxito de pymes digitalizadas — Iorana Digital",
  description:
    "Resultados reales de pymes españolas: +340% llamadas Google Maps, 4.2% tasa de conversión web y NPS 91.",
  alternates: { canonical: "https://iorana.digital/pymes/casos-de-exito" },
  openGraph: {
    title: "Casos de éxito pymes — Iorana Digital",
    description: "Pymes que crecieron online con Iorana Digital. Resultados en 90 días.",
    url: "https://iorana.digital/pymes/casos-de-exito",
    siteName: "Iorana Digital",
    locale: "es_ES",
    type: "website",
    images: [{ url: "https://iorana.digital/og/pymes-casos.jpg", width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Casos de éxito de pymes digitalizadas por Iorana Digital",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Clínica Dental Oviedo — +340% llamadas orgánicas" },
      { "@type": "ListItem", position: 2, name: "Taller AutoService — 4.2% tasa de conversión" },
      { "@type": "ListItem", position: 3, name: "Academia de Inglés BCN — NPS 91" },
    ],
  },
];

export default function PymesCasosPage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}

      <PymesCases />
      <PymesContactForm />
    </>
  );
}
