import { Check, X } from 'lucide-react';
import { Switch } from '@/components/ui';
import { SwitchPlayground } from '@/components/playgrounds/switch-playground';
import { Code, Section, Table } from '@/components/site/doc-parts';

export function SwitchDoc() {
  return (
    <>
      <Section title="Overview">
        <p>
          Switch는 설정을 즉시 켜거나 끄는 이진 제어입니다. 저장 버튼 없이
          변경이 바로 적용되는 옵션에 사용합니다.
        </p>
        <SwitchPlayground />
        <div className="callout">
          <p>
            네이티브 checkbox에 <code>role=&quot;switch&quot;</code>를 적용해
            Tab 탐색, Space 전환, 스크린 리더 상태 안내를 지원합니다.
          </p>
        </div>
      </Section>

      <Section title="Anatomy">
        <div className="anatomy-panel">
          <div className="w-full max-w-sm">
            <Switch
              size="lg"
              checked
              label="1. 트랙과 2. 핸들 · 3. 레이블"
              description="4. 설정의 영향이나 범위를 설명하는 보조 문구"
              readOnly
            />
          </div>
        </div>
        <Table
          headings={['번호', '구성 요소', '역할']}
          rows={[
            ['1', 'Track', '현재 On/Off 상태를 색과 위치로 표현하는 배경 영역'],
            ['2', 'Thumb', '상태 변경에 따라 좌우로 부드럽게 이동하는 핸들'],
            ['3', 'Label', '전환할 설정의 명확한 이름'],
            [
              '4',
              'Description',
              '설정 변경의 영향이나 범위를 설명하는 보조 문구 (aria-describedby)',
            ],
          ]}
        />
      </Section>

      <Section title="Sizes">
        <p>밀도와 사용 환경에 맞춰 sm, md, lg 세 가지 크기를 제공합니다.</p>
        <Table
          headings={['Size', '규격 (Width × Height)', '미리보기 (Preview)', '권장 적용 맥락']}
          rows={[
            [
              <code key="s-sm" className="font-bold text-primary">
                sm
              </code>,
              '36px × 20px',
              <div key="p-sm" className="py-1">
                <Switch size="sm" defaultChecked aria-label="sm switch" />
              </div>,
              '밀도 높은 데이터 테이블 행 설정, 좁은 리스트 아이템 제어',
            ],
            [
              <code key="s-md" className="font-bold text-primary">
                md
              </code>,
              '44px × 24px (기본값)',
              <div key="p-md" className="py-1">
                <Switch size="md" defaultChecked aria-label="md switch" />
              </div>,
              '대부분의 설정 페이지, 일반 옵션 토글 컨트롤',
            ],
            [
              <code key="s-lg" className="font-bold text-primary">
                lg
              </code>,
              '52px × 28px',
              <div key="p-lg" className="py-1">
                <Switch size="lg" defaultChecked aria-label="lg switch" />
              </div>,
              '모바일 터치 최적화 뷰, 눈에 띄는 주요 환경 설정 스위치',
            ],
          ]}
        />
      </Section>

      <Section title="States">
        <p>
          On/Off 전환 상태와 상호작용 검증 상태를 명확한 시각적 피드백으로
          구분합니다.
        </p>
        <Table
          headings={['상태 (State)', '미리보기 (Preview)', '동작 및 가이드']}
          rows={[
            [
              <span key="st-off" className="font-semibold text-primary">
                Off (꺼짐)
              </span>,
              <div key="p-off" className="py-1">
                <Switch label="알림 수신 해제" />
              </div>,
              '비활성화된 기본 꺼짐 상태 (중립 회색 트랙)',
            ],
            [
              <span key="st-on" className="font-semibold text-primary">
                On (켜짐)
              </span>,
              <div key="p-on" className="py-1">
                <Switch label="알림 수신" defaultChecked />
              </div>,
              '활성화된 켜짐 상태 (브랜드 테마 색상 트랙)',
            ],
            [
              <span key="st-err" className="font-semibold text-primary">
                Error (오류)
              </span>,
              <div key="p-err" className="py-1">
                <Switch label="필수 옵션 동의 필요" error />
              </div>,
              '유효성 검증 실패 시 강조 테두리(Red)와 aria-invalid 적용',
            ],
            [
              <span key="st-dis" className="font-semibold text-primary">
                Disabled (비활성화)
              </span>,
              <div key="p-dis" className="py-1">
                <Switch label="설정 변경 불가" disabled defaultChecked />
              </div>,
              '조작 불가 및 폼 전송에서 제외되는 비활성화 상태',
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
            <p>변경 결과가 즉시 적용되는 설정에 사용합니다.</p>
            <p>레이블은 현재 상태가 아니라 제어 대상의 이름으로 작성합니다.</p>
            <p>설정의 파급 효과를 설명할 때는 description을 활용합니다.</p>
          </div>
          <div className="guideline bad">
            <h3>
              <X size={16} aria-hidden="true" /> 피해주세요
            </h3>
            <p>제출이나 저장이 필요한 동의 항목에는 Checkbox를 사용합니다.</p>
            <p>서로 배타적인 여러 선택지에는 Radio를 사용합니다.</p>
            <p>On/Off 상태 자체를 레이블에 넣지 않습니다 (예: “알림 켜짐”).</p>
          </div>
        </div>
      </Section>

      <Section title="API">
        <Table
          headings={['Prop', 'Type', 'Default', 'Description']}
          rows={[
            ['size', "'sm' | 'md' | 'lg'", "'md'", '트랙과 핸들, 텍스트 크기 스케일'],
            ['label', 'ReactNode', 'undefined', '설정 이름 레이블'],
            [
              'description',
              'ReactNode',
              'undefined',
              'aria-describedby로 연결되는 보조 설명 문구',
            ],
            [
              'checked / defaultChecked',
              'boolean',
              'undefined',
              '제어 / 비제어 On 상태',
            ],
            ['onChange', 'ChangeEventHandler', 'undefined', '상태 변경 이벤트 핸들러'],
            ['disabled', 'boolean', 'false', '조작 불가 및 비활성화 상태'],
            ['error', 'boolean', 'false', '오류 강조 테두리 및 aria-invalid 적용'],
          ]}
        />
      </Section>

      <Section title="Code Example">
        <Code>{`import { useState } from 'react';
import { Switch } from '@/components/ui';

export function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Switch
      checked={darkMode}
      onChange={(event) => setDarkMode(event.target.checked)}
      label="다크 모드"
      description="화면의 색상 테마를 즉시 변경합니다."
    />
  );
}`}</Code>
      </Section>
    </>
  );
}
