import { Input } from './input';
import { Select } from './select';
import { FieldPlayground } from './field-playground';
import { destinationOptions } from '@/lib/control';
import { Section, Table, Code } from './doc-parts';
import { TokenCatalog } from './token-catalog';
import { TokenValue } from './token-value';
import { controlSizes } from '@/lib/control';
import { spec } from '@/lib/tokens';
import { Search, Check, X } from 'lucide-react';

export function FieldDoc({ kind }: { kind: 'input' | 'select' }) {
  const isInput = kind === 'input';
  const title = isInput ? 'Input' : 'Select';
  return (
    <>
      <Section title="Overview">
        <p>
          {isInput
            ? 'Input은 이름, 이메일, 검색어처럼 사용자가 직접 텍스트를 입력할 때 사용합니다. 레이블·도움말·오류 메시지를 함께 제공해 필요한 값과 현재 상태를 알려줍니다.'
            : 'Select는 미리 정의된 목록에서 한 가지 값을 선택할 때 사용합니다. 현재 선택과 변경 가능 여부를 명확하게 전달합니다.'}
        </p>
        <FieldPlayground kind={kind} />
        <div className="callout">
          <p>
            {isInput
              ? 'placeholder는 입력 예시입니다. 값이 입력되어도 남아 있는 별도 label을 반드시 제공합니다.'
              : '이 가이드의 Select는 네이티브 select로 독립 구현했습니다. 트리거는 원본 site 토큰을 사용하고, 열린 목록의 외형과 키보드 동작은 브라우저·운영체제를 따릅니다.'}
          </p>
        </div>
      </Section>
      <Section title="Anatomy">
        <div className="anatomy-panel">
          <div className="field-demo">
            <label className="field-label" htmlFor={`${kind}-anatomy`}>
              1. {isInput ? '이름' : '여행지'}
            </label>
            {isInput ? (
              <Input
                id={`${kind}-anatomy`}
                placeholder="3. 입력 값 / placeholder"
                startIcon={<Search size={16} />}
                aria-describedby={`${kind}-anatomy-help`}
              />
            ) : (
              <Select
                id={`${kind}-anatomy`}
                options={destinationOptions}
                placeholder="3. 선택 값 / placeholder"
                aria-describedby={`${kind}-anatomy-help`}
              />
            )}
            <p className="field-help" id={`${kind}-anatomy-help`}>
              5. 도움말 또는 오류 메시지
            </p>
          </div>
        </div>
        <Table
          headings={['번호', '구성 요소', '역할']}
          rows={[
            [1, 'Label', '필드 이름. htmlFor와 id로 연결'],
            [2, 'Container', '크기·경계·배경·포커스 영역'],
            [
              3,
              isInput ? 'Value / Placeholder' : 'Selected value / Placeholder',
              isInput
                ? '입력 값 또는 입력 예시'
                : '현재 선택 값 또는 선택 안내',
            ],
            [
              4,
              isInput ? 'Icon · optional' : 'Indicator / Options',
              isInput
                ? '레이블이 아닌 장식용 보조 아이콘'
                : '열림 가능성을 알리는 표시와 선택 목록',
            ],
            [
              5,
              'Description / Error',
              'aria-describedby로 연결한 도움말·오류 메시지',
            ],
          ]}
        />
        <p className="caption">
          번호는 구성 요소를 식별하며 배치 순서를 고정하지 않습니다.{' '}
          {isInput
            ? 'startIcon과 endIcon으로 아이콘을 입력 영역 앞이나 뒤에 둘 수 있습니다. 동작 버튼은 장식용 아이콘 슬롯에 넣지 않습니다.'
            : '레이블은 위나 옆에 배치할 수 있습니다. 옵션의 순서는 선택 맥락에 맞게 정합니다.'}
        </p>
      </Section>
      <Section title="Variants">
        <p>
          {isInput
            ? '원본 Input에는 별도의 시각적 variant prop이 없습니다. 기본형에 아이콘과 네이티브 type을 조합합니다.'
            : '원본 Select는 하나의 기본 스타일을 사용합니다. 필수 선택 여부, 초기 선택과 비활성 옵션을 조합합니다. 이 구현은 단일 선택 전용입니다.'}
        </p>
        <div className="field-examples">
          {isInput ? (
            <>
              <div className="field-example">
                <label className="field-label" htmlFor="input-basic">
                  기본 입력
                </label>
                <Input id="input-basic" placeholder="이름" />
              </div>
              <div className="field-example">
                <label className="field-label" htmlFor="input-icon">
                  아이콘 포함
                </label>
                <Input
                  id="input-icon"
                  type="search"
                  startIcon={<Search size={16} />}
                  placeholder="검색어"
                />
              </div>
              <div className="field-example">
                <label className="field-label" htmlFor="input-email">
                  이메일 입력
                </label>
                <Input
                  id="input-email"
                  type="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                />
              </div>
            </>
          ) : (
            <>
              <div className="field-example">
                <label className="field-label" htmlFor="select-placeholder">
                  선택 안내
                </label>
                <Select
                  id="select-placeholder"
                  options={destinationOptions}
                  placeholder="여행지를 선택하세요"
                />
              </div>
              <div className="field-example">
                <label className="field-label" htmlFor="select-initial">
                  초기 선택
                </label>
                <Select
                  id="select-initial"
                  options={destinationOptions}
                  defaultValue="seoul"
                />
              </div>
              <div className="field-example">
                <label className="field-label" htmlFor="select-required">
                  필수 선택
                </label>
                <Select
                  id="select-required"
                  options={destinationOptions}
                  placeholder="선택하세요"
                  required
                  aria-describedby="select-required-help"
                />
                <p className="field-help" id="select-required-help">
                  필수 항목입니다. “준비 중” 옵션은 선택할 수 없습니다.
                </p>
              </div>
            </>
          )}
        </div>
      </Section>
      <Section title="Sizes">
        <p>
          원본 공통 Component size 9개를 사용합니다. 기본 md는 40px입니다. 터치
          영역이 필요한 화면에서는 lg(44px) 이상을 선택합니다.
        </p>
        <div className="field-size-list">
          {controlSizes.map((size) => (
            <div key={size}>
              <label htmlFor={`${kind}-size-${size}`}>{size}</label>
              {isInput ? (
                <Input
                  id={`${kind}-size-${size}`}
                  size={size}
                  placeholder="이름을 입력하세요"
                />
              ) : (
                <Select
                  id={`${kind}-size-${size}`}
                  size={size}
                  options={destinationOptions}
                  defaultValue="seoul"
                />
              )}
              <TokenValue name={`--site-component-${size}-height`} />
            </div>
          ))}
        </div>
        <Table
          headings={['Size', 'Height', 'Padding X', 'Font size']}
          rows={controlSizes.map((size) => [
            size,
            ...['height', 'padding-x', 'font-size'].map((part) => (
              <TokenValue
                key={part}
                name={`--site-component-${size}-${part}`}
              />
            )),
          ])}
        />
      </Section>
      <Section title="States">
        <p>
          Default, Focus, Error, Readonly, Disabled 상태를 지원합니다. 위 Live
          Preview에서 상태를 바꾸고 Tab으로 실제 포커스를 확인하세요.
        </p>
        <div className="field-examples">
          {['default', 'error', 'readonly', 'disabled'].map((state) => (
            <div className="field-example" key={state}>
              <label className="field-label" htmlFor={`${kind}-${state}`}>
                {state}
              </label>
              {isInput ? (
                <Input
                  id={`${kind}-${state}`}
                  defaultValue="홍길동"
                  readOnly={state === 'readonly'}
                  disabled={state === 'disabled'}
                  aria-invalid={state === 'error'}
                  aria-describedby={`${kind}-${state}-help`}
                />
              ) : (
                <Select
                  id={`${kind}-${state}`}
                  options={destinationOptions}
                  defaultValue="seoul"
                  readOnly={state === 'readonly'}
                  disabled={state === 'disabled'}
                  aria-invalid={state === 'error'}
                  aria-describedby={`${kind}-${state}-help`}
                />
              )}
              <p
                className={`field-help ${state === 'error' ? 'field-error' : ''}`}
                id={`${kind}-${state}-help`}
              >
                {state === 'error'
                  ? '입력한 값을 확인해 주세요.'
                  : state === 'readonly'
                    ? '값을 확인할 수 있지만 변경할 수 없습니다.'
                    : state === 'disabled'
                      ? '현재 사용할 수 없습니다.'
                      : 'Tab으로 포커스를 이동해 보세요.'}
              </p>
            </div>
          ))}
        </div>
        <p>
          {isInput
            ? 'readonly는 포커스와 텍스트 복사가 가능하며 폼 전송에 포함됩니다. disabled는 탭 순서와 폼 전송에서 제외됩니다.'
            : '네이티브 select에는 readonly 속성이 없습니다. readOnly에서는 선택된 레이블을 읽기 전용 텍스트 필드로 표시하고, name이 있으면 hidden input으로 실제 값을 전송합니다. 이때 목록은 열리지 않습니다. disabled 상태는 폼 전송에서 제외됩니다.'}
        </p>
        <details className="token-catalog">
          <summary>{title} 상태 토큰 전체 · 원본 이름과 매핑</summary>
          <TokenCatalog
            names={Object.keys(spec.component.base).filter((name) =>
              name.startsWith(`--site-${kind}-`),
            )}
          />
        </details>
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
            <p>항상 보이는 레이블과 구체적인 도움말을 제공합니다.</p>
            <p>
              오류에는 aria-invalid와 수정 방법을 설명하는 메시지를 함께
              제공합니다.
            </p>
            <p>
              {isInput
                ? '입력 목적에 맞는 type, autoComplete, inputMode를 사용합니다.'
                : '사용자가 이해하는 이름으로 옵션을 표시하고, 실제 값은 고유한 문자열로 관리합니다.'}
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
            <p>placeholder만으로 레이블을 대신하지 않습니다.</p>
            <p>값을 읽기만 해야 할 때 disabled로 정보를 숨기지 않습니다.</p>
            <p>
              {isInput
                ? '여러 줄 입력이나 날짜·체크박스처럼 다른 패턴이 필요한 요소를 텍스트 Input에 억지로 넣지 않습니다.'
                : '검색·다중 선택·비동기 옵션 로딩을 이 단일 Select에 포함하지 않습니다.'}
            </p>
          </div>
        </div>
        <p className="caption">
          원본 색상 값을 보존합니다. 오류·placeholder 등의 대비는 사용하는
          배경과 글자 크기에 맞게 확인합니다.
        </p>
      </Section>
      <Section title="API">
        <p>
          {isInput
            ? '네이티브 input 속성을 지원합니다. size는 HTML의 문자 수가 아닌 디자인 크기입니다. className은 실제 input, wrapperClassName은 컨테이너에 적용됩니다.'
            : '이 레포의 API입니다. 원본 Radix의 SelectTrigger/SelectItem 합성 API 대신 options 배열과 네이티브 onChange 이벤트를 사용합니다. className은 컨테이너에 적용됩니다.'}
        </p>
        <Table
          headings={['Prop', 'Type', 'Default / 설명']}
          rows={[
            ['size', controlSizes.join(' | '), 'md'],
            ...(isInput
              ? [
                  ['type', 'HTML input type', 'text'],
                  [
                    'startIcon / endIcon',
                    'ReactNode',
                    '장식용 아이콘, aria-hidden 처리',
                  ],
                  ['wrapperClassName', 'string', '컨테이너 스타일'],
                ]
              : [
                  [
                    'options',
                    'readonly SelectOption[]',
                    '필수 · value / label / disabled?',
                  ],
                  ['placeholder', 'string', '선택 안내 · 값은 빈 문자열'],
                  [
                    'value / defaultValue',
                    'string',
                    '제어 / 초기 값 · 둘 중 하나 사용',
                  ],
                ]),
            ['disabled', 'boolean', 'false · 조작 및 폼 전송 제외'],
            ['readOnly', 'boolean', 'false · 값 확인만 허용'],
            ['aria-invalid', 'boolean | "true" | "false"', '오류 표시'],
            ['aria-describedby', 'string', '도움말·오류 요소의 id'],
            ['id / name', 'string', '레이블 연결 / 폼 필드 이름'],
            [
              'onChange',
              isInput
                ? 'ChangeEventHandler<HTMLInputElement>'
                : 'ChangeEventHandler<HTMLSelectElement>',
              '변경 이벤트',
            ],
            [
              '…native props',
              isInput
                ? 'ComponentProps<"input">'
                : '네이티브 단일 select 속성 (ref 제외)',
              'required, autoComplete 등',
            ],
          ]}
        />
      </Section>
      <Section title="Code Example">
        <Code>
          {isInput
            ? `'use client';\nimport { useState } from 'react';\nimport { Input } from '@/components/input';\n\nexport default function NameField() {\n  const [name, setName] = useState('');\n  return (\n    <div>\n      <label htmlFor="name">이름</label>\n      <Input id="name" name="name" autoComplete="name"\n        value={name} onChange={e => setName(e.target.value)}\n        aria-describedby="name-help" />\n      <p id="name-help">예약자 이름을 입력해 주세요.</p>\n    </div>\n  );\n}`
            : `'use client';\nimport { useState } from 'react';\nimport { Select } from '@/components/select';\n\nexport default function DestinationField() {\n  const [destination, setDestination] = useState('');\n  return (\n    <div>\n      <label htmlFor="destination">여행지</label>\n      <Select id="destination" name="destination"\n        value={destination}\n        onChange={e => setDestination(e.target.value)}\n        placeholder="여행지를 선택하세요"\n        options={[\n          { value: 'seoul', label: '서울' },\n          { value: 'busan', label: '부산' },\n        ]}\n        aria-describedby="destination-help" />\n      <p id="destination-help">여행할 도시 한 곳을 선택하세요.</p>\n    </div>\n  );\n}`}
        </Code>
      </Section>
    </>
  );
}
