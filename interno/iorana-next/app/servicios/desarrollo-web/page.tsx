import { Metadata } from "next";
import DesarrolloWeb from "@/views/servicios/DesarrolloWeb";

export const metadata: Metadata = {
  title: "Desarrollo Web High-End | Diseño y Performance | iORANA",
  description: "Diseñamos y desarrollamos sitios web de alto rendimiento, optimizados para SEO y con una experiencia de usuario impecable.",
  openGraph: {
    title: "Desarrollo Web High-End | Diseño y Performance | iORANA",
    description: "Diseñamos y desarrollamos sitios web de alto rendimiento, optimizados para SEO y con una experiencia de usuario impecable.",
    url: "https://iorana.digital/servicios/desarrollo-web",
    siteName: "Iorana Digital",
    locale: "es_ES",
    type: "website",
    images: [{ url: "https://iorana.digital/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <DesarrolloWeb />;
}
