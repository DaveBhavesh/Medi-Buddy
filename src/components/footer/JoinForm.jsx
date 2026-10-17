import { useId, useRef, useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Join Us: validates the email, POSTs to /api/subscribe, and reports the real result. */
export default function JoinForm({ label }) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "idle", message: "" }); // idle | loading | success | error
  const busy = useRef(false); // blocks double submits even before React re-renders

  async function onSubmit(event) {
    event.preventDefault();
    if (busy.current) return;
    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setStatus({ type: "error", message: "Please enter a valid email address." });
      return;
    }
    busy.current = true;
    setStatus({ type: "loading", message: "Sending…" });
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value, website: "" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong.");
      setStatus({ type: "success", message: "Thank you! You have joined us." });
      setEmail("");
    } catch (err) {
      setStatus({
        type: "error",
        message: err.message || "We could not send your request. Please try again later.",
      });
    } finally {
      busy.current = false;
    }
  }

  const loading = status.type === "loading";
  return (
    <form onSubmit={onSubmit} noValidate aria-label={label}>
      <h3 className="font-black text-white">{label}</h3>
      <div className="mt-3 flex flex-col gap-2 min-[420px]:flex-row">
        <label htmlFor={id} className="sr-only">
          Email address
        </label>
        <input
          id={id}
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          aria-invalid={status.type === "error"}
          aria-describedby={`${id}-msg`}
          disabled={loading}
          /* text-base (16px) stops iPhone Safari from zooming in on focus */
          className="min-h-11 min-w-0 flex-1 rounded-full border border-white/25 bg-white/5 px-4 text-base text-white outline-none placeholder:text-white/45 focus:border-amber-400 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={loading}
          className="min-h-11 rounded-full bg-amber-400 px-6 text-sm font-black text-black transition-colors hover:bg-amber-300 disabled:cursor-wait disabled:opacity-60"
        >
          {loading ? "Joining…" : "Join"}
        </button>
      </div>
      <p
        id={`${id}-msg`}
        role={status.type === "error" ? "alert" : "status"}
        aria-live="polite"
        className={`text-sm ${status.message ? "mt-2" : ""} ${
          status.type === "error" ? "text-red-300" : status.type === "success" ? "text-emerald-300" : "text-white/60"
        }`}
      >
        {status.message}
      </p>
    </form>
  );
}
