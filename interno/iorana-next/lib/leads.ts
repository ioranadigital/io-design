// lib/leads.ts
// Única función de inserción — la usan todos los formularios
import { createClient } from '@/lib/supabase/client';


export interface LeadPayload {
  nombre:               string;
  email:                string;
  telefono?:            string | null;
  empresa?:             string | null;
  url_web?:             string | null;
  servicios?:           string[];
  perfil_empresa?:      string | null;
  necesidad_urgente?:   string | null;
  objetivo_seo?:        string | null;
  competidor?:          string | null;
  mensaje?:             string | null;
  fuente:               string;
  consentimiento_rgpd:  boolean;
  acepta_marketing?:    boolean;
}


function getUTMs() {
  if (typeof window === 'undefined') return {};
  const p = new URLSearchParams(window.location.search);
  const result: Record<string, string> = {};
  const keys = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content'];
  keys.forEach(k => { const v = p.get(k); if (v) result[k] = v; });
  if (document.referrer) result.referrer = document.referrer;
  return result;
}


export async function insertLead(payload: LeadPayload) {
  const supabase = createClient();
  return supabase
    .from('crm_leads')
    .insert([{ ...payload, ...getUTMs() }]);
}



