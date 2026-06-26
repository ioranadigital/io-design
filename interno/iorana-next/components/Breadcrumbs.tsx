"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumbs = () => {
  const pathname = usePathname();
  const pathElements = pathname.split("/").filter((path) => path);

  if (pathElements.length === 0) return null;

  const formatLabel = (str: string) => {
    return str.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  // Schema para SEO/GEO (Imprescindible)
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://iorana.digital" },
      ...pathElements.map((path, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": formatLabel(path),
        "item": `https://iorana.digital/${pathElements.slice(0, index + 1).join("/")}`,
      })),
    ],
  };

  return (
    <nav aria-label="Breadcrumb" className="py-2">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <ol className="flex items-center space-x-2 text-[11px] uppercase tracking-widest text-white/30 font-medium">
        <li>
          <Link href="/" className="hover:text-white/60 transition-colors">
            Inicio
          </Link>
        </li>

        {pathElements.map((path, index) => {
          const href = `/${pathElements.slice(0, index + 1).join("/")}`;
          const isLast = index === pathElements.length - 1;

          return (
            <li key={path} className="flex items-center space-x-2">
              <span>/</span>
              {isLast ? (
                <span className="text-[#ff8c00]/80">{formatLabel(path)}</span>
              ) : (
                <Link href={href} className="hover:text-white/60 transition-colors">
                  {formatLabel(path)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;