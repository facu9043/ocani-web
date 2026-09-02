import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/catalogo", "/sobre-nosotros", "/contacto"];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/catalogo" ? "daily" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
