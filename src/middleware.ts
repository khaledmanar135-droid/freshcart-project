import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET;

  const token =
    (await getToken({ req: request, secret })) ||
    (await getToken({ req: request, secret, secureCookie: false })) ||
    (await getToken({ req: request, secret, secureCookie: true }));

  const pathname = request.nextUrl.pathname;

  if (token) {
    if (pathname === '/login' || pathname === '/register') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // /checkout, /orders, /account require active authentication
  // Note: /cart and /wishlist handle their own sign-in prompts in-page and do not hard-redirect
  const protectedRoutes = ['/checkout', '/orders', '/account'];
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
    '/checkout',
    '/orders/:path*',
    '/account/:path*',
  ],
};
