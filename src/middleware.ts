import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const pathname = url.pathname

  // 1. Protect all /admin routes
  if (pathname.startsWith('/admin')) {
    const hasAdminSession = request.cookies.has('oryn_admin_session')
    const secret = url.searchParams.get('secret')
    const hasSecretKey = secret === 'oryn-owner-key'

    // Allow request to pass if it has the secret URL query parameter or an active admin cookie session
    if (hasSecretKey || hasAdminSession) {
      return NextResponse.next()
    }

    // Mask page as "Not Found" if unauthorized
    url.pathname = '/404'
    return NextResponse.rewrite(url)
  }

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
