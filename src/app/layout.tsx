import type { Metadata } from 'next';
import './globals.css';
import { ThemeScript } from '@/components/site/theme-script';
import { GoogleAnalytics } from '@/components/site/google-analytics';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://cabinet-design.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Cabinet Design · 작은 원칙으로 만드는 일관된 경험',
    template: '%s · Cabinet Design',
  },
  description:
    '개인 웹서비스와 토이 프로젝트에서 재사용하는 중립적이고 접근성 높은 디자인 시스템 가이드입니다.',
  keywords: [
    '디자인 시스템',
    'Design System',
    'UI 가이드',
    '컴포넌트 라이브러리',
    '웹 접근성',
    'WAI-ARIA',
    'React 19',
    'Next.js',
    'Tailwind CSS',
    '디자인 토큰',
  ],
  authors: [{ name: 'Cabinet Design' }],
  creator: 'Cabinet Design',
  publisher: 'Cabinet Design',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Cabinet Design · 작은 원칙으로 만드는 일관된 경험',
    description:
      '개인 웹서비스와 토이 프로젝트에서 재사용하는 중립적이고 접근성 높은 디자인 시스템 가이드입니다.',
    url: siteUrl,
    siteName: 'Cabinet Design',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cabinet Design · 작은 원칙으로 만드는 일관된 경험',
    description:
      '개인 웹서비스와 토이 프로젝트에서 재사용하는 중립적이고 접근성 높은 디자인 시스템 가이드입니다.',
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
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
