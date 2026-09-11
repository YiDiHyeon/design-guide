'use client';

import { Badge, badgeVariantsList } from '@/components/ui';
import { BadgePlayground } from '@/components/playgrounds/badge-playground';
import { Section, Table, Code } from '@/components/site/doc-parts';
import { Sparkles, Tag, Check, AlertCircle, ArrowRight, X } from 'lucide-react';

export function BadgeDoc() {
  return (
    <>
      <Section title="Overview">
        <p>
          Badge는 항목의 상태, 새로운 기능(NEW), 프로모션(SALE), 또는 카테고리
          태그를 한눈에 식별할 수 있도록 강조하는 인라인 컴포넌트입니다. 8가지
          시맨틱 컬러와 2가지 스타일(Solid, Line)을 지원합니다.
        </p>
        <BadgePlayground />
        <div className="callout">
          <p>
            Badge는 정보를 전달하는 인라인 라벨입니다. 클릭하여 행동을 실행해야
            하는 인터랙티브 요소에는 Badge 대신 <code>Button</code>을 사용해야
            합니다.
          </p>
        </div>
      </Section>

      <Section title="Anatomy">
        <div className="anatomy-panel">
          <div style={{ display: 'inline-flex', padding: '16px' }}>
            <Badge
              variant="point"
              appearance="solid"
              startIcon={<Sparkles />}
              endIcon={<ArrowRight />}
            >
              2. 프로모션 라벨
            </Badge>
          </div>
        </div>
        <Table
          headings={['번호', '구성 요소', '역할']}
          rows={[
            [
              '1',
              '시작 아이콘 (Start Icon)',
              '배지의 성격(신규, 알림, 혜택 등)을 직관적으로 보조하는 12px 아이콘',
            ],
            [
              '2',
              '라벨 텍스트 (Label Text)',
              '강조하고자 하는 핵심 키워드 (text-txt-promo-label: 12px, Bold)',
            ],
            [
              '3',
              '끝 아이콘 (End Icon)',
              '링크 이동성 또는 완료 상태를 암시하는 보조 아이콘',
            ],
            [
              '4',
              '배지 컨테이너 (Container)',
              'rounded-badge(2px) 반경과 4px/2px 패딩의 컴팩트 인라인 박스',
            ],
          ]}
        />
      </Section>

      <Section title="Variants">
        <p>
          8가지 시맨틱 컬러(<code>default</code>, <code>point</code>,{' '}
          <code>accent</code>, <code>pink</code>, <code>orange</code>,{' '}
          <code>blue</code>, <code>cyan</code>, <code>red</code>)와 2가지
          스타일(<code>solid</code>, <code>line</code>)의 전체 조합입니다.
        </p>

        <div
          className="token-grid"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            marginTop: '16px',
          }}
        >
          {badgeVariantsList.map((variant) => (
            <div
              key={variant}
              className="token-card"
              style={{ padding: '16px' }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px',
                }}
              >
                <strong
                  style={{ fontSize: '13px', textTransform: 'capitalize' }}
                >
                  {variant}
                </strong>
                <span className="token-badge">{variant}</span>
              </div>
              <div
                style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
              >
                <Badge variant={variant} appearance="solid">
                  {variant.toUpperCase()}
                </Badge>
                <Badge variant={variant} appearance="line">
                  {variant.toUpperCase()}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Appearances">
        <p>
          정보의 위계와 주목도에 따라 <code>solid</code>와 <code>line</code>{' '}
          스타일을 구분하여 적용합니다.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            marginTop: '16px',
          }}
        >
          <div className="token-card" style={{ padding: '20px' }}>
            <h4
              style={{
                marginBottom: '8px',
                fontSize: '14px',
                color: 'var(--site-text-primary)',
              }}
            >
              1. Solid (면 채움)
            </h4>
            <p
              style={{
                fontSize: '13px',
                color: 'var(--site-text-muted)',
                marginBottom: '16px',
              }}
            >
              배경색을 완전히 채워 사용자의 시선을 즉시 끌어야 하는 프로모션,
              신규 기능(NEW), 긴급 알림 등에 사용합니다.
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Badge variant="point" appearance="solid">
                NEW
              </Badge>
              <Badge variant="accent" appearance="solid">
                HOT
              </Badge>
              <Badge variant="orange" appearance="solid">
                SALE 20%
              </Badge>
              <Badge variant="default" appearance="solid">
                BEST
              </Badge>
            </div>
          </div>

          <div className="token-card" style={{ padding: '20px' }}>
            <h4
              style={{
                marginBottom: '8px',
                fontSize: '14px',
                color: 'var(--site-text-primary)',
              }}
            >
              2. Line (외곽선 라인)
            </h4>
            <p
              style={{
                fontSize: '13px',
                color: 'var(--site-text-muted)',
                marginBottom: '16px',
              }}
            >
              배경을 투명하게 유지하고 테두리와 글자색으로 표현하여, 본문 흐름을
              방해하지 않는 카테고리 태그나 보조 메타데이터에 적합합니다.
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Badge variant="default" appearance="line">
                카테고리
              </Badge>
              <Badge variant="blue" appearance="line">
                무료 배송
              </Badge>
              <Badge variant="cyan" appearance="line">
                오늘 출발
              </Badge>
              <Badge variant="pink" appearance="line">
                선물 추천
              </Badge>
            </div>
          </div>
        </div>
      </Section>

      <Section title="With Icons">
        <p>
          텍스트 앞(<code>startIcon</code>)이나 뒤(<code>endIcon</code>)에
          아이콘을 함께 배치하여 전달력을 높일 수 있습니다.
        </p>
        <div
          className="token-card"
          style={{ padding: '20px', marginTop: '16px' }}
        >
          <div
            style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            <Badge variant="point" appearance="solid" startIcon={<Sparkles />}>
              AI 추천
            </Badge>
            <Badge variant="blue" appearance="solid" startIcon={<Tag />}>
              쿠폰 적용
            </Badge>
            <Badge variant="accent" appearance="line" startIcon={<Check />}>
              인증 완료
            </Badge>
            <Badge variant="red" appearance="line" startIcon={<AlertCircle />}>
              마감 임박
            </Badge>
            <Badge
              variant="default"
              appearance="solid"
              endIcon={<ArrowRight />}
            >
              이벤트 바로가기
            </Badge>
          </div>
        </div>
      </Section>

      <Section title="Guidelines">
        <div className="guideline-grid">
          <div className="guideline good">
            <h3>
              <Check
                size={16}
                aria-hidden="true"
                style={{
                  display: 'inline',
                  verticalAlign: '-2px',
                  marginRight: '4px',
                }}
              />
              권장해요
            </h3>
            <p>
              1~2단어(NEW, SALE, BEST 등)의 간결하고 명확한 키워드를 사용합니다.
            </p>
            <p>
              화면 내에서 가장 중요한 혜택이나 상태에만 제한적으로 사용하여
              시각적 피로도를 낮춥니다.
            </p>
            <p>
              시맨틱 의미에 부합하는 컬러(예: 할인/경고는 red/point, 성공/완료는
              accent/blue)를 일관되게 적용합니다.
            </p>
            <p>아이콘을 추가할 때는 12px 규격의 직관적인 심볼을 사용합니다.</p>
          </div>
          <div className="guideline bad">
            <h3>
              <X
                size={16}
                aria-hidden="true"
                style={{
                  display: 'inline',
                  verticalAlign: '-2px',
                  marginRight: '4px',
                }}
              />
              피해주세요
            </h3>
            <p>
              두 줄 이상으로 넘어가는 긴 문장이나 설명을 배지 안에 넣지
              않습니다.
            </p>
            <p>
              클릭하여 주요 행동을 유도해야 하는 버튼 대신 배지를 사용하지
              않습니다.
            </p>
            <p>
              한 화면에 너무 많은 원색 배지를 남발하여 시각적 위계를 흐리지
              않습니다.
            </p>
            <p>
              배지 내 텍스트와 배경 간의 명도 대비를 해치는 임의의 색상을
              적용하지 않습니다.
            </p>
          </div>
        </div>
      </Section>

      <Section title="API">
        <Table
          headings={['Prop', 'Type', 'Default', 'Description']}
          rows={[
            [
              'variant',
              "'default' | 'point' | 'accent' | 'pink' | 'orange' | 'blue' | 'cyan' | 'red'",
              "'default'",
              '배지의 8가지 시맨틱 테마 컬러',
            ],
            [
              'appearance',
              "'solid' | 'line'",
              "'solid'",
              '면 채움(solid) 또는 외곽선(line) 스타일',
            ],
            [
              'startIcon',
              'ReactNode',
              'undefined',
              '텍스트 앞쪽에 위치하는 12px 인라인 아이콘',
            ],
            [
              'endIcon',
              'ReactNode',
              'undefined',
              '텍스트 뒤쪽에 위치하는 12px 인라인 아이콘',
            ],
            [
              'children',
              'ReactNode',
              'undefined',
              '배지 내부에 표시될 라벨 텍스트',
            ],
            ['className', 'string', "''", '추가 커스텀 클래스'],
          ]}
        />
      </Section>

      <Section title="Code Example">
        <Code>{`import { Badge } from '@/components/ui';
import { Sparkles, Tag } from 'lucide-react';

export function Example() {
  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      {/* 기본 Solid 배지 */}
      <Badge variant="point" appearance="solid">
        HOT
      </Badge>

      {/* 아이콘이 포함된 Line 배지 */}
      <Badge variant="blue" appearance="line" startIcon={<Tag />}>
        무료 배송
      </Badge>

      {/* 시작 아이콘이 포함된 Solid 배지 */}
      <Badge variant="accent" appearance="solid" startIcon={<Sparkles />}>
        AI 추천
      </Badge>
    </div>
  );
}`}</Code>
      </Section>
    </>
  );
}
