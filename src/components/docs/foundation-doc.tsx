import { Code, Section, Table } from '@/components/site/doc-parts';
import { TokenValue } from '@/components/site/token-value';
import { TokenCatalog } from '@/components/site/token-catalog';
import { ArrowRight, Check, X } from 'lucide-react';
import { CabinetLogo, Button, Badge } from '@/components/ui';
import {
  spec,
  primitiveNames,
  semanticNames,
  typographyNames,
} from '@/lib/tokens';

const radiusPrimitives = [
  {
    token: '--guide-radius-0',
    value: '0px',
    name: 'radius-0',
    role: 'Square',
    desc: '완전 직각 · 데이터 그리드, 코드 블록, 샤프 컨테이너',
  },
  {
    token: '--guide-radius-2',
    value: '2px',
    name: 'radius-2',
    role: 'Micro',
    desc: '초소형 라운드 · 체크박스 포커스 링, 세밀한 컨트롤',
  },
  {
    token: '--guide-radius-4',
    value: '4px',
    name: 'radius-4',
    role: 'Small',
    desc: '작은 라운드 · 체크박스 박스, 툴팁, 서브 뱃지',
  },
  {
    token: '--guide-radius-6',
    value: '6px',
    name: 'radius-6',
    role: 'Medium',
    desc: '중간 라운드 · 뱃지(Badge), 태그, 플로팅 툴팁',
  },
  {
    token: '--guide-radius-8',
    value: '8px',
    name: 'radius-8',
    role: 'Base (Default)',
    desc: '표준 라운드 · 버튼(Button), 인풋(Input), 셀렉트(Select)',
  },
  {
    token: '--guide-radius-10',
    value: '10px',
    name: 'radius-10',
    role: 'Large',
    desc: '큰 라운드 · 카드(Card), 서피스 패널, 팝오버 메뉴',
  },
  {
    token: '--guide-radius-16',
    value: '16px',
    name: 'radius-16',
    role: 'XLarge',
    desc: '특대형 라운드 · 모달(Modal), 다이얼로그, 바텀 시트',
  },
  {
    token: '--guide-radius-full',
    value: '999px',
    name: 'radius-full',
    role: 'Full / Pill',
    desc: '완전 둥근 형태 · 필터 칩(Chip), 아바타, 스위치 썸',
  },
] as const;

