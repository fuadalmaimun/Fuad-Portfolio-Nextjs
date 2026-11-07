
const EMAILJS_ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const LIMITS = {
  name: { min: 2, max: 80 },
  subject: { max: 120 },
  message: { min: 10, max: 2000 },
};

/** Best-effort in-memory rate limiting (per server instance). */
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

  // Honeypot: real visitors never fill this hidden field, so bots are
  // silently dropped before they consume rate-limit budget.
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

  const { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY } =
    process.env;

  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    return json(
      {
        ok: false,
        code: "NOT_CONFIGURED",
        message: "Email delivery is not configured on this deployment.",
      },
      503
    );
  }

  try {
    const response = await fetch(EMAILJS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        template_params: {
          from_name: String(payload.name).trim(),
          from_email: String(payload.email).trim(),
          reply_to: String(payload.email).trim(),
          subject:
            String(payload.subject ?? "").trim() || "New portfolio enquiry",
          message: String(payload.message).trim(),
        },
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error(`[contact] EmailJS responded ${response.status}: ${detail}`);

      return json(
        {
          ok: false,
          code: "SEND_FAILED",
          message:
            "The email service rejected this message. Please email me directly instead.",
        },
        502
      );
    }

    return json({ ok: true });
  } catch (error) {
    console.error("[contact] Failed to reach EmailJS:", error);

    return json(
      {
        ok: false,
        code: "SEND_FAILED",
        message: "Could not reach the email service. Please try again.",
      },
      502
    );
  }
}
