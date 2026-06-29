import { Metadata } from "next";
import PrivacidadView from "@/views/legal/PrivacidadView";

export const metadata: Metadata = {
  title: "Política de Privacidad | iORANA Digital",
  description:
    "Política de privacidad de iORANA Digital. Conoce cómo tratamos tus datos personales conforme al RGPD y la LOPDGDD.",
  alternates: {
    canonical: "https://iorana.digital/privacidad",
  },
  openGraph: {
    title: "Política de Privacidad | iORANA Digital",
    description:
      "Tratamiento de datos personales conforme al RGPD y LOPDGDD en iORANA Digital.",
    url: "https://iorana.digital/privacidad",
    siteName: "iORANA Digital",
    locale: "es_ES",
    type: "website",
  },
};

export default function PrivacidadPage() {
  return <PrivacidadView />;
}

