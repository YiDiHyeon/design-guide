import { TokenValue } from '@/components/site/token-value';
import { Button, buttonVariants, buttonSizes } from '@/components/ui';
import { ButtonPlayground } from '@/components/playgrounds/button-playground';
import { Section, Code, Table } from '@/components/site/doc-parts';
import { CornerDownRight, Plus, Check, X } from 'lucide-react';

export function ButtonDoc() {
  return (
    <>
      <Section title="Overview">
        <p>
          Button은 인터페이스의 주요 행동을 전달합니다. 중요도에 맞는 시각적
          강조와 명확한 레이블로 다음 행동을 예측할 수 있게 합니다.
        </p>
        <ButtonPlayground />
        <div className="callout">
          <span aria-hidden="true">
            <CornerDownRight size={15} />
          </span>
          <p>
            <strong>하나의 화면, 하나의 주요 행동.</strong> Primary 버튼은 가장
            중요한 행동에 사용하세요.
          </p>
        </div>
      </Section>

      <Section title="Anatomy">
        <p>
          컨테이너와 레이블이 기본 구조를 이루며, 아이콘은 행동의 의미를
          보완합니다.
        </p>
        <div className="anatomy-panel">
          <div className="anatomy-demo">
            <span className="anatomy-number">1</span>
            <Button tabIndex={-1}>
              <span>
                <Plus
                  size={14}
                  aria-hidden="true"
                  style={{ display: 'inline', verticalAlign: '-1px' }}
                />{' '}
                <sup>3</sup>
              </span>
              <span>
                새 프로젝트 <sup aria-hidden="true">2</sup>
              </span>
            </Button>
          </div>
          <div className="anatomy-legend">
            <span>
              <b>1</b> Container
            </span>
            <span>
              <b>2</b> Label
            </span>
            <span>
              <b>3</b> Icon · optional
            </span>
          </div>
        </div>
        <p className="caption">
          1. 컨테이너는 클릭 영역입니다. 2. 레이블은 행동을 설명합니다. 3.
          장식용 아이콘에는 aria-hidden을 적용합니다.
        </p>
        <p className="caption">
          번호는 구성 요소를 구분하기 위한 표시이며, 배치 순서를 뜻하지
          않습니다. 아이콘(3)은 행동의 의미에 따라 레이블(2) 앞이나 뒤에 배치할
          수 있습니다.
        </p>
      </Section>

      <Section title="Variants">
        <p>
          행동의 중요도와 의미를 기준으로 다섯 가지 스타일을 제공합니다. 아이콘
          전용 형태는 별도 variant가 아니라 <code>iconOnly</code> 옵션으로 표현합니다.
        </p>
        <div className="variant-grid">
          {buttonVariants.map((v, i) => (
            <div className="variant-card" key={v}>
              <div>
                <Button variant={v}>시작하기</Button>
              </div>
              <h3>
                {['Primary', 'Secondary', 'Outline', 'Ghost', 'Danger'][i]}
              </h3>
              <p>
                {
                  [
                    '화면에서 가장 중요한 단일 행동',
                    '주요 행동을 보조하는 선택',
                    '중립적인 경계가 필요한 행동',
                    '시각적 강조가 낮은 도구형 행동',
                    '삭제처럼 되돌리기 어려운 행동',
                  ][i]
                }
              </p>
              <code>variant=&quot;{v}&quot;</code>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Sizes">
        <p>
          인라인 보조 행동을 위한 xs부터 주요 행동을 위한 xl까지 다섯 단계를
          제공합니다. 기본 md는 40px이며, 모바일의 주요 행동에는 lg(48px) 이상을
          권장합니다.
        </p>
        <Table
          headings={['Size', '미리보기 (Preview)', '높이 (Height)', '좌우 여백 (Padding X)', '폰트 크기 (Font Size)']}
          rows={buttonSizes.map((size) => [
            <code key={size} className="font-bold text-primary">
              {size}
            </code>,
            <div key={`p-${size}`} className="py-0.5">
              <Button size={size}>시작하기</Button>
            </div>,
            <TokenValue key={`h-${size}`} name={`--guide-component-${size}-height`} />,
            <TokenValue key={`p-${size}`} name={`--guide-component-${size}-padding-x`} />,
            <TokenValue key={`f-${size}`} name={`--guide-component-${size}-font-size`} />,
          ])}
        />
      </Section>

      <Section title="States">
        <p>
          마우스를 올리거나 누르고, Tab으로 이동해 실제 상태를 확인하세요.
          Hover·Pressed·Focus는 아래에서 시각적으로 고정한 예시입니다.
        </p>
        <div className="states-grid">
          {['Default', 'Hover', 'Pressed', 'Focus', 'Disabled', 'Loading'].map(
            (state) => (
              <div key={state}>
                <Button
                  className={`example-${state.toLowerCase()}`}
                  disabled={state === 'Disabled'}
                  loading={state === 'Loading'}
                >
                  {state === 'Loading' ? '저장 중' : '시작하기'}
                </Button>
                <span>{state}</span>
              </div>
            ),
          )}
        </div>
        <div className="callout">
          <span aria-hidden="true">⌨</span>
          <p>
            <strong>키보드도 같은 경험으로.</strong> Tab으로 포커스를 이동하고
            Enter 또는 Space로 실행합니다. Disabled와 Loading은 실행을
            차단합니다.
          </p>
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
            <p>“변경사항 저장”처럼 구체적인 동사로 작성합니다.</p>
            <p>주요 행동은 Solid(Primary) 하나로 명확하게 표현합니다.</p>
            <p>로딩 중에는 “저장 중”처럼 현재 상황을 명시합니다.</p>
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
            <p>“여기 클릭”처럼 결과를 알 수 없는 모호한 레이블을 쓰지 않습니다.</p>
            <p>페이지 이동에는 버튼 대신 링크(a 태그)를 사용합니다.</p>
            <p>색상만으로 의미를 전달하거나 포커스 링 표시를 제거하지 않습니다.</p>
          </div>
        </div>
      </Section>

      <Section title="API">
        <p>
          기본 HTML button 속성과 React ref를 지원합니다. 아이콘 전용 버튼에는
          aria-label을 반드시 제공합니다. 기본 type은 의도하지 않은 폼 제출을
          방지하는 button입니다.
        </p>
        <Table
          headings={['Prop', 'Type', 'Default', 'Description']}
          rows={[
            [
              'variant',
              buttonVariants.join(' | '),
              "'primary'",
              '시각적 위계 및 의미 스타일',
            ],
            ['size', buttonSizes.join(' | '), "'md'", '버튼 높이와 내부 여백, 폰트 크기'],
            ['disabled', 'boolean', 'false', '클릭 조작 차단 및 비활성화 스타일'],
            ['loading', 'boolean', 'false', '스피너 표시 및 클릭 차단 상태'],
            ['fullWidth', 'boolean', 'false', '가로 100% 너비 확장 여부'],
            ['iconOnly', 'boolean', 'false', '정사각형 아이콘 전용 버튼 형태'],
            [
              'type',
              '"button" | "submit" | "reset"',
              '"button"',
              'HTML 표준 버튼 동작 타입 (기본 "button")',
            ],
            ['children', 'ReactNode', '—', '버튼 레이블 및 아이콘'],
            [
              '…native props',
              'ComponentProps<"button">',
              '—',
              'onClick, aria-label, name 등 HTML 표준 속성',
            ],
          ]}
        />
      </Section>

      <Section title="Code Example">
        <Code>{`'use client';

import { useState } from 'react';
import { Button } from '@/components/ui';

export default function Example() {
  const [saved, setSaved] = useState(false);
  return (
    <div>
      <Button onClick={() => setSaved(true)}>
        변경사항 저장
      </Button>
      <p role="status">{saved ? '저장했습니다.' : ''}</p>
    </div>
  );
}`}</Code>
        <p className="caption">
          전역 스타일을 불러온 앱에서 사용합니다. 토큰 연결:{' '}
          <code>--guide-brand-600 → --guide-button-primary-default-bg</code>
        </p>
      </Section>
    </>
  );
}
