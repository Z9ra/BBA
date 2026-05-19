import { MetadataRoute } from 'next';

// robots.txt — memberitahu Google bot halaman mana yang boleh di-crawl
// Halaman admin & login TIDAK akan di-index oleh Google

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/', '/login', '/api/'],
      },
    ],
    sitemap: 'https://bersamaberdikari.com/sitemap.xml',
    host: 'https://bersamaberdikari.com',
  };
}
