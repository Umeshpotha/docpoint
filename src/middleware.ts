import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Reuse the default export from NextAuth middleware if needed
export { default } from "next-auth/middleware";

export async function middleware(request: NextRequest) {
  // Retrieve the token
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // Redirect authenticated users away from sign-in, sign-up, verify, or home pages to the dashboard
  if (token && (url.pathname === "/sign-in" || url.pathname === "/sign-up" || url.pathname === "/verify" || url.pathname === "/")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect unauthenticated users trying to access protected routes to sign-in page
  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Allow the request to proceed if it doesn't match any of the above conditions
  return NextResponse.next();
}

// Config to match the routes for which the middleware should run
export const config = {
  matcher: ["/sign-in", "/sign-up", "/", "/dashboard/:path*", "/verify/:path*", "/api/:path*"],
};
