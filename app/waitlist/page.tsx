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
    "mt-1 w-full border-0 border-b-2 border-parchment/30 bg-transparent px-1 py-2 text-sm text-parchment outline-none focus:border-ember";
  const labelClass = "font-label block text-xs font-bold uppercase tracking-wide text-parchment/70";

  if (status === "success") {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center border-2 border-sage bg-cocoa-light text-2xl font-bold text-sage">
          ✓
        </div>
        <h1 className="mt-6 font-display text-4xl font-black uppercase text-parchment">
          You&rsquo;re on the list
        </h1>
        <p className="mt-3 text-parchment/60">
          We&rsquo;ll let you know the moment SnackIt opens in Nadiad.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-20 sm:px-6">
      <h1 className="font-display text-4xl font-black uppercase text-parchment">
        Join the waitlist
      </h1>
      <p className="mt-3 text-parchment/60">
        Be the first to know when SnackIt opens in Nadiad, Gujarat.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
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
          <p className="text-sm text-ember">
            Something went wrong — that email may already be on the list, or try again.
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full border-2 border-ember bg-ember px-6 py-3 font-label text-sm font-bold uppercase tracking-wide text-cocoa transition hover:bg-cocoa hover:text-ember disabled:opacity-60"
        >
          {submitting ? "Joining…" : "Join the waitlist"}
        </button>
      </form>
    </div>
  );
}
