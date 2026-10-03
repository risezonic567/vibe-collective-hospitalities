import { MetadataRoute } from "next";
import { site } from "@/config/site";
import {
  getJourneySlugs,
  getEventSlugs,
  getWeddingSlugs,
  getDestinationSlugs,
} from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static root pages
  const staticRoutes = [
    "",
    "/about",
    "/journey",
    "/events",
    "/weddings",
    "/contact",
    "/destinations",
  ].map((route) => ({
    url: `${site.url}${route}`,
    lastModified: now,
    changeFrequency: (route === "" ? "daily" : "weekly") as "daily" | "weekly",
    priority: route === "" ? 1.0 : 0.85,
  }));

  // Dynamic slug routes
  const journeyRoutes = getJourneySlugs().map((slug) => ({
    url: `${site.url}/journey/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const eventRoutes = getEventSlugs().map((slug) => ({
    url: `${site.url}/events/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const weddingRoutes = getWeddingSlugs().map((slug) => ({
    url: `${site.url}/weddings/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const destinationRoutes = getDestinationSlugs().map((slug) => ({
    url: `${site.url}/destinations/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    ...staticRoutes,
    ...journeyRoutes,
    ...eventRoutes,
    ...weddingRoutes,
    ...destinationRoutes,
  ];
}
