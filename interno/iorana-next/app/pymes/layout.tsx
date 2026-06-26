import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Pack Digital para Pymes | Iorana Digital",
  description:
    "Digitaliza tu pyme con SEO local, web de alta conversión y soporte directo. Más llamadas, más clientes y presencia top en Google Maps desde 90 días.",
  alternates: { canonical: "https://iorana.digital/pymes" },
  openGraph: {
    title: "Pack Digital para Pymes | Iorana Digital",
    description:
      "SEO local, web de alta conversión y soporte directo para pymes. Top en Google Maps en 90 días.",
    url: "https://iorana.digital/pymes",
    siteName: "Iorana Digital",
    locale: "es_ES",
    type: "website",
    images: [{ url: "https://iorana.digital/og/pymes.jpg", width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-0">
        <Breadcrumbs />
      </div>
      {children}
    </>
  );
}
