const PUBLIC_ENDPOINTS = new Set(["about", "education", "profile", "projects", "settings", "skills"]);

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;
  const validCollectionPath = path.length === 1 && PUBLIC_ENDPOINTS.has(path[0]);
  const validProjectPath = path.length === 2 && path[0] === "projects" && ![".", ".."].includes(path[1]);
  if (!validCollectionPath && !validProjectPath) {
    return Response.json({ success: false, message: "Not found" }, { status: 404 });
  }

  const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    return Response.json({ success: false, message: "Backend URL is not configured" }, { status: 503 });
  }

  const target = new URL(`/api/${path.map(encodeURIComponent).join("/")}`, backendUrl);
  target.search = new URL(request.url).search;

  try {
    const upstream = await fetch(target, {
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    return new Response(upstream.body, {
      status: upstream.status,
      headers: {
        "content-type": upstream.headers.get("content-type") || "application/json",
        "cache-control": "no-store",
      },
    });
  } catch (error) {
    console.error("[public-api-proxy] Backend request failed:", error);
    return Response.json({ success: false, message: "Portfolio backend is unavailable" }, { status: 502 });
  }
}
