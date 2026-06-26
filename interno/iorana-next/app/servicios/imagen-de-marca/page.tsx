import { Metadata } from "next";
import ImagenDeMarca from "@/views/servicios/ImagenDeMarca";

export const metadata: Metadata = {
  title: "Branding e Identidad Visual | Diseño de Marca | iORANA",
  description: "Construimos identidades visuales potentes que transmiten los valores de tu empresa y conectan con tu público.",
  openGraph: {
    title: "Branding e Identidad Visual | Diseño de Marca | iORANA",
    description: "Construimos identidades visuales potentes que transmiten los valores de tu empresa y conectan con tu público.",
    url: "https://iorana.digital/servicios/imagen-de-marca",
    siteName: "Iorana Digital",
    locale: "es_ES",
    type: "website",
    images: [{ url: "https://iorana.digital/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <ImagenDeMarca />;
}
