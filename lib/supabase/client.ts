import { createBrowserClient } from '@supabase/ssr';
import { getSupabasePublicEnv } from '@/lib/env/client';

export const createClient = () => {
  const { url, anonKey } = getSupabasePublicEnv();
  return createBrowserClient(
    url,
    anonKey
  );
};
