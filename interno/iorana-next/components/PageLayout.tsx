"use client";
import Navbar from "@/components/Navbar";
import { useEffect } from "react";

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  canonical?: string;
  robots?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

const BASE_URL = "https://iorana.digital";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`;

const PageLayout = ({
  children,
  title,
  description,
  canonical,
  robots = "index, follow",
  ogTitle,
  ogDescription,
  ogImage,
}: PageLayoutProps) => {
  useEffect(() => {
    document.title = title;

    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("name", "description", description);
    setMeta("name", "robots", robots);

    // Canonical
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonical || typeof window !== 'undefined' ? `${BASE_URL}${window.location.pathname}` : BASE_URL);

    // Open Graph
    const resolvedOgTitle = ogTitle || title;
    const resolvedOgDesc = ogDescription || description;
    const resolvedOgImage = ogImage || DEFAULT_OG_IMAGE;

    setMeta("property", "og:title", resolvedOgTitle);
    setMeta("property", "og:description", resolvedOgDesc);
    setMeta("property", "og:url", canonical || typeof window !== 'undefined' ? `${BASE_URL}${window.location.pathname}` : BASE_URL);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:image", resolvedOgImage);
    setMeta("property", "og:locale", "es_ES");

    // Twitter
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", resolvedOgTitle);
    setMeta("name", "twitter:description", resolvedOgDesc);
    setMeta("name", "twitter:image", resolvedOgImage);

    window.scrollTo(0, 0);
  }, [title, description, canonical, robots, ogTitle, ogDescription, ogImage]);

  return (
    <div className="flex flex-col min-h-screen bg-[#0a2b49]">
  {/* 🛠️ ENVOLVEMOS EL NAV PARA DARLE PRIORIDAD */}
  <header className="relative z-[9999]"> 
    <Navbar />
  </header>  
  <main className="flex-1 w-full overflow-visible pt-10">
    {/* Rutas ... */}
  </main>
</div>
  );
};

export default PageLayout;
