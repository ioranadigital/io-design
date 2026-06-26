import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

export const supabaseTools = {
  query_table: {
    description: "Consulta filas de una tabla de Supabase",
    schema: z.object({
      table:  z.string().describe("Nombre de la tabla"),
      limit:  z.number().optional().default(10),
      filter: z.record(z.string(), z.string()).optional(),
    }),
    handler: async ({ table, limit, filter }: any) => {
      const supabase = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_KEY!
      );
      let query = supabase.from(table).select("*").limit(limit);
      if (filter) {
        Object.entries(filter).forEach(([col, val]) => {
          query = query.eq(col, val as string);
        });
      }
      const { data, error } = await query;
      if (error) throw new Error(error.message);
      return data;
    },
  },

  insert_row: {
    description: "Inserta un registro en una tabla de Supabase",
    schema: z.object({
      table: z.string(),
      data:  z.record(z.string(), z.unknown()),
    }),
    handler: async ({ table, data }: any) => {
      const supabase = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_KEY!
      );
      const { error } = await supabase.from(table).insert(data);
      if (error) throw new Error(error.message);
      return { success: true };
    },
  },
};