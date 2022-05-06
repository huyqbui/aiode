import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const protectedPages = ['/', '/playlist', '/library'];

// edge function to protect our pages if user is not logged in
export default function middleware(req: NextRequest) {
  if (protectedPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies.AIODE_LOGIN_ACCESS_TOKEN;
    const url = req.nextUrl.clone();
    url.pathname = '/login';

    if (!token) {
      return NextResponse.rewrite(url);
    }
  }
}
