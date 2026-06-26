import { Metadata } from "next";
import PpcPaidSearch from "@/views/servicios/PpcPaidSearch";

export const metadata: Metadata = {
  title: "PPC & Paid Search | Gestión de Google Ads | iORANA",
  description: "Maximizamos tu inversión publicitaria con estrategias avanzadas de SEM y Paid Social.",
  openGraph: {
    title: "PPC & Paid Search | Gestión de Google Ads | iORANA",
    description: "Maximizamos tu inversión publicitaria con estrategias avanzadas de SEM y Paid Social.",
    url: "https://iorana.digital/servicios/ppc-paid-search",
    siteName: "Iorana Digital",
    locale: "es_ES",
    type: "website",
    images: [{ url: "https://iorana.digital/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <PpcPaidSearch />;
}
