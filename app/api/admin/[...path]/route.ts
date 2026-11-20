import { getAdminSession } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ path: string[] }> };

async function proxyAdminRequest(request: Request, context: RouteContext) {
  const authorization = await getAdminSession(request.headers);
  if (authorization.status !== 200) {
    return Response.json(
      { success: false, message: authorization.status === 401 ? "Unauthorized" : "Forbidden" },
      { status: authorization.status }
    );
  }

  const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    return Response.json({ success: false, message: "Backend URL is not configured" }, { status: 503 });
  }

  const { path } = await context.params;
  const apiPath = path[0] === "api" ? path.slice(1) : path;
  if (!apiPath.length || apiPath.some((segment) => segment === "." || segment === "..")) {
    return Response.json({ success: false, message: "Not found" }, { status: 404 });
  }

  const otpRoute = apiPath[0] === "auth" && apiPath[1] === "otp";
  if (!otpRoute) {
    const statusResponse = await fetch(new URL("/api/auth/otp/status", backendUrl), {
      headers: {
        authorization: `Bearer ${authorization.session.session.token}`,
        "x-session-token": authorization.session.session.token,
      },
      cache: "no-store",
    }).catch(() => null);
    const otpStatus = statusResponse?.ok ? await statusResponse.json().catch(() => null) : null;
    if (!otpStatus?.verified) {
      return Response.json(
        { success: false, code: "OTP_REQUIRED", message: "Verify your email code to continue." },
        { status: 403 }
      );
    }
  }

  const target = new URL(`/api/${apiPath.map(encodeURIComponent).join("/")}`, backendUrl);
  target.search = new URL(request.url).search;

  const headers = new Headers();
  const contentType = request.headers.get("content-type");
  if (contentType) headers.set("content-type", contentType);
  headers.set("cookie", request.headers.get("cookie") || "");
  headers.set("authorization", `Bearer ${authorization.session.session.token}`);
  headers.set("x-session-token", authorization.session.session.token);

  const body = request.method === "GET" || request.method === "HEAD" ? undefined : await request.arrayBuffer();
  try {
    const upstream = await fetch(target, {
      method: request.method,
      headers,
      body,
      cache: "no-store",
      redirect: "manual",
    });
    return new Response(upstream.body, {
      status: upstream.status,
      headers: {
        "content-type": upstream.headers.get("content-type") || "application/json",
        "cache-control": "no-store",
      },
    });
  } catch {
    return Response.json({ success: false, message: "Portfolio backend is unavailable" }, { status: 502 });
  }
}

export const GET = proxyAdminRequest;
export const POST = proxyAdminRequest;
export const PUT = proxyAdminRequest;
export const PATCH = proxyAdminRequest;
export const DELETE = proxyAdminRequest;
