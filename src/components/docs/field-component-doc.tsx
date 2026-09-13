import { Field, Input, Select } from '@/components/ui';
import { FieldPlayground } from '@/components/playgrounds/field-playground';
import { TextareaPlayground } from '@/components/playgrounds/textarea-playground';
import { Code, Section, Table } from '@/components/site/doc-parts';
import { destinationOptions } from '@/lib/control';

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
          <Field
            className="field-demo"
            label="이메일"
            labelWeight="bold"
            required
            description="예약 안내를 받을 이메일을 입력해 주세요."
          >
            <Input type="email" name="email" placeholder="name@example.com" />
          </Field>
        </div>
        <Table
          headings={['영역', '역할']}
          rows={[
            ['Header', '입력 레이블, 필수 또는 선택 표시, suffix 보조 액션'],
            ['Control', 'Input · Textarea · Select 중 하나'],
            ['Footer', '도움말 또는 오류 메시지, 선택적인 글자 수 카운터'],
          ]}
        />
      </Section>
      <Section title="States">
        <div className="field-examples">
          <div className="field-example">
            <Field
              label="이름"
              invalid
              errorMessage="예약자 이름을 입력해 주세요."
              description="예약에 사용할 이름입니다."
            >
              <Input placeholder="이름" />
            </Field>
          </div>
          <div className="field-example">
            <Field
              label="여행지"
              indicator="optional"
              description="아직 정하지 않았다면 나중에 선택하세요."
            >
              <Select
                options={destinationOptions}
                placeholder="여행지를 선택하세요"
              />
            </Field>
          </div>
          <div className="field-example">
            <Field
              label="예약 번호"
              readOnly
              description="예약 번호는 수정할 수 없습니다."
            >
              <Input defaultValue="RES-2048" />
            </Field>
          </div>
          <div className="field-example">
            <Field
              label="쿠폰 코드"
              disabled
              description="현재 사용할 수 있는 쿠폰이 없습니다."
            >
              <Input placeholder="쿠폰 코드" />
            </Field>
          </div>
        </div>
        <p>
          invalid 상태에서 오류 메시지가 있으면 도움말 대신 오류를 표시합니다.
          errorMessage만 전달하면 오류 상태로 처리하며, 메시지를 미리 준비해 둘
          때는 invalid를 명시적으로 제어하세요.
        </p>
      </Section>
      <Section title="Character Count">
        <TextareaPlayground />
        <p>
          count는 표시만 담당합니다. 값과 maxLength는 입력 컨트롤에서
          관리하세요. 위 예제는 네이티브 maxLength와 같은 UTF-16 길이인
          value.length를 사용하므로 이모지는 여러 단위로 계산될 수 있습니다.
          사용자에게 보이는 글자 단위를 사용할 때는 카운트와 제한 로직을 함께
          맞추세요. 카운터는 입력마다 실시간 알림을 보내지 않습니다.
        </p>
      </Section>
      <Section title="Guidelines">
        <ul>
          <li>
            레이블에는 입력할 값의 이름을 씁니다. placeholder는 입력 예시를
            제공합니다.
          </li>
          <li>
            Field의 직접 자식은 하나의 Input, Textarea 또는 Select로 구성합니다.
            보조 버튼은 suffix에 두고 type={'"button"'}을 지정하세요.
          </li>
          <li>
            자식의 명시 prop이 Field의 상태와 크기보다 우선합니다. 자식 id가
            있으면 레이블도 해당 id에 연결됩니다.
          </li>
          <li>
            직접 지정한 aria-describedby는 현재 표시 중인 메시지와 카운터 ID에
            병합됩니다. 외부 설명 요소는 호출부에서 제공해야 합니다.
          </li>
          <li>
            필수 의미는 컨트롤의 required로 전달됩니다. indicator={'"none"'}은
            시각적 표시만 숨깁니다.
          </li>
          <li>
            Checkbox·Radio 그룹에는 fieldset과 legend를 사용하고 각 항목의
            레이블을 유지하세요.
          </li>
          <li>검증 시점과 제출 상태는 폼을 사용하는 화면에서 관리합니다.</li>
        </ul>
        <p>
          구성과 메시지 표시는{' '}
          <a
            href="https://seed-design.io/components/field"
            target="_blank"
            rel="noreferrer"
          >
            SEED Field 가이드
          </a>
          를 참고하고, 색상과 간격은 이 프로젝트의 토큰을 사용합니다.
        </p>
      </Section>
      <Section title="API">
        <Table
          headings={['Prop', 'Type', '설명']}
          rows={[
            ['label', 'ReactNode', '필수 · 입력 컨트롤의 레이블'],
            [
              'children',
              'ReactElement',
              '하나의 직접 자식 Input / Textarea / Select',
            ],
            [
              'controlId',
              'string',
              '컨트롤 ID · 자식 id → controlId → 자동 생성 순서',
            ],
            ['id / className', 'string', 'Field 레이아웃 루트에 적용'],
            ['labelWeight', "'medium' | 'bold'", 'medium'],
            [
              'size',
              "'sm' | 'md' | 'lg' | 'xl'",
              '컨트롤에 상속 · 최종 기본값 md',
            ],
            [
              'disabled / readOnly / required',
              'boolean',
              '컨트롤에 상속 · 명시한 자식 prop 우선',
            ],
            [
              'invalid',
              'boolean',
              '생략 시 errorMessage 존재 여부 · 자식 aria-invalid 우선',
            ],
            [
              'indicator',
              "'auto' | 'optional' | 'none'",
              'auto · 필수일 때 별표, optional은 선택 항목에 (선택) 표시',
            ],
            [
              'description / errorMessage',
              'ReactNode',
              '오류 상태와 메시지가 함께 있으면 오류만 표시',
            ],
            ['suffix', 'ReactNode', '레이블 옆 보조 액션 슬롯'],
            [
              'count',
              '{ current: number; max: number }',
              '글자 수 표시 · 최대치 초과 시 오류 색상',
            ],
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
        <Code>{`<Field
  label="의견"
  count={{ current: value.length, max: 200 }}
  suffix={<button type="button" onClick={() => setValue('')}>지우기</button>}
>
  <Textarea
    value={value}
    onChange={(event) => setValue(event.target.value)}
    maxLength={200}
  />
</Field>`}</Code>
      </Section>
    </>
  );
}