const semanticRadiusItems = [
  {
    token: '--guide-radius-square',
    value: '0px',
    primitive: '--guide-radius-0',
    role: 'Square Container',
    targets: '코드 블록 · 데이터 테이블 · 터미널 구획',
    desc: '엄격한 직각 사각형. 표 헤더나 코드 뷰어 등 경계 구획이 단단해야 하는 영역에 적용합니다.',
    preview: (
      <span
        className="px-2.5 py-1 bg-surface-main border border-strong font-mono text-[11px] font-semibold text-primary"
        style={{ borderRadius: 'var(--guide-radius-square)' }}
      >
        code_block
      </span>
    ),
  },
  {
    token: '--guide-radius-badge',
    value: '6px',
    primitive: '--guide-radius-6',
    role: 'Badge & Tooltip',
    targets: '상태 뱃지 · 카테고리 태그 · 인라인 라벨',
    desc: '작은 인라인 레이블에 최적화된 곡률. 글자 가독성을 해치지 않으면서 절제된 라운드를 형성합니다.',
    preview: (
      <Badge variant="accent">
        Badge (6px)
      </Badge>
    ),
  },
  {
    token: '--guide-radius-button',
    value: '8px',
    primitive: '--guide-radius-8',
    role: 'Action Controls',
    targets: 'Button · 폼 제출 액션 · 아이콘 버튼',
    desc: 'Cabinet 디자인 시스템의 표준 액션 곡률. 단단하고 현대적인 클릭 경험을 제공합니다.',
    preview: (
      <Button size="sm" variant="primary" className="pointer-events-none">
        Button (8px)
      </Button>
    ),
  },
  {
    token: '--guide-radius-input',
    value: '8px',
    primitive: '--guide-radius-8',
    role: 'Form Controls',
    targets: 'Input · Select · Textarea 필드',
    desc: 'Button과 동일한 8px을 공유하여 같은 폼 라인에 나란히 배치될 때 완벽한 통일감을 유지합니다.',
    preview: (
      <div
        className="ds-field-control flex items-center px-2.5 h-8 text-[11px] text-secondary justify-center w-28"
        style={{ borderRadius: 'var(--guide-radius-input)' }}
      >
        Input Field (8px)
      </div>
    ),
  },
  {
    token: '--guide-radius-card',
    value: '10px',
    primitive: '--guide-radius-10',
    role: 'Surface & Card',
    targets: 'Bento 카드 · 패널 · 팝오버 메뉴',
    desc: '중간 크기 서피스 레이어. 내부의 8px 버튼을 감쌀 때 안정적인 여백과 곡률 대비를 만듭니다.',
    preview: (
      <div
        className="px-3 py-1.5 bg-surface-light border border-light shadow-xs text-[11px] font-semibold text-primary"
        style={{ borderRadius: 'var(--guide-radius-card)' }}
      >
        Card Panel (10px)
      </div>
    ),
  },
  {
    token: '--guide-radius-modal',
    value: '16px',
    primitive: '--guide-radius-16',
    role: 'Modal & Sheet',
    targets: '대화상자 · 모달 팝업 · 바텀시트',
    desc: '화면 상단에 플로팅되는 대형 레이어. 부드러운 곡률로 시각적 깊이감과 집중도를 높입니다.',
    preview: (
      <div
        className="px-3 py-1.5 bg-surface-raised border-2 border-olive shadow-xs text-[11px] font-bold text-olive"
        style={{ borderRadius: 'var(--guide-radius-modal)' }}
      >
        Modal (16px)
      </div>
    ),
  },
  {
    token: '--guide-radius-chip',
    value: 'Full',
    primitive: '--guide-radius-full',
    role: 'Filter Chip & Pill',
    targets: '선택형 필터 칩 · 캡슐 뱃지',
    desc: '양 끝이 반원 형태인 완전 둥근 알약형. 선택/해제 가능한 인터랙티브 칩에 최적입니다.',
    preview: (
      <span
        className="inline-flex items-center px-3 py-1 bg-surface-warm border border-strong text-[11px] font-medium text-primary"
        style={{ borderRadius: 'var(--guide-radius-chip)' }}
      >
        Filter Chip
      </span>
    ),
  },
  {
    token: '--guide-radius-avatar',
    value: 'Full',
    primitive: '--guide-radius-full',
    role: 'Avatar & Circle',
    targets: '사용자 프로필 아바타 · 원형 점',
    desc: '정사각형 요소를 완벽한 원형으로 만드는 곡률. 프로필 사진 및 상태 인디케이터 전용입니다.',
    preview: (
      <div
        className="w-8 h-8 bg-olive text-white flex items-center justify-center font-bold text-[11px] shadow-inner"
        style={{ borderRadius: 'var(--guide-radius-avatar)' }}
      >
        CD
      </div>
    ),
  },
];

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

