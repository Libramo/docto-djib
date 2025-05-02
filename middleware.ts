import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.AUTH_SECRET; // same as your NextAuth secret

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret });

  const { pathname } = request.nextUrl;

  // If user is not authenticated
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If trying to access /dashboard/admin but user is NOT admin
  if (pathname.startsWith("/dashboard/admin") && token.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
