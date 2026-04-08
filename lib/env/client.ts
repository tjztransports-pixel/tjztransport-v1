const isPlaceholderValue = (value: string) =>
  /^(YOUR_|your_|example|re_example)/.test(value);

const getRequiredPublicEnv = (
  key: 'NEXT_PUBLIC_SUPABASE_URL' | 'NEXT_PUBLIC_SUPABASE_ANON_KEY'
): string => {
  const value = process.env[key]?.trim();

  if (!value || isPlaceholderValue(value)) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
};

export const getSupabasePublicEnv = () => ({
  url: getRequiredPublicEnv('NEXT_PUBLIC_SUPABASE_URL'),
  anonKey: getRequiredPublicEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
});
