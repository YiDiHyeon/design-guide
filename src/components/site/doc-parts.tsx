'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { sectionId } from '@/lib/docs';
import { trackCodeCopy } from '@/lib/gtag';

export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={sectionId(title)} className="doc-section">
      <h2>
        <a href={`#${sectionId(title)}`}>
          {title}
          <span aria-hidden="true">#</span>
        </a>
      </h2>
      {children}
    </section>
  );
}

export function Code({
  children,
  label = 'TSX / CSS',
}: {
  children: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(children);
      setCopied(true);
      trackCodeCopy(label);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="code-block group">
      <div className="flex items-center justify-between border-b border-light px-4 py-2 bg-surface-warm/40">
        <span className="text-[10px] font-mono uppercase tracking-wider text-secondary font-medium">
          {label}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-strong bg-base text-[11px] font-medium text-secondary hover:text-primary hover:bg-surface-light transition-all duration-150 cursor-pointer shadow-xs active:scale-95"
          aria-label="코드 복사"
        >
          {copied ? (
            <Check size={12} className="text-fresh-olive" />
          ) : (
            <Copy size={12} />
          )}
          <span>{copied ? '복사됨' : '복사'}</span>
        </button>
      </div>
      <pre>
        <code>{children}</code>
      </pre>
    </div>
  );
}

export function Table({
  headings,
  rows,
}: {
  headings: string[];
  rows: React.ReactNode[][];
}) {
  return (
    <div
      className="table-scroll"
      role="region"
      aria-label={`${headings[0]} 표`}
      tabIndex={0}
    >
      <table>
        <thead>
          <tr>
            {headings.map((h) => (
              <th scope="col" key={h}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) =>
                j === 0 ? (
                  <th scope="row" key={j}>
                    {cell}
                  </th>
                ) : (
                  <td key={j}>{cell}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
