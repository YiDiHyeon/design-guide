'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Palette,
  Ruler,
  Shapes,
  MousePointerClick,
  ArrowRight,
  Check,
  Sliders,
  Zap,
  Globe,
  ShieldCheck,
} from 'lucide-react';
import { Section, Code, Table } from '@/components/site/doc-parts';
import { Button, Input, Field, Badge, CabinetLogo } from '@/components/ui';

export function OverviewDoc() {
  const [demoInput, setDemoInput] = useState('contact@example.com');
  const [demoSubmitted, setDemoSubmitted] = useState(false);

  return (
    <>
      {/* 1. Overview Section */}
      <Section title="Overview">
        <p>
          <strong>Cabinet Design</strong>은 개인 웹서비스와 토이 프로젝트에서
          일관되고 완성도 높은 사용자 경험을 빠르고 단단하게 구축하기 위해
          설계된 <strong>중립적인 디자인 시스템(Neutral Design Foundation)</strong>
          입니다.
        </p>

        {/* Hero Visual Card */}
        <div className="relative overflow-hidden rounded-2xl border border-light bg-gradient-to-br from-surface-light to-base p-6 sm:p-8 mt-5 mb-8">
          <div
            className="pointer-events-none absolute -top-8 -right-8 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(127,148,69,0.15)_0%,transparent_70%)]"
            aria-hidden="true"
          />

          <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-strong bg-surface-warm px-3 py-1 text-xs font-semibold text-olive mb-4">
                <CabinetLogo size={16} strokeWidth={2.2} accent />
                <span>Single Source of Truth · Design Tokens</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-primary m-0 mb-3 leading-snug">
                작은 원칙으로 만드는 일관된 경험
              </h3>

              <p className="text-sm leading-relaxed text-secondary m-0">
                특정 기업의 브랜딩이나 거대 프레임워크에 종속되지 않는 독립적인 코어 토큰과 컴포넌트를 제공합니다.
                단일 토큰 명세(<code>core-tokens.json</code>)로부터 생성된 CSS 변수와 유틸리티를 기반으로,
                어떤 서비스든 프로젝트별 Theme만 덮어써서 즉시 고유한 아이덴티티를 표현할 수 있습니다.
              </p>
            </div>

            {/* Quick Metrics Grid (Strict 4px grid spacing) */}
            <div className="grid grid-cols-2 gap-3 min-w-[240px] w-full lg:w-auto">
              <div className="rounded-xl border border-strong bg-surface-light p-4">
                <div className="text-xl sm:text-2xl font-extrabold text-olive mb-1">
                  100+
                </div>
                <div className="text-xs font-semibold text-secondary">
                  Design Tokens
                </div>
              </div>

              <div className="rounded-xl border border-strong bg-surface-light p-4">
                <div className="text-xl sm:text-2xl font-extrabold text-fresh-olive mb-1">
                  8+
                </div>
                <div className="text-xs font-semibold text-secondary">
                  Core Components
                </div>
              </div>

              <div className="rounded-xl border border-strong bg-surface-light p-4">
                <div className="text-xl sm:text-2xl font-extrabold text-primary mb-1">
                  0
                </div>
                <div className="text-xs font-semibold text-secondary">
                  Runtime Dependencies
                </div>
              </div>

              <div className="rounded-xl border border-strong bg-surface-light p-4">
                <div className="text-xl sm:text-2xl font-extrabold text-tomato-coral mb-1">
                  100%
                </div>
                <div className="text-xs font-semibold text-secondary">
                  Keyboard & A11y
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 2. Background Section */}
      <Section title="Background">
        <p>
          개인 프로젝트나 소규모 웹서비스를 개발할 때, 많은 엔지니어와 기획자가 동일한 문제를 반복해서 겪습니다.
          이 프로젝트는 그러한 현실적인 비효율과 고민에서 출발했습니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <div className="rounded-xl border border-light bg-surface-light p-5">
            <div className="inline-flex items-center gap-2 text-tomato-coral font-bold text-sm mb-2">
              <Zap size={16} />
              <span>반복되는 0부터의 세팅 비용</span>
            </div>
            <p className="text-xs sm:text-sm text-secondary leading-relaxed m-0">
              새로운 아이디어를 프로토타입할 때마다 버튼 패딩, 인풋 상태(focus, error), 폰트 행간,
              색상 팔레트를 매번 다시 고민하느라 정작 중요한 제품 로직 구현에 집중하지 못하는 문제가 있었습니다.
            </p>
          </div>

          <div className="rounded-xl border border-light bg-surface-light p-5">
            <div className="inline-flex items-center gap-2 text-fresh-olive font-bold text-sm mb-2">
              <ShieldCheck size={16} />
              <span>외부 거대 라이브러리의 부담</span>
            </div>
            <p className="text-xs sm:text-sm text-secondary leading-relaxed m-0">
              MUI나 Ant Design 같은 서드파티 라이브러리는 런타임 번들이 무겁고, 해당 기업 고유의 강한 시각적
              특색 때문에 커스터마이징 시 복잡한 오버라이드나 CSS 충돌을 야기했습니다.
            </p>
          </div>

          <div className="rounded-xl border border-light bg-surface-light p-5">
            <div className="inline-flex items-center gap-2 text-olive font-bold text-sm mb-2">
              <Globe size={16} />
              <span>오픈 디자인 시스템 학습 & 독립 설계</span>
            </div>
            <p className="text-xs sm:text-sm text-secondary leading-relaxed m-0">
              당근의 SEED Design을 비롯한 오픈 디자인 시스템의 정교한 3계층 토큰 분리와 접근성 계약을
              참고하여, 개인 웹서비스의 요구에 최적화된 독립적이고 가벼운 코어 시스템을 직접 설계했습니다.
            </p>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-lg border-l-4 border-olive bg-surface-light text-xs sm:text-sm text-secondary leading-relaxed">
          <strong className="text-primary">중립적 설계 고지:</strong> 이 프로젝트의
          토큰 값, 이름 체계 및 컴포넌트 정책은 독립적으로 설계되었으며, 특정 기업이나 공개 라이브러리와 공식적인
          제휴 또는 후원 관계가 없습니다.
        </div>
      </Section>

      {/* 3. Design Principles Section */}
      <Section title="Design Principles">
        <p>
          Cabinet Design의 모든 토큰과 컴포넌트는 다음 4가지 핵심 원칙을 바탕으로
          설계되었습니다. 어떠한 상황에서도 장식보다는 정보의 위계와 사용자
          편의가 우선합니다.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-6">
          <div className="rounded-xl border border-light bg-surface-light p-5">
            <div className="w-10 h-10 rounded-lg bg-surface-warm border border-strong text-olive flex items-center justify-center mb-3">
              <Sparkles size={18} />
            </div>
            <h3 className="text-sm sm:text-base font-bold m-0 mb-2 text-primary">Clear · 명확함</h3>
            <p className="text-xs sm:text-sm text-secondary m-0 leading-relaxed">
              정보의 위계와 인터랙션 상태(hover, active, focus, disabled, invalid)를 모호함 없이 즉시 구분할 수
              있도록 설계합니다.
            </p>
          </div>

          <div className="rounded-xl border border-light bg-surface-light p-5">
            <div className="w-10 h-10 rounded-lg bg-surface-warm border border-strong text-fresh-olive flex items-center justify-center mb-3">
              <Palette size={18} />
            </div>
            <h3 className="text-sm sm:text-base font-bold m-0 mb-2 text-primary">Calm · 차분함</h3>
            <p className="text-xs sm:text-sm text-secondary m-0 leading-relaxed">
              눈을 피로하게 하는 화려한 장식이나 원색을 배제하고, 사용자의 콘텐츠와 구조가 편안하게 드러나는
              절제된 시각 언어를 유지합니다.
            </p>
          </div>

          <div className="rounded-xl border border-light bg-surface-light p-5">
            <div className="w-10 h-10 rounded-lg bg-surface-warm border border-strong text-butter-yellow flex items-center justify-center mb-3">
              <Sliders size={18} />
            </div>
            <h3 className="text-sm sm:text-base font-bold m-0 mb-2 text-primary">Adaptable · 유연함</h3>
            <p className="text-xs sm:text-sm text-secondary m-0 leading-relaxed">
              시스템 코어(Core)는 중립적으로 보존하며, 프로젝트별 브랜드 Theme을 통해 Semantic 토큰만 재정의하여
              자유롭게 확장합니다.
            </p>
          </div>

          <div className="rounded-xl border border-light bg-surface-light p-5">
            <div className="w-10 h-10 rounded-lg bg-surface-warm border border-strong text-tomato-coral flex items-center justify-center mb-3">
              <ShieldCheck size={18} />
            </div>
            <h3 className="text-sm sm:text-base font-bold m-0 mb-2 text-primary">Accessible · 접근성</h3>
            <p className="text-xs sm:text-sm text-secondary m-0 leading-relaxed">
              4.5:1 이상의 명도 대비, Tab 키 조작 및 포커스 링, 40px 이상의 터치 타깃, 스크린리더 레이블 연결을
              기본 조건으로 보장합니다.
            </p>
          </div>
        </div>
      </Section>

      {/* 4. Tech Stack Section */}
      <Section title="Tech Stack">
        <p>
          모던 웹 생태계의 표준 기술을 채택하여 최소한의 런타임 오버헤드와 최고의 개발 생산성을 실현했습니다.
        </p>

        <div className="grid grid-cols-1  gap-4 my-6">
          <div className="rounded-xl border border-light bg-surface-light p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm sm:text-base font-bold text-primary">
                React 19
              </span>
              <span className="status-badge text-[10px] px-2 py-1">
                Framework
              </span>
            </div>
            <p className="text-xs sm:text-sm text-secondary m-0 leading-relaxed">
              최신 React 컴파일러 호환, Server Components(RSC) 기본 지원, 직관적인 합성(Composition) 모델로
              가벼운 번들과 뛰어난 렌더링 성능을 유지합니다.
            </p>
          </div>

          <div className="rounded-xl border border-light bg-surface-light p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm sm:text-base font-bold text-primary">
                Tailwind CSS v4
              </span>
              <span className="status-badge text-[10px] px-2 py-1">
                Styling Engine
              </span>
            </div>
            <p className="text-xs sm:text-sm text-secondary m-0 leading-relaxed">
              <code>@theme inline</code> 지시어로 CSS 토큰 변수를 Tailwind 유틸리티와 1:1로 매핑하여 별도의
              설정 파일(tailwind.config.js) 없이도 초고속 빌드를 제공합니다.
            </p>
          </div>

          <div className="rounded-xl border border-light bg-surface-light p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm sm:text-base font-bold text-primary">
                Design Tokens
              </span>
              <span className="status-badge text-[10px] px-2 py-1">
                Single Source of Truth
              </span>
            </div>
            <p className="text-xs sm:text-sm text-secondary m-0 leading-relaxed">
              <code>core-tokens.json</code> 단일 명세에서 관리되며, 빌드 스크립트(<code>npm run tokens:generate</code>)를
              통해 브레이크포인트별 CSS 변수로 자동 컴파일됩니다.
            </p>
          </div>

          <div className="rounded-xl border border-light bg-surface-light p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm sm:text-base font-bold text-primary">
                TypeScript
              </span>
              <span className="status-badge text-[10px] px-2 py-1">
                Type Safety
              </span>
            </div>
            <p className="text-xs sm:text-sm text-secondary m-0 leading-relaxed">
              엄격한 <code>strict: true</code> 환경에서 모든 컴포넌트의 Props, Variant, 접근성 속성을 정적으로
              검증하여 개발 시 실수를 사전에 방지합니다.
            </p>
          </div>
        </div>
      </Section>

      {/* 5. Token Architecture Section */}
      <Section title="Token Architecture">
        <p>
          Cabinet Design의 가장 큰 특징은 명확한{' '}
          <strong>3계층 토큰 아키텍처(Primitive → Semantic → Component)</strong>
          와 유연한 <strong>Theme 계층</strong>의 분리입니다.
        </p>

        {/* Visual Diagram */}
        <div className="rounded-xl border border-light bg-surface-light p-5 sm:p-6 my-5 flex flex-col gap-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Primitive */}
            <div className="rounded-lg border border-light bg-base p-4">
              <div className="text-[11px] font-bold text-olive mb-1">
                1. PRIMITIVE TOKENS
              </div>
              <div className="text-sm font-bold text-primary mb-2">
                원시 물리 값
              </div>
              <p className="text-xs text-secondary m-0 leading-relaxed">
                색상 헥사코드, 4px 단위 간격, 라운딩 등 맥락이 없는 순수 값 정의.
                <br />
                <code className="text-[11px]">--guide-color-olive: #38471d</code>
              </p>
            </div>

            {/* Semantic */}
            <div className="rounded-lg border border-light bg-base p-4">
              <div className="text-[11px] font-bold text-fresh-olive mb-1">
                2. SEMANTIC TOKENS
              </div>
              <div className="text-sm font-bold text-primary mb-2">
                역할 및 의도 부여
              </div>
              <p className="text-xs text-secondary m-0 leading-relaxed">
                텍스트, 배경, 테두리, 상태 피드백 등 UI에서의 목적을 정의.
                <br />
                <code className="text-[11px]">--guide-text-primary</code>
              </p>
            </div>

            {/* Component */}
            <div className="rounded-lg border border-light bg-base p-4">
              <div className="text-[11px] font-bold text-tomato-coral mb-1">
                3. COMPONENT TOKENS
              </div>
              <div className="text-sm font-bold text-primary mb-2">
                컴포넌트 소비 계약
              </div>
              <p className="text-xs text-secondary m-0 leading-relaxed">
                각 UI 컴포넌트가 상태별로 소비하는 최종 토큰 바인딩.
                <br />
                <code className="text-[11px]">--guide-button-primary-default-bg</code>
              </p>
            </div>
          </div>

          {/* Theme Overlay Box */}
          <div className="rounded-lg border border-dashed border-butter-yellow bg-butter-yellow/15 p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-butter-yellow text-deep-ink flex items-center justify-center font-extrabold text-xs shrink-0">
              ▲
            </div>
            <div className="text-xs sm:text-sm text-primary leading-normal">
              <strong className="font-bold">Theme Override 계층:</strong> 새 프로젝트를 만들 때 Core를 직접 수정할 필요 없이,{' '}
              <strong>Semantic 토큰만 덮어쓰면(Override)</strong> 전체 컴포넌트의 룩앤필이 자동으로 즉시 변경됩니다.
            </div>
          </div>
        </div>

        <Table
          headings={['계층 (Layer)', '역할 (Role)', '토큰 예시', '변경 빈도 및 정책']}
          rows={[
            [
              <code key="l1">Primitive</code>,
              '원시 물리값 (색상 스케일, 4px 간격, radius, font-size)',
              <code key="e1">--guide-color-olive (#38471D), --guide-sp-md (16px)</code>,
              'Core 레벨에서 엄격히 유지, 변경 지양',
            ],
            [
              <code key="l2">Semantic</code>,
              'UI 상의 의미 및 역할 (text, surface, line, feedback)',
              <code key="e2">--guide-text-primary, --guide-bg-surface-light</code>,
              '프로젝트 Theme 파일에서 오버라이드 1순위 대상',
            ],
            [
              <code key="l3">Component</code>,
              '컴포넌트 단위의 상태별 스타일 계약',
              <code key="e3">--guide-button-primary-default-bg, --guide-field-border</code>,
              '컴포넌트 스펙 수정 시에만 업데이트',
            ],
            [
              <code key="l4">Theme</code>,
              '프로젝트별 브랜드 아이덴티티 주입 계층',
              <code key="e4">Brand Color 덮어쓰기 및 맞춤 테마 CSS</code>,
              '각 프로젝트 저장소 단위로 자유롭게 확장',
            ],
          ]}
        />
      </Section>

      {/* 6. Getting Started Section */}
      <Section title="Getting Started">
        <p>
          Cabinet Design을 로컬 환경에 설치하고 실행하는 방법과 프로젝트에
          스타일과 토큰을 연결하는 단계입니다.
        </p>

        <div className="flex flex-col gap-5 mt-4">
          {/* Step 1 */}
          <div className="rounded-xl border border-light bg-surface-light p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-olive text-white text-[11px] font-bold">
                1
              </span>
              <h3 className="m-0 text-sm sm:text-base font-bold text-primary">
                환경 요구사항 및 의존성 설치
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-secondary m-0 mb-3">
              Node.js 20.9 이상이 필요합니다. 터미널에서 다음 명령어를 실행합니다.
            </p>
            <Code label="BASH">{`# 저장소 클론 후 의존성 설치
npm ci

# 로컬 개발 서버 구동 (http://localhost:3000)
npm run dev`}</Code>
          </div>

          {/* Step 2 */}
          <div className="rounded-xl border border-light bg-surface-light p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-olive text-white text-[11px] font-bold">
                2
              </span>
              <h3 className="m-0 text-sm sm:text-base font-bold text-primary">
                CSS 및 토큰 파이프라인 구조
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-secondary m-0 mb-3">
              <code>src/app/globals.css</code> 파일에서 Tailwind CSS v4와 토큰 레이어를 순서대로 불러옵니다.
            </p>
            <Code>{`/* globals.css */
@import 'tailwindcss';

/* 토큰 레이어 */
@import '../styles/tokens/primitive.css';
@import '../styles/tokens/semantic.css';
@import '../styles/tokens/component.css';
@import '../styles/typography.css';

/* 컴포넌트 스타일 */
@import '../styles/button.css';
@import '../styles/fields.css';
@import '../styles/badge.css';
@import '../styles/utilities.css';

/* Tailwind v4 @theme inline 토큰 바인딩 */
@theme inline {
  --color-surface: var(--guide-bg-base);
  --color-surface-subtle: var(--guide-bg-surface-light);
  --color-foreground: var(--guide-text-primary);
  --color-muted: var(--guide-text-secondary);
  --spacing-ds-control: var(--guide-sp-md);
}`}</Code>
          </div>
        </div>
      </Section>

      {/* 7. Usage & Patterns Section */}
      <Section title="Usage & Patterns">
        <p>
          모든 UI 컴포넌트는 접근성을 기본 내장하고 있으며, <code>@/components/ui</code>로부터 손쉽게
          임포트하여 합성할 수 있습니다.
        </p>

        {/* Live Interactive Demo Box */}
        <div className="rounded-xl border border-light bg-base p-5 sm:p-6 my-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold tracking-wider text-secondary">
              LIVE COMPONENT PREVIEW
            </span>
            <Badge variant="accent" appearance="line">
              Accessible Form
            </Badge>
          </div>

          <div className="max-w-sm flex flex-col gap-4">
            <Field
              label="이메일 주소"
              description="주요 업데이트 소식을 받아볼 이메일을 입력하세요."
              required
            >
              <Input
                type="email"
                placeholder="you@example.com"
                value={demoInput}
                onChange={(e) => setDemoInput(e.target.value)}
              />
            </Field>

            <div className="flex items-center gap-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => setDemoSubmitted(true)}
              >
                구독 신청하기
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => {
                  setDemoInput('');
                  setDemoSubmitted(false);
                }}
              >
                초기화
              </Button>
            </div>

            {demoSubmitted && (
              <div className="p-3 rounded-lg border border-fresh-olive bg-fresh-olive/10 text-xs sm:text-sm text-primary flex items-center gap-2">
                <Check size={14} className="text-fresh-olive shrink-0" />
                <span>
                  <strong>{demoInput || '이메일'}</strong>로 구독 신청이 완료되었습니다.
                </span>
              </div>
            )}
          </div>
        </div>

        <h3>React 컴포넌트 코드 예시</h3>
        <Code>{`import { useState } from 'react';
import { Button, Field, Input, Badge } from '@/components/ui';

export function SubscriptionForm() {
  const [email, setEmail] = useState('');

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-4 max-w-sm">
      <Field
        label="이메일 주소"
        description="주요 업데이트 소식을 받아볼 이메일을 입력하세요."
        required
      >
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
      </Field>

      <div className="flex gap-2 items-center">
        <Button variant="primary" size="md">
          구독 신청하기
        </Button>
        <Badge variant="accent" appearance="line">v0.1</Badge>
      </div>
    </form>
  );
}`}</Code>

        <h3>토큰 재생성 및 빌드 검증</h3>
        <p>
          토큰 명세(<code>core-tokens.json</code>)를 수정한 뒤에는 생성 스크립트를 통해 CSS를 최신 상태로 빌드하고,
          자동화된 무결성 테스트를 수행합니다.
        </p>
        <Code>{`# 1. 토큰 CSS 재생성
npm run tokens:generate

# 2. 전체 검증 파이프라인 (린트, 타입, 테스트, 빌드)
npm run lint
npm run typecheck
npm test
npm run build`}</Code>
      </Section>

      {/* 8. Next Steps Section */}
      <Section title="Next Steps">
        <p>
          Cabinet Design의 세부 기초 원칙과 컴포넌트 API 명세를 둘러보고
          프로젝트에 적용해 보세요.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-5">
          <Link
            href="/foundations/colors"
            className="block rounded-xl border border-light bg-surface-light p-5 transition-all hover:border-strong hover:-translate-y-1"
          >
            <div className="flex items-center gap-2 text-olive mb-2">
              <Palette size={18} />
              <span className="font-bold text-sm sm:text-base text-primary">
                Foundations · Colors
              </span>
            </div>
            <p className="text-xs sm:text-sm text-secondary m-0 mb-3 leading-relaxed">
              Cabinet Olive, Fresh Olive 등 브랜드 팔레트와 Semantic 색상 체계를 확인합니다.
            </p>
            <span className="text-xs font-semibold text-olive inline-flex items-center gap-1">
              보러가기 <ArrowRight size={13} />
            </span>
          </Link>

          <Link
            href="/foundations/spacing"
            className="block rounded-xl border border-light bg-surface-light p-5 transition-all hover:border-strong hover:-translate-y-1"
          >
            <div className="flex items-center gap-2 text-fresh-olive mb-2">
              <Ruler size={18} />
              <span className="font-bold text-sm sm:text-base text-primary">
                Foundations · Spacing
              </span>
            </div>
            <p className="text-xs sm:text-sm text-secondary m-0 mb-3 leading-relaxed">
              4px 기반의 엄격한 간격 스케일과 반응형 레이아웃 규칙을 확인합니다.
            </p>
            <span className="text-xs font-semibold text-fresh-olive inline-flex items-center gap-1">
              보러가기 <ArrowRight size={13} />
            </span>
          </Link>

          <Link
            href="/foundations/radius"
            className="block rounded-xl border border-light bg-surface-light p-5 transition-all hover:border-strong hover:-translate-y-1"
          >
            <div className="flex items-center gap-2 text-butter-yellow mb-2">
              <Shapes size={18} />
              <span className="font-bold text-sm sm:text-base text-primary">
                Foundations · Radius
              </span>
            </div>
            <p className="text-xs sm:text-sm text-secondary m-0 mb-3 leading-relaxed">
              0px부터 999px까지의 곡률 스케일과 컴포넌트 쉐이프 매핑, Nested Radius 규칙을 확인합니다.
            </p>
            <span className="text-xs font-semibold text-olive inline-flex items-center gap-1">
              보러가기 <ArrowRight size={13} />
            </span>
          </Link>

          <Link
            href="/components/button"
            className="block rounded-xl border border-light bg-surface-light p-5 transition-all hover:border-strong hover:-translate-y-1"
          >
            <div className="flex items-center gap-2 text-tomato-coral mb-2">
              <MousePointerClick size={18} />
              <span className="font-bold text-sm sm:text-base text-primary">
                Components · Button
              </span>
            </div>
            <p className="text-xs sm:text-sm text-secondary m-0 mb-3 leading-relaxed">
              5단계 크기와 역할별 변형, 모바일 터치 최적화 버튼 가이드를 확인합니다.
            </p>
            <span className="text-xs font-semibold text-tomato-coral inline-flex items-center gap-1">
              보러가기 <ArrowRight size={13} />
            </span>
          </Link>
        </div>
      </Section>
    </>
  );
}
