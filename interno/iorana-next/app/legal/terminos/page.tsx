import { Metadata } from "next";
import TerminosView from "@/views/legal/TerminosView";

export const metadata: Metadata = {
  title: "Términos y Condiciones | iORANA Digital",
  description:
    "Términos y condiciones de uso de los servicios de iORANA Digital. Condiciones de contratación, propiedad intelectual y jurisdicción aplicable.",
  alternates: {
    canonical: "https://iorana.digital/legal/terminos",
  },
  openGraph: {
    title: "Términos y Condiciones | iORANA Digital",
    description:
      "Condiciones de contratación, propiedad intelectual y jurisdicción de los servicios de iORANA Digital.",
    url: "https://iorana.digital/legal/terminos",
    siteName: "iORANA Digital",
    locale: "es_ES",
    type: "website",
  },
};

export default function TerminosPage() {
  return <TerminosView />;
}
