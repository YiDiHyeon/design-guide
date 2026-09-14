'use client';

import { useState } from 'react';
import {
  Select,
  Field,
  type SelectItem,
} from '@/components/ui';
import { SelectPlayground } from '@/components/playgrounds/select-playground';
import { Section, Table, Code } from '@/components/site/doc-parts';
import {
  MapPin,
  Plane,
  Landmark,
  TreePine,
  Building2,
  Check,
  X,
  CreditCard,
  Building,
  Sparkles,
} from 'lucide-react';

const demoGroupedItems: SelectItem[] = [
  {
    value: 'seoul',
    label: '서울',
    description: '대한민국의 수도이자 문화 중심지',
    prefixIcon: <Landmark size={15} />,
    group: '국내 여행지',
  },
  {
    value: 'busan',
    label: '부산',
    description: '해양 관광 및 미식의 도시',
    prefixIcon: <MapPin size={15} />,
    group: '국내 여행지',
  },
  {
    value: 'jeju',
    label: '제주도',
    description: '유네스코 세계자연유산 휴양지',
    prefixIcon: <TreePine size={15} />,
    group: '국내 여행지',
  },
  {
    value: 'tokyo',
    label: '도쿄',
    description: '일본의 트렌드 및 문화 중심',
    prefixIcon: <Building2 size={15} />,
    group: '해외 여행지',
  },
  {
    value: 'paris',
    label: '파리',
    description: '에펠탑과 낭만의 예술 도시',
    prefixIcon: <Plane size={15} />,
    group: '해외 여행지',
  },
];

const paymentItems: SelectItem[] = [
  {
    value: 'card',
    label: '신용/체크카드',
    description: '모든 카드사 무이자 할부 지원',
    prefixIcon: <CreditCard size={15} />,
  },
  {
    value: 'transfer',
    label: '실시간 계좌이체',
    description: '수수료 없는 즉시 출금 이체',
    prefixIcon: <Building size={15} />,
  },
  {
    value: 'simple',
    label: '간편 결제 (네이버/카카오)',
    description: '1초 원클릭 포인트 적립 결제',
    prefixIcon: <Sparkles size={15} />,
  },
];

const basicOptions: SelectItem[] = [
  { value: 'ko', label: '한국어 (Korean)' },
  { value: 'en', label: '영어 (English)' },
  { value: 'ja', label: '일본어 (Japanese)' },
  { value: 'zh', label: '중국어 (Chinese)' },
  { value: 'es', label: '스페인어 (Spanish)' },
];

