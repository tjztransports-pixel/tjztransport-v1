import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { requireApiUser } from '@/lib/api/auth';

export async function GET(request: Request) {
  try {
    const auth = await requireApiUser();
    if ('response' in auth) {
      return auth.response;
    }

    const user = auth.user;
    const supabase = await createClient();

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Fetch calls for the current user
    const { data: calls, error } = await supabase
      .from('calls')
      .select(`
        *,
        leads(name, email),
        contacts(name, email)
      `)
      .eq('user_id', user.id)
      .order('started_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Error fetching calls:', error);
      return NextResponse.json({ error: 'Failed to fetch calls' }, { status: 500 });
    }

    return NextResponse.json({ calls });
  } catch (error) {
    console.error('Error in calls API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const auth = await requireApiUser();
    if ('response' in auth) {
      return auth.response;
    }

    const user = auth.user;
    const supabase = await createClient();

    const body = await request.json();
    const {
      phone_number,
      direction,
      status,
      duration,
      call_sid,
      notes,
      lead_id,
      contact_id
    } = body;

    // Create a new call record
    const { data: call, error } = await supabase
      .from('calls')
      .insert({
        user_id: user.id,
        phone_number,
        direction,
        status,
        duration,
        call_sid,
        notes,
        lead_id,
        contact_id,
        ended_at: status === 'completed' ? new Date().toISOString() : null
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating call:', error);
      return NextResponse.json({ error: 'Failed to create call' }, { status: 500 });
    }

    return NextResponse.json({ call });
  } catch (error) {
    console.error('Error in calls POST API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
