// app/informe-sitio-web-gratis/layout.tsx  ← FICHERO NUEVO
import type { Metadata } from 'next';


export const metadata: Metadata = {
  title: '¿Cómo está optimizada tu web? Informe Gratuito | iORANA Digital',
  description: 'Descubre el verdadero rendimiento de tu sitio web. Analizamos velocidad, SEO técnico, experiencia móvil y oportunidades de conversión — gratis y sin compromiso.',
  openGraph: {
    title: 'Informe SEO Gratuito | iORANA Digital',
    description: 'Análisis gratuito de tu web: velocidad, SEO técnico, mobile y conversión.',
    type: 'website',
  },
};


export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}