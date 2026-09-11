# Design Guide

site Primitive·Semantic 토큰 명세를 사용하는 독립적인 개인 디자인 시스템 문서 사이트입니다. Next.js App Router + TypeScript + Tailwind CSS로 구현했습니다.

## 실행

Node.js 20.9 이상 (Node.js 24 검증).

```sh
npm ci
npm run dev
```

개발 주소: http://localhost:3000. `/`는 `/components/button`으로 이동합니다.

```sh
npm run build
npm run start
```

다른 레포, 환경 변수, 외부 서비스에 의존하지 않습니다. 버전은 `package-lock.json`으로 고정합니다.

## 토큰 기준

`src/tokens/site-spec.json`이 독립적인 토큰 명세입니다. 참고 저장소의 다음 경로만 읽어 이름·값·매핑·반응형 정의를 추출했습니다.

- `packages/ui-core-user/src/css/site/primitive.css`: Primitive 110개
- `packages/ui-core-user/src/css/site/semantic.css`, `styles.css`: Semantic 기본 153개, Tablet override 26개, Desktop override 15개. 그림자·스크림 효과 포함
- `packages/ui-core-user/src/css/site/component.css`: Button·Input·Select와 공통 Component size 125개
- `packages/ui-core-user/src/components/site/button.tsx`: 스타일·크기 API 참고

참고 레포의 파일은 수정하지 않았습니다. 토큰 명세를 보존하고 React 컴포넌트와 문서 UI는 이 레포에서 독립적으로 구현했습니다. 원본 CVA/Radix/모노레포 유틸리티에 의존하지 않습니다.

```text
--site-gray-0 → --site-text-on-solid → --site-button-solid-default-text
--site-space-16 → --site-sp-md (Mobile)
--site-height-40 → --site-component-md-height
```

이름과 매핑을 임의로 재설계하지 않습니다. 원본에는 Component에서 Primitive로 직접 연결하는 경우와 Semantic 내부의 레이아웃·효과 원시 값도 있습니다. 이를 숨기거나 다른 이름으로 바꾸지 않고 보존합니다.

- Mobile 기본, Tablet ≥768px, Desktop ≥1280px
- `sp-md`: 16 / 18 / 20px. `gap-md`: 12 / 12 / 12px
- `tit-display-hero`: 30 / 36 / 40px
- `site-font-sans`의 외부 글꼴 변수는 로컬에서 `--font-pretendard: 'Pretendard'`로 연결합니다. 설치된 Pretendard가 없으면 원본의 system-ui fallback을 사용합니다. 폰트 파일은 포함하지 않습니다.
- 문서의 현재 값은 CSS에서 직접 읽고 화면 크기 변경 시 갱신합니다.
- 모든 Primitive·Semantic은 Colors의 전체 명세에서 조회할 수 있습니다. 각 Foundations 페이지에는 관련 토큰과 사용 예제를 별도로 제공합니다.

명세 변경 후 생성 파일을 갱신하세요.

```sh
npm run tokens:generate
```

이 명령은 **새 레포의 JSON만** 읽습니다. 참고 레포에 접근하지 않습니다. 생성된 CSS는 함께 버전 관리합니다.

## 문서와 구조

- `/foundations/colors`: 원본 전체 팔레트, 색상 역할, 계층, 전체 Primitive/Semantic 명세
- `/foundations/typography`: 원시 크기·굵기·행간, 모든 반응형 타입 역할, 실제 Text Style 예시
- `/foundations/spacing`: 원본 Space 스케일, sp/gap 분리, 반응형 매핑, 레이아웃 역할
- `/components/input`, `/components/select`: 실제 필드, 상태 조절, 원본 토큰·크기·API·접근성 가이드
- `/components/button`: Overview, Anatomy, Variants, Sizes, States, Guidelines, API, Code Example

데스크톱은 탐색 / 본문 / 목차 3열이며, 1180px 이하에서 우측 목차를 숨깁니다. 760px 이하에서는 네이티브 `details`로 모바일 탐색·목차를 제공합니다. 이 문서 레이아웃의 축소 지점은 제품 토큰의 768/1280 반응형 기준과 별개입니다.