const semanticColorGroups = [
  {
    category: 'Surface & Background (배경 및 서피스)',
    description: '화면의 기본 베이스와 카드 레이어, 모달, 상태 틴트 서피스',
    tokens: [
      { name: '--guide-bg-base', label: 'Base Background', role: '전체 화면 기본 배경' },
      { name: '--guide-bg-surface-light', label: 'Surface Light', role: '카드 및 패널 서피스' },
      { name: '--guide-bg-surface-warm', label: 'Surface Warm', role: '따뜻한 보조 서피스 (Cream)' },
      { name: '--guide-bg-main', label: 'Main Background', role: '중립 회색 서피스' },
      { name: '--guide-bg-promo', label: 'Promo Surface', role: '프로모션 버터 옐로우 서피스' },
      { name: '--guide-bg-disabled', label: 'Disabled Background', role: '비활성화 배경' },
      { name: '--guide-bg-success-tint', label: 'Success Tint', role: '성공 상태 소프트 배경' },
      { name: '--guide-bg-warning-tint', label: 'Warning Tint', role: '경고 상태 소프트 배경' },
      { name: '--guide-bg-error-tint', label: 'Error Tint', role: '오류 상태 소프트 배경' },
      { name: '--guide-bg-info-tint', label: 'Info Tint', role: '정보 상태 소프트 배경' },
    ],
  },
  {
    category: 'Text & Content (텍스트 위계)',
    description: '제목, 본문, 보조 문구 및 상태별 가독성을 위한 텍스트 색상',
    tokens: [
      { name: '--guide-text-primary', label: 'Primary Text', role: '주요 헤드라인 및 강조 텍스트' },
      { name: '--guide-text-body', label: 'Body Text', role: '본문 기본 텍스트' },
      { name: '--guide-text-secondary', label: 'Secondary Text', role: '보조 설명 및 부제 텍스트' },
      { name: '--guide-text-tertiary', label: 'Tertiary Text', role: '메타 정보 및 캡션' },
      { name: '--guide-text-muted', label: 'Muted Text', role: '플레이스홀더 및 흐린 텍스트' },
      { name: '--guide-text-disabled', label: 'Disabled Text', role: '비활성 안내 문구' },
      { name: '--guide-text-brand', label: 'Brand Text', role: '브랜드 올리브 강조 텍스트' },
      { name: '--guide-text-point', label: 'Point Text', role: '토마토 코랄 포인트 텍스트' },
      { name: '--guide-text-link', label: 'Link Text', role: '인라인 링크 텍스트' },
      { name: '--guide-text-on-solid', label: 'Text on Solid', role: '솔리드 버튼/뱃지 위 텍스트' },
      { name: '--guide-text-success', label: 'Success Text', role: '성공 상태 안내 텍스트' },
      { name: '--guide-text-error', label: 'Error Text', role: '오류 피드백 텍스트' },
    ],
  },
  {
    category: 'Line & Border (경계선 및 인터랙션 라인)',
    description: '구분선, 입력 컨트롤 테두리, 포커스 및 선택 상태 라인',
    tokens: [
      { name: '--guide-line-default', label: 'Default Line', role: '기본 폼 컨트롤 테두리' },
      { name: '--guide-line-light', label: 'Light Line', role: '은은한 디바이더 구분선' },
      { name: '--guide-line-strong', label: 'Strong Line', role: '강조 테두리 및 카드 호버선' },
      { name: '--guide-line-heading', label: 'Heading Line', role: '헤딩 하단 기준선' },
      { name: '--guide-line-focus', label: 'Focus Line', role: '포커스 링 (접근성 아웃라인)' },
      { name: '--guide-line-checked', label: 'Checked Line', role: '체크/라디오 선택 시 활성선' },
      { name: '--guide-line-accent', label: 'Accent Line', role: '프레시 올리브 포인트선' },
      { name: '--guide-line-point', label: 'Point Line', role: '토마토 코랄 포인트선' },
      { name: '--guide-line-error', label: 'Error Line', role: '오류 상태 테두리선' },
    ],
  },
  {
    category: 'Icon & Graphic (아이콘 및 그래픽)',
    description: '심볼 아이콘, 브랜드 로고 및 딤/오버레이 그래픽',
    tokens: [
      { name: '--guide-icon-strong-color', label: 'Icon Strong', role: '주요 액션 및 강조 아이콘' },
      { name: '--guide-icon-default-color', label: 'Icon Default', role: '기본 보조 아이콘' },
      { name: '--guide-icon-muted-color', label: 'Icon Muted', role: '흐린 부가 아이콘' },
      { name: '--guide-icon-point-color', label: 'Icon Point', role: '알림 및 경고 포인트 아이콘' },
      { name: '--guide-brand-logo', label: 'Brand Logo', role: '캐비닛 로고 라인 그래픽' },
      { name: '--guide-overlay-scrim', label: 'Overlay Scrim', role: '모달 딤 배경 스크림' },
    ],
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
                    color: 'var(--guide-text-brand)',
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
            각 카드의 <strong>원형 컬러 팔레트</strong>는 다크 모드 전환 시 실시간으로
            대응하는 다크 시맨틱 색상으로 즉시 반응합니다.
          </p>

          <div className="flex flex-col gap-8 my-6">
            {semanticColorGroups.map((group) => (
              <div key={group.category} className="space-y-3">
                <div>
                  <h3 className="text-sm font-bold text-primary m-0 mb-1">
                    {group.category}
                  </h3>
                  <p className="text-xs text-secondary m-0">
                    {group.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {group.tokens.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center gap-3 p-3 rounded-xl border border-light bg-surface-light hover:border-strong transition-all shadow-xs"
                    >
                      <span
                        aria-hidden="true"
                        className="w-8 h-8 rounded-full shrink-0 border border-black/15 dark:border-white/25 shadow-sm"
                        style={{ backgroundColor: `var(${item.name})` }}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-primary truncate">
                          {item.label}
                        </div>
                        <code className="text-[11px] text-secondary font-mono block truncate">
                          {item.name}
                        </code>
                        <div className="text-[10px] text-muted flex items-center justify-between mt-1">
                          <span className="truncate">{item.role}</span>
                          <TokenValue name={item.name} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-sm font-bold text-primary mt-8 mb-2">
            전체 시맨틱 토큰 매핑 명세
          </h3>
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
  if (slug === 'radius')
    return (
      <>
        <Section title="Overview">
          <p>
            Border Radius(모서리 곡률)는 서비스의 첫인상과 컴포넌트 형태(Shape)를
            결정합니다. Cabinet은 0px 직각부터 999px 풀 라운드까지 8단계 정밀
            스케일을 제공하며, 기본 컴포넌트에는 중립적이고 단단한{' '}
            <strong>6px ~ 10px</strong>을 사용합니다.
          </p>
          <div className="spacing-hero">
            <div>
              <span className="font-bold text-base text-primary">
                Balanced Shapes
              </span>
              <div>직각(0px)부터 풀 라운드(999px)까지의 형태 규칙</div>
              <small>Default: Button 8px · Card 10px · Badge 6px</small>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="w-8 h-8 border border-strong bg-surface-warm rounded-none"
                title="0px (직각)"
              />
              <span
                className="w-8 h-8 border border-strong bg-surface-warm rounded-md"
                title="8px (기본형)"
              />
              <span
                className="w-8 h-8 border border-strong bg-surface-warm rounded-full"
                title="Full (알약형)"
              />
            </div>
          </div>
        </Section>

        <Section title="Primitive scale">
          <p>
            물리적 픽셀 기준 8단계 곡률 스케일입니다. 모든 컴포넌트는 이 스케일 중
            하나를 상속받습니다.
          </p>

          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 my-4">
            {radiusPrimitives.map((item) => (
              <div
                key={item.token}
                className="p-2.5 rounded-lg border border-light bg-surface-light flex flex-col items-center text-center"
              >
                <div
                  className="w-10 h-10 bg-surface-warm border border-[var(--guide-color-olive)] flex items-center justify-center text-[11px] font-mono font-bold text-primary mb-2 shadow-xs"
                  style={{ borderRadius: `var(${item.token})` }}
                >
                  {item.value === '999px' ? 'Full' : item.value}
                </div>
                <code className="text-[11px] font-bold text-primary block truncate max-w-full">
                  {item.name.replace('radius-', '')}
                </code>
                <span className="text-[10px] text-muted">{item.value}</span>
              </div>
            ))}
          </div>

          <details className="token-catalog">
            <summary>Primitive 토큰 세부 스펙 보기</summary>
            <TokenCatalog
              names={primitiveNames.filter((name) =>
                name.startsWith('--guide-radius-'),
              )}
            />
          </details>
        </Section>

        <Section title="Semantic shapes">
          <p>
            역할(Role)에 맞춰 컴포넌트에 연결된 시맨틱 토큰입니다. 테마 변경 시 이
            토큰의 매핑만 수정하여 전체 룩앤필을 전환합니다.
          </p>

          <div className="my-4">
            <Table
              headings={['Token', '값', '역할', '적용 대상', '프리뷰']}
              rows={semanticRadiusItems.map((item) => [
                <div key="token" className="inline-flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="w-3.5 h-3.5 shrink-0 border border-[var(--guide-color-olive)] bg-surface-warm shadow-xs"
                    style={{ borderRadius: `var(${item.token})` }}
                  />
                  <code>{item.token}</code>
                </div>,
                <code key="val">{item.value}</code>,
                <span key="role" className="font-semibold text-primary text-xs">
                  {item.role}
                </span>,
                <span key="targets" className="text-secondary text-xs">
                  {item.targets}
                </span>,
                <div key="preview" className="flex items-center justify-center">
                  {item.preview}
                </div>,
              ])}
            />
          </div>
        </Section>

        <Section title="Nested radius">
          <p>
            컨테이너 안에 내부 요소가 패딩을 두고 중첩될 때, 모서리 곡률 중심이
            일치해야 매끄러운 동심원 곡선이 완성됩니다.
          </p>
          <div className="p-3 rounded-lg border border-light bg-surface-light my-3 font-mono text-xs text-center font-bold text-olive">
            공식: R(inner) = R(outer) - Padding
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
            <div className="rounded-xl border border-light bg-surface-light p-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-red-400 mb-2">
                <X size={15} />
                <span>Bad: 동일한 Radius 중첩</span>
              </div>
              <div
                className="bg-surface-main border border-light p-3 flex items-center justify-center"
                style={{ borderRadius: '16px' }}
              >
                <div
                  className="w-full py-2 bg-surface-light border border-dashed border-red-400 text-center text-[11px] font-mono font-medium text-secondary"
                  style={{ borderRadius: '16px' }}
                >
                  Outer 16px / Inner 16px (왜곡)
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-light bg-surface-light p-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-fresh-olive mb-2">
                <Check size={15} />
                <span>Good: 동심원 공식 적용</span>
              </div>
              <div
                className="bg-surface-main border border-light p-3 flex items-center justify-center"
                style={{ borderRadius: '16px' }}
              >
                <div
                  className="w-full py-2 bg-surface-light border border-fresh-olive text-center text-[11px] font-mono font-medium text-primary"
                  style={{ borderRadius: '4px' }}
                >
                  Outer 16px / Inner 4px (16 - 12 = 4px)
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section title="Token hierarchy">
          <p>
            전역 CSS에서 시맨틱 토큰을 오버라이드하여 전체 테마를 전환할 수 있습니다.
          </p>
          <Code>{`/* 캐주얼 둥근 테마 (Pill) */\n:root {\n  --guide-radius-button: var(--guide-radius-full);\n  --guide-radius-input: var(--guide-radius-full);\n  --guide-radius-card: var(--guide-radius-16);\n}\n\n/* 엔터프라이즈 직각 테마 (Sharp) */\n:root {\n  --guide-radius-button: var(--guide-radius-0);\n  --guide-radius-input: var(--guide-radius-0);\n  --guide-radius-card: var(--guide-radius-0);\n}`}</Code>
        </Section>

        <Section title="Guidelines">
          <ul>
            <li>
              컴포넌트 개발 시 하드코딩된 px 대신 항상{' '}
              <code>--guide-radius-*</code> 시맨틱 토큰을 사용합니다.
            </li>
            <li>
              컨테이너 내부 요소는 Nested Radius 공식(
              <code>R_inner = R_outer - Padding</code>)을 적용해 모서리 왜곡을
              방지합니다.
            </li>
            <li>
              체크박스(사각형)와 라디오(원형)는 다중/단일 선택을 구분하는 고유
              형태이므로 radius를 임의로 변경하지 않습니다.
            </li>
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
