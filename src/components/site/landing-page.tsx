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
  Badge,
} from '@/components/ui';
import { destinationOptions } from '@/lib/control';

export function LandingPage() {
  // Hero Interactive States
  const [buttonVariant, setButtonVariant] =
    useState<NonNullable<ButtonProps['variant']>>('solid');
  const [buttonSize, setButtonSize] =
    useState<NonNullable<ButtonProps['size']>>('md');
  const [clickCount, setClickCount] = useState(0);

  const [inputValue, setInputValue] = useState('홍길동');
  const [selectValue, setSelectValue] = useState('seoul');
  const [checkboxAgreed, setCheckboxAgreed] = useState(true);

  return (
    <div className="landing-root">
      <div className="landing-grid-bg" aria-hidden="true" />

      {/* Header */}
      <header className="landing-header">
        <div className="landing-header-inner">
          <Link href="/" className="landing-brand">
            <span className="landing-brand-mark" aria-hidden="true">
              d<span>g</span>
            </span>
            <span>design guide</span>
            <span className="landing-version-pill">v0.1</span>
          </Link>

          <nav className="landing-nav" aria-label="메인 네비게이션">
            <Link href="/foundations/colors" className="landing-nav-link">
              Foundations
            </Link>
            <Link href="/components/button" className="landing-nav-link">
              Components
            </Link>
          </nav>

          <div className="landing-header-actions">
            <Link href="/foundations/colors" className="landing-btn-docs">
              <span className="desktop-only">문서 바로가기</span>
              <span className="mobile-only">문서 보기</span>
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
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
          만드는 <span className="accent-text">Design Guide</span>
        </h1>

        <p className="landing-hero-desc">
          디자인 토큰부터 접근성을 고려한 UI 컴포넌트까지. 명확한 규칙과 유연한
          제어로 사용자에게 신뢰할 수 있는 인터페이스를 제공합니다.
        </p>

        <div className="landing-hero-cta">
          <Link href="/foundations/colors" className="landing-cta-primary">
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

              <div className="bento-button-controls">
                {(['solid', 'secondary', 'line', 'circle-light'] as const).map(
                  (v) => (
                    <button
                      key={v}
                      type="button"
                      className="bento-chip"
                      data-active={buttonVariant === v}
                      onClick={() => setButtonVariant(v)}
                    >
                      {v}
                    </button>
                  ),
                )}
              </div>
            </div>

            <div className="bento-button-stage">
              <Button
                variant={buttonVariant}
                size={buttonSize}
                onClick={() => setClickCount((n) => n + 1)}
                aria-label={
                  buttonVariant === 'circle-light' ? '추가' : undefined
                }
              >
                {buttonVariant === 'circle-light' ? (
                  <Plus size={16} />
                ) : (
                  <>
                    <span>클릭해 보세요</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </Button>
              <span
                style={{
                  fontSize: '11px',
                  color: 'var(--site-text-secondary)',
                }}
              >
                {clickCount > 0
                  ? `총 ${clickCount}번 클릭되었어요!`
                  : '버튼을 직접 클릭하고 조작해 보세요.'}
              </span>
            </div>

            <div className="bento-card-footer">
              <div
                style={{
                  display: 'flex',
                  gap: '6px',
                  alignItems: 'center',
                  fontSize: '11px',
                  color: 'var(--site-text-secondary)',
                }}
              >
                <span>Size:</span>
                {(['sm', 'md', 'lg'] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    className="bento-chip"
                    style={{ padding: '3px 8px', fontSize: '11px' }}
                    data-active={buttonSize === s}
                    onClick={() => setButtonSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <Link
                href="/components/button"
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--site-text-primary)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  textDecoration: 'none',
                }}
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
                  style={{
                    display: 'block',
                    fontSize: '11px',
                    fontWeight: 600,
                    marginBottom: '6px',
                    color: 'var(--site-text-secondary)',
                  }}
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
                  style={{
                    display: 'block',
                    fontSize: '11px',
                    fontWeight: 600,
                    marginBottom: '6px',
                    color: 'var(--site-text-secondary)',
                  }}
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

              <div style={{ marginTop: '2px' }}>
                <Checkbox
                  id="hero-checkbox"
                  size="sm"
                  checked={checkboxAgreed}
                  onChange={(e) => setCheckboxAgreed(e.target.checked)}
                  label="약관 동의 완료"
                />
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
                className="palette-block"
                style={{
                  background: 'var(--site-text-brand)',
                  color: '#ffffff',
                }}
              >
                Brand
              </div>
              <div
                className="palette-block"
                style={{
                  background: 'var(--site-text-primary)',
                  color: '#ffffff',
                }}
              >
                #212121
              </div>
              <div
                className="palette-block"
                style={{ background: '#757575', color: '#ffffff' }}
              >
                #757575
              </div>
              <div
                className="palette-block"
                style={{
                  background: 'var(--site-line-light)',
                  color: 'var(--site-text-primary)',
                }}
              >
                #eeeeee
              </div>
            </div>

            <div className="palette-specs">
              <div className="spec-cell">
                <span>Radius</span>
                <strong>4px / 8px</strong>
              </div>
              <div className="spec-cell">
                <span>Height</span>
                <strong>36px / 40px</strong>
              </div>
              <div className="spec-cell">
                <span>Base Grid</span>
                <strong>8px Spacing</strong>
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
        <h2 className="section-title">디자인 가이드가 추구하는 원칙</h2>
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
      <section
        className="landing-section"
        style={{ borderTop: '1px solid var(--site-line-light)' }}
      >
        <div className="section-tag">
          <Code2 size={14} />
          Components
        </div>
        <h2 className="section-title">핵심 인터랙션 컴포넌트</h2>
        <p className="section-desc">
          자주 사용되는 기본 컴포넌트들이 고도화된 상태 제어와 통일된 디자인으로
          제공됩니다.
        </p>

        <div className="components-grid">
          {/* Button Card */}
          <Link href="/components/button" className="component-card">
            <div className="component-card-preview">
              <div
                style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
              >
                <Button variant="solid" size="sm">
                  확인
                </Button>
                <Button variant="secondary" size="sm">
                  취소
                </Button>
                <Button variant="line-icon" size="sm" aria-label="추가">
                  <Plus size={14} />
                </Button>
              </div>
            </div>
            <div className="component-card-body">
              <div className="component-card-header">
                <h3 className="component-card-title">Button</h3>
                <span className="bento-badge">7 Variants</span>
              </div>
              <p className="component-card-desc">
                Solid, Secondary, Line, Icon, Circle 등 다양한 상황에 최적화된
                7가지 버튼 스타일을 제공합니다.
              </p>
              <span className="component-card-link">
                자세히 보기 <ArrowRight size={13} />
              </span>
            </div>
          </Link>

          {/* Input Card */}
          <Link href="/components/input" className="component-card">
            <div className="component-card-preview">
              <div style={{ width: '80%' }}>
                <Input
                  size="sm"
                  placeholder="텍스트를 입력하세요"
                  readOnly
                  value="Design Guide"
                />
              </div>
            </div>
            <div className="component-card-body">
              <div className="component-card-header">
                <h3 className="component-card-title">Input</h3>
                <span className="bento-badge">9 Sizes</span>
              </div>
              <p className="component-card-desc">
                9단계 크기 스케일과 Default, Error, ReadOnly, Disabled 상태를
                지원하는 텍스트 입력 필드입니다.
              </p>
              <span className="component-card-link">
                자세히 보기 <ArrowRight size={13} />
              </span>
            </div>
          </Link>

          {/* Select Card */}
          <Link href="/components/select" className="component-card">
            <div className="component-card-preview">
              <div style={{ width: '80%' }}>
                <Select
                  size="sm"
                  options={destinationOptions}
                  value="seoul"
                  readOnly
                />
              </div>
            </div>
            <div className="component-card-body">
              <div className="component-card-header">
                <h3 className="component-card-title">Select</h3>
                <span className="bento-badge">Custom Indicator</span>
              </div>
              <p className="component-card-desc">
                Lucide 아이콘이 통합된 일체형 선택 박스로 모든 브라우저에서
                일관된 드롭다운 경험을 보장합니다.
              </p>
              <span className="component-card-link">
                자세히 보기 <ArrowRight size={13} />
              </span>
            </div>
          </Link>

          {/* Checkbox Card */}
          <Link href="/components/checkbox" className="component-card">
            <div className="component-card-preview">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <Checkbox size="sm" checked={true} readOnly label="선택 옵션" />
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

          {/* Radio Card */}
          <Link href="/components/radio" className="component-card">
            <div className="component-card-preview">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <Radio
                  size="sm"
                  checked={true}
                  readOnly
                  label="옵션 A (선택)"
                />
                <Radio size="sm" checked={false} readOnly label="옵션 B" />
              </div>
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

          {/* Badge Card */}
          <Link href="/components/badge" className="component-card">
            <div className="component-card-preview">
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'center',
                }}
              >
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
      <section
        className="landing-section"
        style={{ borderTop: '1px solid var(--site-line-light)' }}
      >
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
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '12px',
                  color: 'var(--site-text-primary)',
                  fontWeight: 700,
                  fontSize: '17px',
                }}
              >
                <Palette size={18} />
                Colors
              </div>
              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--site-text-secondary)',
                  margin: '0 0 20px',
                  lineHeight: 1.5,
                }}
              >
                브랜드 오렌지(#ff6f0f)부터 뉴트럴 그레이 스케일 및 상태별 피드백
                색상 토큰을 정의합니다.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <span
                style={{
                  flex: 1,
                  height: '24px',
                  borderRadius: '4px',
                  background: 'var(--site-text-brand)',
                }}
              />
              <span
                style={{
                  flex: 1,
                  height: '24px',
                  borderRadius: '4px',
                  background: '#212121',
                }}
              />
              <span
                style={{
                  flex: 1,
                  height: '24px',
                  borderRadius: '4px',
                  background: '#757575',
                }}
              />
              <span
                style={{
                  flex: 1,
                  height: '24px',
                  borderRadius: '4px',
                  background: '#e0e0e0',
                }}
              />
            </div>
          </Link>

          {/* Typography Card */}
          <Link href="/foundations/typography" className="foundation-card">
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '12px',
                  color: 'var(--site-text-primary)',
                  fontWeight: 700,
                  fontSize: '17px',
                }}
              >
                <Type size={18} />
                Typography
              </div>
              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--site-text-secondary)',
                  margin: '0 0 20px',
                  lineHeight: 1.5,
                }}
              >
                모바일과 데스크톱 반응형 타이포그래피 스케일과 최적의
                줄간격(Line Height)을 규정합니다.
              </p>
            </div>
            <div
              style={{
                background: 'var(--site-bg-surface-light)',
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontFamily: 'var(--site-font-code)',
                color: 'var(--site-text-secondary)',
              }}
            >
              12px · 14px · 16px · 20px · 28px
            </div>
          </Link>

          {/* Spacing Card */}
          <Link href="/foundations/spacing" className="foundation-card">
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '12px',
                  color: 'var(--site-text-primary)',
                  fontWeight: 700,
                  fontSize: '17px',
                }}
              >
                <Ruler size={18} />
                Spacing
              </div>
              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--site-text-secondary)',
                  margin: '0 0 20px',
                  lineHeight: 1.5,
                }}
              >
                8px 그리드 시스템을 기반으로 일관된 간격(Gap)과 레이아웃 패딩을
                제공합니다.
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                height: '24px',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '100%',
                  background: 'var(--site-line-hover)',
                  borderRadius: '2px',
                }}
              />
              <span
                style={{
                  width: '16px',
                  height: '100%',
                  background: 'var(--site-line-hover)',
                  borderRadius: '2px',
                }}
              />
              <span
                style={{
                  width: '24px',
                  height: '100%',
                  background: 'var(--site-line-hover)',
                  borderRadius: '2px',
                }}
              />
              <span
                style={{
                  width: '32px',
                  height: '100%',
                  background: 'var(--site-text-primary)',
                  borderRadius: '2px',
                }}
              />
            </div>
          </Link>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="landing-banner">
        <div className="banner-card">
          <div className="banner-content">
            <h2>지금 바로 Design Guide를 시작해보세요</h2>
            <p>
              토큰 명세와 인터랙티브 컴포넌트를 통해 일관된 프로덕트를 빠르게
              구현할 수 있습니다.
            </p>
          </div>
          <Link href="/foundations/colors" className="banner-btn">
            <span>문서 살펴보기</span>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-footer-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              className="landing-brand-mark"
              style={{ width: '22px', height: '22px', fontSize: '10px' }}
            >
              d<span>g</span>
            </span>
            <span
              style={{ fontWeight: 600, color: 'var(--site-text-primary)' }}
            >
              Design Guide
            </span>
            <span>© 2026. 작은 원칙, 일관된 경험.</span>
          </div>

          <div className="landing-footer-links">
            <Link href="/foundations/colors">Foundations</Link>
            <Link href="/components/button">Components</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
