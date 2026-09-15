import { Check, X } from 'lucide-react';
import { Field, Textarea } from '@/components/ui';
import { TextareaPlayground } from '@/components/playgrounds/textarea-playground';
import { Code, Section, Table } from '@/components/site/doc-parts';
import { TokenValue } from '@/components/site/token-value';

export function TextareaDoc() {
  return (
    <>
      <Section title="Overview">
        <p>
          Textarea는 의견, 설명, 메모처럼 여러 줄의 자유로운 텍스트를 입력할 때
          사용합니다. Input과 동일한 상태 및 크기 계약을 공유합니다.
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
            <Field
              label="1. 레이블"
              description="4. 보조 도움말 또는 오류 안내"
              count={{ current: 24, max: 200 }}
            >
              <Textarea
                id="textarea-anatomy"
                resize="vertical"
                defaultValue="2. 입력 컨테이너 & 3. 텍스트 내용입니다."
              />
            </Field>
          </div>
        </div>
        <Table
          headings={['번호', '구성 요소', '역할']}
          rows={[
            ['1', 'Label', '필드 이름. htmlFor와 id로 자동 연결'],
            ['2', 'Container', '외곽 테두리, 배경 및 포커스 링'],
            ['3', 'Value / Placeholder', '사용자가 입력한 텍스트 또는 힌트 문구'],
            ['4', 'Description / Error', 'aria-describedby로 연결되는 안내 및 에러 메시지'],
            [
              '5',
              'Character count',
              '현재 글자 수 및 최대 허용 글자 수 (선택 사항)',
            ],
            [
              '6',
              'Resize handle',
              '사용자가 세로 방향으로 크기를 조절할 수 있는 우하단 핸들 (선택 사항)',
            ],
          ]}
        />
      </Section>

      <Section title="Sizes">
        <p>
          Textarea의 크기(<code>size</code>)는 높이가 아니라 내부 여백과 글자
          크기(Typography)를 제어합니다. 높이는 <code>rows</code> 속성으로
          입력량에 맞게 조절합니다.
        </p>

        <Table
          headings={['Size', '글자 크기', '미리보기 (Preview)', '권장 rows & 사용 맥락']}
          rows={[
            [
              <code key="sm" className="font-bold text-primary">
                sm
              </code>,
              <TokenValue key="f-sm" name="--guide-component-sm-font-size" />,
              <Textarea
                key="t-sm"
                size="sm"
                rows={2}
                placeholder="간단한 메모 또는 1~2줄 코멘트"
              />,
              'rows 2~3 · 컴팩트 모달, 좁은 사이드바 패널, 단답형 메모',
            ],
            [
              <code key="md" className="font-bold text-primary">
                md
              </code>,
              <TokenValue key="f-md" name="--guide-component-md-font-size" />,
              <Textarea
                key="t-md"
                size="md"
                rows={2}
                placeholder="상세한 의견을 작성해 주세요"
              />,
              'rows 3~5 (기본) · 고객 문의, 피드백, 표준 폼 설명 입력',
            ],
            [
              <code key="lg" className="font-bold text-primary">
                lg
              </code>,
              <TokenValue key="f-lg" name="--guide-component-lg-font-size" />,
              <Textarea
                key="t-lg"
                size="lg"
                rows={2}
                placeholder="본문 내용을 상세히 작성해 주세요"
              />,
              'rows 5+ · 장문 에세이/소개 작성, 모바일 터치 중심 인터페이스',
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
              <span key="s-def" className="font-semibold text-primary">
                Default
              </span>,
              <Textarea
                key="t-def"
                size="md"
                rows={2}
                placeholder="내용을 입력하세요"
              />,
              '사용자의 입력을 기다리는 기본 활성 상태',
            ],
            [
              <span key="s-err" className="font-semibold text-primary">
                Error
              </span>,
              <Textarea
                key="t-err"
                size="md"
                rows={2}
                aria-invalid="true"
                defaultValue="부적절한 내용이 포함되어 있습니다."
              />,
              '유효성 검증 실패 시 강조 테두리(Red)와 aria-invalid 적용',
            ],
            [
              <span key="s-ro" className="font-semibold text-primary">
                ReadOnly
              </span>,
              <Textarea
                key="t-ro"
                size="md"
                rows={2}
                readOnly
                defaultValue="수정은 불가하나 복사 가능한 내용입니다."
              />,
              '값 수정은 차단되지만 텍스트 선택 및 클립보드 복사는 허용',
            ],
            [
              <span key="s-dis" className="font-semibold text-primary">
                Disabled
              </span>,
              <Textarea
                key="t-dis"
                size="md"
                rows={2}
                disabled
                defaultValue="입력이 비활성화된 상태입니다."
              />,
              '조작 및 폼 전송에서 완전히 제외되는 비활성화 상태',
            ],
          ]}
        />
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
          headings={['Prop', 'Type', 'Default', 'Description']}
          rows={[
            ['size', "'sm' | 'md' | 'lg'", "'md'", '내부 여백과 글자 크기 스케일'],
            ['resize', "'vertical' | 'none'", "'none'", '우하단 리사이즈 핸들 허용 방향'],
            ['rows', 'number', '4', '기본으로 노출될 텍스트 줄 수'],
            ['disabled', 'boolean', 'false', '조작 불가 및 폼 전송 제외 여부'],
            ['readOnly', 'boolean', 'false', '수정 불가 및 텍스트 복사 허용 여부'],
            ['aria-invalid', 'boolean | "true" | "false"', 'undefined', '오류 상태 테두리 강조 표시'],
            ['wrapperClassName', 'string', "''", '외곽 래퍼 컨테이너 커스텀 클래스'],
            ['className', 'string', "''", '내부 textarea 요소 커스텀 클래스'],
            [
              '…native props',
              'ComponentProps<"textarea">',
              '—',
              'maxLength, name, required, placeholder 등 HTML 표준 속성',
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
