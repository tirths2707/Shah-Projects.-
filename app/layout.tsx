import type { Metadata } from "next";
import { Fredoka, Work_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SnackIt — Craving something real? That's SnackIt.",
  description:
    "SnackIt is a quick-serve, vegetarian-first sandwich brand launching in Nadiad, Gujarat. Signature grilled sandwiches, pita pockets, and sub rolls — or build your own.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fredoka.variable} ${workSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-cream text-espresso">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
