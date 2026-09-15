'use client';

import { useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import {
  Rocket,
  Palette,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  SunMoon,
  Laptop,
} from 'lucide-react';
import { Section, Code, Table } from '@/components/site/doc-parts';
import {
  Button,
  Select,
  Checkbox,
  Radio,
  Badge,
  CabinetLogo,
} from '@/components/ui';

function subscribeTheme(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type === 'attributes' && m.attributeName === 'data-theme') {
        callback();
      }
    }
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });
  window.addEventListener('storage', callback);
  return () => {
    observer.disconnect();
    window.removeEventListener('storage', callback);
  };
}

function getThemeSnapshot(): 'light' | 'dark' {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.getAttribute('data-theme') === 'dark'
    ? 'dark'
    : 'light';
}

function getServerThemeSnapshot(): 'light' | 'dark' {
  return 'light';
}

type PresetTheme = {
  name: string;
  label: string;
  // Light mode (high contrast on white / light surface)
  brand: string;
  brandHover: string;
  brandActive: string;
  brandSurface: string;
  textOnBrand: string;

  // Dark mode (luminous, vibrant, WCAG AAA contrast on dark surface)
  darkBrand: string;
  darkBrandHover: string;
  darkBrandActive: string;
  darkBrandSurface: string;
  darkTextOnBrand: string;
};

const PRESET_THEMES: PresetTheme[] = [
  {
    name: 'olive',
    label: 'Cabinet Olive (기본)',
    brand: '#38471d',
    brandHover: '#2b3716',
    brandActive: '#1f2710',
    brandSurface: 'rgba(56, 71, 29, 0.08)',
    textOnBrand: '#ffffff',
    darkBrand: '#abc284',
    darkBrandHover: '#bed498',
    darkBrandActive: '#98b070',
    darkBrandSurface: 'rgba(171, 194, 132, 0.18)',
    darkTextOnBrand: '#141c0a',
  },
  {
    name: 'purple',
    label: 'Vibrant Purple',
    brand: '#7c3aed',
    brandHover: '#6d28d9',
    brandActive: '#5b21b6',
    brandSurface: 'rgba(124, 58, 237, 0.08)',
    textOnBrand: '#ffffff',
    darkBrand: '#c084fc',
    darkBrandHover: '#d8b4fe',
    darkBrandActive: '#a855f7',
    darkBrandSurface: 'rgba(192, 132, 252, 0.18)',
    darkTextOnBrand: '#1b0a30',
  },
  {
    name: 'blue',
    label: 'Classic Blue',
    brand: '#2563eb',
    brandHover: '#1d4ed8',
    brandActive: '#1e40af',
    brandSurface: 'rgba(37, 99, 235, 0.08)',
    textOnBrand: '#ffffff',
    darkBrand: '#60a5fa',
    darkBrandHover: '#93c5fd',
    darkBrandActive: '#3b82f6',
    darkBrandSurface: 'rgba(96, 165, 250, 0.18)',
    darkTextOnBrand: '#081730',
  },
  {
    name: 'emerald',
    label: 'Fresh Emerald',
    brand: '#059669',
    brandHover: '#047857',
    brandActive: '#065f46',
    brandSurface: 'rgba(5, 150, 105, 0.08)',
    textOnBrand: '#ffffff',
    darkBrand: '#34d399',
    darkBrandHover: '#6ee7b7',
    darkBrandActive: '#10b981',
    darkBrandSurface: 'rgba(52, 211, 153, 0.18)',
    darkTextOnBrand: '#042219',
  },
  {
    name: 'rose',
    label: 'Energetic Rose',
    brand: '#e11d48',
    brandHover: '#be123c',
    brandActive: '#9f1239',
    brandSurface: 'rgba(225, 29, 72, 0.08)',
    textOnBrand: '#ffffff',
    darkBrand: '#fb7185',
    darkBrandHover: '#fda4af',
    darkBrandActive: '#f43f5e',
    darkBrandSurface: 'rgba(251, 113, 133, 0.18)',
    darkTextOnBrand: '#2d060f',
  },
];

