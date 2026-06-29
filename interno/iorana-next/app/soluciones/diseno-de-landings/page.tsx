import { Metadata } from "next";
import DisenoLandings from "@/views/soluciones/DisenoLandings";

export const metadata: Metadata = {
  title: "Diseño de Landing Pages de Alta Conversión | iORANA Digital",
  description: "Creamos páginas de aterrizaje optimizadas para maximizar tus ventas y captar leads cualificados.",
  openGraph: {
    title: "Diseño de Landing Pages de Alta Conversión | iORANA Digital",
    description: "Creamos páginas de aterrizaje optimizadas para maximizar tus ventas y captar leads cualificados.",
    url: "https://iorana.digital/soluciones/diseno-de-landings",
    siteName: "Iorana Digital",
    locale: "es_ES",
    type: "website",
    images: [{ url: "https://iorana.digital/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <DisenoLandings />;
}
