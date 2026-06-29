import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Proceso de Digitalización Pyme | Iorana Digital",
  description:
    "Conoce nuestro método de 4 pasos para digitalizar tu negocio en 30 días: diagnóstico, diseño, activación y seguimiento. Sin tecnicismos ni sorpresas.",
  alternates: { canonical: "https://iorana.digital/pymes/proceso" },
  openGraph: {
    title: "Cómo digitalizamos tu pyme en 30 días | Iorana Digital",
    description:
      "4 pasos: diagnóstico gratuito, diseño, activación y seguimiento mensual. Proceso probado en +80 pymes.",
    url: "https://iorana.digital/pymes/proceso",
    siteName: "Iorana Digital",
    locale: "es_ES",
    type: "website",
    images: [{ url: "https://iorana.digital/og/pymes-proceso.jpg", width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
