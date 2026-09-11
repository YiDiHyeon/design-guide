import { LandingPage } from '@/components/landing-page';

export const metadata = {
  title: 'Design Guide · 작은 원칙으로 만드는 일관된 경험',
  description:
    '당근의 SEED처럼 컴포넌트, 토큰, 인터랙션을 하나의 기준으로 정의하여 빠르고 일관된 사용자 경험을 만드는 디자인 시스템 가이드입니다.',
};

export default function Home() {
  return <LandingPage />;
}
