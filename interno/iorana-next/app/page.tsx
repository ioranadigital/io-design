import type { Metadata } from "next";
import Index from "./Index";

export const metadata: Metadata = {
  title: "Iorana Digital | Agencia SEO y Marketing",
  description:
    "Consultoría SEO y soluciones digitales para Pymes en Iorana Digital. Expertos en SEO técnico, automatizaciones y desarrollo web con Next.js. ¡Impulsa tu negocio hoy!",
  alternates: { canonical: "https://iorana.digital" },
  openGraph: {
    title: "Iorana Digital | Agencia SEO y Marketing",
    description:
      "Consultoría SEO y soluciones digitales para Pymes en Iorana Digital. Expertos en SEO técnico, automatizaciones y desarrollo web con Next.js. ¡Impulsa tu negocio hoy!",
    url: "https://iorana.digital",
    siteName: "Iorana Digital",
    locale: "es_ES",
    type: "website",
    images: [{ url: "https://iorana.digital/og/home.jpg", width: 1200, height: 630 }],
  },
};

export default function Page() {
  // El Layout ya se encarga del Navbar, Footer, Providers y el fondo azul.
  // Aquí solo entregamos el contenido de la Home.
  return <Index />;
} 
