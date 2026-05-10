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
  title: 'PT. Bersama Berdikari Abadi | IT Solutions',
  description: 'Layanan Pengembangan Perangkat Lunak, Integrasi Infrastruktur Jaringan, dan Dukungan Teknis Perangkat Keras Profesional.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    siteName: 'PT. Bersama Berdikari Abadi',
    title: 'PT. Bersama Berdikari Abadi | IT Solutions',
    description: 'Layanan Pengembangan Perangkat Lunak, Integrasi Infrastruktur Jaringan, dan Dukungan Teknis Perangkat Keras Profesional.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PT. Bersama Berdikari Abadi | IT Solutions',
    description: 'Layanan Pengembangan Perangkat Lunak, Integrasi Infrastruktur Jaringan, dan Dukungan Teknis Perangkat Keras Profesional.',
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
