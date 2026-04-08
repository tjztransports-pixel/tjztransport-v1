import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';
import { requireApiUser } from '@/lib/api/auth';

export async function POST(request: Request) {
  const auth = await requireApiUser();
  if ('response' in auth) {
    return auth.response;
  }

  let payload: { lead_id?: string; name?: string; url?: string };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
  }

  const lead_id = payload.lead_id?.trim();
  const name = payload.name?.trim();
  const url = payload.url?.trim();

  if (!lead_id || !name || !url) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.protocol !== 'https:' && parsedUrl.protocol !== 'http:') {
      return NextResponse.json({ error: 'Invalid document URL' }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: 'Invalid document URL' }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('documents')
    .insert([{ lead_id, name, url, user_id: auth.user.id }])
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Also update the lead's last_updated timestamp
  const { error: leadError } = await supabase
    .from('leads')
    .update({ last_updated: new Date().toISOString() })
    .eq('id', lead_id);

  if (leadError) {
    // Log the error, but don't block the response to the client
    console.error('Error updating lead:', leadError);
  }

  return NextResponse.json(data);
}
