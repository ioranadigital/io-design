import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ricardoherreravarela.com"),
  title: {
    default:
      "Ricardo Herrera Varela | Digital PM · Consultor SEO · Director de Operaciones",
    template: "%s | Ricardo Herrera Varela",
  },
  description:
    "Digital Project Manager y Consultor SEO Senior especializado en transformación digital, automatización de procesos y excelencia operativa para empresas internacionales.",
  keywords: [
    "Digital Project Manager",
    "Consultor SEO",
    "Director de Operaciones",
    "Transformación Digital",
    "Automatización de Procesos",
    "Google Workspace",
    "Jira Service Management",
    "SEO Senior",
    "Ricardo Herrera Varela",
  ],
  authors: [{ name: "Ricardo Herrera Varela", url: "https://ricardoherreravarela.com" }],
  creator: "Ricardo Herrera Varela",
  publisher: "Ricardo Herrera Varela",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://ricardoherreravarela.com",
    siteName: "Ricardo Herrera Varela",
    title:
      "Ricardo Herrera Varela | Digital PM · Consultor SEO · Director de Operaciones",
    description:
      "Especialista en convertir ideas complejas en interfaces digitales funcionales, asegurando que cada proceso funcione con precisión.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ricardo Herrera Varela — Digital Project Manager & Consultor SEO",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ricardo Herrera Varela | Digital PM · Consultor SEO",
    description:
      "Especialista en transformación digital, automatización de procesos y excelencia operativa.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://ricardoherreravarela.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.className} text-slate-800 antialiased`}>
        {children}
      </body>
    </html>
  );
}