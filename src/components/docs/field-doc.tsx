import { Field, Input } from '@/components/ui';
import { FieldPlayground } from '@/components/playgrounds/field-playground';
import { Section, Table, Code } from '@/components/site/doc-parts';
import { TokenCatalog } from '@/components/site/token-catalog';
import { TokenValue } from '@/components/site/token-value';
import { controlSizes } from '@/lib/control';
import { spec } from '@/lib/tokens';
import { Search, Check, X } from 'lucide-react';

export function FieldDoc({ kind = 'input' }: { kind?: 'input' | 'select' }) {
  return (
    <>
      <Section title="Overview">
        <p>
          Input은 이름, 이메일, 검색어처럼 사용자가 직접 텍스트를 입력할 때
          사용합니다. 레이블·도움말·오류 메시지를 함께 제공해 필요한 값과 현재
          상태를 명확하게 안내합니다.
        </p>
        <FieldPlayground kind={kind} />
        <div className="callout">
          <p>
            placeholder는 입력 예시일 뿐입니다. 사용자가 값을 입력해도 사라지지
            않는 독립된 label을 항상 함께 제공해야 합니다.
          </p>
        </div>
      </Section>

      <Section title="Anatomy">
        <div className="anatomy-panel">
          <div className="w-full max-w-sm">
            <Field
              label="1. 레이블"
              description="5. 도움말 또는 오류 메시지"
            >
              <Input
                id="input-anatomy"
                placeholder="3. 입력 값 / placeholder"
                startIcon={<Search size={16} />}
              />
            </Field>
          </div>
        </div>
        <Table
          headings={['번호', '구성 요소', '역할']}
          rows={[
            ['1', 'Label', '필드 이름. htmlFor와 id로 자동 연결'],
            ['2', 'Container', '크기·경계 테두리·배경 및 포커스 링 영역'],
            ['3', 'Value / Placeholder', '사용자 입력 값 또는 입력 힌트 안내 문구'],
            [
              '4',
              'Start / End Icon',
              '입력 목적을 시각적으로 보조하는 장식용 아이콘 (aria-hidden)',
            ],
            [
              '5',
              'Description / Error',
              'aria-describedby로 연결되는 도움말 또는 유효성 오류 메시지',
            ],
          ]}
        />
        <p className="caption">
          번호는 구성 요소를 식별하며 배치 순서를 고정하지 않습니다.
          startIcon과 endIcon으로 아이콘을 입력 영역 앞이나 뒤에 둘 수
          있습니다. 조작 버튼은 장식용 아이콘 슬롯 대신 Field의 suffix를
          사용하세요.
        </p>
      </Section>

      <Section title="Variants">
        <p>
          별도의 복잡한 시각적 변형 대신 아이콘 슬롯과 HTML5 네이티브 type을
          조합하여 다양한 입력 목적을 지원합니다.
        </p>
        <Table
          headings={['Variant', '미리보기 (Preview)', '특징 및 사용 예시']}
          rows={[
            [
              <span key="v-basic" className="font-semibold text-primary">
                기본 텍스트
              </span>,
              <div key="p-basic" className="w-full max-w-[240px]">
                <Input placeholder="이름을 입력하세요" />
              </div>,
              '가장 표준적인 일반 텍스트 입력 필드',
            ],
            [
              <span key="v-icon" className="font-semibold text-primary">
                아이콘 포함
              </span>,
              <div key="p-icon" className="w-full max-w-[240px]">
                <Input
                  type="search"
                  startIcon={<Search size={16} />}
                  placeholder="검색어 입력"
                />
              </div>,
              'startIcon 또는 endIcon으로 검색이나 필터링 목적을 시각적으로 표현',
            ],
            [
              <span key="v-email" className="font-semibold text-primary">
                이메일 / 특수 타입
              </span>,
              <div key="p-email" className="w-full max-w-[240px]">
                <Input
                  type="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                />
              </div>,
              '모바일 가상 키보드 최적화(@, .com) 및 브라우저 자동완성 지원',
            ],
          ]}
        />
      </Section>

      <Section title="Sizes">
        <p>
          공통 Control size 네 단계를 사용합니다. 기본 <code>md</code>는
          40px이며, 모바일의 주요 입력에는 <code>lg</code>(48px)를 권장합니다.
        </p>
        <Table
          headings={['Size', '높이 (Height)', '미리보기 (Preview)', '패딩 & 폰트 크기']}
          rows={controlSizes.map((size) => [
            <code key={size} className="font-bold text-primary">
              {size}
            </code>,
            <TokenValue key={`h-${size}`} name={`--guide-component-${size}-height`} />,
            <div key={`p-${size}`} className="w-full max-w-[200px]">
              <Input
                size={size}
                placeholder={`${size} 입력 필드`}
              />
            </div>,
            <span key={`f-${size}`} className="text-secondary">
              패딩: <TokenValue name={`--guide-component-${size}-padding-x`} /> · 폰트:{' '}
              <TokenValue name={`--guide-component-${size}-font-size`} />
            </span>,
          ])}
        />
      </Section>

      <Section title="States">
        <p>
          Default, Error, ReadOnly, Disabled 상태를 지원하며, 시각적 테두리와
          접근성 속성으로 명확히 구분합니다.
        </p>
        <Table
          headings={['상태 (State)', '미리보기 (Preview)', '동작 및 가이드']}
          rows={[
            [
              <span key="st-def" className="font-semibold text-primary">
                Default
              </span>,
              <div key="p-def" className="w-full max-w-[220px]">
                <Input defaultValue="홍길동" />
              </div>,
              '사용자 입력을 대기하는 기본 활성 인터랙션 상태',
            ],
            [
              <span key="st-err" className="font-semibold text-primary">
                Error
              </span>,
              <div key="p-err" className="w-full max-w-[220px]">
                <Input
                  defaultValue="잘못된 입력값"
                  aria-invalid="true"
                />
              </div>,
              '유효성 검증 실패 시 강조 테두리(Red)와 aria-invalid 적용',
            ],
            [
              <span key="st-ro" className="font-semibold text-primary">
                ReadOnly
              </span>,
              <div key="p-ro" className="w-full max-w-[220px]">
                <Input
                  defaultValue="읽기 전용 텍스트"
                  readOnly
                />
              </div>,
              '값 수정은 차단되지만 텍스트 선택 및 클립보드 복사는 허용',
            ],
            [
              <span key="st-dis" className="font-semibold text-primary">
                Disabled
              </span>,
              <div key="p-dis" className="w-full max-w-[220px]">
                <Input
                  defaultValue="비활성화 필드"
                  disabled
                />
              </div>,
              '조작 및 폼 전송에서 완전히 제외되는 비활성화 상태',
            ],
          ]}
        />
        <details className="token-catalog">
          <summary>Input 상태 토큰 전체</summary>
          <TokenCatalog
            names={Object.keys(spec.component.base).filter((name) =>
              name.startsWith('--guide-input-'),
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
            <p>입력 목적에 맞는 type, autoComplete, inputMode를 사용합니다.</p>
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
            <p>값을 읽기만 해야 할 때 disabled로 정보를 숨기지 않고 readOnly를 고려합니다.</p>
            <p>여러 줄 입력이 필요한 영역에는 Input 대신 Textarea를 사용합니다.</p>
          </div>
        </div>
      </Section>

      <Section title="API">
        <Table
          headings={['Prop', 'Type', 'Default', 'Description']}
          rows={[
            ['size', "'sm' | 'md' | 'lg' | 'xl'", "'md'", '컨트롤의 높이와 패딩 크기 스케일'],
            ['type', 'HTMLInputTypeAttribute', "'text'", 'HTML5 입력 유형 (text, email, search 등)'],
            ['startIcon', 'ReactNode', 'undefined', '텍스트 좌측에 위치하는 장식용 아이콘 (aria-hidden)'],
            ['endIcon', 'ReactNode', 'undefined', '텍스트 우측에 위치하는 장식용 아이콘'],
            ['disabled', 'boolean', 'false', '조작 불가 및 폼 전송 제외 여부'],
            ['readOnly', 'boolean', 'false', '값 수정 불가 및 텍스트 선택/복사 허용 여부'],
            ['aria-invalid', 'boolean | "true" | "false"', 'undefined', '오류 상태 테두리 강조 표시'],
            ['aria-describedby', 'string', 'undefined', '도움말 또는 오류 메시지 요소의 id 연결'],
            ['wrapperClassName', 'string', "''", '외부 컨테이너 커스텀 스타일 클래스'],
            ['className', 'string', "''", '내부 input 요소 커스텀 스타일 클래스'],
            [
              '…native props',
              'ComponentProps<"input">',
              '—',
              'value, onChange, placeholder, name, required, maxLength 등',
            ],
          ]}
        />
      </Section>

      <Section title="Code Example">
        <Code>{`'use client';

import { useState } from 'react';
import { Field, Input } from '@/components/ui';

export default function Example() {
  const [email, setEmail] = useState('');

  return (
    <Field
      label="이메일"
      required
      description="알림을 수신할 이메일 주소를 입력해 주세요."
    >
      <Input
        type="email"
        name="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="user@example.com"
      />
    </Field>
  );
}`}</Code>
      </Section>
    </>
  );
}
