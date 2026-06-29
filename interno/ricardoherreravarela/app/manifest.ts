import type { MetadataRoute } from "next";
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ricardo Herrera Varela",
    short_name: "RHV",
    description:
      "Digital Project Manager, Consultor SEO y Director de Operaciones",
    start_url: "/",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#3b82f6",
    icons: [
      {
        src: "/logoricardoherrera.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logoricardoherrera.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
 