export function GettingStartedDoc() {
  const themeMode = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );
  const isDark = themeMode === 'dark';

  const [selectedTheme, setSelectedTheme] = useState<PresetTheme>(
    PRESET_THEMES[0],
  );
  const [demoChecked, setDemoChecked] = useState(true);
  const [demoRadio, setDemoRadio] = useState('email');
  const [demoSelect, setDemoSelect] = useState('react');

  const brandColor = isDark ? selectedTheme.darkBrand : selectedTheme.brand;
  const brandHover = isDark
    ? selectedTheme.darkBrandHover
    : selectedTheme.brandHover;
  const brandActive = isDark
    ? selectedTheme.darkBrandActive
    : selectedTheme.brandActive;
  const brandSurface = isDark
    ? selectedTheme.darkBrandSurface
    : selectedTheme.brandSurface;
  const textOnBrand = isDark
    ? selectedTheme.darkTextOnBrand
    : selectedTheme.textOnBrand;

  const generatedCss = `/* globals.css 또는 theme.css 에 추가 */
:root {
  /* [라이트 모드] 고대비 브랜드 토큰 */
  --guide-brand-600: ${selectedTheme.brand};
  --guide-brand-700: ${selectedTheme.brandHover};
  --guide-line-checked: ${selectedTheme.brand};
  --guide-button-primary-default-bg: ${selectedTheme.brand};
  --guide-badge-accent-solid-bg: ${selectedTheme.brand};
}

[data-theme='dark'] {
  /* [다크 모드] 고대비 발광 브랜드 토큰 */
  --guide-brand-300: ${selectedTheme.darkBrand};
  --guide-line-checked: ${selectedTheme.darkBrand};
  --guide-line-focus: ${selectedTheme.darkBrand};
  --guide-text-brand: ${selectedTheme.darkBrand};
  --guide-button-primary-default-bg: ${selectedTheme.darkBrand};
  --guide-button-primary-default-text: ${selectedTheme.darkTextOnBrand};
  --guide-badge-accent-solid-bg: ${selectedTheme.darkBrand};
  --guide-badge-accent-solid-text: ${selectedTheme.darkTextOnBrand};
  --guide-badge-accent-line: ${selectedTheme.darkBrand};
}`;

  return (
    <>
      {/* 1. Overview */}
      <Section title="Overview">
        <p>
          <strong>Getting Started</strong>는 여러분의 웹서비스나 토이
          프로젝트에 Cabinet Design을 <strong>단 5분 만에</strong> 가져와 바로
          사용할 수 있도록 돕는 실전 적용 가이드입니다.
        </p>

        {/* Hero Card */}
        <div className="relative overflow-hidden rounded-2xl border border-light bg-gradient-to-br from-surface-light to-base p-6 sm:p-8 mt-5 mb-8">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-strong bg-surface-warm px-3 py-1 text-xs font-semibold text-olive mb-4">
                <Rocket size={15} />
                <span>Quick Adoption Guide</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-primary m-0 mb-3 leading-snug">
                내 프로젝트에 바로 입히는 맞춤형 디자인 가이드
              </h3>

              <p className="text-sm leading-relaxed text-secondary m-0">
                무거운 npm 라이브러리를 설치해 블랙박스 컴포넌트와 씨름할 필요가
                없습니다. 토큰 CSS를 가져오고, 내 서비스의 브랜드 색상(Brand
                Color)을 오버라이드한 뒤, 필요한 컴포넌트 코드만 자유롭게 복사해
                사용하세요.
              </p>
            </div>

            <div className="flex flex-col gap-3 min-w-[220px] w-full lg:w-auto">
              <div className="rounded-xl border border-strong bg-surface-light p-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-surface-warm border border-strong text-olive flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div className="text-xs font-semibold text-primary">
                  토큰 CSS 파일 복사
                </div>
              </div>
              <div className="rounded-xl border border-strong bg-surface-light p-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-surface-warm border border-strong text-fresh-olive flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div className="text-xs font-semibold text-primary">
                  내 브랜드 컬러 오버라이드
                </div>
              </div>
              <div className="rounded-xl border border-strong bg-surface-light p-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-surface-warm border border-strong text-tomato-coral flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div className="text-xs font-semibold text-primary">
                  원하는 컴포넌트 복사 & 사용
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 2. Adoption Strategy */}
      <Section title="Adoption Strategy">
        <p>
          Cabinet Design은 소스코드를 프로젝트 내부에 직접 소유(Code Ownership)하는
          모던 컴포넌트 가이드 방식을 채택했습니다.
        </p>

        <Table
          headings={['항목', '기존 npm UI 패키지 방식', 'Cabinet Design 방식']}
          rows={[
            [
              <strong key="ctl">코드 제어권</strong>,
              'node_modules에 묶여 있어 내부 수정 불가능',
              '프로젝트 소스에 직접 복사하여 100% 자유롭게 수정 가능',
            ],
            [
              <strong key="bnd">번들 크기</strong>,
              '쓰지 않는 수십 개 컴포넌트까지 번들에 포함',
              '내가 실제로 사용하는 컴포넌트 파일만 번들에 포함 (Zero Waste)',
            ],
            [
              <strong key="cst">브랜드 커스텀</strong>,
              '복잡한 ThemeProvider나 CSS-in-JS 오버라이드 필요',
              '단 몇 줄의 CSS 변수(--color-brand) 변경으로 즉시 일괄 적용',
            ],
            [
              <strong key="dep">버전 의존성</strong>,
              'React 18 vs 19 등 메이저 버전 변경 시 호환성 충돌 위험',
              '표준 웹 기술(Vanilla CSS, React TSX)로 독립적 구동',
            ],
          ]}
        />
      </Section>

      {/* 3. Step 1. Copy Tokens */}
      <Section title="Step 1. Copy Tokens">
        <p>
          Cabinet Design의 시각적 일관성은 3개의 순수 CSS 토큰 파일에서
          나옵니다. 여러분 프로젝트의 스타일 폴더(예: <code>src/styles/tokens</code>)에
          토큰 파일을 복사합니다.
        </p>

        <div className="rounded-xl border border-light bg-surface-light p-4 sm:p-5 my-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-primary flex items-center gap-2">
              <Layers size={16} className="text-olive" />
              권장 폴더 구조
            </span>
          </div>
          <Code>{`your-project/
├── src/
│   ├── styles/
│   │   ├── tokens/
│   │   │   ├── primitive.css    # 원시 물리값 (팔레트, 간격, 폰트)
│   │   │   ├── semantic.css     # UI 역할 토큰 (text, surface, border)
│   │   │   └── component.css    # 컴포넌트 토큰 (button, select, field)
│   │   ├── typography.css       # 타이포그래피 스케일
│   │   └── utilities.css        # 스크롤바, 스킵링크 보조 유틸
│   └── app/
│       └── globals.css          # 토큰 불러오기`}</Code>
        </div>

        <p className="text-sm text-secondary">
          <code>globals.css</code> (또는 엔트리 CSS) 최상단에서 토큰을 불러옵니다.
        </p>
        <Code label="CSS">{`/* globals.css */
@import './styles/tokens/primitive.css';
@import './styles/tokens/semantic.css';
@import './styles/tokens/component.css';
@import './styles/typography.css';
@import './styles/utilities.css';`}</Code>
      </Section>

      {/* 4. Step 2. Customize Theme */}
      <Section title="Step 2. Customize Theme">
        <p>
          Cabinet Design의 모든 컴포넌트는 <code>--color-brand</code> 토큰을
          중심으로 동작합니다. 아래 체험기에서 원하는 브랜드 색상을 클릭해
          보세요. <strong>버튼, 체크박스, 라디오, 셀렉트, 뱃지가 어떻게 실시간으로
          변신하는지</strong> 직접 확인하실 수 있습니다.
        </p>

        {/* Live Interactive Theme Customizer */}
        <div className="rounded-xl border border-light bg-surface-light p-5 sm:p-6 my-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold text-secondary uppercase tracking-wider block mb-1">
                INTERACTIVE THEME PREVIEW
              </span>
              <h3 className="text-base sm:text-lg font-bold text-primary m-0">
                원하는 브랜드 컬러를 선택해 보세요
              </h3>
            </div>

            {/* Presets */}
            <div className="flex flex-wrap gap-2">
              {PRESET_THEMES.map((theme) => {
                const isActive = selectedTheme.name === theme.name;
                const dotColor = isDark ? theme.darkBrand : theme.brand;
                return (
                  <button
                    key={theme.name}
                    type="button"
                    onClick={() => setSelectedTheme(theme)}
                    className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                      isActive
                        ? 'border-strong bg-base text-primary shadow-sm ring-2 ring-primary/20 font-bold'
                        : 'border-light bg-surface-light text-secondary hover:text-primary hover:border-strong'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full shrink-0 border border-black/10 dark:border-white/20 shadow-sm"
                      style={{ backgroundColor: dotColor }}
                    />
                    <span>{theme.label.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Component Playground with selected theme style injection */}
          <div
            className="rounded-xl border border-strong bg-base p-6 transition-all duration-300 shadow-sm"
            style={
              {
                /* 1. Core Brand Scale Tokens */
                '--guide-brand-600': brandColor,
                '--guide-brand-700': brandHover,
                '--guide-brand-800': brandActive,
                '--guide-brand-300': brandColor,
                '--guide-color-olive': brandColor,
                '--guide-color-fresh-olive': brandHover,

                /* 2. Semantic Role Tokens */
                '--guide-line-checked': brandColor,
                '--guide-line-accent': brandColor,
                '--guide-line-focus': brandColor,
                '--guide-text-brand': brandColor,
                '--guide-text-on-solid': textOnBrand,
                '--guide-color-deep-ink': isDark ? textOnBrand : '#23281d',

                /* 3. Component Button Tokens */
                '--guide-button-primary-default-bg': brandColor,
                '--guide-button-primary-default-border': brandColor,
                '--guide-button-primary-default-text': textOnBrand,
                '--guide-button-primary-hover-bg': brandHover,
                '--guide-button-primary-hover-border': brandHover,
                '--guide-button-primary-hover-text': textOnBrand,
                '--guide-button-primary-pressed-bg': brandActive,
                '--guide-button-primary-pressed-border': brandActive,
                '--guide-button-primary-pressed-text': textOnBrand,

                /* 4. Component Badge Tokens */
                '--guide-badge-accent-solid-bg': brandColor,
                '--guide-badge-accent-solid-text': textOnBrand,
                '--guide-badge-accent-line': brandColor,
                '--guide-badge-solid-text': textOnBrand,

                /* 5. Component Select Tokens */
                '--guide-select-selected-bg': brandSurface,
                '--guide-select-focused-bg': brandSurface,

                /* 6. Legacy & Tailwind Variables */
                '--color-brand': brandColor,
                '--color-brand-hover': brandHover,
                '--color-brand-active': brandActive,
                '--color-brand-surface': brandSurface,
              } as React.CSSProperties
            }
          >
            <div className="text-xs font-semibold text-secondary mb-5 flex items-center justify-between pb-3 border-b border-light">
              <span className="flex items-center gap-1.5">
                <span>현재 선택된 테마:</span>
                <strong className="text-primary font-bold">{selectedTheme.label}</strong>
              </span>
              <Badge variant="accent" appearance="solid">
                실시간 반응 중
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Controls Column */}
              <div className="flex flex-col gap-5">
                <div>
                  <div className="text-xs font-bold text-primary mb-2.5">
                    버튼 (Buttons)
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    <Button variant="primary" size="md">
                      Primary Action
                    </Button>
                    <Button variant="outline" size="md">
                      Secondary
                    </Button>
                    <Button variant="ghost" size="md">
                      Ghost
                    </Button>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-bold text-primary mb-2.5">
                    선택 컨트롤 (Checkbox & Radio)
                  </div>
                  <div className="flex flex-col gap-3">
                    <Checkbox
                      checked={demoChecked}
                      onChange={(e) => setDemoChecked(e.target.checked)}
                      label="서비스 이용약관에 동의합니다"
                      description="필수 항목입니다."
                    />
                    <div className="flex items-center gap-5 mt-1">
                      <Radio
                        name="demo-noti"
                        value="email"
                        checked={demoRadio === 'email'}
                        onChange={(e) => setDemoRadio(e.target.value)}
                        label="이메일 알림"
                      />
                      <Radio
                        name="demo-noti"
                        value="sms"
                        checked={demoRadio === 'sms'}
                        onChange={(e) => setDemoRadio(e.target.value)}
                        label="SMS 알림"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Select & Badges Column */}
              <div className="flex flex-col gap-5">
                <div>
                  <div className="text-xs font-bold text-primary mb-2.5">
                    드롭다운 셀렉트 (Select)
                  </div>
                  <Select
                    value={demoSelect}
                    onChange={(e) => setDemoSelect(String(e.target.value))}
                    options={[
                      { value: 'react', label: 'React 19 Framework' },
                      { value: 'next', label: 'Next.js App Router' },
                      { value: 'vite', label: 'Vite Single Page App' },
                    ]}
                    searchable
                    placeholder="기술 스택을 선택하세요"
                  />
                </div>

                <div>
                  <div className="text-xs font-bold text-primary mb-2.5">
                    뱃지 (Badges)
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    <Badge variant="accent" appearance="solid">
                      Brand Solid
                    </Badge>
                    <Badge variant="accent" appearance="line">
                      Brand Line
                    </Badge>
                    <Badge variant="default" appearance="solid">
                      Default
                    </Badge>
                    <Badge variant="point" appearance="line">
                      Point
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Generated Code Snippet */}
          <div className="mt-5">
            <div className="text-xs font-semibold text-secondary mb-2">
              선택한 테마를 적용하기 위한 CSS 코드:
            </div>
            <Code label="CSS">{generatedCss}</Code>
          </div>
        </div>
      </Section>

      {/* 5. Step 3. Add Components */}
      <Section title="Step 3. Add Components">
        <p>
          디자인 토큰이 준비되었다면, 여러분이 필요한 컴포넌트 소스(TSX 및 CSS)를
          프로젝트의 <code>src/components/ui</code> 폴더로 복사합니다.
        </p>

        <div className="rounded-xl border border-light bg-surface-light p-4 sm:p-5 my-4">
          <div className="text-xs font-bold text-primary mb-2 flex items-center gap-2">
            <Sparkles size={16} className="text-olive" />
            예시: Button 컴포넌트 사용하기
          </div>
          <Code>{`// src/app/page.tsx
import { Button } from '@/components/ui/button';

export default function MyPage() {
  return (
    <main className="p-8 space-y-4">
      <h1>내 프로젝트 시작하기</h1>
      <div className="flex gap-2">
        <Button variant="primary" size="md">
          확인
        </Button>
        <Button variant="outline" size="md">
          취소
        </Button>
      </div>
    </main>
  );
}`}</Code>
        </div>

        <p className="text-xs sm:text-sm text-secondary leading-relaxed">
          각 컴포넌트의 상세 마크업과 Props 스펙은 사이드바의{' '}
          <Link href="/components/button" className="text-olive font-semibold hover:underline">
            Button
          </Link>
          ,{' '}
          <Link href="/components/select" className="text-olive font-semibold hover:underline">
            Select
          </Link>
          ,{' '}
          <Link href="/components/checkbox" className="text-olive font-semibold hover:underline">
            Checkbox
          </Link>{' '}
          등 각 컴포넌트 페이지의 <strong>Code Example</strong> 섹션에서 손쉽게
          원클릭으로 복사하실 수 있습니다.
        </p>
      </Section>

      {/* 6. Step 4. Dark Mode Setup */}
      <Section title="Step 4. Dark Mode Setup">
        <p>
          Cabinet Design의 토큰 시스템은 다크 모드를 기본 지원합니다.{' '}
          <code>&lt;html&gt;</code> 요소에 <code>data-theme=&quot;dark&quot;</code> 속성을
          부여하기만 하면 모든 배경, 텍스트, 경계선, 폼 컨트롤이 1초 만에 최적의
          다크 대비로 자동 반전됩니다.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
          <div className="rounded-xl border border-light bg-surface-light p-4">
            <div className="flex items-center gap-2 text-primary font-bold text-xs mb-2">
              <SunMoon size={16} className="text-olive" />
              <span>HTML 속성 제어</span>
            </div>
            <Code>{`<!-- 라이트 모드 -->
<html data-theme="light">

<!-- 다크 모드 -->
<html data-theme="dark">`}</Code>
          </div>

          <div className="rounded-xl border border-light bg-surface-light p-4">
            <div className="flex items-center gap-2 text-primary font-bold text-xs mb-2">
              <Laptop size={16} className="text-olive" />
              <span>간단한 테마 토글 스크립트</span>
            </div>
            <Code>{`function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}`}</Code>
          </div>
        </div>
      </Section>

      {/* 7. Framework Tips */}
      <Section title="Framework Tips">
        <p>
          주요 프레임워크 환경에서 Cabinet Design을 사용할 때 참고할 수 있는 팁입니다.
        </p>

        <div className="flex flex-col gap-4 my-4">
          <div className="rounded-xl border border-light bg-surface-light p-5">
            <div className="flex items-center justify-between mb-2">
              <strong className="text-sm sm:text-base text-primary">
                Next.js App Router (React 19)
              </strong>
              <span className="status-badge text-[10px] px-2 py-0.5">
                Recommended
              </span>
            </div>
            <p className="text-xs sm:text-sm text-secondary m-0 leading-relaxed">
              <code>src/app/layout.tsx</code>에서 <code>globals.css</code>를
              임포트하고, SSR 깜빡임 방지용 테마 스크립트를 <code>&lt;head&gt;</code>에
              배치하는 것을 권장합니다. 모든 컴포넌트는 Server Components 경계에서도
              문제없이 동작하도록 <code>&apos;use client&apos;</code> 지시어가 안전하게 분리되어
              있습니다.
            </p>
          </div>

          <div className="rounded-xl border border-light bg-surface-light p-5">
            <div className="flex items-center justify-between mb-2">
              <strong className="text-sm sm:text-base text-primary">
                Tailwind CSS v4 연동
              </strong>
              <span className="status-badge text-[10px] px-2 py-0.5">
                Zero Config
              </span>
            </div>
            <p className="text-xs sm:text-sm text-secondary m-0 leading-relaxed">
              Tailwind v4의 <code>@theme inline</code> 기능을 사용하면, 별도의{' '}
              <code>tailwind.config.js</code> 설정 없이 CSS 변수를 곧바로
              유틸리티 클래스로 사용할 수 있습니다.
            </p>
            <div className="mt-3">
              <Code>{`@theme inline {
  --color-brand: var(--color-brand);
  --color-surface: var(--guide-bg-base);
  --color-foreground: var(--guide-text-primary);
}`}</Code>
            </div>
          </div>
        </div>
      </Section>

      {/* 8. Next Steps */}
      <Section title="Next Steps">
        <p>
          기본 적용을 마쳤다면, 세부 디자인 원칙과 각 컴포넌트의 상세 스펙을
          살펴보세요.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-5">
          <Link
            href="/overview/overview"
            className="block rounded-xl border border-light bg-surface-light p-5 transition-all hover:border-strong hover:-translate-y-1"
          >
            <div className="flex items-center gap-2 text-olive mb-2">
              <CabinetLogo size={18} strokeWidth={2} accent />
              <span className="font-bold text-sm sm:text-base text-primary">
                Design Principles
              </span>
            </div>
            <p className="text-xs sm:text-sm text-secondary m-0 mb-3 leading-relaxed">
              Clear, Calm, Adaptable, Accessible 4대 설계 철학과 아키텍처를 확인합니다.
            </p>
            <span className="text-xs font-semibold text-olive inline-flex items-center gap-1">
              소개 읽기 <ArrowRight size={13} />
            </span>
          </Link>

          <Link
            href="/foundations/colors"
            className="block rounded-xl border border-light bg-surface-light p-5 transition-all hover:border-strong hover:-translate-y-1"
          >
            <div className="flex items-center gap-2 text-fresh-olive mb-2">
              <Palette size={18} />
              <span className="font-bold text-sm sm:text-base text-primary">
                Foundations · Colors
              </span>
            </div>
            <p className="text-xs sm:text-sm text-secondary m-0 mb-3 leading-relaxed">
              원시 팔레트와 시맨틱 토큰 매핑 구조를 깊이 있게 살펴봅니다.
            </p>
            <span className="text-xs font-semibold text-fresh-olive inline-flex items-center gap-1">
              토큰 명세 보기 <ArrowRight size={13} />
            </span>
          </Link>

          <Link
            href="/components/select"
            className="block rounded-xl border border-light bg-surface-light p-5 transition-all hover:border-strong hover:-translate-y-1"
          >
            <div className="flex items-center gap-2 text-tomato-coral mb-2">
              <ShieldCheck size={18} />
              <span className="font-bold text-sm sm:text-base text-primary">
                Components · Select
              </span>
            </div>
            <p className="text-xs sm:text-sm text-secondary m-0 mb-3 leading-relaxed">
              검색, 다중 선택, WAI-ARIA 키보드 조작을 완비한 핵심 컴포넌트를 둘러봅니다.
            </p>
            <span className="text-xs font-semibold text-tomato-coral inline-flex items-center gap-1">
              컴포넌트 체험 <ArrowRight size={13} />
            </span>
          </Link>
        </div>
      </Section>
    </>
  );
}
