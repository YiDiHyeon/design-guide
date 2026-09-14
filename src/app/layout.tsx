import type { Metadata } from 'next';
import './globals.css';
import { ThemeScript } from '@/components/site/theme-script';

export const metadata: Metadata = {
  title: { default: 'Cabinet Design', template: '%s · Cabinet Design' },
  description:
    '개인 웹서비스와 토이 프로젝트에서 재사용하는 중립적이고 접근성 높은 디자인 시스템.',
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
      <body>{children}</body>
    </html>
  );
}
