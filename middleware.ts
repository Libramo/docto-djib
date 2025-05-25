import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.AUTH_SECRET!;

const protectedRoutesByRole: Record<string, string[]> = {
  ADMIN: ["/admin", "/admin/dashboard"],
  DOCTOR: [
    "/doctor",
    "/doctor/patients",
    "/doctor/appointments",
    "/doctor/availabilities",
  ],
  USER: [
    "/patient/prescriptions",
    "/patient/medical-history",
    "/patient/messages",
    "/support",
  ],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: secret,
    secureCookie: process.env.NODE_ENV === "production",
  });

  const { pathname } = request.nextUrl;

  // If user is not authenticated
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const userRole = token.role;

  // Check if current path is in one of the protected roles
  const hasAccess = Object.entries(protectedRoutesByRole).some(
    ([role, paths]) => {
      if (userRole !== role) return false;
      return paths.some((path) => pathname.startsWith(path));
    }
  );

  // If path is protected but role not allowed
  const isProtectedPath = Object.values(protectedRoutesByRole)
    .flat()
    .some((path) => pathname.startsWith(path));

  if (isProtectedPath && !hasAccess) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/doctor/:path*",
    "/prescriptions",
    "/medical-history",
    "/messages",
    "/support",
    "/dashboard", // if you use general dashboard route
    "/profile",
    "/settings",
  ],
};
