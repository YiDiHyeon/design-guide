import { Check, X } from 'lucide-react';
import { Field, Textarea } from '@/components/ui';
import { TextareaPlayground } from '@/components/playgrounds/textarea-playground';
import { Code, Section, Table } from '@/components/site/doc-parts';
import { TokenValue } from '@/components/site/token-value';
import { controlSizes } from '@/lib/control';

export function TextareaDoc() {
  return (
    <>
      <Section title="Overview">
        <p>
          Textarea는 의견, 설명, 메모처럼 여러 줄의 자유로운 텍스트를 입력할 때
          사용합니다. Input과 동일한 상태 및 크기 계약을 사용합니다.
        </p>
        <TextareaPlayground />
        <div className="callout">
          <p>
            placeholder로 레이블을 대신하지 않습니다. 예상 입력량이 한 줄이면
            Input을 사용하세요.
          </p>
        </div>
      </Section>

      <Section title="Anatomy">
        <div className="anatomy-panel">
          <div className="field-demo">
            <Field label="1. 의견" description="4. 도움말 또는 오류 메시지">
              <Textarea
                id="textarea-anatomy"
                defaultValue="3. 사용자가 입력한 여러 줄의 내용"
              />
            </Field>
          </div>
        </div>
        <Table
          headings={['번호', '구성 요소', '역할']}
          rows={[
            [1, 'Label', '필드 이름. htmlFor와 id로 연결'],
            [2, 'Container', '경계, 배경 및 포커스 상태'],
            [3, 'Value / Placeholder', '여러 줄 입력 값 또는 입력 예시'],
            [4, 'Description / Error', 'aria-describedby로 연결한 안내'],
            [
              5,
              'Character count · optional',
              '제한이 있을 때 현재/최대 글자 수',
            ],
            [
              6,
              'Resize handle · optional',
              '허용한 방향으로 입력 영역 크기 조절',
            ],
          ]}
        />
      </Section>

      <Section title="Sizes">
        <p>
          크기는 높이가 아니라 내부 여백과 글자 크기를 조절합니다. 높이는{' '}
          <code>rows</code>로 입력량에 맞게 정합니다.
        </p>
        <div className="field-size-list">
          {controlSizes.map((size) => (
            <div key={size}>
              <label htmlFor={`textarea-size-${size}`}>{size}</label>
              <Textarea
                id={`textarea-size-${size}`}
                size={size}
                rows={2}
                placeholder="의견을 입력하세요"
              />
              <TokenValue name={`--guide-component-${size}-font-size`} />
            </div>
          ))}
        </div>
      </Section>

      <Section title="States">
        <p>Default, Focus, Error, Readonly, Disabled 상태를 지원합니다.</p>
        <div className="field-examples">
          {['default', 'error', 'readonly', 'disabled'].map((state) => (
            <div className="field-example" key={state}>
              <Field
                label={state}
                readOnly={state === 'readonly'}
                disabled={state === 'disabled'}
                invalid={state === 'error'}
                errorMessage="입력한 내용을 확인해 주세요."
                description="필드 상태를 확인하세요."
              >
                <Textarea
                  id={`textarea-${state}`}
                  rows={3}
                  defaultValue="작성한 의견입니다."
                />
              </Field>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Guidelines">
        <div className="guideline-grid">
          <div className="guideline good">
            <h3>
              <Check size={16} aria-hidden="true" /> 권장해요
            </h3>
            <p>예상 입력량을 고려해 초기 rows를 충분히 제공합니다.</p>
            <p>글자 수 제한에는 현재/최대 글자 수를 가까이 표시합니다.</p>
            <p>긴 글을 작성하는 화면에서만 세로 방향 크기 조절을 허용합니다.</p>
          </div>
          <div className="guideline bad">
            <h3>
              <X size={16} aria-hidden="true" /> 피해주세요
            </h3>
            <p>한 줄짜리 짧은 값에 Textarea를 사용하지 않습니다.</p>
            <p>
              사용자에게 알리지 않고 입력 내용을 자동으로 잘라내지 않습니다.
            </p>
            <p>크기 조절을 막은 채 지나치게 작은 높이를 강제하지 않습니다.</p>
          </div>
        </div>
      </Section>

      <Section title="API">
        <Table
          headings={['Prop', 'Type', 'Default / 설명']}
          rows={[
            ['size', controlSizes.join(' | '), 'md · 여백과 글자 크기'],
            ['resize', "'vertical' | 'none'", 'none'],
            ['rows', 'number', '4 · 초기 표시 줄 수'],
            ['disabled', 'boolean', 'false · 조작 및 폼 전송 제외'],
            ['readOnly', 'boolean', 'false · 선택과 복사 가능'],
            ['aria-invalid', 'boolean | "true" | "false"', '오류 표시'],
            ['wrapperClassName', 'string', '컨테이너 스타일'],
            ['className', 'string', '실제 textarea 스타일'],
            [
              '…native props',
              'ComponentProps<"textarea">',
              'maxLength, name, required 등',
            ],
          ]}
        />
      </Section>

      <Section title="Code Example">
        <Code>{`<Field label="자기소개" description="최대 500자까지 입력할 수 있습니다.">\n  <Textarea name="introduction" rows={5} maxLength={500} placeholder="소개를 입력해 주세요" />\n</Field>`}</Code>
      </Section>
    </>
  );
}
