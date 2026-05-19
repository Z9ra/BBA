import type { Metadata } from "next";
import { Outfit, Anton } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bersamaberdikari.com'),
  title: {
    default: 'PT. Bersama Berdikari Abadi | Jasa IT Sumedang, Jawa Barat',
    template: '%s | PT. Bersama Berdikari Abadi',
  },
  description:
    'PT. Bersama Berdikari Abadi menyediakan jasa pengembangan software, instalasi jaringan TI, dan layanan perangkat keras profesional di Sumedang, Jawa Barat. Konsultasi gratis, hubungi kami sekarang.',
  keywords: [
    'jasa IT Sumedang',
    'pengembangan software Sumedang',
    'instalasi jaringan Sumedang',
    'jasa komputer Sumedang',
    'pembuatan website Sumedang',
    'jasa IT Jawa Barat',
    'perusahaan IT Sumedang',
    'PT Bersama Berdikari Abadi',
    'BBA IT Solutions',
    'software house Sumedang',
  ],
  authors: [{ name: 'PT. Bersama Berdikari Abadi', url: 'https://bersamaberdikari.com' }],
  creator: 'PT. Bersama Berdikari Abadi',
  publisher: 'PT. Bersama Berdikari Abadi',
  alternates: {
    canonical: 'https://bersamaberdikari.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://bersamaberdikari.com',
    siteName: 'PT. Bersama Berdikari Abadi',
    title: 'PT. Bersama Berdikari Abadi | Jasa IT Sumedang, Jawa Barat',
    description:
      'PT. Bersama Berdikari Abadi menyediakan jasa pengembangan software, instalasi jaringan TI, dan layanan perangkat keras profesional di Sumedang, Jawa Barat.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'PT. Bersama Berdikari Abadi - Jasa IT Profesional Sumedang',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PT. Bersama Berdikari Abadi | Jasa IT Sumedang, Jawa Barat',
    description:
      'PT. Bersama Berdikari Abadi menyediakan jasa pengembangan software, instalasi jaringan TI, dan layanan perangkat keras profesional di Sumedang, Jawa Barat.',
    images: ['/logo.png'],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // We can't easily import from '@/lib/settings' here if there are path alias issues, 
  // but let's assume alias '@/' works as it does in standard Next.js
  const { getSettings } = await import('@/lib/settings');
  const settings = await getSettings();

  const backgroundStyle = settings.backgroundType === 'image' && settings.backgroundImageUrl
    ? { 
        backgroundImage: `url(${settings.backgroundImageUrl})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundAttachment: 'fixed',
        backgroundColor: '#050505' // Fallback
      }
    : { backgroundColor: settings.backgroundColor || 'var(--bg-primary)' };

  return (
    <html lang="id" className={`${outfit.variable} ${anton.variable}`}>
      <body style={backgroundStyle}>{children}</body>
    </html>
  );
}
