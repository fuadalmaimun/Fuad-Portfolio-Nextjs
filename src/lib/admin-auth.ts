import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getAdminSession(requestHeaders?: Headers) {
  const session = await auth.api.getSession({
    headers: requestHeaders ?? (await headers()),
  });

  if (!session) return { session: null, status: 401 as const };
  if (session.user.role !== "admin") return { session: null, status: 403 as const };

  return { session, status: 200 as const };
}

export async function getAdminOtpStatus(sessionToken: string) {
  const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) return { verified: false };
  try {
    const response = await fetch(new URL("/api/auth/otp/status", backendUrl), {
      headers: { authorization: `Bearer ${sessionToken}`, "x-session-token": sessionToken },
      cache: "no-store",
    });
    if (!response.ok) return { verified: false };
    const result = await response.json();
    return { verified: result.verified === true };
  } catch {
    return { verified: false };
  }
}
