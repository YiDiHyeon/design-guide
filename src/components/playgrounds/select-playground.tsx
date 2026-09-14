'use client';

import { useState } from 'react';
import {
  Select,
  type SelectItem,
  Field,
} from '@/components/ui';
import { type ControlSize } from '@/lib/control';
import { Code } from '@/components/site/doc-parts';
import {
  MapPin,
  Plane,
  Landmark,
  Compass,
  TreePine,
  Building2,
  AlertCircle,
} from 'lucide-react';

const sizeOptions = [
  { value: 'sm', label: 'sm (32px)' },
  { value: 'md', label: 'md (40px)' },
  { value: 'lg', label: 'lg (48px)' },
] as const;

const modeOptions = [
  { value: 'single', label: '단일 선택 (Single)' },
  { value: 'multi-tags', label: '다중 선택 (Tags 모드)' },
  { value: 'multi-summary', label: '다중 선택 (Summary 모드)' },
] as const;

const stateOptions = [
  { value: 'default', label: 'default' },
  { value: 'error', label: 'error' },
  { value: 'readonly', label: 'readonly' },
  { value: 'disabled', label: 'disabled' },
] as const;

const groupingOptions = [
  { value: 'grouped', label: '그룹 분류 (Grouped)' },
  { value: 'flat', label: '일반 목록 (Flat)' },
] as const;

const sampleItems: SelectItem[] = [
  {
    value: 'seoul',
    label: '서울',
    description: '대한민국의 수도이자 문화·미식의 중심지',
    prefixIcon: <Landmark size={15} />,
    group: '국내 여행지',
  },
  {
    value: 'busan',
    label: '부산',
    description: '해운대와 자갈치 시장이 있는 대표 해양 도시',
    prefixIcon: <MapPin size={15} />,
    group: '국내 여행지',
  },
  {
    value: 'jeju',
    label: '제주도',
    description: '에메랄드빛 바다와 한라산을 품은 힐링 여행지',
    prefixIcon: <TreePine size={15} />,
    group: '국내 여행지',
  },
  {
    value: 'tokyo',
    label: '도쿄',
    description: '첨단 기술과 전통 골목이 공존하는 메트로폴리스',
    prefixIcon: <Building2 size={15} />,
    group: '해외 여행지',
  },
  {
    value: 'paris',
    label: '파리',
    description: '에펠탑과 센강, 낭만이 흐르는 예술의 수도',
    prefixIcon: <Plane size={15} />,
    group: '해외 여행지',
  },
  {
    value: 'newyork',
    label: '뉴욕',
    description: '맨해튼 스카이라인과 브로드웨이의 활기',
    prefixIcon: <Compass size={15} />,
    group: '해외 여행지',
  },
  {
    value: 'antarctica',
    label: '남극 연구기지',
    description: '현재 민간 관광 승인이 중단된 상태입니다',
    prefixIcon: <AlertCircle size={15} />,
    disabled: true,
    group: '기타 지역',
  },
];

