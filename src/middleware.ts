import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const pathname = url.pathname

  // 1. /admin routes are now accessible directly without a secret key

  // 2. Protect GET requests to /api/orders
  if (pathname === '/api/orders' && request.method === 'GET') {
    const hasAdminSession = request.cookies.has('oryn_admin_session')
    if (!hasAdminSession) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'content-type': 'application/json' },
      })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/orders'],
}
