// app/api/crm/score/route.ts
import { createClient } from '@/lib/supabase/supabaseClient';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = await createClient();
  const { leadId } = await request.json();

  const { data: lead, error: fetchError } = await supabase
    .from('crm_leads')
    .select('*')
    .eq('id', leadId)
    .single();

  if (fetchError || !lead) return NextResponse.json({ error: "No lead" }, { status: 404 });

  // Lógica de score simplificada para el ejemplo
  let score = lead.mensaje?.length > 100 ? 50 : 20;
  let prioridad = score > 40 ? 'alta' : 'baja';

  const { data, error: updateError } = await supabase
    .from('crm_leads')
    .update({ score, prioridad, updated_at: new Date().toISOString() })
    .eq('id', leadId)
    .select().single();

  return NextResponse.json(data);
}