import { NextResponse } from 'next/server';
import { requireApiUser } from '@/lib/api/auth';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_PAYMENT_HOSTS = new Set(['payfast.co.za', 'www.payfast.co.za']);

export async function POST(request: Request) {
  const auth = await requireApiUser();
  if ('response' in auth) {
    return auth.response;
  }

  let payload: { email?: string; paymentLink?: string };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
  }

  const email = payload.email?.trim().toLowerCase();
  const paymentLink = payload.paymentLink?.trim();

  if (!email || !paymentLink) {
    return NextResponse.json({ error: 'Email and payment link are required' }, { status: 400 });
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  try {
    const parsedUrl = new URL(paymentLink);
    if (
      (parsedUrl.protocol !== 'https:' && parsedUrl.protocol !== 'http:') ||
      !ALLOWED_PAYMENT_HOSTS.has(parsedUrl.hostname.toLowerCase())
    ) {
      return NextResponse.json({ error: 'Invalid payment link' }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: 'Invalid payment link' }, { status: 400 });
  }

  try {
    // In a real application, you would use an email service like Resend, SendGrid, or AWS SES.
    // For this example, we'll just log the information to the console.
    console.log(`Sending payment link to: ${email}`);
    console.log(`Payment link: ${paymentLink}`);

    // Example with Resend (if you were to implement it):
    /*
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Your Payment Link',
      html: `<p>Click <a href="${paymentLink}">here</a> to make your payment.</p>`,
    });
    */

    return NextResponse.json({ message: 'Payment link sent successfully' });
  } catch (error) {
    console.error('Error sending payment link:', error);
    return NextResponse.json({ error: 'Failed to send payment link' }, { status: 500 });
  }
}
