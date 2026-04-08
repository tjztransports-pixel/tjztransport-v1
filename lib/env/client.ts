const isPlaceholderValue = (value: string) =>
  /^(YOUR_|your_|example|re_example)/.test(value);
const requirePublicEnv = (
  key: 'NEXT_PUBLIC_SUPABASE_URL' | 'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  value: string | undefined
): string => {
  const trimmedValue = value?.trim();
  if (!trimmedValue || isPlaceholderValue(trimmedValue)) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return trimmedValue;
};

export const getSupabasePublicEnv = () => ({
  url: requirePublicEnv(
    'NEXT_PUBLIC_SUPABASE_URL',
    process.env.NEXT_PUBLIC_SUPABASE_URL
  ),
  anonKey: requirePublicEnv(
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ),
});
