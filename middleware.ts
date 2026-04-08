import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { getSupabasePublicEnv } from '@/lib/env/client';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const protectedCrmRoutes = [
    '/dashboard',
    '/leads',
    '/leads-pool',
    '/contacts',
    '/accounts',
    '/settings',
  ];

  const isProtectedCrmRoute = protectedCrmRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // Keep public website and public booking endpoint accessible without auth.
  if (!isProtectedCrmRoute) {
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });
  let supabaseUrl: string;
  let supabaseAnonKey: string;

  try {
    const env = getSupabasePublicEnv();
    supabaseUrl = env.url;
    supabaseAnonKey = env.anonKey;
  } catch {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  const supabase = await createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: any) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
