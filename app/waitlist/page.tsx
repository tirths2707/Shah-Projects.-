"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function WaitlistPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setStatus("idle");

    const { error } = await supabase.from("waitlist_signups").insert({
      name,
      email,
      phone: phone || null,
      city: city || null,
      interest: "general",
      source: "website",
    });

    setSubmitting(false);
    setStatus(error ? "error" : "success");
  }

  const inputClass =
    "mt-1 w-full rounded-xl border-2 border-espresso/10 bg-cream px-3 py-2.5 text-sm text-espresso outline-none transition focus:border-coral";
  const labelClass = "block text-xs font-bold uppercase tracking-wide text-espresso/50";

  if (status === "success") {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
        <div className="animate-pop mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-basil/15 text-4xl">
          🎉
        </div>
        <h1 className="font-display mt-6 text-4xl font-bold text-espresso">
          You&rsquo;re on the list
        </h1>
        <p className="mt-3 text-espresso/60">
          We&rsquo;ll let you know the moment SnackIt opens in Nadiad.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-20 sm:px-6">
      <h1 className="font-display text-4xl font-bold text-espresso">Join the waitlist</h1>
      <p className="mt-3 text-espresso/60">
        Be the first to know when SnackIt opens in Nadiad, Gujarat.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label htmlFor="w-name" className={labelClass}>
            Name
          </label>
          <input
            id="w-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="w-email" className={labelClass}>
            Email
          </label>
          <input
            id="w-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="w-phone" className={labelClass}>
            Phone (optional)
          </label>
          <input
            id="w-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="w-city" className={labelClass}>
            City (optional)
          </label>
          <input
            id="w-city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={inputClass}
          />
        </div>

        {status === "error" && (
          <p className="text-sm text-coral">
            Something went wrong — that email may already be on the list, or try again.
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-coral px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-coral-dark disabled:opacity-60"
        >
          {submitting ? "Joining…" : "Join the waitlist"}
        </button>
      </form>
    </div>
  );
}
