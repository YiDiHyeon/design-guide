import { ImageResponse } from 'next/og';

export const alt = 'Cabinet Design - 작은 원칙으로 만드는 일관된 경험';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#121310',
          backgroundImage:
            'radial-gradient(circle at 90% 15%, rgba(127, 148, 69, 0.22) 0%, transparent 60%), radial-gradient(circle at 10% 85%, rgba(104, 123, 55, 0.15) 0%, transparent 55%)',
          padding: '70px 80px',
          color: '#f4f4f0',
          fontFamily: 'sans-serif',
          border: '12px solid #1c1d19',
        }}
      >
        {/* Top brand header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: '#7f9445',
              color: '#ffffff',
              fontSize: '24px',
              fontWeight: 800,
            }}
          >
            C
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span
              style={{
                fontSize: '24px',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: '#ffffff',
              }}
            >
              Cabinet Design
            </span>
            <span
              style={{
                fontSize: '14px',
                color: '#9e9e94',
                fontWeight: 500,
              }}
            >
              Design System & Component Guide
            </span>
          </div>
        </div>

        {/* Main hero headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            maxWidth: '960px',
          }}
        >
          <h1
            style={{
              fontSize: '56px',
              fontWeight: 900,
              lineHeight: 1.2,
              letterSpacing: '-0.03em',
              margin: 0,
              color: '#ffffff',
            }}
          >
            작은 원칙으로 만드는 일관된 경험
          </h1>
          <p
            style={{
              fontSize: '24px',
              lineHeight: 1.5,
              color: '#b5b5ab',
              margin: 0,
            }}
          >
            개인 웹서비스와 토이 프로젝트를 위한 중립적이고 단단한 디자인 가이드
          </p>
        </div>

        {/* Bottom feature badges */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          {[
            'Design Tokens',
            'React 19',
            'WAI-ARIA A11y',
            'Dark Mode',
            'Tailwind v4',
          ].map((tag) => (
            <div
              key={tag}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 18px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                fontSize: '16px',
                fontWeight: 600,
                color: '#d4d4cc',
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
