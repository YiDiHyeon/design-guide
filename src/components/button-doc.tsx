import { TokenValue } from './token-value';
import { Button, buttonVariants, buttonSizes } from './button';
import { ButtonPlayground } from './button-playground';
import { Section, Code, Table } from './doc-parts';
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
            <strong>하나의 화면, 하나의 주요 행동.</strong> Solid 버튼은 가장
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
          수 있습니다. 즉, 1번 컨테이너 안에서 3 → 2 또는 2 → 3 순서를 모두
          사용할 수 있습니다.
        </p>
      </Section>
      <Section title="Variants">
        <p>원본의 일곱 가지 Button 스타일을 사용합니다.</p>
        <div className="variant-grid">
          {buttonVariants.map((v, i) => (
            <div className="variant-card" key={v}>
              <div>
                <Button
                  variant={v}
                  aria-label={
                    v.includes('circle') || v === 'line-icon'
                      ? '추가'
                      : undefined
                  }
                >
                  {v.includes('circle') || v === 'line-icon' ? (
                    <Plus size={16} aria-hidden="true" />
                  ) : (
                    '시작하기'
                  )}
                </Button>
              </div>
              <h3>
                {
                  [
                    'Solid',
                    'Secondary',
                    'Line',
                    'Line icon',
                    'Circle light',
                    'Circle dark',
                    'Solid light',
                  ][i]
                }
              </h3>
              <p>
                {
                  [
                    '가장 중요한 주요 행동',
                    '보조 행동을 위한 단색 버튼',
                    '테두리로 구분하는 행동',
                    '아이콘 전용 테두리 버튼',
                    '밝은 원형 아이콘 버튼',
                    '어두운 원형 아이콘 버튼',
                    '밝은 단색 버튼',
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
          원본 Component 크기 9가지를 제공합니다. 기본 md는 40px이며, 터치
          환경에서는 lg(44px) 이상을 권장합니다.
        </p>
        <div className="sample-row">
          {buttonSizes.map((size) => (
            <div key={size}>
              <Button size={size}>시작하기</Button>
              <span>
                {size} · <TokenValue name={`--site-component-${size}-height`} />
              </span>
            </div>
          ))}
        </div>
        <Table
          headings={['Size', 'Height', 'Padding X', 'Font size']}
          rows={buttonSizes.map((size) => [
            size,
            <TokenValue key="h" name={`--site-component-${size}-height`} />,
            <TokenValue key="p" name={`--site-component-${size}-padding-x`} />,
            <TokenValue key="f" name={`--site-component-${size}-font-size`} />,
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
            <p>주요 행동은 Solid 하나로 명확하게 표현합니다.</p>
            <p>로딩 중에는 “저장 중”처럼 현재 상황을 설명합니다.</p>
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
            <p>“여기 클릭”처럼 결과를 알 수 없는 레이블을 쓰지 않습니다.</p>
            <p>이동에는 버튼 대신 링크를 사용합니다.</p>
            <p>색상만으로 의미를 전달하거나 포커스 표시를 제거하지 않습니다.</p>
          </div>
        </div>
      </Section>
      <Section title="API">
        <p>
          기본 HTML button 속성과 React ref를 지원합니다. 아이콘 전용 버튼에는
          aria-label을 제공합니다. 기본 type은 의도하지 않은 폼 제출을 방지하는
          button입니다.
        </p>
        <Table
          headings={['Prop', 'Type', 'Default']}
          rows={[
            [
              <code key="v">variant</code>,
              buttonVariants.join(' | '),
              '"solid"',
            ],
            [<code key="s">size</code>, buttonSizes.join(' | '), '"md"'],
            [<code key="d">disabled</code>, 'boolean', 'false'],
            [<code key="l">loading</code>, 'boolean', 'false'],
            [<code key="f">fullWidth</code>, 'boolean', 'false'],
            [
              <code key="t">type</code>,
              '"button" | "submit" | "reset"',
              '"button"',
            ],
            [<code key="c">children</code>, 'ReactNode', '—'],
            [
              <code key="n">…native props</code>,
              'ComponentProps<"button">',
              '—',
            ],
          ]}
        />
      </Section>
      <Section title="Code Example">
        <Code>{`'use client';\n\nimport { useState } from 'react';\nimport { Button, buttonVariants, buttonSizes } from '@/components/button';\n\nexport default function Example() {\n  const [saved, setSaved] = useState(false);\n  return (\n    <div>\n      <Button onClick={() => setSaved(true)}>\n        변경사항 저장\n      </Button>\n      <p role="status">{saved ? '저장했습니다.' : ''}</p>\n    </div>\n  );\n}`}</Code>
        <p className="caption">
          전역 스타일을 불러온 앱에서 사용합니다. 토큰 연결:{' '}
          <code>
            --site-gray-0 → --site-text-on-solid →
            --site-button-solid-default-text
          </code>
        </p>
      </Section>
    </>
  );
}
