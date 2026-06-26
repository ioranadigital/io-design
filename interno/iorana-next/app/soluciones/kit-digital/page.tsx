import { Metadata } from "next";
import KitDigital from "@/views/soluciones/KitDigital";

export const metadata: Metadata = {
  title: "Kit Digital | Agente Digitalizador | iORANA",
  description: "Te ayudamos a gestionar tu bono del Kit Digital para digitalizar tu negocio sin costes.",
  openGraph: {
    title: "Kit Digital | Agente Digitalizador | iORANA",
    description: "Te ayudamos a gestionar tu bono del Kit Digital para digitalizar tu negocio sin costes.",
    url: "https://iorana.digital/soluciones/kit-digital",
    siteName: "Iorana Digital",
    locale: "es_ES",
    type: "website",
    images: [{ url: "https://iorana.digital/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <KitDigital />;
}
