'use client';

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
              label="1. Label & 2. Trigger Container"
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

      <Section title="Variants">
        <p>
          단순 텍스트 옵션부터 메타데이터가 포함된 풍부한 옵션, 검색 필터링 및
          다중 선택(태그·요약)까지 용도에 맞는 변형을 제공합니다.
        </p>
        <Table
          headings={['Variant', '미리보기 (Preview)', '특징 및 권장 적용 맥락']}
          rows={[
            [
              <span key="v-basic" className="font-semibold text-primary">
                기본 단일 선택
              </span>,
              <div key="p-basic" className="w-full max-w-[240px]">
                <Select
                  options={basicOptions}
                  defaultValue="ko"
                  placeholder="언어 선택"
                />
              </div>,
              '접두사 아이콘이나 부가 설명 없이 순수 텍스트로 구성된 가장 표준적인 단일 선택',
            ],
            [
              <span key="v-rich" className="font-semibold text-primary">
                메타데이터 확장
              </span>,
              <div key="p-rich" className="w-full max-w-[240px]">
                <Select
                  options={paymentItems}
                  defaultValue="card"
                  clearable
                  placeholder="결제 수단"
                />
              </div>,
              '접두사 아이콘(prefixIcon)과 보조 설명(description)을 함께 노출해 선택 맥락 강화',
            ],
            [
              <span key="v-search" className="font-semibold text-primary">
                실시간 검색
              </span>,
              <div key="p-search" className="w-full max-w-[240px]">
                <Select
                  options={demoGroupedItems}
                  defaultValue="tokyo"
                  searchable
                  clearable
                  placeholder="도시 검색"
                  searchPlaceholder="도시명 검색..."
                />
              </div>,
              '선택지가 많은 경우(10개 이상) 드롭다운 상단 검색창으로 실시간 필터링 제공',
            ],
            [
              <span key="v-tags" className="font-semibold text-primary">
                다중 선택 (Tags)
              </span>,
              <div key="p-tags" className="w-full max-w-[280px]">
                <Select
                  options={demoGroupedItems}
                  multiple
                  displayMode="tags"
                  defaultValue={['seoul', 'busan']}
                  clearable
                  placeholder="여행지 선택"
                />
              </div>,
              '복수 항목을 개별 태그 칩으로 나열하고 각 칩의 X 버튼으로 즉시 제거 가능',
            ],
            [
              <span key="v-summary" className="font-semibold text-primary">
                다중 선택 (Summary)
              </span>,
              <div key="p-summary" className="w-full max-w-[240px]">
                <Select
                  options={demoGroupedItems}
                  multiple
                  displayMode="summary"
                  defaultValue={['seoul', 'busan', 'jeju']}
                  clearable
                  placeholder="여행지 선택"
                />
              </div>,
              '"서울 외 2개"처럼 간결한 요약형 텍스트로 표시하여 좁은 화면이나 모바일에 최적화',
            ],
          ]}
        />
      </Section>

      <Section title="Sizes">
        <p>
          주변 입력 필드 및 버튼과의 조화를 위해 3가지 표준 크기를 제공합니다.
          기본값은 <code>md</code>(40px)입니다.
        </p>
        <Table
          headings={['Size', '높이 (Height)', '미리보기 (Preview)', '권장 적용 맥락']}
          rows={[
            [
              <code key="s-sm" className="font-bold text-primary">
                sm
              </code>,
              '32px',
              <div key="p-sm" className="w-full max-w-[220px]">
                <Select
                  size="sm"
                  options={basicOptions}
                  defaultValue="ko"
                />
              </div>,
              '밀도 높은 데이터 테이블 내부 필터, 좁은 사이드바 패널 제어',
            ],
            [
              <code key="s-md" className="font-bold text-primary">
                md
              </code>,
              '40px (기본값)',
              <div key="p-md" className="w-full max-w-[220px]">
                <Select
                  size="md"
                  options={basicOptions}
                  defaultValue="ko"
                />
              </div>,
              '대부분의 표준 폼 양식, 설정 다이얼로그 및 기본 입력 뷰',
            ],
            [
              <code key="s-lg" className="font-bold text-primary">
                lg
              </code>,
              '48px',
              <div key="p-lg" className="w-full max-w-[220px]">
                <Select
                  size="lg"
                  options={basicOptions}
                  defaultValue="ko"
                />
              </div>,
              '히어로 검색 폼, 터치 조작 편의성이 최우선인 모바일 인터페이스',
            ],
          ]}
        />
      </Section>

      <Section title="States">
        <p>
          상호작용 및 폼 유효성 검증 상태를 시각적 테두리와 색상으로 명확히
          구분합니다.
        </p>
        <Table
          headings={['상태 (State)', '미리보기 (Preview)', '동작 및 가이드']}
          rows={[
            [
              <span key="st-def" className="font-semibold text-primary">
                Default
              </span>,
              <div key="p-def" className="w-full max-w-[220px]">
                <Select
                  options={basicOptions}
                  defaultValue="ko"
                />
              </div>,
              '사용자의 선택을 기다리는 기본 활성 인터랙션 상태',
            ],
            [
              <span key="st-err" className="font-semibold text-primary">
                Error
              </span>,
              <div key="p-err" className="w-full max-w-[220px]">
                <Select
                  options={basicOptions}
                  value=""
                  aria-invalid
                  placeholder="필수 선택 항목입니다"
                />
              </div>,
              '유효성 검증 실패 시 강조 테두리(Red)와 aria-invalid 적용',
            ],
            [
              <span key="st-ro" className="font-semibold text-primary">
                ReadOnly
              </span>,
              <div key="p-ro" className="w-full max-w-[220px]">
                <Select
                  options={basicOptions}
                  defaultValue="ko"
                  readOnly
                />
              </div>,
              '선택값 열람은 허용되나 드롭다운 열림 및 값 수정은 차단 (폼 전송 포함)',
            ],
            [
              <span key="st-dis" className="font-semibold text-primary">
                Disabled
              </span>,
              <div key="p-dis" className="w-full max-w-[220px]">
                <Select
                  options={basicOptions}
                  defaultValue="ko"
                  disabled
                />
              </div>,
              '조작 및 폼 전송에서 완전히 제외되는 비활성화 상태',
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
              활성화하여 빠른 탐색을 지원합니다.
            </p>
            <p>
              옵션 간 성격이 다를 때는 <code>group</code> 프로퍼티로
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

      <Section title="API">
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
