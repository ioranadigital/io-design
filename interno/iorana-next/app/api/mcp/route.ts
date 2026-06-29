import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import * as cheerio from "cheerio";
import { z } from "zod";

// Registry de tools disponibles
const tools = [
  {
    name: "query_table",
    description: "Consulta filas de una tabla de Supabase",
    inputSchema: {
      type: "object",
      properties: {
        table:  { type: "string", description: "Nombre de la tabla" },
        limit:  { type: "number", description: "Número de filas", default: 10 },
        filter: { type: "object", description: "Filtros clave:valor" },
      },
      required: ["table"],
    },
  },
  {
    name: "audit_url",
    description: "Auditoría técnica SEO de una URL",
    inputSchema: {
      type: "object",
      properties: {
        url: { type: "string", description: "URL a auditar" },
      },
      required: ["url"],
    },
  },
  {
    name: "extract_content",
    description: "Extrae texto limpio de una página web",
    inputSchema: {
      type: "object",
      properties: {
        url:      { type: "string", description: "URL a extraer" },
        selector: { type: "string", description: "Selector CSS opcional" },
      },
      required: ["url"],
    },
  },
];

async function executeTool(name: string, args: Record<string, any>) {
  switch (name) {
    case "query_table": {
      const supabase = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_KEY!
      );
      let query = supabase.from(args.table).select("*").limit(args.limit ?? 10);
      if (args.filter) {
        Object.entries(args.filter).forEach(([col, val]) => {
          query = query.eq(col, val as string);
        });
      }
      const { data, error } = await query;
      if (error) throw new Error(error.message);
      return JSON.stringify(data, null, 2);
    }

    case "audit_url": {
      const res = await fetch(args.url, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; IoanaMCP/1.0)" },
      });
      const html = await res.text();
      const $ = cheerio.load(html);
      return JSON.stringify({
        status: res.status,
        url: res.url,
        title: $("title").text().trim() || null,
        metaDescription: $('meta[name="description"]').attr("content") ?? null,
        h1: $("h1").first().text().trim() || null,
        h1Count: $("h1").length,
        canonical: $('link[rel="canonical"]').attr("href") ?? null,
        robots: $('meta[name="robots"]').attr("content") ?? null,
        wordCount: $("body").text().replace(/\s+/g, " ").trim().split(" ").length,
        imgCount: $("img").length,
        imgsWithoutAlt: $('img:not([alt])').length,
      }, null, 2);
    }

    case "extract_content": {
      const res = await fetch(args.url, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; IoanaMCP/1.0)" },
      });
      const html = await res.text();
      const $ = cheerio.load(html);
      $("script, style, nav, footer, header").remove();
      const zone = args.selector ? $(args.selector) : $("body");
      const text = zone.text().replace(/\s+/g, " ").trim();
      return JSON.stringify({ url: res.url, charCount: text.length, text }, null, 2);
    }

    default:
      throw new Error(`Tool desconocida: ${name}`);
  }
}

// GET → SSE handshake + lista de tools
export async function GET() {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      // Enviar capabilities MCP
      const msg = {
        jsonrpc: "2.0",
        method: "notifications/initialized",
        params: {
          protocolVersion: "2024-11-05",
          serverInfo: { name: "iorana-mcp-gateway", version: "1.0.0" },
          capabilities: { tools: {} },
        },
      };
      controller.enqueue(encoder.encode(`data: ${JSON.stringify(msg)}\n\n`));
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
}

// POST → maneja mensajes JSON-RPC de MCP
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { id, method, params } = body;

  try {
    let result: any;

    switch (method) {
      case "initialize":
        result = {
          protocolVersion: "2024-11-05",
          serverInfo: { name: "iorana-mcp-gateway", version: "1.0.0" },
          capabilities: { tools: {} },
        };
        break;

      case "tools/list":
        result = { tools };
        break;

      case "tools/call":
        const text = await executeTool(params.name, params.arguments ?? {});
        result = {
          content: [{ type: "text", text }],
        };
        break;

      default:
        return Response.json({
          jsonrpc: "2.0",
          id,
          error: { code: -32601, message: `Método desconocido: ${method}` },
        });
    }

    return Response.json({ jsonrpc: "2.0", id, result });

  } catch (err: any) {
    return Response.json({
      jsonrpc: "2.0",
      id,
      error: { code: -32000, message: err.message },
    });
  }
}