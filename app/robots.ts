import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shah-projects.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin", "/pos", "/cart", "/checkout", "/order-confirmed"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
