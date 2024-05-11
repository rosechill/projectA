import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isLogin = request.cookies.get("__TOKEN__");

  const pathname = new URL(request.url).pathname;
  const isPublicRoute = ["/login", "/daftar", "/"];

  if (
    !isPublicRoute.some((route) => {
      const regex = new RegExp(`^${route.replace(/\/:[^/]+/g, "/[^/]+")}$`);
      return regex.test(pathname);
    }) &&
    !isLogin
  ) {
    const loginUrl = new URL("/login", request.nextUrl).href;
    return NextResponse.redirect(loginUrl);
  } else if (!isLogin && !request.url.includes("/login")) {
    if (isPublicRoute) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (
    isLogin &&
    (request.url.includes("/login") || request.url.includes("/daftar"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico).*)"],
};
