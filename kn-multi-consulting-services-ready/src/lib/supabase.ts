import { createClient } from "@supabase/supabase-js";

function sanitizeUrl(url?: string): string {
  if (!url) return "https://xiampihkycpazwbiqrzq.supabase.co";
  // Strip any wrapping double or single quotes
  let cleaned = url.trim();
  if ((cleaned.startsWith('"') && cleaned.endsWith('"')) || (cleaned.startsWith("'") && cleaned.endsWith("'"))) {
    cleaned = cleaned.slice(1, -1).trim();
  }
  // Validate if it is a valid HTTP or HTTPS URL
  if (/^https?:\/\//i.test(cleaned)) {
    return cleaned;
  }
  return "https://xiampihkycpazwbiqrzq.supabase.co";
}

function sanitizeKey(key?: string): string {
  if (!key) return "sb_publishable_WoVV9tijdWpPwT0wljIw-w_THl7cig_";
  let cleaned = key.trim();
  if ((cleaned.startsWith('"') && cleaned.endsWith('"')) || (cleaned.startsWith("'") && cleaned.endsWith("'"))) {
    cleaned = cleaned.slice(1, -1).trim();
  }
  return cleaned || "sb_publishable_WoVV9tijdWpPwT0wljIw-w_THl7cig_";
}

const rawUrl = (import.meta as any).env?.VITE_SUPABASE_URL;
const rawKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY;

const supabaseUrl = sanitizeUrl(rawUrl);
const supabaseAnonKey = sanitizeKey(rawKey);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
