import { Metadata } from "next";
import TodoParaTuNegocio from "@/views/soluciones/TodoParaTuNegocio";

export const metadata: Metadata = {
  title: "Soluciones para tu Negocio Digital | iORANA",
  description: "Todo lo que tu empresa necesita para digitalizarse: desde web hasta gestión de clientes.",
  openGraph: {
    title: "Soluciones para tu Negocio Digital | iORANA",
    description: "Todo lo que tu empresa necesita para digitalizarse: desde web hasta gestión de clientes.",
    url: "https://iorana.digital/soluciones/todo-para-tu-negocio",
    siteName: "Iorana Digital",
    locale: "es_ES",
    type: "website",
    images: [{ url: "https://iorana.digital/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <TodoParaTuNegocio />;
}
