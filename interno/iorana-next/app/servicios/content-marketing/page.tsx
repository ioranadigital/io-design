import { Metadata } from "next";
// ✅ IMPORTANTE: El nombre debe coincidir exactamente con el archivo físico
import ContentMarketing from "@/views/servicios/ContentMarketing";

export const metadata: Metadata = {
  title: "Content Marketing & Estrategia Digital | iORANA",
  description: "Creamos contenido que atrae, educa y convierte a tu audiencia en clientes leales.",
  openGraph: {
    title: "Content Marketing & Estrategia Digital | iORANA",
    description: "Creamos contenido que atrae, educa y convierte a tu audiencia en clientes leales.",
    url: "https://iorana.digital/servicios/content-marketing",
    siteName: "Iorana Digital",
    locale: "es_ES",
    type: "website",
    images: [{ url: "https://iorana.digital/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <ContentMarketing />;
}
