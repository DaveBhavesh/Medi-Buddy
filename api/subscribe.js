// Vercel serverless function: POST /api/subscribe  { email }
// Emails the site administrator the visitor's address through Resend's REST API.
//
// Required environment variables (set in Vercel -> Project -> Settings -> Environment Variables):
//   RESEND_API_KEY   API key from https://resend.com
//   ADMIN_EMAIL      where notifications are delivered (the administrator's address)
// Optional:
//   MAIL_FROM        verified sender, e.g. "PMC World <no-reply@yourdomain.org>".
//                    Defaults to Resend's test sender, which can only deliver to the Resend
//                    account owner's own email until you verify a domain.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed." });
  }

  const { RESEND_API_KEY, ADMIN_EMAIL } = process.env;
  const MAIL_FROM = process.env.MAIL_FROM || "PMC World <onboarding@resend.dev>";
  if (!RESEND_API_KEY || !ADMIN_EMAIL) {
    console.error("subscribe: RESEND_API_KEY or ADMIN_EMAIL is not configured");
    return res.status(503).json({ ok: false, error: "Sign-up is not available right now." });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }
  const email = String(body?.email ?? "").trim();
  if (body?.website) return res.status(200).json({ ok: true }); // spam trap: silently ignore
  if (email.length > 254 || !EMAIL_RE.test(email)) {
    return res.status(400).json({ ok: false, error: "Please enter a valid email address." });
  }

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: MAIL_FROM,
        to: [ADMIN_EMAIL],
        reply_to: email,
        subject: "New Join Us sign-up on PMC World",
        text: `A visitor joined via the website footer.\n\nEmail: ${email}\nTime: ${new Date().toISOString()}`,
        html: `<p>A visitor joined via the website footer.</p><p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
      }),
    });
    if (!r.ok) {
      console.error("subscribe: Resend error", r.status, await r.text());
      return res.status(502).json({ ok: false, error: "We could not send your request. Please try again later." });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("subscribe: request failed", err);
    return res.status(502).json({ ok: false, error: "We could not send your request. Please try again later." });
  }
}
