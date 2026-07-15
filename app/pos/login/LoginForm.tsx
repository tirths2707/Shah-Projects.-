"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { SandwichIcon } from "@/components/icons";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      setSubmitting(false);
      setError("Incorrect email or password.");
      return;
    }
    router.replace("/pos");
  }

  const inputClass =
    "mt-1 w-full rounded-xl border-2 border-espresso/10 bg-cream px-3 py-2.5 text-sm text-espresso outline-none transition focus:border-coral";
  const labelClass = "block text-xs font-bold uppercase tracking-wide text-espresso/50";

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-sm flex-col justify-center px-4 sm:px-6">
      <div className="flex items-center gap-2">
        <SandwichIcon className="h-6 w-6 text-coral" />
        <span className="font-display text-lg font-bold text-espresso">SnackIt POS</span>
      </div>
      <h1 className="font-display mt-6 text-3xl font-bold text-espresso">Staff sign in</h1>
      <p className="mt-2 text-sm text-espresso/60">Sign in to manage orders and ring up sales.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="password" className={labelClass}>
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
          />
        </div>
        {error && <p className="text-sm text-coral">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-coral px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-coral-dark disabled:opacity-60"
        >
          {submitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
