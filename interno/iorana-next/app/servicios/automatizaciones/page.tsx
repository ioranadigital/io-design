import { Metadata } from "next";
import Automatizaciones from "@/views/servicios/Automatizaciones";

export const metadata: Metadata = {
  title: "Automatización de Procesos y CRM | iORANA",
  description: "Ahorra tiempo y dinero automatizando tus flujos de trabajo, captación de leads y gestión de clientes.",
  openGraph: {
    title: "Automatización de Procesos y CRM | iORANA",
    description: "Ahorra tiempo y dinero automatizando tus flujos de trabajo, captación de leads y gestión de clientes.",
    url: "https://iorana.digital/servicios/automatizaciones",
    siteName: "Iorana Digital",
    locale: "es_ES",
    type: "website",
    images: [{ url: "https://iorana.digital/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <Automatizaciones />;
}
