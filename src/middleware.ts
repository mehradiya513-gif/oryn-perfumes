import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ADMIN_COOKIE_NAME = 'oryn_admin_session';
const VALID_KEYS = ['oryn-master-2026', 'oryn-owner-key', 'admin', 'oryn2026'];

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // Direct 1-click access via secret key
  const queryKey = url.searchParams.get('key') || url.searchParams.get('secret');
  if (queryKey && VALID_KEYS.includes(queryKey)) {
    const expiresAt = Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 days
    const directToken = `admin:${expiresAt}:direct`;

    url.searchParams.delete('key');
    url.searchParams.delete('secret');
    url.pathname = '/admin';

    const response = NextResponse.redirect(url);
    response.cookies.set(ADMIN_COOKIE_NAME, directToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 30 * 24 * 60 * 60,
    });
    return response;
  }

  const sessionCookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value;

  let hasValidSession = false;
  if (sessionCookie) {
    const parts = sessionCookie.split(':');
    if (parts.length === 3) {
      const expiresAt = parseInt(parts[1], 10);
      if (!isNaN(expiresAt) && Date.now() < expiresAt) {
        hasValidSession = true;
      }
    }
  }

  // 1. Protect Admin Pages
  if (pathname.startsWith('/admin')) {
    // Allow access to login page
    if (pathname === '/admin/login') {
      if (hasValidSession) {
        url.pathname = '/admin';
        return NextResponse.redirect(url);
      }
      return NextResponse.next();
    }

    // All other /admin routes require valid session
    if (!hasValidSession) {
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
  }

  // 2. Protect Admin API Routes (GET orders, PATCH orders, GET leads)
  if (
    (pathname === '/api/orders' && request.method === 'GET') ||
    (pathname.startsWith('/api/orders/') && request.method === 'PATCH') ||
    (pathname === '/api/leads' && request.method === 'GET')
  ) {
    if (!hasValidSession) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized: Admin access required' }), {
        status: 401,
        headers: { 'content-type': 'application/json' },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/orders/:path*', '/api/orders', '/api/leads'],
};

