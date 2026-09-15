'use client';

import { useState } from 'react';
import { Checkbox } from '@/components/ui';
import { CheckboxPlayground } from '@/components/playgrounds/checkbox-playground';
import { Section, Table, Code } from '@/components/site/doc-parts';
import { Check, X } from 'lucide-react';

export function CheckboxDoc() {
  // Checkbox group interactive demo state
  const [items, setItems] = useState([
    { id: 'terms', label: '[필수] 서비스 이용약관 동의', checked: true },
    {
      id: 'privacy',
      label: '[필수] 개인정보 수집 및 이용 동의',
      checked: true,
    },
    {
      id: 'marketing',
      label: '[선택] 마케팅 정보 및 이벤트 수신 동의',
      checked: false,
    },
  ]);

  const allChecked = items.every((i) => i.checked);
  const isIndeterminate = items.some((i) => i.checked) && !allChecked;

  const handleParentToggle = () => {
    const nextState = !allChecked;
    setItems((prev) => prev.map((item) => ({ ...item, checked: nextState })));
  };

  const handleChildToggle = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  return (
    <>
      <Section title="Overview">
        <p>
          Checkbox는 목록에서 하나 이상의 항목을 선택하거나, 약관 동의·기능
          활성화와 같이 독립적인 상태를 켜고 끌 때 사용합니다. 단독으로
          사용하거나 여러 개를 그룹으로 묶어 배치할 수 있습니다.
        </p>
        <CheckboxPlayground />
        <div className="callout">
          <p>
            Checkbox는 WAI-ARIA 표준을 준수하며 네이티브{' '}
            <code>&lt;input type=&quot;checkbox&quot;&gt;</code>를 내장하고
            있습니다. 스페이스바(Space) 및 탭(Tab) 키보드 탐색과 스크린 리더
            음성 안내가 완벽하게 지원됩니다.
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
            <Checkbox
              size="lg"
              checked={true}
              readOnly
              label="1. 컨트롤 박스 & 3. 레이블"
              description="4. 상태 및 가이드에 대한 추가적인 보조 설명 텍스트입니다."
            />
          </div>
        </div>
        <Table
          headings={['번호', '구성 요소', '역할']}
          rows={[
            [
              '1',
              '컨트롤 박스 (Control Box)',
              '체크 여부를 시각적으로 표시하는 사각 박스 컨테이너 (호버, 포커스, 에러 테두리 반영)',
            ],
            [
              '2',
              '인디케이터 (Indicator)',
              '선택 시 Check 아이콘, 일부 선택 시 Minus(Indeterminate) 아이콘 노출',
            ],
            [
              '3',
              '레이블 (Label)',
              '사용자가 선택하려는 대상의 명확한 이름 또는 동의 문구 (클릭 시 토글)',
            ],
            [
              '4',
              '보조 설명 (Description)',
              '옵션에 대한 상세 부가 설명 (스크린 리더 aria-describedby 자동 연결)',
            ],
          ]}
        />
      </Section>

      <Section title="Sizes">
        <p>
          화면의 정보 밀도와 사용 맥락에 맞춰 3가지 크기를 제공합니다. 기본값은{' '}
          <code>md</code>(20px)입니다.
        </p>

        <Table
          headings={['Size', '규격 (박스 / 아이콘)', '미리보기 (Preview)', '권장 적용 맥락']}
          rows={[
            [
              <code key="sm" className="font-bold text-primary">
                sm (16px)
              </code>,
              '16px / 12px',
              <Checkbox
                key="c-sm"
                size="sm"
                defaultChecked
                label="Small 옵션"
              />,
              '테이블 행 내부, 데이터 밀도가 높은 컴팩트 목록',
            ],
            [
              <code key="md" className="font-bold text-primary">
                md (20px)
              </code>,
              '20px / 14px (기본)',
              <Checkbox
                key="c-md"
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
              '24px / 16px',
              <Checkbox
                key="c-lg"
                size="lg"
                defaultChecked
                label="Large 옵션"
              />,
              '모바일 터치 중심 화면, 전체 동의 및 주요 강조 약관',
            ],
          ]}
        />
      </Section>

      <Section title="States">
        <p>
          사용자의 상호작용 및 데이터 유효성 검증 상태를 명확히 전달합니다.
        </p>

        <Table
          headings={['상태 (State)', '미리보기 (Preview)', '동작 및 가이드']}
          rows={[
            [
              <span key="s-un" className="font-semibold text-primary">
                Unchecked
              </span>,
              <Checkbox key="c-un" size="md" label="미선택 상태" />,
              '사용자가 아직 선택하지 않은 기본 대기 상태',
            ],
            [
              <span key="s-ch" className="font-semibold text-primary">
                Checked
              </span>,
              <Checkbox
                key="c-ch"
                size="md"
                checked={true}
                readOnly
                label="선택 완료 상태"
              />,
              '사용자가 동의하거나 기능을 활성화한 상태',
            ],
            [
              <span key="s-ind" className="font-semibold text-primary">
                Indeterminate
              </span>,
              <Checkbox
                key="c-ind"
                size="md"
                indeterminate={true}
                readOnly
                label="하위 일부 항목 선택"
              />,
              '부모-자식 그룹에서 하위 항목 중 일부만 선택된 상태',
            ],
            [
              <span key="s-err" className="font-semibold text-primary">
                Error
              </span>,
              <Checkbox
                key="c-err"
                size="md"
                error={true}
                label="필수 동의 필요"
                description="필수 약관에 동의해 주세요."
              />,
              '필수 동의가 누락되었거나 유효성 검증에 실패한 상태',
            ],
            [
              <span key="s-dis" className="font-semibold text-primary">
                Disabled
              </span>,
              <Checkbox
                key="c-dis"
                size="md"
                disabled={true}
                label="수정 불가 항목"
                description="관리자 권한이 필요합니다."
              />,
              '조건 미충족 또는 권한 부족으로 비활성화된 상태',
            ],
          ]}
        />
      </Section>

      <Section title="Variants">
        <p>
          체크박스는 단일 옵션 제어 외에도 부모-자식 관계의{' '}
          <strong>전체 선택 그룹(Select All Group)</strong> 패턴으로 널리
          활용됩니다. 아래 실제 동작하는 예제를 직접 테스트해 보세요.
        </p>

        <div className="my-6 p-6 rounded-xl border border-light bg-surface-light max-w-xl">
          <div className="pb-3.5 border-b border-light">
            <Checkbox
              size="md"
              id="select-all"
              checked={allChecked}
              indeterminate={isIndeterminate}
              label={<strong>약관 전체 동의</strong>}
              description="서비스 이용을 위한 필수 및 선택 약관에 일괄 동의합니다."
              onChange={handleParentToggle}
            />
          </div>

          <div className="flex flex-col gap-3 mt-3.5 pl-2">
            {items.map((item) => (
              <Checkbox
                key={item.id}
                id={item.id}
                size="sm"
                checked={item.checked}
                label={item.label}
                onChange={() => handleChildToggle(item.id)}
              />
            ))}
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
              긍정형 문장으로 명확하게 레이블을 작성합니다 (예: &apos;알림
              수신&apos;).
            </p>
            <p>여러 항목 중 복수 선택이 가능할 때 Checkbox를 사용합니다.</p>
            <p>
              설정 변경이 폼 제출(Submit) 시 한꺼번에 저장되는 흐름에
              적용합니다.
            </p>
            <p>
              하위 항목이 일부만 선택된 부모 체크박스에는 indeterminate 상태를
              적용합니다.
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
              부정형 질문으로 혼란을 주지 않습니다 (예: &apos;알림 수신 거부 안
              함&apos;).
            </p>
            <p>
              상호 배타적인 단일 선택에는 Checkbox 대신 Radio 버튼을 사용합니다.
            </p>
            <p>
              토글 즉시 시스템에 즉각 반영되는 설정에는 Checkbox 대신 Switch를
              사용합니다.
            </p>
            <p>
              레이블 없이 단독으로 배치할 때는 aria-label을 누락하지 않습니다.
            </p>
          </div>
        </div>
      </Section>

      <Section title="API">
        <Table
          headings={['Prop', 'Type', 'Default', 'Description']}
          rows={[
            [
              'size',
              "'sm' | 'md' | 'lg'",
              "'md'",
              '체크박스 컨트롤 박스 크기 및 텍스트 스케일',
            ],
            [
              'checked',
              'boolean',
              'undefined',
              '제어 컴포넌트용 선택 상태 여부',
            ],
            [
              'defaultChecked',
              'boolean',
              'undefined',
              '비제어 컴포넌트용 초기 선택 상태 여부',
            ],
            [
              'indeterminate',
              'boolean',
              'false',
              '부모-자식 그룹의 일부 선택 상태 표현 (aria-checked="mixed")',
            ],
            [
              'error',
              'boolean',
              'false',
              '유효성 검사 에러 상태 (aria-invalid="true" 및 빨간 테두리)',
            ],
            ['disabled', 'boolean', 'false', '비활성화 상태 여부'],
            [
              'label',
              'ReactNode',
              'undefined',
              '체크박스 우측 레이블 텍스트 (클릭 시 체크박스 토글)',
            ],
            [
              'description',
              'ReactNode',
              'undefined',
              '레이블 하단 보조 설명 텍스트 (aria-describedby 자동 연계)',
            ],
            [
              'wrapperClassName',
              'string',
              "''",
              '외곽 레이블 래퍼 커스텀 클래스',
            ],
            [
              'onChange',
              '(e: ChangeEvent<HTMLInputElement>) => void',
              'undefined',
              '선택 상태 변경 시 호출되는 이벤트 핸들러',
            ],
          ]}
        />
      </Section>

      <Section title="Code Example">
        <Code>{`import { useState } from 'react';
import { Checkbox } from '@/components/ui';

export function Example() {
  const [agreed, setAgreed] = useState(false);

  return (
    <Checkbox
      size="md"
      checked={agreed}
      label="개인정보 처리방침에 동의합니다 (필수)"
      description="수집된 정보는 서비스 제공 목적으로만 활용됩니다."
      onChange={(e) => setAgreed(e.target.checked)}
    />
  );
}`}</Code>
      </Section>
    </>
  );
}
