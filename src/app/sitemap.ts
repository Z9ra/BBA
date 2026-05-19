import { MetadataRoute } from 'next';

// Sitemap dinamis — otomatis di-generate oleh Next.js di /sitemap.xml
// Setelah deploy, submit URL ini ke Google Search Console:
// https://bersamaberdikari.com/sitemap.xml

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://bersamaberdikari.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: 'https://bersamaberdikari.com/#about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://bersamaberdikari.com/#services',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://bersamaberdikari.com/#portfolio',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://bersamaberdikari.com/#contact',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
}
