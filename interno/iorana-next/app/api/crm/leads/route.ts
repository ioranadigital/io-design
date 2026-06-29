// app/api/crm/leads/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';


export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page   = Math.max(1, Number(searchParams.get('page')  ?? 1));
  const limit  = Math.min(100, Number(searchParams.get('limit') ?? 25));
  const estado = searchParams.get('estado');
  const fuente = searchParams.get('fuente');
  const q      = searchParams.get('q');


  const supabase = createAdminClient();
  let query = supabase
    .from('crm_leads')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range((page - 1) * limit, page * limit - 1);


  if (estado) query = query.eq('estado', estado);
  if (fuente) query = query.eq('fuente', fuente);
  if (q)      query = query.or(
    `email.ilike.%${q}%,nombre.ilike.%${q}%,empresa.ilike.%${q}%`
  );


  const { data, count, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({
    data,
    meta: { total: count, page, limit, pages: Math.ceil((count ?? 0) / limit) },
  });
}


export async function POST(req: NextRequest) {
  const body = await req.json();
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('crm_leads')
    .insert([{ ...body, fuente: body.fuente ?? 'crm-manual' }])
    .select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data, { status: 201 });
}

