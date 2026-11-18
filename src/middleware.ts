import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySessionToken, ADMIN_COOKIE_NAME } from '@/lib/auth';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  const sessionCookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const session = verifySessionToken(sessionCookie);

  // 1. Protect Admin Pages
  if (pathname.startsWith('/admin')) {
    // Allow access to login page
    if (pathname === '/admin/login') {
      if (session.valid) {
        // If already logged in, redirect straight to dashboard
        url.pathname = '/admin';
        return NextResponse.redirect(url);
      }
      return NextResponse.next();
    }

    // All other /admin routes require valid session
    if (!session.valid) {
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
    if (!session.valid) {
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
