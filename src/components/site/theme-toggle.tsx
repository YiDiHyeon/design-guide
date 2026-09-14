'use client';

import { useSyncExternalStore, useState, useCallback } from 'react';

export interface ThemeToggleProps {
  className?: string;
}

function subscribe(callback: () => void) {
  if (typeof window === 'undefined') return () => {};

  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type === 'attributes' && m.attributeName === 'data-theme') {
        callback();
      }
    }
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });

  window.addEventListener('storage', callback);

  return () => {
    observer.disconnect();
    window.removeEventListener('storage', callback);
  };
}

function getSnapshot(): 'light' | 'dark' {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.getAttribute('data-theme') === 'dark'
    ? 'dark'
    : 'light';
}

function getServerSnapshot(): 'light' | 'dark' {
  return 'light';
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [isSwitching, setIsSwitching] = useState(false);

  const toggleTheme = useCallback(() => {
    setIsSwitching(true);
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    try {
      localStorage.setItem('cabinet-theme', nextTheme);
    } catch {
      // ignore storage errors
    }

    setTimeout(() => {
      setIsSwitching(false);
    }, 250);
  }, [theme]);

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`group relative inline-flex items-center justify-center w-10 h-10 rounded-xl border border-light bg-surface-light hover:border-strong transition-all duration-200 active:scale-90 focus-visible:outline-2 focus-visible:outline-olive cursor-pointer select-none ${className}`}
      aria-label={isDark ? '라이트 모드로 전환 (전등 끄기)' : '다크 모드로 전환 (전등 켜기)'}
      title={isDark ? '라이트 모드로 전환 (전등 끄기)' : '다크 모드로 전환 (전등 켜기)'}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-transform duration-200 ${isSwitching ? 'scale-90' : 'scale-100'}`}
        aria-hidden="true"
      >
        {/* Lamp Stem */}
        <path
          d="M12 12v6"
          stroke={isDark ? 'var(--guide-neutral-300)' : 'currentColor'}
          className="transition-colors duration-200"
        />

        {/* Lamp Base */}
        <path
          d="M8 20a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1z"
          stroke={isDark ? 'var(--guide-neutral-300)' : 'currentColor'}
          className="transition-colors duration-200"
        />

        {/* Lamp Shade (갓)
            - 다크모드: 노란 전등이 켜짐 (Butter Yellow #F5CA45 채움 및 발광)
            - 라이트모드: 전등이 꺼짐 (채움 없이 깔끔한 외곽선만 표시) */}
        <path
          d="M4.077 10.615A1 1 0 0 0 5 12h14a1 1 0 0 0 .923-1.385l-3.077-7.384A2 2 0 0 0 15 2H9a2 2 0 0 0-1.846 1.23Z"
          fill={isDark ? '#F5CA45' : 'transparent'}
          stroke={isDark ? '#F5CA45' : 'currentColor'}
          style={
            isDark
              ? {
                  filter: 'drop-shadow(0 0 6px rgba(245, 202, 69, 0.75))',
                }
              : undefined
          }
          className="transition-all duration-300"
        />
      </svg>
    </button>
  );
}
