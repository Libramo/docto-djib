import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.AUTH_SECRET!; // same as your NextAuth secret

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: secret });

  const { pathname } = request.nextUrl;

  console.log("request", request);

  console.log("secret", secret);

  console.log("cookies", request.cookies.getAll());

  console.log("Token", token);

  // If user is not authenticated
  if (!token) {
    const res = NextResponse.redirect(new URL("/login", request.url));
    return res;
  }

  // if (!token && pathname !== "/login") {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  // If trying to access /dashboard/admin but user is NOT admin
  if (pathname.startsWith("/dashboard/admin") && token?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  console.log("AAAAAAAAAAAAA", NextResponse.next());

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};

// export const config = {
//   matcher: [
//     "/dashboard/:path*",
//     "/((?!api|_next|favicon.ico|login|unauthorized).*)",
//   ],
// };
