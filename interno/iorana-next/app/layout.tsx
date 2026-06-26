import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import Script from "next/script"; // Importante para la carga optimizada en Next.js

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-heading" });
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Iorana Digital | Agencia de Marketing Digital",
  description: "SEO Técnico, IA Estratégica, Next.js y Automatización para empresas en España.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${montserrat.variable} ${inter.variable}`} suppressHydrationWarning>
      <body
        className="antialiased w-full overflow-x-hidden bg-[#0a2b49] text-white"
        suppressHydrationWarning
      >
        {/* Google Tag Manager (noscript) - Respaldo para cuando JS está desactivado */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W2QKNGXR"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <Providers>
          {/* Navbar fijo — h-20 = 80px, por eso las páginas usan pt-20 */}
          <Navbar />

          <main>
            {children}
          </main>

          <Footer />
        </Providers>
      </body>

      {/* Google Tag Manager */}
      <Script id="gtm-script" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-W2QKNGXR');`}
      </Script>
    </html>
  );
}