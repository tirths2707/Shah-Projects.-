import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { RegionProvider } from "@/lib/region-context";
import { defaultRegion, regions, type RegionId } from "@/lib/regions";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SnackIt — Craving something real? That's SnackIt.",
  description:
    "SnackIt is a quick-serve, vegetarian-first sandwich brand. Signature grilled sandwiches, pita pockets, and sub rolls — or build your own. Nadiad, India and Calgary, Canada.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const cookieRegion = cookieStore.get("snackit-region")?.value as RegionId | undefined;
  const initialRegionId = cookieRegion && regions[cookieRegion] ? cookieRegion : defaultRegion;

  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-cream text-espresso">
        <RegionProvider initialRegionId={initialRegionId}>
          <CartProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </CartProvider>
        </RegionProvider>
      </body>
    </html>
  );
}