```text
src/tokens/site-spec.json         원본 기준의 토큰·타입 스타일 명세
scripts/generate-tokens.mjs       로컬 명세 → CSS 생성
src/styles/tokens/primitive.css   생성된 Primitive
src/styles/tokens/semantic.css    생성된 Semantic + 반응형
src/styles/tokens/component.css   생성된 Button·크기 토큰
src/styles/typography.css         생성된 Text Style
src/styles/utilities.css          역할 기반 Tailwind utility
src/styles/button.css            Button 스타일
src/styles/fields.css            Input·Select 스타일
src/styles/checkbox.css          Checkbox 스타일
src/styles/radio.css             Radio 스타일
src/styles/badge.css             Badge 스타일
src/components/ui/               순수 디자인 시스템 UI 컴포넌트 (Button, Input, Select, Checkbox, Radio, Badge)
src/components/docs/             문서 페이지 컴포넌트 (*-doc.tsx)
src/components/playgrounds/      인터랙티브 실시간 조작기 (*-playground.tsx)
src/components/site/             가이드 사이트 셸, 랜딩, 공통 요소 (DocsShell, LandingPage, DocParts)
src/lib/docs.ts                  문서 목록 및 목차
src/lib/tokens.ts                명세 조회와 반응형 값 해석
src/app/[category]/[slug]/page.tsx 정적 문서 경로
src/app/globals.css              Tailwind 연결과 전역 스타일
tests/tokens.test.mjs            토큰 정합성 검증
```

Tailwind 기본 숫자 스케일을 덮어쓰지 않습니다. `p-sp-md`, `gap-md`, `text-body`, `bg-base`, `border-default` 등 역할 기반 유틸리티와 `text-tit-main-page`, `text-txt-body-main` 등 타입 스타일을 사용합니다.

## Button

- variant: `solid`, `secondary`, `line`, `line-icon`, `circle-light`, `circle-dark`, `solid-light`
- size: `xxxs`, `xxs`, `xs`, `sm`, `md`, `lg`, `xl`, `xxl`, `xxxl`
- 높이: 24 / 28 / 32 / 36 / 40 / 44 / 48 / 52 / 56px
- 기본값: `solid`, `md`, `type="button"`; 원본 radius 4px
- HTML button 속성과 React ref, `disabled`, `loading`, `fullWidth` 지원
- 아이콘 전용 사용 시 `aria-label` 필수

원본에 정의된 상태 색상을 사용합니다. 원본에 disabled 토큰이 없는 circle / solid-light에는 기존 `site-bg-disabled`와 `site-text-on-disabled`를 적용했습니다. 로딩 시 실행을 차단하고 `aria-busy`를 제공합니다. 원본에 없는 loading/fullWidth 동작은 문서 사이트의 부가 API입니다.

최소 크기를 임의로 44px로 늘리지 않습니다. 터치 환경에서 44px 영역이 필요하면 lg 이상을 선택하거나 별도의 터치 영역을 확보하세요. 원본의 모든 색상 조합이 작은 텍스트의 4.5:1 대비를 만족한다고 가정하지 않습니다. 색상 값은 보존하고 사용 맥락에 맞게 검토합니다.

키보드 Enter/Space 실행, `focus-visible`, 본문 건너뛰기, 현재 페이지/목차 ARIA, 상태 안내, 모션 감소, 강제 색상 모드를 고려했습니다.

## 확장

`src/lib/docs.ts`에 새 문서를 등록하고, `button-doc.tsx`의 8개 섹션과 `Section`, `Table`, `Code`, `DocsShell`을 재사용하세요. 문서 라우트에 본문을 연결하면 내비게이션·목차·정적 경로는 등록 정보에서 생성됩니다. 컴포넌트 토큰은 명세에 추가 후 CSS를 생성합니다.

## 검증

```sh
npm run tokens:generate
npm run lint
npm run typecheck
npm test
npm run format:check
npm run build
```

7개 테스트는 전체 토큰 참조, 생성 CSS와 명세의 이름·값·breakpoint 일치, 토큰 개수, 반응형 타입·sp/gap, 원본 Button 크기·색상·radius, CSS의 미정의 변수 여부를 검사합니다. 원본과의 정합성은 이번 수정에서 지정 경로를 읽어 별도로 대조했으며, 일반 실행·검증은 참고 레포가 없어도 가능합니다.

## Input / Select

`src/components/input.tsx`, `select.tsx`와 `src/styles/fields.css`에서 구현합니다. 가이드는 `field-doc.tsx`, 실시간 예제는 `field-playground.tsx`입니다. 원본의 Input 17개, Select 17개 상태 토큰과 공통 9개 크기를 그대로 사용합니다.

Input은 startIcon/endIcon과 네이티브 input 속성을 지원합니다. Select는 네이티브 단일 선택과 options 배열을 사용하며, 원본 Radix 합성 API는 제공하지 않습니다. 열린 목록의 외형은 운영체제·브라우저를 따릅니다. Select의 readOnly는 레이블을 읽기 전용 텍스트 필드로 표시하고 hidden input으로 실제 값을 전송합니다. disabled는 폼 전송에서 제외됩니다.


