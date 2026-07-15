import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { regionForCountryCode } from "@/lib/regions";

const COOKIE_NAME = "snackit-region";

// Vercel's edge network sets x-vercel-ip-country on every request; this is
// only populated on Vercel deployments, not in local dev.
export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  if (!request.cookies.has(COOKIE_NAME)) {
    const countryCode = request.headers.get("x-vercel-ip-country");
    const region = regionForCountryCode(countryCode);
    response.cookies.set(COOKIE_NAME, region, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
