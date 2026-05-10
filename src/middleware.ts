import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the user is trying to access the admin area
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Check for the admin_auth cookie
    const authCookie = request.cookies.get('admin_auth');
    
    // If no cookie, redirect to login page
    if (!authCookie || authCookie.value !== 'true') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  // Apply middleware only to /admin and its subpaths
  matcher: '/admin/:path*',
};
