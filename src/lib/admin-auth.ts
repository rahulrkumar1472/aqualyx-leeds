import { NextResponse } from "next/server";

function readBasicPassword(authorizationHeader: string | null): string | null {
  if (!authorizationHeader?.startsWith("Basic ")) return null;
  const base64 = authorizationHeader.slice("Basic ".length);

  try {
    const decoded = Buffer.from(base64, "base64").toString("utf8");
    const separator = decoded.indexOf(":");
    if (separator < 0) return null;
    return decoded.slice(separator + 1);
  } catch {
    return null;
  }
}

export function isAdminApiRequest(request: Request) {
  const adminPassword = process.env.ADMIN_PASSWORD?.trim();
  if (!adminPassword) return false;

  const headerPassword = request.headers.get("x-admin-password")?.trim();
  if (headerPassword && headerPassword === adminPassword) return true;

  const basicPassword = readBasicPassword(request.headers.get("authorization"));
  if (basicPassword && basicPassword === adminPassword) return true;

  return false;
}

export function adminUnauthorizedJson() {
  return NextResponse.json(
    { ok: false, message: "Unauthorized" },
    {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Aqualyx Leeds Admin", charset="UTF-8"',
        "X-Robots-Tag": "noindex, nofollow, noarchive"
      }
    }
  );
}
