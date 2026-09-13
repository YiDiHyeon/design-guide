'use client';

import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Switch } from '@/components/ui';
import { SwitchPlayground } from '@/components/playgrounds/switch-playground';
import { Code, Section, Table } from '@/components/site/doc-parts';

export function SwitchDoc() {
  const [darkMode, setDarkMode] = useState(false);

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
          <Switch
            size="lg"
            checked
            label="1. 트랙과 2. 핸들 · 3. 레이블"
            description="4. 설정의 영향이나 범위를 설명하는 보조 문구"
            readOnly
          />
        </div>
        <Table
          headings={['번호', '구성 요소', '역할']}
          rows={[
            ['1', 'Track', '현재 On/Off 상태를 색과 위치로 표현하는 배경'],
            ['2', 'Thumb', '상태 변경에 따라 좌우로 이동하는 핸들'],
            ['3', 'Label', '전환할 설정의 명확한 이름'],
            [
              '4',
              'Description',
              '설정 변경의 영향이나 범위를 설명하는 보조 문구',
            ],
          ]}
        />
      </Section>

      <Section title="Sizes">
        <p>밀도와 사용 환경에 맞춰 sm, md, lg 세 가지 크기를 제공합니다.</p>
        <div
          className="token-grid"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
          }}
        >
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <div className="token-card" style={{ padding: '20px' }} key={size}>
              <strong>{size}</strong>
              <div style={{ marginTop: '16px' }}>
                <Switch
                  size={size}
                  defaultChecked
                  aria-label={`${size} switch`}
                />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="States">
        <div
          className="token-grid"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
          }}
        >
          <div className="token-card" style={{ padding: '16px' }}>
            <Switch label="Off" />
          </div>
          <div className="token-card" style={{ padding: '16px' }}>
            <Switch label="On" defaultChecked />
          </div>
          <div className="token-card" style={{ padding: '16px' }}>
            <Switch label="Error" error />
          </div>
          <div className="token-card" style={{ padding: '16px' }}>
            <Switch label="Disabled" disabled defaultChecked />
          </div>
        </div>
      </Section>

      <Section title="Guidelines">
        <div className="guideline-grid">
          <div className="guideline good">
            <h3>
              <Check size={16} aria-hidden="true" /> 권장해요
            </h3>
            <p>변경 결과가 즉시 적용되는 설정에 사용합니다.</p>
            <p>레이블은 현재 상태가 아니라 제어 대상의 이름으로 작성합니다.</p>
          </div>
          <div className="guideline bad">
            <h3>
              <X size={16} aria-hidden="true" /> 피해주세요
            </h3>
            <p>제출이나 저장이 필요한 동의 항목에는 Checkbox를 사용합니다.</p>
            <p>서로 배타적인 여러 선택지에는 Radio를 사용합니다.</p>
          </div>
        </div>
      </Section>

      <Section title="API">
        <Table
          headings={['Prop', 'Type', 'Default', 'Description']}
          rows={[
            ['size', "'sm' | 'md' | 'lg'", "'md'", '트랙과 텍스트 크기'],
            ['label', 'ReactNode', 'undefined', '설정 이름'],
            [
              'description',
              'ReactNode',
              'undefined',
              'aria-describedby로 연결되는 보조 설명',
            ],
            [
              'checked / defaultChecked',
              'boolean',
              'undefined',
              '제어 / 비제어 On 상태',
            ],
            ['onChange', 'ChangeEventHandler', 'undefined', '상태 변경 콜백'],
            ['disabled', 'boolean', 'false', '조작 불가 상태'],
            ['error', 'boolean', 'false', '오류 강조 및 aria-invalid 적용'],
          ]}
        />
      </Section>

      <Section title="Code Example">
        <Code>{`const [darkMode, setDarkMode] = useState(false);\n\n<Switch\n  checked={darkMode}\n  onChange={(event) => setDarkMode(event.target.checked)}\n  label="다크 모드"\n  description="화면의 색상 테마를 즉시 변경합니다."\n/>`}</Code>
        <div style={{ marginTop: '16px' }}>
          <Switch
            checked={darkMode}
            onChange={(event) => setDarkMode(event.target.checked)}
            label="다크 모드"
            description="화면의 색상 테마를 즉시 변경합니다."
          />
        </div>
      </Section>
    </>
  );
}
