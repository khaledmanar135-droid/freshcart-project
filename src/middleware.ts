import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === 'production',
  });

  const pathname = request.nextUrl.pathname;

  if (token) {
    if (pathname === '/login' || pathname === '/register') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  const protectedRoutes = ['/cart', '/wishlist', '/checkout', '/orders', '/account'];
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  if (!token && isProtected) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/register',
    '/cart',
    '/wishlist',
    '/checkout',
    '/orders/:path*',
    '/account/:path*',
],
};
