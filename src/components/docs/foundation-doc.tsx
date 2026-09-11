import { Code, Section } from '@/components/site/doc-parts';
import { TokenValue } from '@/components/site/token-value';
import { TokenCatalog } from '@/components/site/token-catalog';
import { ArrowRight } from 'lucide-react';
import { CabinetLogo } from '@/components/ui';
import {
  spec,
  primitiveNames,
  semanticNames,
  typographyNames,
} from '@/lib/tokens';

const coreBrandColors = [
  {
    name: 'Cabinet Olive',
    token: '--guide-color-olive',
    role: 'Primary 메인 컬러 (#38471D)',
  },
  {
    name: 'Fresh Olive',
    token: '--guide-color-fresh-olive',
    role: 'Secondary / green (#7F9445)',
  },
  {
    name: 'Butter Yellow',
    token: '--guide-color-butter-yellow',
    role: 'Point / yellow-500 (#F5CA45)',
  },
  {
    name: 'Cream',
    token: '--guide-color-cream',
    role: 'Warm Surface / yellow-100 (#FFF8E5)',
  },
  {
    name: 'Deep Ink',
    token: '--guide-color-deep-ink',
    role: 'Text & Line / brand-900 (#23281D)',
  },
  {
    name: 'Tomato Coral',
    token: '--guide-color-tomato-coral',
    role: 'Highlight / amber-500 (#E66F4F)',
  },
] as const;

