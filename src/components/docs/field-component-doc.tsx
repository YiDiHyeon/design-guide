import { Field, Input, Textarea } from '@/components/ui';
import { FieldPlayground } from '@/components/playgrounds/field-playground';
import { Code, Section, Table } from '@/components/site/doc-parts';

export function FieldComponentDoc() {
  return (
    <>
      <Section title="Overview">
        <p>
          Field는 하나의 입력 컨트롤과 레이블, 필수 표시, 도움말, 오류 메시지를
          묶습니다. Input, Textarea, Select를 직접 자식으로 하나 배치하면
          레이블과 설명이 자동 연결됩니다.
        </p>
        <FieldPlayground kind="input" />
      </Section>

      <Section title="Anatomy">
        <div className="anatomy-panel">
          <div className="w-full max-w-sm">
            <Field
              label="1. 레이블 (Header)"
              labelWeight="bold"
              required
              description="3. 도움말 또는 오류 메시지 (Footer)"
            >
              <Input
                type="email"
                name="email"
                placeholder="2. 입력 컨트롤 (Control)"
              />
            </Field>
          </div>
        </div>
        <Table
          headings={['영역', '구성 요소', '역할']}
          rows={[
            [
              'Header',
              'Label & Suffix',
              '입력 레이블, 필수/선택 인디케이터, suffix 보조 액션 버튼',
            ],
            [
              'Control',
              'Input · Textarea · Select',
              '사용자 입력을 받는 단일 직접 자식 컨트롤 요소',
            ],
            [
              'Footer',
              'Description · Error · Count',
              '도움말 또는 오류 메시지, 우측 글자 수 카운터',
            ],
          ]}
        />
      </Section>

      <Section title="States">
        <p>
          유효성 검증, 선택 입력 안내, 읽기 전용 및 비활성화 상태를 시각적
          피드백과 접근성 속성으로 명확히 구분합니다.
        </p>
        <Table
          headings={['상태 / 속성', '미리보기 (Preview)', '동작 및 가이드']}
          rows={[
            [
              <span key="st-def" className="font-semibold text-primary">
                Default
              </span>,
              <div key="p-def" className="w-full max-w-[240px]">
                <Field
                  label="이름"
                  description="예약에 사용할 이름을 입력하세요."
                >
                  <Input placeholder="홍길동" />
                </Field>
              </div>,
              '사용자 입력을 대기하는 기본 활성 상태',
            ],
            [
              <span key="st-err" className="font-semibold text-primary">
                Invalid (오류)
              </span>,
              <div key="p-err" className="w-full max-w-[240px]">
                <Field
                  label="이름"
                  invalid
                  errorMessage="예약자 이름을 입력해 주세요."
                  description="예약에 사용할 이름입니다."
                >
                  <Input defaultValue="" placeholder="이름" />
                </Field>
              </div>,
              'errorMessage가 존재하거나 invalid일 때 도움말 대신 빨간색 오류 메시지 표시',
            ],
            [
              <span key="st-opt" className="font-semibold text-primary">
                Optional (선택)
              </span>,
              <div key="p-opt" className="w-full max-w-[240px]">
                <Field
                  label="소속 회사"
                  indicator="optional"
                  description="선택 입력 항목입니다."
                >
                  <Input placeholder="회사명 (선택)" />
                </Field>
              </div>,
              'indicator="optional" 지정 시 레이블 우측에 (선택) 문구 표시',
            ],
            [
              <span key="st-ro" className="font-semibold text-primary">
                ReadOnly
              </span>,
              <div key="p-ro" className="w-full max-w-[240px]">
                <Field
                  label="예약 번호"
                  readOnly
                  description="예약 번호는 수정할 수 없습니다."
                >
                  <Input defaultValue="RES-2048" />
                </Field>
              </div>,
              '값 수정은 차단되지만 텍스트 선택 및 클립보드 복사는 허용',
            ],
            [
              <span key="st-dis" className="font-semibold text-primary">
                Disabled
              </span>,
              <div key="p-dis" className="w-full max-w-[240px]">
                <Field
                  label="쿠폰 코드"
                  disabled
                  description="현재 사용할 수 있는 쿠폰이 없습니다."
                >
                  <Input placeholder="쿠폰 코드" />
                </Field>
              </div>,
              '조작 불가 및 폼 전송에서 제외되는 비활성화 상태',
            ],
          ]}
        />
      </Section>

      <Section title="Character Count">
        <p>
          <code>count</code> prop을 전달하면 푸터 우측에 현재 글자 수와 최대
          글자 수를 정돈된 형식으로 표시합니다. 최대치를 초과하면 오류 색상이
          적용됩니다.
        </p>
        <div className="my-6 max-w-md">
          <Field
            label="자기소개"
            description="공백 포함 최대 200자까지 입력 가능합니다."
            count={{ current: 48, max: 200 }}
          >
            <Textarea
              rows={3}
              defaultValue="안녕하세요! 사용자 친화적인 웹 서비스를 만들고 있는 프론트엔드 개발자입니다."
            />
          </Field>
        </div>
        <p className="caption">
          count는 표시만 담당합니다. 값과 maxLength는 입력 컨트롤에서
          관리하세요. 사용자에게 보이는 글자 단위를 사용할 때는 카운트와 제한
          로직을 함께 맞추세요.
        </p>
      </Section>

      <Section title="Guidelines">
        <div className="guideline-grid">
          <div className="guideline good">
            <h3>권장해요</h3>
            <p>레이블에는 입력할 값의 이름을 씁니다. placeholder는 입력 예시를 제공합니다.</p>
            <p>Field의 직접 자식은 하나의 Input, Textarea 또는 Select로 구성합니다.</p>
            <p>보조 액션 버튼은 suffix 슬롯에 배치하고 type=&quot;button&quot;을 지정합니다.</p>
          </div>
          <div className="guideline bad">
            <h3>피해주세요</h3>
            <p>placeholder만으로 레이블을 대신하지 않습니다.</p>
            <p>Checkbox·Radio 개별 항목을 Field에 단독 자식으로 억지로 묶지 않습니다.</p>
            <p>자식 컨트롤 여러 개를 하나의 Field 컨테이너에 중첩 배치하지 않습니다.</p>
          </div>
        </div>
      </Section>

      <Section title="API">
        <Table
          headings={['Prop', 'Type', 'Default', 'Description']}
          rows={[
            ['label', 'ReactNode', '필수', '입력 컨트롤의 레이블 텍스트 또는 노드'],
            [
              'children',
              'ReactElement',
              '필수',
              '하나의 직접 자식 Input / Textarea / Select',
            ],
            [
              'controlId',
              'string',
              '자동 생성',
              '컨트롤 ID · 자식 id → controlId → 자동 생성 순서',
            ],
            ['size', "'sm' | 'md' | 'lg' | 'xl'", "'md'", '자식 컨트롤에 상속되는 크기 스케일'],
            ['labelWeight', "'medium' | 'bold'", "'medium'", '레이블 텍스트의 폰트 두께'],
            [
              'required',
              'boolean',
              'false',
              '필수 입력 여부 (indicator="auto" 시 별표 표시)',
            ],
            [
              'indicator',
              "'auto' | 'optional' | 'none'",
              "'auto'",
              'auto는 필수 시 별표, optional은 선택 항목에 (선택) 표시',
            ],
            [
              'invalid',
              'boolean',
              'false',
              '오류 상태 테두리 및 errorMessage 활성화 여부',
            ],
            [
              'errorMessage',
              'ReactNode',
              'undefined',
              '오류 발생 시 도움말을 대체하여 노출되는 오류 문구',
            ],
            [
              'description',
              'ReactNode',
              'undefined',
              '하단에 상시 노출되는 보조 설명 문구',
            ],
            ['suffix', 'ReactNode', 'undefined', '레이블 우측 보조 액션 슬롯'],
            [
              'count',
              '{ current: number; max: number }',
              'undefined',
              '현재 글자 수 및 최대 허용치 카운터',
            ],
            [
              'disabled / readOnly',
              'boolean',
              'false',
              '자식 컨트롤에 상속되는 상태 (명시한 자식 prop 우선)',
            ],
            ['id / className', 'string', "''", 'Field 레이아웃 루트에 적용되는 식별자 및 클래스'],
          ]}
        />
      </Section>

      <Section title="Code Example">
        <Code>{`import { Field, Input } from '@/components/ui';

<Field
  label="이메일"
  required
  description="예약 안내를 받을 이메일을 입력해 주세요."
  errorMessage={emailError}
>
  <Input type="email" name="email" autoComplete="email" />
</Field>`}</Code>
      </Section>
    </>
  );
}
