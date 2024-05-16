import { siteConfig } from "@/siteConfig";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/explore"],
      disallow: "/account/profile",
    },
    sitemap: siteConfig.baseUrl + "sitemap.xml",
  };
}