export function SelectDoc() {
  const [language, setLanguage] = useState('ko');
  const [city, setCity] = useState('seoul');
  const [searchCity, setSearchCity] = useState('tokyo');
  const [multiTags, setMultiTags] = useState<string[]>(['seoul', 'busan']);
  const [multiSummary, setMultiSummary] = useState<string[]>([
    'seoul',
    'busan',
    'jeju',
  ]);
  const [payment, setPayment] = useState('card');

  return (
    <>
      <Section title="Overview">
        <p>
          Select는 여러 개의 선택지 중 하나 또는 여러 개의 옵션을 선택할 수 있는
          풍부한 드롭다운 컨트롤입니다. Seed Design 표준을 준수하여 아이템별
          보조 설명, 접두사 아이콘, 실시간 검색, 다중 선택 태그/요약 모드, 그룹
          구분자를 모두 지원합니다.
        </p>
        <SelectPlayground />
        <div className="callout">
          <p>
            WAI-ARIA <code>role=&quot;combobox&quot;</code> 및{' '}
            <code>role=&quot;listbox&quot;</code> 표준을 준수합니다. 키보드
            화살표 키(↑, ↓)로 탐색하고, Enter/Space 키로 선택하며, Esc 키로
            드롭다운을 즉시 닫을 수 있습니다. 또한 SSR 환경 및 표준 폼 전송과의
            100% 호환성을 보장합니다.
          </p>
        </div>
      </Section>

      <Section title="Anatomy">
        <div className="anatomy-panel">
          <div className="w-full max-w-sm p-4 flex flex-col gap-4">
            <Field
              label="1. Label & 2. Field Container"
              description="7. 도움말 / 에러 메시지 영역"
            >
              <Select
                options={demoGroupedItems}
                value="seoul"
                prefixIcon={<MapPin size={15} />}
                clearable={true}
                placeholder="목적지를 선택하세요"
              />
            </Field>
          </div>
        </div>
        <Table
          headings={['번호', '구성 요소', '역할']}
          rows={[
            [
              '1',
              'Label',
              '필드 레이블. htmlId와 aria-labelledby로 연결되는 폼 컨트롤 제목',
            ],
            [
              '2',
              'Trigger Container',
              '현재 선택된 값이나 placeholder를 보여주고 클릭/엔터 시 드롭다운을 토글하는 외곽 영역',
            ],
            [
              '3',
              'Prefix Icon',
              '트리거 또는 개별 아이템 좌측에 위치하는 문맥 아이콘',
            ],
            [
              '4',
              'Value / Tags / Summary',
              '단일 선택된 텍스트, 다중 선택된 개별 제거 가능 태그 칩, 또는 요약 문구',
            ],
            [
              '5',
              'Clear Button & Chevron',
              '값 초기화 X 버튼 및 열림 상태에 따라 180도 회전하는 화살표 인디케이터',
            ],
            [
              '6',
              'Dropdown Popover',
              '실시간 검색창, 카테고리 헤더, 아이템 목록 및 체크 인디케이터를 포함하는 팝오버',
            ],
            [
              '7',
              'Helper / Error Message',
              'aria-describedby와 연동되는 가이드라인 또는 유효성 검사 안내',
            ],
          ]}
        />
      </Section>

      <Section title="Features & Variations">
        <div className="flex flex-col gap-6">
          {/* Feature 1: Basic Text Only (No Icons) */}
          <div className="feature-card">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
              <h3 className="text-base font-bold text-[var(--guide-text-primary)] flex items-center gap-2.5">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[var(--guide-bg-main)] text-xs font-bold text-[var(--guide-text-brand)] border border-[var(--guide-line-light)]">
                  1
                </span>
                기본 형태 (Basic / Text Only)
              </h3>
              <span className="feature-badge">Text Only</span>
            </div>
            <p className="text-sm text-[var(--guide-text-secondary)] leading-relaxed mb-0">
              접두사 아이콘이나 부가 설명 없이 순수 텍스트 레이블만으로 구성된 가장 기본적이고 심플한 드롭다운 형태입니다. 일반적인 폼 입력 양식이나 설정 화면에서 직관적으로 사용할 수 있습니다.
            </p>
            <div className="feature-demo-stage">
              <div className="feature-demo-stage-header">
                <span className="feature-demo-stage-badge">Interactive Demo</span>
                <span className="font-mono text-xs">
                  선택된 값:{' '}
                  <strong className="text-[var(--guide-text-brand)] font-semibold">
                    {language} ({basicOptions.find((o) => o.value === language)?.label || language})
                  </strong>
                </span>
              </div>
              <div className="w-full max-w-sm">
                <Select
                  options={basicOptions}
                  value={language}
                  placeholder="언어를 선택하세요"
                  onValueChange={(v) => setLanguage(v as string)}
                />
              </div>
            </div>
          </div>

          {/* Feature 2: Single with description & icon */}
          <div className="feature-card">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
              <h3 className="text-base font-bold text-[var(--guide-text-primary)] flex items-center gap-2.5">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[var(--guide-bg-main)] text-xs font-bold text-[var(--guide-text-brand)] border border-[var(--guide-line-light)]">
                  2
                </span>
                풍부한 아이템 표현 (아이콘 + 보조 설명)
              </h3>
              <span className="feature-badge">Rich Meta</span>
            </div>
            <p className="text-sm text-[var(--guide-text-secondary)] leading-relaxed mb-0">
              단순한 텍스트뿐만 아니라 접두사 아이콘(<code>prefixIcon</code>)과 보조 설명(<code>description</code>)을
              배치하여 사용자가 선택의 맥락과 특징을 직관적으로 파악할 수 있도록 돕습니다.
            </p>
            <div className="feature-demo-stage">
              <div className="feature-demo-stage-header">
                <span className="feature-demo-stage-badge">Interactive Demo</span>
                <span className="font-mono text-xs">
                  선택된 값:{' '}
                  <strong className="text-[var(--guide-text-brand)] font-semibold">
                    {paymentItems.find((p) => p.value === payment)?.label || '(선택 안 됨)'}
                  </strong>
                </span>
              </div>
              <div className="w-full max-w-sm">
                <Select
                  options={paymentItems}
                  value={payment}
                  clearable={true}
                  placeholder="결제 수단을 선택해 주세요"
                  onValueChange={(v) => setPayment(v as string)}
                />
              </div>
            </div>
          </div>

          {/* Feature 3: Searchable Dropdown */}
          <div className="feature-card">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
              <h3 className="text-base font-bold text-[var(--guide-text-primary)] flex items-center gap-2.5">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[var(--guide-bg-main)] text-xs font-bold text-[var(--guide-text-brand)] border border-[var(--guide-line-light)]">
                  3
                </span>
                실시간 검색 필터링 (Searchable)
              </h3>
              <span className="feature-badge">Live Filter</span>
            </div>
            <p className="text-sm text-[var(--guide-text-secondary)] leading-relaxed mb-0">
              <code>searchable=&#123;true&#125;</code>를 지정하면 드롭다운 내에 검색창이 활성화되며,
              타이핑 즉시 레이블 및 보조 설명 텍스트를 실시간으로 필터링합니다. 옵션이 많은 경우 매우 효과적입니다.
            </p>
            <div className="feature-demo-stage">
              <div className="feature-demo-stage-header">
                <span className="feature-demo-stage-badge">Interactive Demo</span>
                <span className="font-mono text-xs">
                  선택된 값:{' '}
                  <strong className="text-[var(--guide-text-brand)] font-semibold">
                    {demoGroupedItems.find((d) => d.value === searchCity)?.label || searchCity || '(선택 안 됨)'}
                  </strong>
                </span>
              </div>
              <div className="w-full max-w-sm">
                <Select
                  options={demoGroupedItems}
                  value={searchCity}
                  onValueChange={(v) => setSearchCity(v as string)}
                  searchable={true}
                  clearable={true}
                  searchPlaceholder="도시 이름 또는 설명 검색..."
                  placeholder="검색하여 도시 찾기"
                />
              </div>
            </div>
          </div>

          {/* Feature 4: Multi-select with Tags */}
          <div className="feature-card">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
              <h3 className="text-base font-bold text-[var(--guide-text-primary)] flex items-center gap-2.5">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[var(--guide-bg-main)] text-xs font-bold text-[var(--guide-text-brand)] border border-[var(--guide-line-light)]">
                  4
                </span>
                다중 선택 - 태그 모드 (Tags Mode)
              </h3>
              <span className="feature-badge">Multiple · Tags</span>
            </div>
            <p className="text-sm text-[var(--guide-text-secondary)] leading-relaxed mb-0">
              <code>multiple=&#123;true&#125;</code> 및 <code>displayMode=&quot;tags&quot;</code> 설정 시
              선택된 항목들이 개별 태그 칩으로 나열되며, 개별 X 버튼을 클릭하여 트리거 내에서 즉시 제거할 수 있습니다.
            </p>
            <div className="feature-demo-stage">
              <div className="feature-demo-stage-header">
                <span className="feature-demo-stage-badge">Interactive Demo</span>
                <span className="font-mono text-xs">
                  선택된 항목 ({multiTags.length}개):{' '}
                  <strong className="text-[var(--guide-text-brand)] font-semibold">
                    {multiTags.length > 0 ? multiTags.join(', ') : '(선택 안 됨)'}
                  </strong>
                </span>
              </div>
              <div className="w-full max-w-md">
                <Select
                  options={demoGroupedItems}
                  multiple={true}
                  displayMode="tags"
                  value={multiTags}
                  clearable={true}
                  placeholder="여행지를 다중 선택하세요"
                  onValueChange={(v) => setMultiTags(v as string[])}
                />
              </div>
            </div>
          </div>

          {/* Feature 5: Multi-select with Summary */}
          <div className="feature-card">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
              <h3 className="text-base font-bold text-[var(--guide-text-primary)] flex items-center gap-2.5">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[var(--guide-bg-main)] text-xs font-bold text-[var(--guide-text-brand)] border border-[var(--guide-line-light)]">
                  5
                </span>
                다중 선택 - 요약 모드 (Summary Mode)
              </h3>
              <span className="feature-badge">Multiple · Summary</span>
            </div>
            <p className="text-sm text-[var(--guide-text-secondary)] leading-relaxed mb-0">
              <code>displayMode=&quot;summary&quot;</code> 설정 시{' '}
              <strong>&ldquo;서울 외 2개&rdquo;</strong>와 같이 간결한 요약형 텍스트로 표시되어
              모바일이나 좁은 레이아웃에서 공간 효율성을 극대화합니다.
            </p>
            <div className="feature-demo-stage">
              <div className="feature-demo-stage-header">
                <span className="feature-demo-stage-badge">Interactive Demo</span>
                <span className="font-mono text-xs">
                  선택된 항목 ({multiSummary.length}개):{' '}
                  <strong className="text-[var(--guide-text-brand)] font-semibold">
                    {multiSummary.length > 0 ? multiSummary.join(', ') : '(선택 안 됨)'}
                  </strong>
                </span>
              </div>
              <div className="w-full max-w-sm">
                <Select
                  options={demoGroupedItems}
                  multiple={true}
                  displayMode="summary"
                  value={multiSummary}
                  clearable={true}
                  placeholder="여행지 선택"
                  onValueChange={(v) => setMultiSummary(v as string[])}
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Sizes">
        <p>
          주변 입력 필드 및 버튼과의 조화를 위해 3가지 표준 크기를 제공합니다.
          기본값은 <code>md</code>(40px)입니다.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <div className="token-card p-4 flex flex-col gap-3">
            <div className="flex justify-between items-center text-xs font-semibold text-[var(--guide-text-secondary)]">
              <span className="text-[var(--guide-text-primary)]">sm (32px)</span>
              <span>밀도 높은 테이블/필터</span>
            </div>
            <Select
              size="sm"
              options={demoGroupedItems}
              value={city}
              onValueChange={(v) => setCity(v as string)}
            />
          </div>

          <div className="token-card p-4 flex flex-col gap-3">
            <div className="flex justify-between items-center text-xs font-semibold text-[var(--guide-text-secondary)]">
              <span className="text-[var(--guide-text-primary)]">md (40px) - Default</span>
              <span>일반 폼 양식</span>
            </div>
            <Select
              size="md"
              options={demoGroupedItems}
              value={city}
              onValueChange={(v) => setCity(v as string)}
            />
          </div>

          <div className="token-card p-4 flex flex-col gap-3">
            <div className="flex justify-between items-center text-xs font-semibold text-[var(--guide-text-secondary)]">
              <span className="text-[var(--guide-text-primary)]">lg (48px)</span>
              <span>히어로/모바일 최적화</span>
            </div>
            <Select
              size="lg"
              options={demoGroupedItems}
              value={city}
              onValueChange={(v) => setCity(v as string)}
            />
          </div>
        </div>
      </Section>

      <Section title="States">
        <p>
          Select는 상황에 따라 5가지 인터랙션 상태(Default, Focus, Error,
          ReadOnly, Disabled)를 명확하게 전달합니다.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="token-card p-4">
            <span className="text-xs font-bold text-[var(--guide-text-secondary)] block mb-2">
              Default State
            </span>
            <Select
              options={demoGroupedItems}
              value="seoul"
              placeholder="도시 선택"
            />
          </div>

          <div className="token-card p-4">
            <span className="text-xs font-bold text-[var(--guide-text-error)] block mb-2">
              Error State (aria-invalid=&quot;true&quot;)
            </span>
            <Select
              options={demoGroupedItems}
              value=""
              aria-invalid={true}
              placeholder="필수 선택 항목입니다"
            />
          </div>

          <div className="token-card p-4">
            <span className="text-xs font-bold text-[var(--guide-text-secondary)] block mb-2">
              Disabled State
            </span>
            <Select
              options={demoGroupedItems}
              value="seoul"
              disabled={true}
              placeholder="도시 선택 불가"
            />
          </div>

          <div className="token-card p-4">
            <span className="text-xs font-bold text-[var(--guide-text-secondary)] block mb-2">
              ReadOnly State
            </span>
            <Select
              options={demoGroupedItems}
              value="seoul"
              readOnly={true}
              placeholder="읽기 전용"
            />
          </div>
        </div>
      </Section>

      <Section title="Props Specification">
        <Table
          headings={['Prop', 'Type', 'Default', 'Description']}
          rows={[
            [
              'options',
              'SelectItem[]',
              '필수',
              'value, label, description, prefixIcon, disabled, group을 포함하는 옵션 배열',
            ],
            [
              'value',
              'string | string[]',
              'undefined',
              '현재 선택된 값 (단일: 문자열, 다중: 문자열 배열)',
            ],
            [
              'defaultValue',
              'string | string[]',
              'undefined',
              '초기 기본 선택 값',
            ],
            [
              'placeholder',
              'string',
              'undefined',
              '선택된 값이 없을 때 표시할 안내 문구',
            ],
            [
              'multiple',
              'boolean',
              'false',
              '다중 선택 모드 활성화 여부',
            ],
            [
              'displayMode',
              "'tags' | 'summary'",
              "'tags'",
              '다중 선택 시 트리거 내 표시 방식 (개별 칩 vs 요약 텍스트)',
            ],
            [
              'searchable',
              'boolean',
              'false',
              '드롭다운 상단에 실시간 필터 검색창 노출 여부',
            ],
            [
              'clearable',
              'boolean',
              'false',
              '선택된 값을 한 번에 지울 수 있는 X 버튼 표시 여부',
            ],
            [
              'size',
              "'sm' | 'md' | 'lg'",
              "'md'",
              '컨트롤의 높이 및 패딩 크기',
            ],
            [
              'prefixIcon',
              'ReactNode',
              'undefined',
              '트리거 좌측에 표시할 공통 접두사 아이콘',
            ],
            [
              'onValueChange',
              '(val: string | string[]) => void',
              'undefined',
              '선택 값 변경 시 트리거되는 직관적인 값 변경 콜백',
            ],
            [
              'onChange',
              '(e: any) => void',
              'undefined',
              '기존 리액트 이벤트 핸들러와의 완벽한 하위 호환성을 제공하는 콜백',
            ],
          ]}
        />
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
              옵션이 5개 이상이거나 화면 공간을 절약해야 할 때 Select를
              사용합니다.
            </p>
            <p>
              목록이 10개 이상으로 길어지면 <code>searchable</code>을
              활성화하여 사용자의 빠른 탐색을 지원합니다.
            </p>
            <p>
              옵션 간 성격이 다를 때는 <code>group</code> 프로퍼티를 지정하여
              논리적으로 분류합니다.
            </p>
            <p>
              다중 선택 시 모바일 환경이나 좁은 공간에서는{' '}
              <code>summary</code> 모드를 활용합니다.
            </p>
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
              선택지가 2~3개 이하로 적고 즉시 비교가 필요할 때는 Select 대신{' '}
              <strong>Radio</strong> 또는 <strong>Switch</strong>를 고려하세요.
            </p>
            <p>
              placeholder만으로 Label을 대신하지 않습니다. 항상 명확한 레이블을
              제공합니다.
            </p>
            <p>
              선택 가능한 옵션이 없을 때 빈 드롭다운만 방치하지 않고 적절한 안내
              문구를 표시합니다.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Code Example">
        <Code>{`import { useState } from 'react';
import { Field, Select, type SelectItem } from '@/components/ui';
import { Landmark, MapPin, TreePine } from 'lucide-react';

const destinations: SelectItem[] = [
  { value: 'seoul', label: '서울', description: '수도 및 문화 중심', prefixIcon: <Landmark /> },
  { value: 'busan', label: '부산', description: '해양 관광 도시', prefixIcon: <MapPin /> },
  { value: 'jeju', label: '제주도', description: '힐링 자연 휴양지', prefixIcon: <TreePine /> },
];

export function BookingForm() {
  const [selectedCities, setSelectedCities] = useState<string[]>(['seoul']);

  return (
    <Field
      label="희망 여행지"
      description="방문하고 싶은 도시를 선택하세요."
      required
    >
      <Select
        multiple={true}
        displayMode="tags"
        searchable={true}
        clearable={true}
        options={destinations}
        value={selectedCities}
        onValueChange={(val) => setSelectedCities(val as string[])}
        placeholder="도시를 선택하세요"
      />
    </Field>
  );
}`}</Code>
      </Section>
    </>
  );
}
