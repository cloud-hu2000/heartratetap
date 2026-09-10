import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const locale = request.nextUrl.pathname === "/es" || request.nextUrl.pathname.startsWith("/es/")
    ? "es"
    : "en";
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("X-NEXT-INTL-LOCALE", locale);
  requestHeaders.set("X-HRT-PATHNAME", request.nextUrl.pathname);

  return NextResponse.next({
    request: { headers: requestHeaders }
  });
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"]
};