export function FoundationDoc({ slug }: { slug: string }) {
  if (slug === 'colors')
    return (
      <>
        <Section title="Overview">
          <p>
            명확한 위계(Clear)와 차분한 인상(Calm)을 바탕으로 한 범용 디자인
            시스템의 색상 체계입니다. 단단한 <strong>Cabinet Olive</strong>
            (#38471D)가 <strong>Primary 메인 컬러</strong>가 되며,{' '}
            <strong>Fresh Olive</strong>(green)와 <strong>Tomato Coral</strong>
            (amber)이 보조 및 상태 강조 역할을 수행합니다. 포인트 컬러로{' '}
            <strong>Butter Yellow</strong>가 추가되었으며,{' '}
            <strong>Cream</strong>은 Butter Yellow 스케일의 밝은 톤(yellow-100,
            #FFF8E5)으로 따뜻한 서피스를 구성합니다. 시스템의{' '}
            <strong>Red</strong>(#EF4444)는 명확한 오류·삭제 피드백을 위해 고유
            색상을 유지합니다.
          </p>
          <div className="color-hero">
            <span>
              Primitive values.
              <br />
              <strong>Semantic meaning.</strong>
            </span>
            <div className="color-orbits" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
          </div>

          <div
            style={{
              marginTop: '28px',
              padding: '24px',
              borderRadius: '12px',
              border: '1px solid var(--guide-line-light)',
              background: 'var(--guide-bg-surface-light)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div>
                <h3
                  style={{
                    margin: '0 0 4px',
                    fontSize: '16px',
                    fontWeight: 750,
                    color: 'var(--guide-color-olive)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <CabinetLogo size={20} strokeWidth={2.2} accent />
                  Cabinet Symbolic Line Logo & Favicon
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: '13px',
                    color: 'var(--guide-text-secondary)',
                  }}
                >
                  정돈된 서랍과 사선 다리, 버터 옐로우 손잡이 포인트로 디자인
                  시스템의 수납·위계 원칙을 상징합니다.
                </p>
              </div>
              <div
                style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
              >
                <a
                  href="/icon.svg"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    padding: '5px 12px',
                    borderRadius: '6px',
                    background: 'var(--guide-bg-base)',
                    border: '1px solid var(--guide-line-strong)',
                    color: 'var(--guide-text-primary)',
                    textDecoration: 'none',
                  }}
                >
                  icon.svg ↗
                </a>
                <a
                  href="/cabinet-logo.svg"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    padding: '5px 12px',
                    borderRadius: '6px',
                    background: 'var(--guide-bg-base)',
                    border: '1px solid var(--guide-line-strong)',
                    color: 'var(--guide-text-primary)',
                    textDecoration: 'none',
                  }}
                >
                  cabinet-logo.svg ↗
                </a>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '14px',
              }}
            >
              <div
                style={{
                  padding: '18px',
                  background: 'var(--guide-bg-base)',
                  borderRadius: '10px',
                  border: '1px solid var(--guide-line-light)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    marginBottom: '12px',
                  }}
                >
                  <CabinetLogo size={44} type="two-tier" strokeWidth={2} />
                  <CabinetLogo size={32} type="two-tier" strokeWidth={2.2} />
                  <CabinetLogo size={24} type="two-tier" strokeWidth={2.4} />
                  <CabinetLogo size={18} type="two-tier" strokeWidth={2.6} />
                </div>
                <strong
                  style={{
                    fontSize: '13px',
                    display: 'block',
                    marginBottom: '4px',
                  }}
                >
                  Two-Tier Archive (기본 로고 & 파비콘)
                </strong>
                <span
                  style={{ fontSize: '12px', color: 'var(--guide-text-muted)' }}
                >
                  배경 없는 투명 라인 + 올리브 프레임 + 버터 옐로우/토마토 코랄
                  손잡이
                </span>
              </div>

              <div
                style={{
                  padding: '18px',
                  background: 'var(--guide-bg-base)',
                  borderRadius: '10px',
                  border: '1px solid var(--guide-line-light)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    marginBottom: '12px',
                  }}
                >
                  <CabinetLogo size={44} type="credenza" strokeWidth={2} />
                  <CabinetLogo size={32} type="credenza" strokeWidth={2.2} />
                  <CabinetLogo size={24} type="credenza" strokeWidth={2.4} />
                  <CabinetLogo size={18} type="credenza" strokeWidth={2.6} />
                </div>
                <strong
                  style={{
                    fontSize: '13px',
                    display: 'block',
                    marginBottom: '4px',
                  }}
                >
                  Modern Credenza (양문형)
                </strong>
                <span
                  style={{ fontSize: '12px', color: 'var(--guide-text-muted)' }}
                >
                  양문형 슬릿 손잡이에 각각 버터 옐로우와 토마토 코랄이 포인트로
                  들어간 사이드보드
                </span>
              </div>

              <div
                style={{
                  padding: '18px',
                  background: 'var(--guide-bg-base)',
                  borderRadius: '10px',
                  border: '1px solid var(--guide-line-light)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    marginBottom: '12px',
                  }}
                >
                  <CabinetLogo size={44} type="three-tier" strokeWidth={2} />
                  <CabinetLogo size={32} type="three-tier" strokeWidth={2.2} />
                  <CabinetLogo size={24} type="three-tier" strokeWidth={2.4} />
                  <CabinetLogo size={18} type="three-tier" strokeWidth={2.6} />
                </div>
                <strong
                  style={{
                    fontSize: '13px',
                    display: 'block',
                    marginBottom: '4px',
                  }}
                >
                  Three-Tier System (3단형)
                </strong>
                <span
                  style={{ fontSize: '12px', color: 'var(--guide-text-muted)' }}
                >
                  3개 서랍에 버터 옐로우, 토마토 코랄, 프레시 올리브 3색
                  손잡이가 배치된 캐비닛
                </span>
              </div>
            </div>
          </div>
        </Section>
        <Section title="Primitive palette">
          <p>
            시스템의 6가지 핵심 브랜드 컬러와 목적별 스케일 팔레트(Brand,
            Neutral, Green, Amber, Yellow, Red)입니다. 컴포넌트는 원시 값을 직접
            쓰지 않고, 역할이 정의된 Semantic 토큰을 통해 참조합니다.
          </p>
          <div className="palette-group">
            <h3>core brand colors</h3>
            <div className="palette">
              {coreBrandColors.map((color) => (
                <div key={color.token}>
                  <div
                    className="swatch"
                    style={{ background: `var(${color.token})` }}
                  />
                  <span>{color.name}</span>
                  <TokenValue name={color.token} />
                </div>
              ))}
            </div>
          </div>
          <p>
            목적별 전체 스케일 팔레트 (Primary Brand, Neutral, Green, Amber,
            Yellow, Red):
          </p>
          {['brand', 'neutral', 'green', 'amber', 'yellow', 'red'].map(
            (group) => (
              <div className="palette-group" key={group}>
                <h3>{group}</h3>
                <div className="palette">
                  {primitiveNames
                    .filter((name) => name.startsWith(`--guide-${group}-`))
                    .map((name) => (
                      <div key={name}>
                        <div
                          className="swatch"
                          style={{ background: `var(${name})` }}
                        />
                        <span>{name.replace('--guide-', '')}</span>
                        <TokenValue name={name} />
                      </div>
                    ))}
                </div>
              </div>
            ),
          )}
        </Section>
        <Section title="Semantic colors">
          <p>
            색의 원시 값과 역할 이름을 분리합니다. 컴포넌트는 특정 색상명이 아닌
            text, background, border, action과 feedback 역할을 사용합니다.
          </p>
          <TokenCatalog
            names={semanticNames.filter((name) =>
              /^--guide-(text-|bg-|line-|brand-|overlay-|icon-.*-color)/.test(
                name,
              ),
            )}
          />
        </Section>
        <Section title="Token hierarchy">
          <div className="token-flow">
            <div>
              <small>PRIMITIVE</small>
              <code>--guide-color-olive</code>
              <TokenValue name="--guide-color-olive" />
            </div>
            <span className="token-flow-arrow" aria-hidden="true">
              <ArrowRight size={16} />
            </span>
            <div>
              <small>SEMANTIC</small>
              <code>--guide-brand-600</code>
              <span>주요 브랜드 행동</span>
            </div>
            <span className="token-flow-arrow" aria-hidden="true">
              <ArrowRight size={16} />
            </span>
            <div>
              <small>COMPONENT</small>
              <code>--guide-button-primary-default-bg</code>
              <span>Primary 버튼 배경</span>
            </div>
          </div>
          <Code>{`/* Primitive */\n--guide-color-olive: #38471d;\n/* Semantic */\n--guide-brand-600: var(--guide-color-olive);\n/* Component */\n--guide-button-primary-default-bg: var(--guide-brand-600);`}</Code>
          <p>
            Primitive는 값, Semantic은 의미, Component는 구체적인 UI 계약을
            담당합니다. 브랜드 테마는 Semantic 값을 덮어쓰고 컴포넌트 API는
            유지합니다.
          </p>
          <details className="token-catalog">
            <summary>전체 Primitive 명세 · {primitiveNames.length}개</summary>
            <TokenCatalog names={primitiveNames} />
          </details>
          <details className="token-catalog">
            <summary>
              전체 Semantic 명세 · {semanticNames.length}개 (효과·레이아웃 포함)
            </summary>
            <TokenCatalog names={semanticNames} responsive />
          </details>
        </Section>
        <Section title="Guidelines">
          <ul>
            <li>화면에서는 의미에 맞는 Semantic 이름을 우선 사용합니다.</li>
            <li>
              색상값을 직접 사용하기보다 Semantic 토큰을 선택하고, 작은 텍스트는
              배경과의 WCAG 명암비를 확인합니다.
            </li>
            <li>
              색상 외에 레이블과 아이콘으로 오류·선택 상태를 함께 전달합니다.
            </li>
            <li>문서 UI와 실제 Button 모두 같은 guide 토큰을 참조합니다.</li>
          </ul>
        </Section>
      </>
    );
  if (slug === 'typography')
    return (
      <>
        <Section title="Overview">
          <p>
            역할 중심의 Text Style을 사용합니다. 본문은 16px을 기본으로 하고
            제목만 화면 크기에 맞춰 완만하게 확장합니다.
          </p>
          <div className="type-hero">
            <span>Aa 가나다</span>
            <p>같은 토큰으로 이어지는 읽기 경험.</p>
            <code>--guide-font-base → --guide-font-sans</code>
          </div>
          <p className="caption">
            Pretendard가 설치되어 있으면 사용하고, 없으면 system-ui로
            표시합니다. 이 레포는 외부 폰트 파일에 의존하지 않습니다.
          </p>
        </Section>
        <Section title="Type scale">
          <h3>Primitive · Size / Weight / Line height</h3>
          <TokenCatalog
            names={primitiveNames.filter((name) =>
              /^--guide-(size-|fw-|lh-|font-)/.test(name),
            )}
          />
          <h3 className="mt-8">Semantic · 반응형 타입 스케일 전체</h3>
          <TokenCatalog names={typographyNames} responsive />
        </Section>
        <Section title="Usage">
          <p>
            Text Style은 크기뿐 아니라 굵기·행간·자간을 함께 정의합니다. 아래
            예시는 실제 스타일로 렌더링됩니다.
          </p>
          {Object.keys(spec.typography).map((name) => (
            <div key={name} className="token-specimen">
              <code>{name}</code>
              <p className={name}>일관된 경험을 만드는 디자인 0123456789</p>
            </div>
          ))}
          <Code>{`<h1 className="text-tit-main-page">페이지 제목</h1>\n<h2 className="text-tit-section-title">섹션 제목</h2>\n<p className="text-txt-body-main">본문 내용</p>\n<small className="text-txt-caption">보조 설명</small>`}</Code>
        </Section>
        <Section title="Guidelines">
          <ul>
            <li>body-main은 모든 화면에서 읽기 편한 16px을 유지합니다.</li>
            <li>기본 행간은 1.5, 제목 행간은 1.3을 사용합니다.</li>
            <li>
              시각적 크기와 별개로 HTML 제목의 h1 → h2 → h3 순서를 유지합니다.
            </li>
            <li>화면 크기를 변경하면 표의 현재 값과 예시가 함께 바뀝니다.</li>
          </ul>
        </Section>
      </>
    );
  const spaces = primitiveNames.filter((name) =>
    name.startsWith('--guide-space-'),
  );
  return (
    <>
      <Section title="Overview">
        <p>
          4px을 기본 단위로 한 제한된 Space 스케일을 사용합니다. padding과
          margin에는 sp, 요소 사이 간격에는 gap이라는 의미를 붙이되 같은 원시
          스케일을 공유합니다.
        </p>
        <div className="spacing-hero">
          <div>
            <span>4px base</span>
            <div>같은 스케일, 역할 중심의 이름</div>
            <small>Consistent across projects</small>
          </div>
        </div>
      </Section>
      <Section title="Spacing scale">
        <div className="spacing-scale">
          {spaces.map((name) => (
            <div key={name}>
              <code>{name}</code>
              <TokenValue name={name} />
              <div style={{ width: `var(${name})` }} />
            </div>
          ))}
        </div>
        <details className="token-catalog">
          <summary>Height / Radius / Border / Touch / Layout Primitive</summary>
          <TokenCatalog
            names={primitiveNames.filter((name) =>
              /^--guide-(height-|radius-|border-|touch-|container-|grid-|breakpoint-)/.test(
                name,
              ),
            )}
          />
        </details>
      </Section>
      <Section title="Semantic spacing">
        <h3>sp · Padding / Margin</h3>
        <TokenCatalog
          names={semanticNames.filter((name) => name.startsWith('--guide-sp-'))}
          responsive
        />
        <h3 className="mt-8">gap · 요소 사이 간격</h3>
        <TokenCatalog
          names={semanticNames.filter((name) =>
            name.startsWith('--guide-gap-'),
          )}
          responsive
        />
        <details className="token-catalog">
          <summary>Layout / Radius / Touch 역할</summary>
          <TokenCatalog
            names={semanticNames.filter((name) =>
              /^--guide-(breakpoint-|container-|margin-|grid-|radius-|touch-)/.test(
                name,
              ),
            )}
            responsive
          />
        </details>
        <Code>{`<div className="flex gap-md p-sp-md">관련 요소</div>\n\n/* sp-md: 16px\n   gap-md: 12px\n   역할 이름은 다르지만 하나의 4px 스케일을 공유합니다. */`}</Code>
      </Section>
      <Section title="Guidelines">
        <ul>
          <li>margin/padding에는 sp, 요소 사이 간격에는 gap을 사용합니다.</li>
          <li>기본 Tailwind 숫자 스케일을 덮어쓰지 않습니다.</li>
          <li>
            Button의 md 높이는 40px입니다. 모바일의 주요 행동에는 lg(48px)를
            선택합니다.
          </li>
          <li>반응형 기준은 콘텐츠 변화가 생기는 768px와 1280px입니다.</li>
        </ul>
      </Section>
    </>
  );
}
