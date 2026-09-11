import React from 'react';

export interface CabinetLogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  type?: 'two-tier' | 'credenza' | 'three-tier';
  frameColor?: string;
  topAccentColor?: string;
  bottomAccentColor?: string;
  monochrome?: boolean;
  accent?: boolean;
  strokeWidth?: number;
  className?: string;
}

export function CabinetLogo({
  size = 24,
  type = 'two-tier',
  frameColor = 'var(--guide-color-olive, #38471D)',
  topAccentColor = 'var(--guide-color-butter-yellow, #F5CA45)',
  bottomAccentColor = 'var(--guide-color-tomato-coral, #E66F4F)',
  monochrome = false,
  accent = true,
  strokeWidth = 2,
  className = '',
  style,
  ...props
}: CabinetLogoProps) {
  const frame = monochrome ? 'currentColor' : frameColor;
  const topColor = monochrome || !accent ? frame : topAccentColor;
  const bottomColor = monochrome || !accent ? frame : bottomAccentColor;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        flexShrink: 0,
        ...style,
      }}
      aria-hidden="true"
      {...props}
    >
      {renderCuteCabinetPaths(type, frame, topColor, bottomColor, strokeWidth)}
    </svg>
  );
}

function renderCuteCabinetPaths(
  type: 'two-tier' | 'credenza' | 'three-tier',
  frame: string,
  topColor: string,
  bottomColor: string,
  strokeWidth: number,
) {
  switch (type) {
    case 'credenza':
      return (
        <>
          {/* Cute rounded credenza box */}
          <rect
            x="3"
            y="2.5"
            width="18"
            height="14.5"
            rx="3.5"
            stroke={frame}
            strokeWidth={strokeWidth}
          />
          {/* Center door seam */}
          <line
            x1="12"
            y1="2.5"
            x2="12"
            y2="17"
            stroke={frame}
            strokeWidth={strokeWidth}
          />
          {/* Left door cute vertical handle */}
          <line
            x1="9.5"
            y1="8.5"
            x2="9.5"
            y2="11.5"
            stroke={topColor}
            strokeWidth={strokeWidth + 0.5}
          />
          {/* Right door cute vertical handle */}
          <line
            x1="14.5"
            y1="8.5"
            x2="14.5"
            y2="11.5"
            stroke={bottomColor}
            strokeWidth={strokeWidth + 0.5}
          />
          {/* Splayed rounded feet */}
          <path d="M6.5 17L5 21" stroke={frame} strokeWidth={strokeWidth} />
          <path d="M17.5 17L19 21" stroke={frame} strokeWidth={strokeWidth} />
        </>
      );
    case 'three-tier':
      return (
        <>
          {/* Cute 3-tier box */}
          <rect
            x="3.5"
            y="2"
            width="17"
            height="15.5"
            rx="3.5"
            stroke={frame}
            strokeWidth={strokeWidth}
          />
          {/* Divider lines */}
          <line
            x1="3.5"
            y1="7.25"
            x2="20.5"
            y2="7.25"
            stroke={frame}
            strokeWidth={strokeWidth}
          />
          <line
            x1="3.5"
            y1="12.25"
            x2="20.5"
            y2="12.25"
            stroke={frame}
            strokeWidth={strokeWidth}
          />
          {/* 3 Handles in cheerful colors */}
          <line
            x1="9.5"
            y1="4.75"
            x2="14.5"
            y2="4.75"
            stroke={topColor}
            strokeWidth={strokeWidth + 0.5}
          />
          <line
            x1="9.5"
            y1="9.75"
            x2="14.5"
            y2="9.75"
            stroke={bottomColor}
            strokeWidth={strokeWidth + 0.5}
          />
          <line
            x1="9.5"
            y1="14.75"
            x2="14.5"
            y2="14.75"
            stroke="var(--guide-color-fresh-olive, #7F9445)"
            strokeWidth={strokeWidth + 0.5}
          />
          {/* Feet */}
          <path d="M6.5 17.5L5 21" stroke={frame} strokeWidth={strokeWidth} />
          <path d="M17.5 17.5L19 21" stroke={frame} strokeWidth={strokeWidth} />
        </>
      );
    case 'two-tier':
    default:
      return (
        <>
          {/* Cute rounded 2-tier cabinet box */}
          <rect
            x="3"
            y="2.5"
            width="18"
            height="14.5"
            rx="3.5"
            stroke={frame}
            strokeWidth={strokeWidth}
          />
          {/* Drawer divider */}
          <line
            x1="3"
            y1="9.75"
            x2="21"
            y2="9.75"
            stroke={frame}
            strokeWidth={strokeWidth}
          />
          {/* Top drawer cute pull handle (Butter Yellow) */}
          <line
            x1="9"
            y1="6"
            x2="15"
            y2="6"
            stroke={topColor}
            strokeWidth={strokeWidth + 0.5}
          />
          {/* Bottom drawer cute pull handle (Tomato Coral) */}
          <line
            x1="9"
            y1="13.5"
            x2="15"
            y2="13.5"
            stroke={bottomColor}
            strokeWidth={strokeWidth + 0.5}
          />
          {/* Cute splayed feet */}
          <path d="M6.5 17L5 21" stroke={frame} strokeWidth={strokeWidth} />
          <path d="M17.5 17L19 21" stroke={frame} strokeWidth={strokeWidth} />
        </>
      );
  }
}
