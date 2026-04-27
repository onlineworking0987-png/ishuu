import { NextRequest, NextResponse } from "next/server";
import { getAdminCookieName, verifyAdminSessionToken } from "@/lib/admin-auth";

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  const isDashboard = pathname.startsWith("/dashboard");
  const isAdminApiRead = pathname === "/api/contact" && req.method === "GET";
  const isAdminArea = isDashboard || isAdminApiRead;

  if (!isAdminArea) return NextResponse.next();

  const token = req.cookies.get(getAdminCookieName())?.value || "";
  const ok = token ? await verifyAdminSessionToken(token) : false;

  if (ok) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.searchParams.set("next", pathname + search);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/contact"],
};

