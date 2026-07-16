"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { SandwichIcon } from "@/components/icons";
import RegionSwitcher from "@/components/RegionSwitcher";

const navLinks = [
  { href: "/menu", label: "Menu" },
  { href: "/build-your-own", label: "Build Your Own" },
  { href: "/waitlist", label: "Waitlist" },
];

export default function Header() {
  const { itemCount } = useCart();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // The staff POS gets its own chrome — hide the customer nav.
  if (pathname.startsWith("/pos")) return null;

  return (
    <header className="sticky top-0 z-40 border-b border-espresso/10 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="font-display flex items-center gap-2 text-xl font-bold text-espresso"
        >
          <SandwichIcon className="h-6 w-6 text-coral" />
          SnackIt
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative text-sm font-semibold text-espresso/70 transition hover:text-espresso"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-coral transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <RegionSwitcher />
          </div>
          <Link
            href="/cart"
            className="relative rounded-full bg-espresso px-4 py-2 text-sm font-semibold text-white transition hover:bg-coral"
          >
            Cart
            {itemCount > 0 && (
              <span
                key={itemCount}
                className="animate-pop absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-coral text-xs font-bold text-white"
              >
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
        <nav className="flex flex-col gap-3 border-t border-espresso/10 px-4 pb-4 md:hidden">
          <div className="pt-3 sm:hidden">
            <RegionSwitcher />
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-2 py-2 text-sm font-semibold text-espresso/70 hover:bg-coral/5 hover:text-coral"
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
