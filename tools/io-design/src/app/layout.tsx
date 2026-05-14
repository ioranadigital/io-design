import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'io-design - Landing Factory',
  description: 'Crea landings profesionales con componentes reutilizables y blueprints',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow:wght@600;700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
