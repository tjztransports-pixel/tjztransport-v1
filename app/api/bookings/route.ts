import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

type BookingPayload = {
  name?: string;
  email?: string;
  phone?: string;
  tourName?: string;
  tour?: string;
  destination?: string;
  date?: string;
  travel_dates?: string;
  guests?: number | string;
  numTravelers?: number | string;
  num_travelers?: number | string;
  country?: string;
};

const parseGuests = (value: unknown): number => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return 1;
  return Math.floor(parsed);
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9+\-\s()]{7,20}$/;
const MAX_BODY_BYTES = 20_000;

const isSameOriginRequest = (request: NextRequest): boolean => {
  const origin = request.headers.get('origin');
  if (!origin) {
    return true;
  }

  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host');
  if (!host) {
    return false;
  }

  try {
    const originUrl = new URL(origin);
    return originUrl.host === host;
  } catch {
    return false;
  }
};

export async function POST(request: NextRequest) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json(
      { error: 'Invalid request origin' },
      { status: 403 }
    );
  }

  const contentType = request.headers.get('content-type') ?? '';
  if (!contentType.toLowerCase().includes('application/json')) {
    return NextResponse.json(
      { error: 'Content-Type must be application/json' },
      { status: 415 }
    );
  }

  const contentLengthHeader = request.headers.get('content-length');
  const contentLength = contentLengthHeader ? Number(contentLengthHeader) : 0;
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { error: 'Request payload too large' },
      { status: 413 }
    );
  }

  let supabase: ReturnType<typeof createAdminClient>;
  try {
    supabase = createAdminClient();
  } catch {
    return NextResponse.json(
      { error: 'Supabase configuration missing' },
      { status: 500 }
    );
  }

  try {
    const body = (await request.json()) as BookingPayload;
    const name = body.name?.trim();
    const email = body.email?.trim().toLowerCase();
    const phone = body.phone?.trim();
    const destination =
      body.tourName?.trim() ||
      body.tour?.trim() ||
      body.destination?.trim() ||
      'Website Booking';
    const travelDates = body.date?.trim() || body.travel_dates?.trim() || null;
    const guests = parseGuests(body.guests ?? body.numTravelers ?? body.num_travelers);
    const country = body.country?.trim() || '';
    const assignedUserId: string | null = null;
    if (!name || !email || !phone || !EMAIL_REGEX.test(email) || !PHONE_REGEX.test(phone)) {
      return NextResponse.json(
        { error: 'Invalid booking details' },
        { status: 400 }
      );
    }

    // Keep website bookings unassigned by default so they are visible in shared booking views
    // and can be distributed from Leads Pool when needed.

    // Keep contacts synced (best effort only; lead creation should not fail because of contact constraints).
    const existingContact = await supabase
      .from('contacts')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    let contactId: string | null = existingContact.data?.id ?? null;

    if (!contactId) {
      const newContact = await supabase
        .from('contacts')
        .insert({ name, email, phone })
        .select('id')
        .maybeSingle();

      if (!newContact.error && newContact.data?.id) {
        contactId = newContact.data.id;
      }
    } else {
      await supabase
        .from('contacts')
        .update({ name, phone })
        .eq('id', contactId);
    }

    const legacyDescription = [
      'Booking Details:',
      `- Name: ${name}`,
      `- Email: ${email}`,
      `- Phone: ${phone}`,
      `- Tour: ${destination}`,
      `- Date: ${travelDates || 'Not specified'}`,
      `- Guests: ${guests}`,
    ].join('\n');

    const leadInsertCandidates: Array<Record<string, unknown>> = [
      {
        name,
        email,
        phone,
        destination,
        travel_dates: travelDates,
        num_travelers: guests,
        source: 'Website',
        status: 'New',
        country,
        user_id: assignedUserId,
      },
      {
        name,
        email,
        phone,
        destination,
        travel_dates: travelDates,
        num_travelers: guests,
        source: 'Website',
        status: 'New',
        user_id: assignedUserId,
      },
      {
        name,
        phone,
        destination,
        travel_dates: travelDates,
        num_travelers: guests,
        status: 'New',
        user_id: assignedUserId,
      },
      {
        contact_id: contactId,
        title: `${destination} - ${name}`,
        description: legacyDescription,
        value: guests,
        source: 'Website',
        status: 'New',
        user_id: assignedUserId,
      },
      {
        contact_id: contactId,
        title: `${destination} - ${name}`,
        description: legacyDescription,
        value: guests,
        status: 'inquiry',
      },
      {
        title: `${destination} - ${name}`,
        description: legacyDescription,
        status: 'inquiry',
      },
    ];

    let bookingId: string | null = null;
    let lastInsertError: unknown = null;

    for (const payload of leadInsertCandidates) {
      if (payload.contact_id === null) {
        continue;
      }

      const attempt = await supabase
        .from('leads')
        .insert(payload)
        .select('id')
        .maybeSingle();

      if (!attempt.error && attempt.data?.id) {
        bookingId = attempt.data.id;
        break;
      }

      lastInsertError = attempt.error;
    }

    if (!bookingId) {
      console.error('Error creating lead:', lastInsertError);
      return NextResponse.json(
        { error: 'Failed to create booking' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Booking submitted successfully',
        bookingId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Booking API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
