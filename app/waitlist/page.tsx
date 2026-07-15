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

  if (status === "success") {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lime text-2xl font-bold text-plum">
          ✓
        </div>
        <h1 className="mt-6 font-display text-3xl font-extrabold text-plum">You&rsquo;re on the list</h1>
        <p className="mt-3 text-plum/70">
          We&rsquo;ll let you know the moment SnackIt opens in Nadiad.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-20 sm:px-6">
      <h1 className="font-display text-3xl font-extrabold text-plum">Join the waitlist</h1>
      <p className="mt-3 text-plum/70">
        Be the first to know when SnackIt opens in Nadiad, Gujarat.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label htmlFor="w-name" className="block text-sm font-medium text-plum">
            Name
          </label>
          <input
            id="w-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-plum/20 bg-white px-3 py-2 text-sm text-plum outline-none focus:border-plum"
          />
        </div>

        <div>
          <label htmlFor="w-email" className="block text-sm font-medium text-plum">
            Email
          </label>
          <input
            id="w-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-plum/20 bg-white px-3 py-2 text-sm text-plum outline-none focus:border-plum"
          />
        </div>

        <div>
          <label htmlFor="w-phone" className="block text-sm font-medium text-plum">
            Phone (optional)
          </label>
          <input
            id="w-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 w-full rounded-lg border border-plum/20 bg-white px-3 py-2 text-sm text-plum outline-none focus:border-plum"
          />
        </div>

        <div>
          <label htmlFor="w-city" className="block text-sm font-medium text-plum">
            City (optional)
          </label>
          <input
            id="w-city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="mt-1 w-full rounded-lg border border-plum/20 bg-white px-3 py-2 text-sm text-plum outline-none focus:border-plum"
          />
        </div>

        {status === "error" && (
          <p className="text-sm text-pink">
            Something went wrong — that email may already be on the list, or try again.
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-plum px-6 py-3 text-sm font-semibold text-cream transition hover:bg-plum/90 disabled:opacity-60"
        >
          {submitting ? "Joining…" : "Join the waitlist"}
        </button>
      </form>
    </div>
  );
}
