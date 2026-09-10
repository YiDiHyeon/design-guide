import { Code, Section } from './doc-parts';
import { TokenValue } from './token-value';
import { TokenCatalog } from './token-catalog';
import {
  spec,
  primitiveNames,
  semanticNames,
  typographyNames,
} from '@/lib/tokens';

export function FoundationDoc({ slug }: { slug: string }) {
  if (slug === 'colors')
    return (
      <>
        <Section title="Overview">
          <p>
            참고 저장소의 site 토큰 이름과 값을 기준으로 합니다. Gray, Blue,
            Red, Green, Orange 원시 팔레트에 텍스트·배경·경계·아이콘·브랜드
            역할을 연결합니다.
          </p>
          <div className="color-hero">
            <span>
              Primitive values.
              <br />
              <strong>Semantic meaning.</strong>
            </span>
            <div className="color-orbits" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
          </div>
        </Section>
        <Section title="Primitive palette">
          <p>
            원본 Primitive 팔레트 전체입니다. 스와치와 표시 값은 실제 CSS 변수를
            사용합니다.
          </p>
          {['gray', 'blue', 'red', 'green', 'orange'].map((group) => (
            <div className="palette-group" key={group}>
              <h3>{group}</h3>
              <div className="palette">
                {primitiveNames
                  .filter((name) => name.startsWith(`--site-${group}-`))
                  .map((name) => (
                    <div key={name}>
                      <div
                        className="swatch"
                        style={{ background: `var(${name})` }}
                      />
                      <span>{name.replace('--site-', '')}</span>
                      <TokenValue name={name} />
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </Section>
        <Section title="Semantic colors">
          <p>
            색의 원시 값과 역할 이름을 분리합니다. 예를 들어 text/point는 Red
            500, text/link는 Blue 500입니다.
          </p>
          <TokenCatalog
            names={semanticNames.filter((name) =>
              /^--site-(text-|bg-|line-|brand-|overlay-|icon-.*-color)/.test(
                name,
              ),
            )}
          />
        </Section>
        <Section title="Token hierarchy">
          <div className="token-flow">
            <div>
              <small>PRIMITIVE</small>
              <code>--site-gray-0</code>
              <TokenValue name="--site-gray-0" />
            </div>
            <span>→</span>
            <div>
              <small>SEMANTIC</small>
              <code>--site-text-on-solid</code>
              <span>단색 배경 위 텍스트</span>
            </div>
            <span>→</span>
            <div>
              <small>COMPONENT</small>
              <code>--site-button-solid-default-text</code>
              <span>Solid 레이블</span>
            </div>
          </div>
          <Code>{`/* Primitive */\n--site-gray-0: #ffffff;\n/* Semantic */\n--site-text-on-solid: var(--site-gray-0);\n/* Component */\n--site-button-solid-default-text: var(--site-text-on-solid);`}</Code>
          <p>
            원본의 매핑을 보존합니다. 일부 Component 토큰은 Primitive를 직접
            참조하며, Semantic의 레이아웃·효과 값 중에는 원시 수치도 있습니다.
            계층을 맞추기 위해 이 매핑을 임의로 바꾸지 않습니다.
          </p>
          <details className="token-catalog">
            <summary>전체 Primitive 명세 · {primitiveNames.length}개</summary>
            <TokenCatalog names={primitiveNames} />
          </details>
          <details className="token-catalog">
            <summary>
              전체 Semantic 명세 · {semanticNames.length}개 (효과·레이아웃 포함)
            </summary>
            <TokenCatalog names={semanticNames} responsive />
          </details>
        </Section>
        <Section title="Guidelines">
          <ul>
            <li>화면에서는 의미에 맞는 Semantic 이름을 우선 사용합니다.</li>
            <li>
              원본 팔레트를 임의로 어둡게 보정하지 않습니다.
              text/link·point·상태 색상의 작은 텍스트 사용은 배경과의 대비를
              별도로 확인합니다.
            </li>
            <li>
              색상 외에 레이블과 아이콘으로 오류·선택 상태를 함께 전달합니다.
            </li>
            <li>문서 UI와 실제 Button 모두 같은 site 토큰을 참조합니다.</li>
          </ul>
        </Section>
      </>
    );
  if (slug === 'typography')
    return (
      <>
        <Section title="Overview">
          <p>
            원본 site의 글꼴 크기·굵기·행간과 반응형 Text Style을 사용합니다.
            Mobile 기본값에 768px Tablet, 1280px Desktop 매핑을 적용합니다.
          </p>
          <div className="type-hero">
            <span>Aa 가나다</span>
            <p>같은 토큰으로 이어지는 읽기 경험.</p>
            <code>--site-font-base → --site-font-sans</code>
          </div>
          <p className="caption">
            Pretendard가 설치되어 있으면 사용하고, 없으면 system-ui로
            표시합니다. 이 레포는 외부 폰트 파일에 의존하지 않습니다.
          </p>
        </Section>
        <Section title="Type scale">
          <h3>Primitive · Size / Weight / Line height</h3>
          <TokenCatalog
            names={primitiveNames.filter((name) =>
              /^--site-(size-|fw-|lh-|font-)/.test(name),
            )}
          />
          <h3 className="mt-8">Semantic · 반응형 타입 스케일 전체</h3>
          <TokenCatalog names={typographyNames} responsive />
        </Section>
        <Section title="Usage">
          <p>
            Text Style은 크기뿐 아니라 원본의 굵기·행간·자간을 함께 사용합니다.
            아래 예시는 실제 스타일로 렌더링됩니다.
          </p>
          {Object.keys(spec.typography).map((name) => (
            <div key={name} className="token-specimen">
              <code>{name}</code>
              <p className={name}>일관된 경험을 만드는 디자인 0123456789</p>
            </div>
          ))}
          <Code>{`<h1 className="text-tit-main-page">페이지 제목</h1>\n<h2 className="text-tit-section-title">섹션 제목</h2>\n<p className="text-txt-body-main">본문 내용</p>\n<small className="text-txt-caption">보조 설명</small>`}</Code>
        </Section>
        <Section title="Guidelines">
          <ul>
            <li>body-main은 Mobile 13px, Tablet·Desktop 14px입니다.</li>
            <li>
              기본 행간은 1.5, 제목 행간은 1.3입니다. nav/tab-label은 원본의
              1.4를 사용합니다.
            </li>
            <li>
              시각적 크기와 별개로 HTML 제목의 h1 → h2 → h3 순서를 유지합니다.
            </li>
            <li>화면 크기를 변경하면 표의 현재 값과 예시가 함께 바뀝니다.</li>
          </ul>
        </Section>
      </>
    );
  const spaces = primitiveNames.filter((name) =>
    name.startsWith('--site-space-'),
  );
  return (
    <>
      <Section title="Overview">
        <p>
          원본의 Space 스케일과 sp / gap 역할을 그대로 사용합니다. sp와 gap은
          같은 이름이어도 값이 다르며, 일부 값은 화면 크기에 따라 달라집니다.
        </p>
        <div className="spacing-hero">
          <div>
            <span>sp ≠ gap</span>
            <div>서로 다른 역할, 명확한 간격</div>
            <small>Mobile → Tablet → Desktop</small>
          </div>
        </div>
      </Section>
      <Section title="Spacing scale">
        <div className="spacing-scale">
          {spaces.map((name) => (
            <div key={name}>
              <code>{name}</code>
              <TokenValue name={name} />
              <div style={{ width: `var(${name})` }} />
            </div>
          ))}
        </div>
        <details className="token-catalog">
          <summary>Height / Radius / Border / Touch / Layout Primitive</summary>
          <TokenCatalog
            names={primitiveNames.filter((name) =>
              /^--site-(height-|radius-|border-|touch-|container-|grid-|breakpoint-)/.test(
                name,
              ),
            )}
          />
        </details>
      </Section>
      <Section title="Semantic spacing">
        <h3>sp · Padding / Margin</h3>
        <TokenCatalog
          names={semanticNames.filter((name) => name.startsWith('--site-sp-'))}
          responsive
        />
        <h3 className="mt-8">gap · 요소 사이 간격</h3>
        <TokenCatalog
          names={semanticNames.filter((name) => name.startsWith('--site-gap-'))}
          responsive
        />
        <details className="token-catalog">
          <summary>Layout / Radius / Touch 역할</summary>
          <TokenCatalog
            names={semanticNames.filter((name) =>
              /^--site-(breakpoint-|container-|margin-|grid-|radius-|touch-)/.test(
                name,
              ),
            )}
            responsive
          />
        </details>
        <Code>{`<div className="flex gap-md p-sp-md">관련 요소</div>\n\n/* Mobile: sp-md 16px / gap-md 12px\n   Tablet: sp-md 18px / gap-md 12px\n   Desktop: sp-md 20px / gap-md 12px */`}</Code>
      </Section>
      <Section title="Guidelines">
        <ul>
          <li>margin/padding에는 sp, 요소 사이 간격에는 gap을 사용합니다.</li>
          <li>기본 Tailwind 숫자 스케일을 덮어쓰지 않습니다.</li>
          <li>
            Button의 md 높이는 40px입니다. 44px 터치가 필요한 환경에는 lg 이상을
            선택하거나 별도 터치 영역을 확보합니다.
          </li>
          <li>원본의 반응형 기준은 768px와 1280px입니다.</li>
        </ul>
      </Section>
    </>
  );
}
