import type React from 'react';
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Analytics } from '@vercel/analytics/next';
import { Suspense } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';
import { getURL } from '../lib/helpers';

const meta = {
  title: 'Linktraces',
  description:
    'Crie links curtos personalizados com seu próprio domínio e acompanhe estatísticas detalhadas',
  robots: 'follow, index',
  favicon: '/favicon.png',
  url: getURL()
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: meta.title,
    description: meta.description,
    referrer: 'origin-when-cross-origin',
    keywords: ['link', 'marketing', 'trace', 'url', 'short', 'pixel', 'Ativo'],
    authors: [{ name: 'Bronk', url: 'https://Linktracess.com/' }],
    creator: 'OjersonCode',
    publisher: 'OjefersonCode',
    robots: meta.robots,
    icons: { icon: meta.favicon },
    metadataBase: new URL(meta.url),
    openGraph: {
      url: meta.url,
      title: meta.title,
      description: meta.description,
      type: 'website',
      siteName: meta.title
    },
    twitter: {
      card: 'summary_large_image',
      site: '@linktraces',
      creator: 'ojefersoncode',
      title: meta.title,
      description: meta.description
    }
  };
}



export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider>
          <Suspense fallback={null}>{children}</Suspense>
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
