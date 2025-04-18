// middleware.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { routeAccessMap } from "./utils/config";

import type { NextRequest } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;
const domain = process.env.NEXT_PUBLIC_DOMAIN_URL;

export async function middleware(req: NextRequest) {
  console.log("middleware", req.url);
  if (!secret || !domain) return NextResponse.redirect(new URL("/error"));
  const token = await getToken({ req, secret: secret });
  if (!token) return NextResponse.redirect(new URL("/", domain));

  const { pathname } = req.nextUrl;

  for (const [route, roles] of Object.entries(routeAccessMap)) {
    if (pathname.startsWith(route) && !roles.includes(token.role)) {
      return NextResponse.redirect(
        new URL(`${token.role.toLowerCase()}`, domain), //mb unauthorized or denied page
      );
    }
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/admin(.*)",
    "/student(.*)",
    "/teacher(.*)",
    "/parent(.*)",
    "/list(.*)",
    // "/((?!api|_next/static|static/|_next/image|favicon.ico|sitemap.xml|robots.txt|$).*)",
  ],
};
