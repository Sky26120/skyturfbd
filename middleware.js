import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;
  
 
  const sessionToken = 
    req.cookies.get("next-auth.session-token")?.value || 
    req.cookies.get("__Secure-next-auth.session-token")?.value;

  
  if (pathname.startsWith("/dashboard")) {
    if (!sessionToken) {
      console.log(" No session token, redirecting to signin");
      return NextResponse.redirect(new URL("/signin", req.url));
    }
    console.log(" Session token found, allowing access");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};