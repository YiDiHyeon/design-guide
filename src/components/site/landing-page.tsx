'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowUpRight,
  ArrowRight,
  Layers,
  Sparkles,
  Sliders,
  Code2,
  Palette,
  Type,
  Ruler,
  MousePointerClick,
  TextCursorInput,
  Check,
  Plus,
} from 'lucide-react';
import {
  Button,
  type ButtonProps,
  Input,
  Select,
  Checkbox,
  Radio,
  RadioGroup,
  Switch,
  Textarea,
  Field,
  Badge,
  CabinetLogo,
} from '@/components/ui';
import { ThemeToggle } from '@/components/site/theme-toggle';
import { destinationOptions } from '@/lib/control';

export function LandingPage() {
  // Hero Interactive States
  const [buttonVariant, setButtonVariant] =
    useState<NonNullable<ButtonProps['variant']>>('primary');
  const [buttonSize, setButtonSize] =
    useState<NonNullable<ButtonProps['size']>>('md');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const [inputValue, setInputValue] = useState('홍길동');
  const [selectValue, setSelectValue] = useState('seoul');
  const [checkboxAgreed, setCheckboxAgreed] = useState(true);
  const [switchPush, setSwitchPush] = useState(true);
  const [roleValue, setRoleValue] = useState('developer');

  return (
    <div className="landing-root">
      <div className="landing-grid-bg" aria-hidden="true" />

      {/* Header */}
      <header className="landing-header">
        <div className="landing-header-inner">
          <Link href="/" className="landing-brand">
            <span className="landing-brand-mark" aria-hidden="true">
              <CabinetLogo size={26} strokeWidth={2} />
            </span>
            <span>Cabinet Design</span>
            <span className="landing-version-pill">v0.1</span>
          </Link>

          <nav className="landing-nav" aria-label="메인 네비게이션">
            <Link href="/overview/overview" className="landing-nav-link">
              Overview
            </Link>
            <Link href="/foundations/colors" className="landing-nav-link">
              Foundations
            </Link>
            <Link href="/components/button" className="landing-nav-link">
              Components
            </Link>
          </nav>

          <div className="landing-header-actions">
            <ThemeToggle />
            {/*<Link href="/overview/overview" className="landing-btn-docs">*/}
            {/*  <span className="desktop-only">문서 바로가기</span>*/}
            {/*  <span className="mobile-only">문서 보기</span>*/}
            {/*  <ArrowRight size={14} aria-hidden="true" />*/}
            {/*</Link>*/}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="landing-hero">
        <div className="landing-badge">
          <span className="landing-badge-dot" />
          <span>Design System v0.1 · 작은 원칙, 일관된 경험</span>
        </div>

        <h1 className="landing-hero-title">
          일관된 프로덕트 경험을
          <br />
          만드는 <span className="accent-text">Cabinet Design</span>
        </h1>

        <p className="landing-hero-desc">
          디자인 토큰부터 접근성을 고려한 UI 컴포넌트까지. 명확한 규칙과 유연한
          제어로 사용자에게 신뢰할 수 있는 인터페이스를 제공합니다.
        </p>

        <div className="landing-hero-cta">
          <Link href="/overview/overview" className="landing-cta-primary">
            <span>문서 시작하기</span>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link href="/components/button" className="landing-cta-secondary">
            <span>컴포넌트 둘러보기</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>

        {/* Hero Interactive Bento Showcase */}
        <div className="landing-showcase">
          {/* Bento Card 1: Interactive Button Showcase */}
          <div className="bento-card bento-card-buttons">
            <div>
              <div className="bento-card-header">
                <span className="bento-card-title">
                  <MousePointerClick size={15} />
                  Interactive Button
                </span>
                <span className="bento-badge">Live Preview</span>
              </div>

              {/* Variant Controls */}
              <div className="bento-button-controls">
                {(
                  [
                    'primary',
                    'secondary',
                    'outline',
                    'ghost',
                    'danger',
                  ] as const
                ).map((v) => (
                  <button
                    key={v}
                    type="button"
                    className="bento-chip"
                    data-active={buttonVariant === v}
                    onClick={() => setButtonVariant(v)}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div className="bento-button-stage">
              <Button
                variant={buttonVariant}
                size={buttonSize}
                disabled={isButtonDisabled}
                onClick={() => setClickCount((n) => n + 1)}
              >
                <span>클릭해 보세요</span>
                <ArrowRight size={14} />
              </Button>
              <div className="flex items-center gap-2 text-xs text-secondary">
                <span>
                  {clickCount > 0
                    ? `총 ${clickCount}번 클릭되었어요!`
                    : '버튼을 직접 클릭하고 조작해 보세요.'}
                </span>
                {clickCount > 0 && (
                  <button
                    type="button"
                    onClick={() => setClickCount(0)}
                    className="text-xs text-olive underline cursor-pointer hover:opacity-80"
                  >
                    초기화
                  </button>
                )}
              </div>
            </div>

            <div className="bento-card-footer">
              <div className="flex items-center gap-3 text-xs text-secondary flex-wrap">
                <div className="flex items-center gap-1">
                  <span className="font-medium">Size:</span>
                  {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      className="bento-chip px-2 py-1 text-xs"
                      data-active={buttonSize === s}
                      onClick={() => setButtonSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  className="bento-chip px-2 py-1 text-xs"
                  data-active={isButtonDisabled}
                  onClick={() => setIsButtonDisabled((d) => !d)}
                >
                  {isButtonDisabled ? 'Disabled ✓' : 'Disable'}
                </button>
              </div>
              <Link
                href="/components/button"
                className="text-xs font-semibold text-primary inline-flex items-center gap-1 hover:text-olive transition-colors no-underline"
              >
                Button 문서
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* Bento Card 2: Interactive Form Controls */}
          <div className="bento-card bento-card-fields">
            <div className="bento-card-header">
              <span className="bento-card-title">
                <TextCursorInput size={15} />
                Form Controls
              </span>
              <span className="bento-badge">Accessible</span>
            </div>

            <div className="bento-field-demo">
              <div>
                <label
                  htmlFor="hero-input"
                  className="block text-xs font-semibold mb-2 text-secondary"
                >
                  Name Input
                </label>
                <Input
                  id="hero-input"
                  size="sm"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="이름을 입력하세요"
                />
              </div>

              <div>
                <label
                  htmlFor="hero-select"
                  className="block text-xs font-semibold mb-2 text-secondary"
                >
                  Destination Select
                </label>
                <Select
                  id="hero-select"
                  size="sm"
                  value={selectValue}
                  onChange={(e) => setSelectValue(e.target.value)}
                  options={destinationOptions}
                />
              </div>

              <div className="flex flex-col gap-2 pt-1 border-t border-light">
                <Switch
                  id="hero-switch"
                  size="sm"
                  checked={switchPush}
                  onChange={(e) => setSwitchPush(e.target.checked)}
                  label="실시간 푸시 알림 수신"
                />

                <Checkbox
                  id="hero-checkbox"
                  size="sm"
                  checked={checkboxAgreed}
                  onChange={(e) => setCheckboxAgreed(e.target.checked)}
                  label="이용약관 및 개인정보 동의"
                />
              </div>

              <div className="pt-1">
                <RadioGroup
                  name="hero-role"
                  size="sm"
                  direction="horizontal"
                  value={roleValue}
                  onChange={setRoleValue}
                  aria-label="직무 선택"
                >
                  <Radio value="developer" label="개발자" />
                  <Radio value="designer" label="디자이너" />
                </RadioGroup>
              </div>
            </div>
          </div>

          {/* Bento Card 3: Design Tokens & Palette */}
          <div className="bento-card bento-card-tokens">
            <div className="bento-card-header">
              <span className="bento-card-title">
                <Palette size={15} />
                Design Tokens
              </span>
              <span className="bento-badge">Systematic</span>
            </div>

            <div className="palette-strip">
              <div
                className="palette-block palette-block-olive"
                title="Cabinet Olive (#38471D)"
              >
                <span>Olive</span>
                <span className="text-[10px] font-mono">#38471D</span>
              </div>
              <div
                className="palette-block palette-block-fresh"
                title="Fresh Olive (#7F9445)"
              >
                <span>Fresh</span>
                <span className="text-[10px] font-mono">#7F9445</span>
              </div>
              <div
                className="palette-block palette-block-yellow"
                title="Butter Yellow (#F5CA45)"
              >
                <span className="font-bold">Yellow</span>
                <span className="text-[10px] font-mono">#F5CA45</span>
              </div>
              <div
                className="palette-block palette-block-coral"
                title="Tomato Coral (#E66F4F)"
              >
                <span>Coral</span>
                <span className="text-[10px] font-mono">#E66F4F</span>
              </div>
            </div>

            <div className="palette-specs">
              <div className="spec-cell">
                <span>Radius</span>
                <strong>4px · 6px · 8px</strong>
              </div>
              <div className="spec-cell">
                <span>Spacing</span>
                <strong>4px Scale</strong>
              </div>
              <div className="spec-cell">
                <span>Typography</span>
                <strong>12px ~ 28px</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillars / Bento Section */}
      <section className="landing-section">
        <div className="section-tag">
          <Sparkles size={14} />
          Core Pillars
        </div>
        <h2 className="section-title">Cabinet Design이 추구하는 원칙</h2>
        <p className="section-desc">
          시각적 완성도뿐 아니라 개발 용이성과 웹 접근성을 충족하도록 정밀하게
          설계되었습니다.
        </p>

        <div className="pillars-grid">
          <div className="pillar-card">
            <div>
              <div className="pillar-icon">
                <Layers size={20} />
              </div>
              <div className="pillar-num">01 / TOKENS</div>
              <h3 className="pillar-title">체계적인 디자인 토큰</h3>
              <p className="pillar-desc">
                Primitive, Semantic, Component의 3단계 토큰 위계로
                모바일·태블릿·데스크톱 반응형 스케일이 유기적으로 연결됩니다.
              </p>
            </div>
          </div>

          <div className="pillar-card">
            <div>
              <div className="pillar-icon">
                <Check size={20} />
              </div>
              <div className="pillar-num">02 / ACCESSIBILITY</div>
              <h3 className="pillar-title">기본 내장된 웹 접근성</h3>
              <p className="pillar-desc">
                WAI-ARIA 규격 준수, 완전한 키보드 탐색, 그리고 레이아웃 흔들림이
                없는 정밀한 포커스 링 처리가 기본 적용됩니다.
              </p>
            </div>
          </div>

          <div className="pillar-card">
            <div>
              <div className="pillar-icon">
                <Sliders size={20} />
              </div>
              <div className="pillar-num">03 / PLAYGROUND</div>
              <h3 className="pillar-title">실시간 인터랙티브 체험</h3>
              <p className="pillar-desc">
                모든 컴포넌트 페이지에서 상태(Size, State, Variant)를 직접
                조작하고, 실시간으로 동기화되는 완성된 예제 코드를 복사할 수
                있습니다.
              </p>
            </div>
          </div>

          <div className="pillar-card">
            <div>
              <div className="pillar-icon">
                <Code2 size={20} />
              </div>
              <div className="pillar-num">04 / DEVELOPER FIRST</div>
              <h3 className="pillar-title">엄격한 개발자 경험</h3>
              <p className="pillar-desc">
                Next.js와 TypeScript 기반의 엄격한 타입 정의와 표준 CSS Custom
                Properties로 어떤 환경에서도 안전하게 통합됩니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Components Showcase */}
      <section className="landing-section border-t border-light">
        <div className="section-tag">
          <Code2 size={14} />
          Components
        </div>
        <h2 className="section-title">핵심 인터랙션 컴포넌트</h2>
        <p className="section-desc">
          자주 사용되는 9개의 기본 컴포넌트들이 고도화된 상태 제어와 통일된 디자인으로
          제공됩니다.
        </p>

        <div className="components-grid">
          {/* 1. Button Card */}
          <Link href="/components/button" className="component-card">
            <div className="component-card-preview">
              <div className="flex items-center gap-2">
                <Button variant="primary" size="sm">
                  확인
                </Button>
                <Button variant="secondary" size="sm">
                  취소
                </Button>
                <Button variant="outline" size="sm" iconOnly aria-label="추가">
                  <Plus size={14} />
                </Button>
              </div>
            </div>
            <div className="component-card-body">
              <div className="component-card-header">
                <h3 className="component-card-title">Button</h3>
                <span className="bento-badge">5 Variants</span>
              </div>
              <p className="component-card-desc">
                Primary, Secondary, Outline, Ghost, Danger의 5가지 역할과 5단계 크기로
                행동의 중요도를 명확하게 표현합니다.
              </p>
              <span className="component-card-link">
                자세히 보기 <ArrowRight size={13} />
              </span>
            </div>
          </Link>

          {/* 2. Field Card */}
          <Link href="/components/field" className="component-card">
            <div className="component-card-preview">
              <div className="w-4/5 max-w-[240px]">
                <Field
                  label="프로필 닉네임"
                  size="sm"
                  description="영문/한글 2~10자"
                  count={{ current: 3, max: 10 }}
                >
                  <Input size="sm" defaultValue="홍길동" readOnly />
                </Field>
              </div>
            </div>
            <div className="component-card-body">
              <div className="component-card-header">
                <h3 className="component-card-title">Field</h3>
                <span className="bento-badge">Full ARIA</span>
              </div>
              <p className="component-card-desc">
                라벨, 도움말 설명, 에러 메시지, 글자 수 카운터를 입력 컨트롤과 접근성
                표준(WAI-ARIA)으로 자동 연결합니다.
              </p>
              <span className="component-card-link">
                자세히 보기 <ArrowRight size={13} />
              </span>
            </div>
          </Link>

          {/* 3. Input Card */}
          <Link href="/components/input" className="component-card">
            <div className="component-card-preview">
              <div className="w-4/5 max-w-[240px]">
                <Input
                  size="sm"
                  placeholder="텍스트를 입력하세요"
                  defaultValue="Cabinet Design"
                  readOnly
                />
              </div>
            </div>
            <div className="component-card-body">
              <div className="component-card-header">
                <h3 className="component-card-title">Input</h3>
                <span className="bento-badge">4 Sizes</span>
              </div>
              <p className="component-card-desc">
                4단계 크기 스케일과 Default, Error, ReadOnly, Disabled 상태를
                지원하는 표준 텍스트 입력 필드입니다.
              </p>
              <span className="component-card-link">
                자세히 보기 <ArrowRight size={13} />
              </span>
            </div>
          </Link>

          {/* 4. Select Card */}
          <Link href="/components/select" className="component-card">
            <div className="component-card-preview">
              <div className="w-4/5 max-w-[240px]">
                <Select
                  size="sm"
                  options={destinationOptions}
                  defaultValue="seoul"
                  readOnly
                />
              </div>
            </div>
            <div className="component-card-body">
              <div className="component-card-header">
                <h3 className="component-card-title">Select</h3>
                <span className="bento-badge">Seed Dropdown</span>
              </div>
              <p className="component-card-desc">
                실시간 검색, 다중 선택 태그/요약 모드, 아이템 보조 설명 및 아이콘을 지원하는 풍부한 드롭다운 리스트박스입니다.
              </p>
              <span className="component-card-link">
                자세히 보기 <ArrowRight size={13} />
              </span>
            </div>
          </Link>

          {/* 5. Textarea Card */}
          <Link href="/components/textarea" className="component-card">
            <div className="component-card-preview">
              <div className="w-4/5 max-w-[240px]">
                <Textarea
                  size="sm"
                  rows={2}
                  defaultValue="작은 원칙으로 일관된 경험을 만듭니다."
                  readOnly
                />
              </div>
            </div>
            <div className="component-card-body">
              <div className="component-card-header">
                <h3 className="component-card-title">Textarea</h3>
                <span className="bento-badge">Multi-line</span>
              </div>
              <p className="component-card-desc">
                여러 줄의 긴 텍스트 입력을 위한 영역으로 행 수(rows)와 수직 리사이즈
                제어를 완벽하게 지원합니다.
              </p>
              <span className="component-card-link">
                자세히 보기 <ArrowRight size={13} />
              </span>
            </div>
          </Link>

          {/* 6. Checkbox Card */}
          <Link href="/components/checkbox" className="component-card">
            <div className="component-card-preview">
              <div className="flex flex-col gap-2">
                <Checkbox
                  size="sm"
                  defaultChecked={true}
                  readOnly
                  label="선택 옵션"
                />
                <Checkbox
                  size="sm"
                  indeterminate={true}
                  readOnly
                  label="일부 선택"
                />
              </div>
            </div>
            <div className="component-card-body">
              <div className="component-card-header">
                <h3 className="component-card-title">Checkbox</h3>
                <span className="bento-badge">Tri-State</span>
              </div>
              <p className="component-card-desc">
                WAI-ARIA 표준의 Unchecked, Checked, Indeterminate 3가지 상태와
                스페이스바 키보드 제어를 지원합니다.
              </p>
              <span className="component-card-link">
                자세히 보기 <ArrowRight size={13} />
              </span>
            </div>
          </Link>

          {/* 7. Radio Card */}
          <Link href="/components/radio" className="component-card">
            <div className="component-card-preview">
              <RadioGroup
                name="preview-radio"
                size="sm"
                defaultValue="opt-a"
                className="flex flex-col gap-2"
              >
                <Radio value="opt-a" label="옵션 A (선택됨)" readOnly />
                <Radio value="opt-b" label="옵션 B" readOnly />
              </RadioGroup>
            </div>
            <div className="component-card-body">
              <div className="component-card-header">
                <h3 className="component-card-title">Radio</h3>
                <span className="bento-badge">Single Choice</span>
              </div>
              <p className="component-card-desc">
                상호 배타적 단일 선택과 RadioGroup 컨테이너를 통한 방향키 키보드
                탐색을 지원합니다.
              </p>
              <span className="component-card-link">
                자세히 보기 <ArrowRight size={13} />
              </span>
            </div>
          </Link>

          {/* 8. Switch Card */}
          <Link href="/components/switch" className="component-card">
            <div className="component-card-preview">
              <div className="flex flex-col gap-3">
                <Switch
                  size="sm"
                  defaultChecked={true}
                  readOnly
                  label="켜짐 상태"
                />
                <Switch
                  size="sm"
                  defaultChecked={false}
                  readOnly
                  label="꺼짐 상태"
                />
              </div>
            </div>
            <div className="component-card-body">
              <div className="component-card-header">
                <h3 className="component-card-title">Switch</h3>
                <span className="bento-badge">Instant Toggle</span>
              </div>
              <p className="component-card-desc">
                설정의 켜짐과 꺼짐 상태를 즉각적이고 직관적으로 전환하는 모던 토글
                스위치 컴포넌트입니다.
              </p>
              <span className="component-card-link">
                자세히 보기 <ArrowRight size={13} />
              </span>
            </div>
          </Link>

          {/* 9. Badge Card */}
          <Link href="/components/badge" className="component-card">
            <div className="component-card-preview">
              <div className="flex items-center gap-2">
                <Badge variant="point" appearance="solid">
                  NEW
                </Badge>
                <Badge variant="blue" appearance="line">
                  PROMO
                </Badge>
                <Badge variant="accent" appearance="solid">
                  HOT
                </Badge>
              </div>
            </div>
            <div className="component-card-body">
              <div className="component-card-header">
                <h3 className="component-card-title">Badge</h3>
                <span className="bento-badge">8 Colors</span>
              </div>
              <p className="component-card-desc">
                8가지 시맨틱 컬러와 Solid, Line 스타일을 조합하여 상태와
                프로모션을 한눈에 강조합니다.
              </p>
              <span className="component-card-link">
                자세히 보기 <ArrowRight size={13} />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Foundations Showcase */}
      <section className="landing-section border-t border-light">
        <div className="section-tag">
          <Layers size={14} />
          Foundations
        </div>
        <h2 className="section-title">기반 시스템 (Foundations)</h2>
        <p className="section-desc">
          시각적 통일성을 뒷받침하는 색상, 글꼴, 여백의 기본 원칙을
          문서화했습니다.
        </p>

        <div className="foundations-grid">
          {/* Colors Card */}
          <Link href="/foundations/colors" className="foundation-card">
            <div>
              <div className="flex items-center gap-2 mb-3 text-primary font-bold text-base">
                <Palette size={18} className="text-olive" />
                Colors
              </div>
              <p className="text-xs sm:text-sm text-secondary m-0 mb-5 leading-relaxed">
                Cabinet Olive, Fresh Olive 등 고대비 브랜드 팔레트와
                Semantic 색상 체계를 정의합니다.
              </p>
            </div>
            <div className="flex gap-2">
              <span
                className="flex-1 h-6 rounded bg-[var(--guide-color-olive)]"
                title="Cabinet Olive (#38471D)"
              />
              <span
                className="flex-1 h-6 rounded bg-fresh-olive"
                title="Fresh Olive (#7F9445)"
              />
              <span
                className="flex-1 h-6 rounded bg-butter-yellow"
                title="Butter Yellow (#F5CA45)"
              />
              <span
                className="flex-1 h-6 rounded bg-tomato-coral"
                title="Tomato Coral (#E66F4F)"
              />
            </div>
          </Link>

          {/* Typography Card */}
          <Link href="/foundations/typography" className="foundation-card">
            <div>
              <div className="flex items-center gap-2 mb-3 text-primary font-bold text-base">
                <Type size={18} className="text-fresh-olive" />
                Typography
              </div>
              <p className="text-xs sm:text-sm text-secondary m-0 mb-5 leading-relaxed">
                모바일과 데스크톱 반응형 타이포그래피 스케일과 최적의
                줄간격(Line Height)을 규정합니다.
              </p>
            </div>
            <div className="bg-surface-warm border border-light px-3 py-2 rounded-md text-xs font-mono text-secondary">
              12px · 14px · 16px · 20px · 28px
            </div>
          </Link>

          {/* Spacing Card */}
          <Link href="/foundations/spacing" className="foundation-card">
            <div>
              <div className="flex items-center gap-2 mb-3 text-primary font-bold text-base">
                <Ruler size={18} className="text-tomato-coral" />
                Spacing
              </div>
              <p className="text-xs sm:text-sm text-secondary m-0 mb-5 leading-relaxed">
                4px 그리드 스케일(sp-4 ~ sp-64)을 기반으로 일관된 간격(Gap)과
                레이아웃 패딩을 제공합니다.
              </p>
            </div>
            <div className="flex items-center gap-1 h-6">
              <span
                className="w-2 h-full bg-surface-warm border border-strong rounded-sm"
                title="sp-4 (4px)"
              />
              <span
                className="w-4 h-full bg-surface-warm border border-strong rounded-sm"
                title="sp-8 (8px)"
              />
              <span
                className="w-6 h-full bg-surface-warm border border-strong rounded-sm"
                title="sp-12 (12px)"
              />
              <span
                className="w-8 h-full bg-surface-warm border border-strong rounded-sm"
                title="sp-16 (16px)"
              />
              <span
                className="w-12 h-full bg-olive rounded-sm"
                title="sp-24 (24px)"
              />
            </div>
          </Link>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="landing-banner">
        <div className="banner-card">
          <div className="banner-content">
            <h2>지금 바로 Cabinet Design을 시작해보세요</h2>
            <p>
              토큰 명세와 인터랙티브 컴포넌트를 통해 일관된 프로덕트를 빠르게
              구현할 수 있습니다.
            </p>
          </div>
          <Link href="/overview/overview" className="banner-btn">
            <span>문서 살펴보기</span>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-footer-inner">
          <div className="flex items-center gap-2">
            <span className="landing-brand-mark" aria-hidden="true">
              <CabinetLogo size={20} strokeWidth={2} />
            </span>
            <span className="font-semibold text-primary">Cabinet Design</span>
            <span>© 2026 Cabinet Design. 작은 원칙, 일관된 경험.</span>
          </div>

          <div className="landing-footer-links">
            <Link href="/overview/overview">Overview</Link>
            <Link href="/foundations/colors">Foundations</Link>
            <Link href="/components/button">Components</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
