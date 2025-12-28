import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }


  if (token?.role === "SUPER_ADMIN") {
    return NextResponse.next();
  }


  const roleRouteMap = {
    CUSTOMER: ["/dashboard/user"],
    GENERAL_ADMIN: ["/dashboard/admin"],
    MODERATOR: ["/dashboard/moderator"],
    INSPECT_ADMIN: ["/dashboard/inspect-admin"],
  };

  const allowedRoutes = roleRouteMap[token?.role] || [];

  const isAllowed = allowedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isAllowed && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
