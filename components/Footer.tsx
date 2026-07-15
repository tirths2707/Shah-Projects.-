"use client";

import Link from "next/link";
import { SandwichIcon } from "@/components/icons";
import { useRegion } from "@/lib/region-context";

export default function Footer() {
  const { region } = useRegion();

  return (
    <footer className="border-t border-espresso/10 bg-espresso text-cream">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-display flex items-center gap-2 text-lg font-bold">
            <SandwichIcon className="h-5 w-5 text-coral" />
            SnackIt
          </p>
          <p className="mt-1 text-sm text-cream/60">
            Craving something real? That&rsquo;s SnackIt.
          </p>
        </div>

        <nav className="flex gap-4 text-sm text-cream/60">
          <Link href="/privacy" className="hover:text-coral">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-coral">
            Terms of Service
          </Link>
        </nav>

        <div className="text-sm text-cream/60">
          <p>
            {region.label}, {region.country}
          </p>
          <p className="mt-1">&copy; {new Date().getFullYear()} SnackIt. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
