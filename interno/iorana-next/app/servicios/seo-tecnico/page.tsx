import { Metadata } from "next";
import SeoTecnico from "@/views/servicios/SeoTecnico";

export const metadata: Metadata = {
  title: "SEO Técnico y On-Page | Auditoría y Optimización | iORANA",
  description: "Mejoramos la velocidad, indexación y estructura de tu web para escalar posiciones en Google de forma orgánica.",
  openGraph: {
    title: "SEO Técnico y On-Page | Auditoría y Optimización | iORANA",
    description: "Mejoramos la velocidad, indexación y estructura de tu web para escalar posiciones en Google de forma orgánica.",
    url: "https://iorana.digital/servicios/seo-tecnico",
    siteName: "Iorana Digital",
    locale: "es_ES",
    type: "website",
    images: [{ url: "https://iorana.digital/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <SeoTecnico />;
}
