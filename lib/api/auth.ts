import 'server-only';

import { NextResponse } from 'next/server';
import type { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/server';

type AuthSuccess = {
  user: User;
};

type AuthFailure = {
  response: NextResponse;
};

export const requireApiUser = async (): Promise<AuthSuccess | AuthFailure> => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return {
      response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    };
  }

  return { user };
};

export const requireApiAdmin = async (): Promise<AuthSuccess | AuthFailure> => {
  const auth = await requireApiUser();
  if ('response' in auth) {
    return auth;
  }

  const supabase = await createClient();
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', auth.user.id)
    .maybeSingle();

  if (error || profile?.role?.toLowerCase() !== 'admin') {
    return {
      response: NextResponse.json({ error: 'Forbidden' }, { status: 403 }),
    };
  }

  return auth;
};
