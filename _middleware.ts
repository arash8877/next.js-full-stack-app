import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token');

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Allow access if token exists
  return NextResponse.next();
}

export const config = {
  matcher: ['/trials*', '/company*', '/employees*', '/invoices*', '/create-trial*', '/settings*', ],
};
