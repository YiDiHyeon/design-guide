# Design Guide

개인 웹서비스와 토이 프로젝트에서 재사용하기 위한 중립적인 디자인 기반입니다. 특정 브랜드에 종속되지 않는 Core 토큰과 컴포넌트를 제공하고, 프로젝트별 Theme이 의미 기반 토큰을 덮어쓰는 구조로 설계했습니다.

당근의 SEED Design을 비롯한 공개 디자인 시스템의 계층화와 문서화 방식을 학습 자료로 참고했지만, 이 프로젝트의 토큰 값·이름·컴포넌트 정책은 개인 웹서비스의 요구에 맞춰 독립적으로 설계했습니다. SEED Design 및 특정 회사와 공식적인 관련이 없습니다.

## 원칙

- **Clear**: 정보 위계와 인터랙션 상태를 즉시 구분합니다.
- **Calm**: 장식보다 콘텐츠와 구조를 우선합니다.
- **Adaptable**: Core는 중립적으로 유지하고 프로젝트별 Theme을 적용합니다.
- **Accessible**: 색상 대비, 키보드 조작, 포커스 표시와 터치 크기를 기본 조건으로 둡니다.

## 실행

Node.js 20.9 이상이 필요합니다.

```sh
npm ci
npm run dev
```

개발 주소는 `http://localhost:3000`입니다.

## 토큰 구조

`src/tokens/core-tokens.json`이 단일 토큰 명세입니다.

```text
Primitive → Semantic → Component
                  ↑
                Theme
```

- **Primitive**: 색, 크기, 간격, radius처럼 의미를 부여하기 전의 값
- **Semantic**: text, background, border, action, feedback 같은 UI 역할
- **Component**: Button과 Field가 상태별로 소비하는 계약
- **Theme**: Semantic과 필요한 Component 토큰만 덮어쓰는 프로젝트별 브랜드 계층

기본 브랜드 컬러는 단단한 Cabinet Olive(#38471D)를 메인(Primary)으로 하며, Fresh Olive(#7F9445), Butter Yellow(#F5CA45), Cream(#FFF8E5), Deep Ink(#23281D), Tomato Coral(#E66F4F)의 보조 컬러와 고대비 Neutral 팔레트로 구성되어 있습니다.

## 주요 기준

- 본문 기본 크기 16px, 기본 행간 1.5
- 4px 기반 간격 스케일
- Control 크기: `sm` 32px, `md` 40px, `lg` 48px, `xl` 56px
- Button 역할: `primary`, `secondary`, `outline`, `ghost`, `danger`
- 아이콘 전용 Button은 `iconOnly`와 접근 가능한 이름을 함께 사용
- Mobile-first, 주요 반응형 기준 768px / 1280px

## 문서

- `/foundations/colors`: Primitive 팔레트, Semantic 색상, 토큰 계층
- `/foundations/typography`: 타입 스케일과 사용 원칙
- `/foundations/spacing`: 4px 기반 간격, layout·radius·touch 토큰
- `/components/*`: Button, Input, Select, Checkbox, Radio, Badge의 사용법과 API

## 토큰 생성

명세를 변경한 뒤 생성 CSS를 갱신합니다.

```sh
npm run tokens:generate
```

생성 대상은 다음과 같습니다.

```text
src/styles/tokens/primitive.css
src/styles/tokens/semantic.css
src/styles/tokens/component.css
src/styles/typography.css
src/styles/utilities.css
```

## 검증

```sh
npm run tokens:generate
npm run lint
npm run typecheck
npm test
npm run format:check
npm run build
```

테스트는 모든 토큰 참조, 생성 결과와 명세의 일치, Core 크기·색상 정책, 컴포넌트 상태 토큰과 CSS의 미정의 변수 여부를 검사합니다.

## 확장 원칙

새 프로젝트를 위해 Core 값을 직접 수정하지 않습니다. 먼저 Theme 파일에서 Brand 및 Semantic 토큰을 덮어쓰고, 두 개 이상의 컴포넌트에서 반복되는 요구만 Core로 승격합니다. 새 컴포넌트는 사용 목적, 사용하지 않는 경우, 상태, 접근성, 토큰 연결과 API를 함께 문서화합니다.
