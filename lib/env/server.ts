import 'server-only';

import { getSupabasePublicEnv } from './client';

const isPlaceholderValue = (value: string) =>
  /^(YOUR_|your_|example|re_example)/.test(value);

const getRequiredServerEnv = (
  key: 'SUPABASE_SERVICE_ROLE_KEY'
): string => {
  const value = process.env[key]?.trim();

  if (!value || isPlaceholderValue(value)) {
    throw new Error(`Missing required server environment variable: ${key}`);
  }

  return value;
};

export const getSupabaseServerEnv = () => {
  const { url, anonKey } = getSupabasePublicEnv();

  return {
    url,
    anonKey,
    serviceRoleKey: getRequiredServerEnv('SUPABASE_SERVICE_ROLE_KEY'),
  };
};
