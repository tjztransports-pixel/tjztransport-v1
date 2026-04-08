import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';
import { requireApiAdmin } from '@/lib/api/auth';

const ALLOWED_ROLES = new Set(['admin', 'agent']);
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const auth = await requireApiAdmin();
  if ('response' in auth) {
    return auth.response;
  }

  let payload: {
    email?: string;
    password?: string;
    role?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
  };

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
  }

  const email = payload.email?.trim().toLowerCase();
  const password = payload.password;
  const role = payload.role?.trim().toLowerCase();
  const firstName = payload.firstName?.trim();
  const lastName = payload.lastName?.trim();
  const phone = payload.phone?.trim();
  const supabase = createAdminClient();

  if (!email || !password || !role || !firstName || !lastName || !phone) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }

  if (!ALLOWED_ROLES.has(role)) {
    return NextResponse.json(
      { error: 'Invalid role' },
      { status: 400 }
    );
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { error: 'Invalid email address' },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return NextResponse.json(
      { error: 'Password must be at least 8 characters long' },
      { status: 400 }
    );
  }

  const { data: authData, error: authError } =
    await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 400 });
  }

  if (authData.user) {
    const { error: profileError } = await supabase.from('profiles').insert({
      id: authData.user.id,
      role,
      email,
      first_name: firstName,
      last_name: lastName,
      phone,
    });

    if (profileError) {
      return NextResponse.json({ error: profileError.message }, { status: 400 });
    }
  }

  return NextResponse.json(authData);
}
