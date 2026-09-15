import type { MetadataRoute } from 'next';
import { documents } from '@/lib/docs';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://cabinet-design.vercel.app';

  const docRoutes: MetadataRoute.Sitemap = documents.map((doc) => ({
    url: `${siteUrl}/${doc.category}/${doc.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority:
      doc.slug === 'overview' || doc.slug === 'getting-started' ? 0.9 : 0.8,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...docRoutes,
  ];
}
