import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function withAdminSecurityHeaders(response: NextResponse) {
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  return response;
}

function unauthorizedResponse() {
  return withAdminSecurityHeaders(
    new NextResponse("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Aqualyx Leeds Admin", charset="UTF-8"'
      }
    })
  );
}

export function middleware(request: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return withAdminSecurityHeaders(new NextResponse("Admin access is not configured.", { status: 503 }));
  }

  const auth = request.headers.get("authorization");
  if (!auth?.startsWith("Basic ")) {
    return unauthorizedResponse();
  }

  let decoded = "";
  try {
    decoded = atob(auth.replace("Basic ", ""));
  } catch {
    return unauthorizedResponse();
  }
  const separator = decoded.indexOf(":");
  const password = separator >= 0 ? decoded.slice(separator + 1) : "";

  if (password !== adminPassword) {
    return unauthorizedResponse();
  }

  return withAdminSecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: ["/admin/:path*"]
};
