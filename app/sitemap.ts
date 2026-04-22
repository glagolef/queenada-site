import type { MetadataRoute } from "next";
import { siteConfig, sitePages } from "../lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  return sitePages.map((page) => ({
    url: new URL(page.href, siteConfig.url).toString(),
    changeFrequency: "weekly",
    priority: page.key === "home" ? 1 : 0.8,
  }));
}
