import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  const isLoginPage = request.nextUrl.pathname === '/login'
  const isSearchPage = request.nextUrl.pathname.startsWith('/search')
  const isUploadPage = request.nextUrl.pathname.startsWith('/upload')

  // Define protected routes
  const isProtectedRoute = isSearchPage || isUploadPage

  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
      const secret = new TextEncoder().encode(JWT_SECRET)
      await jwtVerify(token, secret)
      return NextResponse.next()
    } catch (error) {
      console.error('JWT verification failed:', error)
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  if (isLoginPage && token) {
    try {
      const secret = new TextEncoder().encode(JWT_SECRET)
      await jwtVerify(token, secret)
      return NextResponse.redirect(new URL('/', request.url))
    } catch (error) {
      // Token invalid, allow login page
      return NextResponse.next()
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api (backend api)
     */
    '/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
