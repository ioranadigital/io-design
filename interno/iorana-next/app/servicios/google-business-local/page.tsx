import { Metadata } from "next";
import GoogleBusinessLocal from "@/views/servicios/GoogleBusinessLocal";

export const metadata: Metadata = {
  title: "Google Business Profile & SEO Local | iORANA Digital",
  description: "Aparece en el Top 3 de Google Maps cuando tu cliente ideal busca lo que ofreces. Optimización de ficha Google Business, reseñas y posicionamiento local.",
  openGraph: {
    title: "Google Business Profile & SEO Local | iORANA Digital",
    description: "Aparece en el Top 3 de Google Maps cuando tu cliente ideal busca lo que ofreces.",
    url: "https://iorana.digital/servicios/google-business-local",
    siteName: "Iorana Digital",
    locale: "es_ES",
    type: "website",
    images: [{ url: "https://iorana.digital/og/google-business-local.jpg", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://iorana.digital/servicios/google-business-local" },
};

export default function Page() {
  return <GoogleBusinessLocal />;
}