export function SelectPlayground() {
  const [size, setSize] = useState<ControlSize>('md');
  const [mode, setMode] = useState<string>('single');
  const [stateOption, setStateOption] = useState<string>('default');
  const [grouping, setGrouping] = useState<string>('grouped');
  const [searchable, setSearchable] = useState<boolean>(true);
  const [clearable, setClearable] = useState<boolean>(true);

  // Values
  const [singleValue, setSingleValue] = useState<string>('seoul');
  const [multiValue, setMultiValue] = useState<string[]>(['seoul', 'jeju']);

  const isMultiple = mode.startsWith('multi');
  const displayMode = mode === 'multi-summary' ? 'summary' : 'tags';
  const isDisabled = stateOption === 'disabled';
  const isReadOnly = stateOption === 'readonly';
  const isError = stateOption === 'error';

  // Active options
  const activeOptions = sampleItems.map((item) =>
    grouping === 'flat' ? { ...item, group: undefined } : item,
  );

  const selectedDisplay = isMultiple
    ? multiValue.length > 0
      ? `[${multiValue.map((v) => `"${v}"`).join(', ')}] (${multiValue.length}개 선택됨)`
      : '선택 없음 (빈 배열)'
    : singleValue
      ? `"${singleValue}"`
      : '선택 없음 (빈 문자열)';

  const codeSnippet = `<Select
  size="${size}"${isMultiple ? '\n  multiple={true}' : ''}${isMultiple && displayMode === 'summary' ? '\n  displayMode="summary"' : ''}${searchable ? '\n  searchable={true}' : ''}${clearable ? '\n  clearable={true}' : ''}${isError ? '\n  aria-invalid="true"' : ''}${isDisabled ? '\n  disabled={true}' : ''}${isReadOnly ? '\n  readOnly={true}' : ''}
  placeholder="여행지를 선택하세요"
  value={${isMultiple ? 'selectedValues' : 'selectedValue'}}
  onValueChange={(val) => set${isMultiple ? 'SelectedValues' : 'SelectedValue'}(val)}
  options={[
    { value: 'seoul', label: '서울', description: '수도이자 문화 중심지', prefixIcon: <Landmark /> },
    { value: 'busan', label: '부산', description: '대표 해양 도시', prefixIcon: <MapPin /> },
    ...
  ]}
/>`;

  return (
    <>
      <div className="playground">
        <div className="preview-label">
          <span>LIVE PREVIEW</span>
          <span>마우스 클릭 또는 키보드(방향키, Enter, Esc)로 조작 가능</span>
        </div>

        <div className="preview-stage min-h-[260px] flex items-center justify-center p-6">
          <div className="w-full max-w-sm">
            <Field
              label={isMultiple ? '희망 여행지 (다중 선택)' : '목적지 선택'}
              description={
                isError
                  ? undefined
                  : isMultiple
                    ? '가고 싶은 여행지를 여러 곳 선택해 보세요.'
                    : '가장 먼저 방문할 도시 한 곳을 선택해 주세요.'
              }
              errorMessage={isError ? '필수 선택 항목입니다.' : undefined}
              size={size}
              invalid={isError}
              disabled={isDisabled}
              readOnly={isReadOnly}
            >
              <Select
                size={size}
                options={activeOptions}
                multiple={isMultiple}
                displayMode={displayMode}
                searchable={searchable}
                clearable={clearable}
                disabled={isDisabled}
                readOnly={isReadOnly}
                aria-invalid={isError}
                placeholder="여행지를 선택하세요"
                value={isMultiple ? multiValue : singleValue}
                onValueChange={(val) => {
                  if (isMultiple && Array.isArray(val)) {
                    setMultiValue(val);
                  } else if (typeof val === 'string') {
                    setSingleValue(val);
                  }
                }}
              />
            </Field>

            <div className="mt-4 p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-xs flex items-center justify-between">
              <span className="text-neutral-500 font-medium">선택된 상태값</span>
              <code className="text-olive dark:text-lime-400 font-mono font-bold">
                {selectedDisplay}
              </code>
            </div>
          </div>
        </div>

        <div className="playground-controls">
          <div className="control-group">
            <label htmlFor="select-mode">선택 방식</label>
            <Select
              id="select-mode"
              size="sm"
              options={modeOptions}
              value={mode}
              onChange={(e) => setMode(e.target.value)}
            />
          </div>

          <div className="control-group">
            <label htmlFor="select-size">크기 (Size)</label>
            <Select
              id="select-size"
              size="sm"
              options={sizeOptions}
              value={size}
              onChange={(e) => setSize(e.target.value as ControlSize)}
            />
          </div>

          <div className="control-group">
            <label htmlFor="select-state">상태 (State)</label>
            <Select
              id="select-state"
              size="sm"
              options={stateOptions}
              value={stateOption}
              onChange={(e) => setStateOption(e.target.value)}
            />
          </div>

          <div className="control-group">
            <label htmlFor="select-grouping">그룹 분류</label>
            <Select
              id="select-grouping"
              size="sm"
              options={groupingOptions}
              value={grouping}
              onChange={(e) => setGrouping(e.target.value)}
            />
          </div>

          <div className="control-group">
            <label htmlFor="select-searchable">실시간 검색</label>
            <Select
              id="select-searchable"
              size="sm"
              options={[
                { value: 'true', label: '검색 활성화 (searchable)' },
                { value: 'false', label: '검색 끄기' },
              ]}
              value={searchable ? 'true' : 'false'}
              onChange={(e) => setSearchable(e.target.value === 'true')}
            />
          </div>

          <div className="control-group">
            <label htmlFor="select-clearable">초기화 버튼</label>
            <Select
              id="select-clearable"
              size="sm"
              options={[
                { value: 'true', label: '표시 (clearable)' },
                { value: 'false', label: '숨김' },
              ]}
              value={clearable ? 'true' : 'false'}
              onChange={(e) => setClearable(e.target.value === 'true')}
            />
          </div>
        </div>
      </div>

      <div className="code-block-wrap">
        <Code>{codeSnippet}</Code>
      </div>
    </>
  );
}
