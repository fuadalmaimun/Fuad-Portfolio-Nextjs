import { MongoClient } from "mongodb";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const LIMITS = {
  name: { min: 2, max: 80 },
  subject: { max: 120 },
  message: { min: 10, max: 2000 },
};

/** Best-effort in-memory rate limiting */
const RATE_LIMIT = { windowMs: 60_000, max: 5 };
const requestLog = new Map();

function isRateLimited(key) {
  const now = Date.now();
  const recent = (requestLog.get(key) || []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT.windowMs
  );

  if (recent.length >= RATE_LIMIT.max) {
    requestLog.set(key, recent);
    return true;
  }

  recent.push(now);
  requestLog.set(key, recent);
  return false;
}

function validate(payload) {
  const errors = {};

  const name = String(payload.name ?? "").trim();
  const email = String(payload.email ?? "").trim();
  const subject = String(payload.subject ?? "").trim();
  const message = String(payload.message ?? "").trim();

  if (!name) {
    errors.name = "Please enter your name.";
  } else if (name.length < LIMITS.name.min) {
    errors.name = `Name must be at least ${LIMITS.name.min} characters.`;
  } else if (name.length > LIMITS.name.max) {
    errors.name = `Name must be under ${LIMITS.name.max} characters.`;
  }

  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (subject.length > LIMITS.subject.max) {
    errors.subject = `Subject must be under ${LIMITS.subject.max} characters.`;
  }

  if (!message) {
    errors.message = "Please write a message.";
  } else if (message.length < LIMITS.message.min) {
    errors.message = `Message must be at least ${LIMITS.message.min} characters.`;
  } else if (message.length > LIMITS.message.max) {
    errors.message = `Message must be under ${LIMITS.message.max} characters.`;
  }

  return errors;
}

function json(body, status = 200) {
  return Response.json(body, { status });
}

export const runtime = "nodejs";

export async function POST(request) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return json(
      { ok: false, code: "BAD_REQUEST", message: "Invalid request body." },
      400
    );
  }

  // Honeypot: real visitors never fill this hidden field
  if (payload.company) {
    return json({ ok: true });
  }

  const clientIp =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (isRateLimited(clientIp)) {
    return json(
      {
        ok: false,
        code: "RATE_LIMITED",
        message: "Too many messages in a short time. Please wait a minute and try again.",
      },
      429
    );
  }

  const errors = validate(payload);
  if (Object.keys(errors).length > 0) {
    return json({ ok: false, code: "VALIDATION", errors }, 400);
  }

  // Save to MongoDB
  try {
    const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || "";
    
    // Attempt to send through backend API
    try {
      if (!backendUrl) throw new Error("BACKEND_URL is not configured");
      const backendRes = await fetch(`${backendUrl}/api/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          subject: payload.subject,
          message: payload.message,
        }),
      });

      if (backendRes.ok) {
        return json({
          ok: true,
          success: true,
          message: "Thanks! Your message has been sent — I'll get back to you within 24 hours.",
        });
      }
    } catch {
      // Backend not running, proceed to direct MongoDB fallback
    }

    // Direct MongoDB fallback if backend unreachable
    const uri = process.env.MONGODB_URI;
    const dbName = process.env.DB_NAME || "fuad_portfolio";

    if (uri) {
      const client = new MongoClient(uri);
      await client.connect();
      const db = client.db(dbName);

      await db.collection("messages").insertOne({
        id: `msg_${Date.now()}`,
        name: String(payload.name).trim(),
        email: String(payload.email).trim(),
        subject: String(payload.subject ?? "").trim() || "New portfolio enquiry",
        message: String(payload.message).trim(),
        isRead: false,
        ip: clientIp,
        createdAt: new Date(),
      });

      await client.close();

      return json({
        ok: true,
        success: true,
        message: "Thanks! Your message has been sent — I'll get back to you within 24 hours.",
      });
    }

    return json({
      ok: true,
      message: "Message accepted.",
    });
  } catch (error) {
    console.error("[contact] Error saving message:", error);
    return json(
      {
        ok: false,
        code: "DB_ERROR",
        message: "Could not save your message right now. Please try again or email directly.",
      },
      500
    );
  }
}
