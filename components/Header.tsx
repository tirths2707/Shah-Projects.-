"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";

const navLinks = [
  { href: "/menu", label: "Menu" },
  { href: "/build-your-own", label: "Build Your Own" },
  { href: "/waitlist", label: "Waitlist" },
];

export default function Header() {
  const { itemCount } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-espresso/10 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="font-display flex items-center gap-1.5 text-xl font-bold text-espresso">
          <span className="text-2xl">🥪</span> SnackIt
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-espresso/70 transition hover:text-tomato"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/cart"
            className="relative rounded-full bg-tomato px-4 py-2 text-sm font-semibold text-white transition hover:bg-tomato-dark"
          >
            Cart
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 animate-bounce items-center justify-center rounded-full bg-basil text-xs font-bold text-white">
                {itemCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            className="rounded-md p-2 text-espresso md:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-espresso/10 px-4 pb-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-2 py-2 text-sm font-semibold text-espresso/70 hover:bg-tomato/5 hover:text-tomato"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
