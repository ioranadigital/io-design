import { Metadata } from "next";
import CookiesView from "@/views/legal/CookiesView";

export const metadata: Metadata = {
  title: "Política de Cookies | iORANA Digital",
  description:
    "Política de cookies de iORANA Digital. Información sobre los tipos de cookies que utilizamos, su finalidad y cómo puedes gestionarlas.",
  alternates: {
    canonical: "https://iorana.digital/legal/cookies",
  },
  openGraph: {
    title: "Política de Cookies | iORANA Digital",
    description:
      "Tipos de cookies, su finalidad y cómo gestionarlas en el sitio web de iORANA Digital.",
    url: "https://iorana.digital/legal/cookies",
    siteName: "iORANA Digital",
    locale: "es_ES",
    type: "website",
  },
};

export default function CookiesPage() {
  return <CookiesView />;
}

