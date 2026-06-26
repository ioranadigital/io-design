import * as cheerio from "cheerio";
import { z } from "zod";

const DEFAULT_HEADERS = {
  "User-Agent": "Mozilla/5.0 (compatible; IoanaMCP/1.0)",
  "Accept": "text/html,application/xhtml+xml",
};

async function fetchPage(url: string) {
  const res = await fetch(url, { headers: DEFAULT_HEADERS });
  const html = await res.text();
  return { html, status: res.status, finalUrl: res.url };
}

export const crawlTools = {
  audit_url: {
    description: "Auditoría técnica SEO de una URL",
    schema: z.object({
      url: z.string().url(),
    }),
    handler: async ({ url }: any) => {
      const { html, status, finalUrl } = await fetchPage(url);
      const $ = cheerio.load(html);
      return {
        status,
        url: finalUrl,
        title: $("title").text().trim() || null,
        metaDescription: $('meta[name="description"]').attr("content") ?? null,
        h1: $("h1").first().text().trim() || null,
        h1Count: $("h1").length,
        canonical: $('link[rel="canonical"]').attr("href") ?? null,
        robots: $('meta[name="robots"]').attr("content") ?? null,
        wordCount: $("body").text().replace(/\s+/g, " ").trim().split(" ").length,
        imgCount: $("img").length,
        imgsWithoutAlt: $('img:not([alt])').length,
      };
    },
  },

  extract_content: {
    description: "Extrae texto limpio de una página web",
    schema: z.object({
      url:      z.string().url(),
      selector: z.string().optional(),
    }),
    handler: async ({ url, selector }: any) => {
      const { html, status, finalUrl } = await fetchPage(url);
      const $ = cheerio.load(html);
      $("script, style, nav, footer, header").remove();
      const zone = selector ? $(selector) : $("body");
      const text = zone.text().replace(/\s+/g, " ").trim();
      return { status, url: finalUrl, charCount: text.length, text };
    },
  },
};