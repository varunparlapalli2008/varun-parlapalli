import { MetadataRoute } from "next";
import { getPublishedProjects } from "@/lib/content-store";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://parlapallivarun.dev";
  const projects = await getPublishedProjects();

  const projectUrls = projects.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/achievements`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...projectUrls,
  ];
}
