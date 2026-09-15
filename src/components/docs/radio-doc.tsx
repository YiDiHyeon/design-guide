'use client';

import { useState } from 'react';
import { Radio, RadioGroup } from '@/components/ui';
import { RadioPlayground } from '@/components/playgrounds/radio-playground';
import { Section, Table, Code } from '@/components/site/doc-parts';
import { Check, X } from 'lucide-react';

export function RadioDoc() {
  const [shippingMethod, setShippingMethod] = useState('standard');

  return (
    <>
      <Section title="Overview">
        <p>
          Radio는 여러 개의 선택지 중 사용자가 단 하나의 옵션만 상호 배타적으로
          선택해야 할 때 사용합니다. 모든 옵션이 화면에 바로 노출되어 선택지
          간의 비교가 쉬우며, RadioGroup 컨테이너로 감싸 손쉽게 상태를 동기화할
          수 있습니다.
        </p>
        <RadioPlayground />
        <div className="callout">
          <p>
            RadioGroup은 WAI-ARIA <code>role=&quot;radiogroup&quot;</code>을
            준수합니다. 그룹 내에서 키보드 화살표 키(↑, ↓, ←, →)를 눌러
            이전/다음 항목으로 즉시 포커스 및 선택을 이동할 수 있습니다.
          </p>
        </div>
      </Section>

      <Section title="Anatomy">
        <div className="anatomy-panel">
          <div
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              gap: '16px',
              padding: '12px',
            }}
          >
            <Radio
              size="lg"
              checked={true}
              readOnly
              label="1. 외곽 원 & 3. 레이블"
              description="2. 내부 도트 인디케이터 및 4. 보조 설명 텍스트입니다."
            />
          </div>
        </div>
        <Table
          headings={['번호', '구성 요소', '역할']}
          rows={[
            [
              '1',
              '외곽 원 (Outer Circle)',
              '라디오 컨트롤의 범위를 표시하는 원형 컨테이너 (호버, 포커스, 에러 테두리 반영)',
            ],
            [
              '2',
              '도트 인디케이터 (Dot Indicator)',
              '선택(Checked) 상태 시 중앙에 채워지는 원형 불릿',
            ],
            [
              '3',
              '레이블 (Label)',
              '선택하려는 옵션의 이름 또는 텍스트 (클릭 시 해당 옵션 선택)',
            ],
            [
              '4',
              '보조 설명 (Description)',
              '옵션에 대한 상세 부가 정보 (스크린 리더 aria-describedby 자동 연결)',
            ],
          ]}
        />
      </Section>

      <Section title="Sizes">
        <p>
          화면의 정보 밀도와 배치 공간에 맞춰 3가지 크기를 제공합니다. 기본값은{' '}
          <code>md</code>(20px)입니다.
        </p>

        <Table
          headings={['Size', '규격 (외곽 / 도트)', '미리보기 (Preview)', '권장 적용 맥락']}
          rows={[
            [
              <code key="sm" className="font-bold text-primary">
                sm (16px)
              </code>,
              '16px / 8px',
              <Radio
                key="r-sm"
                size="sm"
                defaultChecked
                label="Small 옵션"
              />,
              '테이블 셀 내부, 데이터 밀도가 높은 압축 목록',
            ],
            [
              <code key="md" className="font-bold text-primary">
                md (20px)
              </code>,
              '20px / 10px (기본)',
              <Radio
                key="r-md"
                size="md"
                defaultChecked
                label="Medium 옵션"
              />,
              '일반 웹 폼, 설정 다이얼로그, 기본 표준 선택지',
            ],
            [
              <code key="lg" className="font-bold text-primary">
                lg (24px)
              </code>,
              '24px / 12px',
              <Radio
                key="r-lg"
                size="lg"
                defaultChecked
                label="Large 옵션"
              />,
              '모바일 터치 중심 화면, 결제 수단 등 시각적 강조 영역',
            ],
          ]}
        />
      </Section>

      <Section title="States">
        <p>
          사용자의 상호작용 및 폼 유효성 검증 상태를 원형 인디케이터와 색상으로
          명확히 전달합니다.
        </p>

        <Table
          headings={['상태 (State)', '미리보기 (Preview)', '동작 및 가이드']}
          rows={[
            [
              <span key="s-un" className="font-semibold text-primary">
                Unchecked
              </span>,
              <Radio key="r-un" size="md" label="기본 미선택" />,
              '사용자의 선택을 기다리는 기본 대기 상태',
            ],
            [
              <span key="s-ch" className="font-semibold text-primary">
                Checked
              </span>,
              <Radio
                key="r-ch"
                size="md"
                checked={true}
                readOnly
                label="선택 완료"
              />,
              '라디오 그룹 내에서 현재 활성화된 옵션',
            ],
            [
              <span key="s-err" className="font-semibold text-primary">
                Error
              </span>,
              <Radio
                key="r-err"
                size="md"
                error={true}
                label="필수 선택 누락"
                description="옵션을 선택해 주세요."
              />,
              '필수 선택이 누락되었거나 유효성 검증에 실패한 상태',
            ],
            [
              <span key="s-dis" className="font-semibold text-primary">
                Disabled
              </span>,
              <Radio
                key="r-dis"
                size="md"
                disabled={true}
                label="선택 불가 옵션"
                description="현재 재고가 없습니다."
              />,
              '조건 미충족 또는 비활성화되어 조작할 수 없는 상태',
            ],
          ]}
        />
      </Section>

      <Section title="Variants">
        <p>
          <code>RadioGroup</code> 컨테이너는 <code>direction</code> 속성을 통해
          수직(기본값) 및 수평 배치를 손쉽게 전환할 수 있습니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="rounded-xl border border-light bg-surface-light p-6">
            <h4 className="font-bold text-sm text-primary mb-1">
              1. Vertical Layout (수직 배치 - 권장)
            </h4>
            <p className="text-xs text-secondary leading-relaxed mb-6">
              항목마다 보조 설명이 있거나 옵션 수가 3개 이상일 때 사용하는 표준
              레이아웃입니다.
            </p>
            <RadioGroup
              name="demo-shipping"
              direction="vertical"
              value={shippingMethod}
              onChange={setShippingMethod}
            >
              <Radio
                value="standard"
                label="일반 배송 (무료)"
                description="영업일 기준 2~3일 이내 도착 예정"
              />
              <Radio
                value="express"
                label="새벽 배송 (+3,000원)"
                description="내일 아침 7시 전 문 앞 도착 보장"
              />
            </RadioGroup>
          </div>

          <div className="rounded-xl border border-light bg-surface-light p-6">
            <h4 className="font-bold text-sm text-primary mb-1">
              2. Horizontal Layout (수평 배치)
            </h4>
            <p className="text-xs text-secondary leading-relaxed mb-6">
              레이블 길이가 짧고 2~3개의 단순 선택지(예: 공개 여부, 성별)일 때
              공간 효율적으로 배치합니다.
            </p>
            <RadioGroup
              name="demo-gender"
              direction="horizontal"
              defaultValue="public"
            >
              <Radio value="public" label="공개" />
              <Radio value="friends" label="친구 공개" />
              <Radio value="private" label="비공개" />
            </RadioGroup>
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
              상호 배타적인 2~7개 이내의 옵션을 한눈에 비교해야 할 때 Radio를
              사용합니다.
            </p>
            <p>
              선택지 목록 중 가장 보편적인 기본값(Default)을 하나 미리 선택해
              둡니다.
            </p>
            <p>
              선택 해제가 필요한 경우, &apos;선택 안 함&apos; 옵션을 명시적으로
              제공합니다.
            </p>
            <p>
              옵션 레이블에 구체적인 부가 설명이 필요한 경우 수직(Vertical)
              레이아웃을 사용합니다.
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
              복수 선택이 가능해야 하는 경우 Radio 대신 Checkbox를 사용합니다.
            </p>
            <p>
              선택지가 8개 이상으로 많다면 화면 공간을 위해 Select(드롭다운)를
              사용합니다.
            </p>
            <p>
              단독으로 On/Off 상태를 전환하는 설정에는 Radio 대신 Checkbox나
              Switch를 사용합니다.
            </p>
            <p>모든 라디오가 미선택된 빈 상태로 폼을 시작하지 않습니다.</p>
          </div>
        </div>
      </Section>

      <Section title="API">
        <h4 className="font-bold text-sm text-primary mt-6 mb-2">
          RadioGroup Props
        </h4>
        <Table
          headings={['Prop', 'Type', 'Default', 'Description']}
          rows={[
            [
              'name',
              'string',
              'auto-generated',
              '라디오 그룹 내 모든 라디오를 묶어주는 고유 이름',
            ],
            ['value', 'string', 'undefined', '제어 컴포넌트용 현재 선택된 값'],
            [
              'defaultValue',
              'string',
              'undefined',
              '비제어 컴포넌트용 초기 선택 값',
            ],
            [
              'onChange',
              '(value: string) => void',
              'undefined',
              '선택된 옵션 값 변경 시 호출되는 이벤트 콜백',
            ],
            [
              'size',
              "'sm' | 'md' | 'lg'",
              "'md'",
              '그룹 내 라디오 항목들의 일괄 크기 지정',
            ],
            [
              'direction',
              "'vertical' | 'horizontal'",
              "'vertical'",
              '라디오 목록 배치 방향',
            ],
            ['disabled', 'boolean', 'false', '그룹 전체 비활성화 여부'],
            ['error', 'boolean', 'false', '그룹 유효성 검사 오류 상태 여부'],
          ]}
        />

        <h4 className="font-bold text-sm text-primary mt-8 mb-2">
          Radio Props
        </h4>
        <Table
          headings={['Prop', 'Type', 'Default', 'Description']}
          rows={[
            [
              'value',
              'string',
              'undefined',
              '해당 라디오 옵션이 가진 고유 식별 값',
            ],
            [
              'size',
              "'sm' | 'md' | 'lg'",
              'group.size',
              '개별 라디오 외곽 원 크기 및 텍스트 스케일',
            ],
            [
              'label',
              'ReactNode',
              'undefined',
              '라디오 우측 텍스트 (클릭 시 해당 옵션 선택)',
            ],
            [
              'description',
              'ReactNode',
              'undefined',
              '레이블 하단 보조 설명 문구 (aria-describedby 자동 연결)',
            ],
            [
              'disabled',
              'boolean',
              'group.disabled',
              '해당 옵션 비활성화 여부',
            ],
            ['error', 'boolean', 'group.error', '해당 옵션 오류 강조 여부'],
            [
              'wrapperClassName',
              'string',
              "''",
              '외곽 라벨 래퍼 커스텀 클래스',
            ],
          ]}
        />
      </Section>

      <Section title="Code Example">
        <Code>{`import { useState } from 'react';
import { Radio, RadioGroup } from '@/components/ui';

export function Example() {
  const [selectedPlan, setSelectedPlan] = useState('pro');

  return (
    <RadioGroup
      name="pricing-plan"
      direction="vertical"
      value={selectedPlan}
      onChange={setSelectedPlan}
    >
      <Radio
        value="basic"
        label="Basic 요금제 (무료)"
        description="개인 프로젝트 및 기본 문서 열람"
      />
      <Radio
        value="pro"
        label="Pro 요금제 (월 12,000원)"
        description="무제한 컴포넌트 복사 및 커스텀 토큰 내보내기"
      />
      <Radio
        value="enterprise"
        label="Enterprise 요금제"
        description="엔터프라이즈 전용 SSO 및 기술 지원"
        disabled
      />
    </RadioGroup>
  );
}`}</Code>
      </Section>
    </>
  );
}
