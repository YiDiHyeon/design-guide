'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { documents, sectionId, type Doc } from '@/lib/docs';
export function DocsShell({
  doc,
  children,
}: {
  doc: Doc;
  children: React.ReactNode;
}) {
  const [active, setActive] = useState('overview');
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: '-100px 0px -60% 0px' },
    );
    document
      .querySelectorAll('article section[id]')
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [doc]);
  const navigation = (
    <>
      {['foundations', 'components'].map((category) => (
        <div className="nav-group" key={category}>
          <p>{category}</p>
          {documents
            .filter((d) => d.category === category)
            .map((d) => (
              <Link
                key={d.slug}
                href={`/${d.category}/${d.slug}`}
                aria-current={d.slug === doc.slug ? 'page' : undefined}
              >
                <span className="nav-icon" aria-hidden="true">
                  {d.slug === 'colors'
                    ? '◉'
                    : d.slug === 'typography'
                      ? 'Aa'
                      : d.slug === 'spacing'
                        ? '⊞'
                        : '▣'}
                </span>
                {d.title}
                {d.slug === doc.slug && <span className="nav-dot" />}
              </Link>
            ))}
        </div>
      ))}
    </>
  );
  const toc = (
    <nav aria-label="현재 문서 목차">
      {doc.sections.map((s) => (
        <a
          key={s}
          href={`#${sectionId(s)}`}
          aria-current={active === sectionId(s) ? 'location' : undefined}
        >
          {s}
        </a>
      ))}
    </nav>
  );
  return (
    <>
      <a className="skip-link" href="#main">
        본문으로 건너뛰기
      </a>
      <header className="site-header">
        <Link href="/" className="brand">
          <span className="brand-mark" aria-hidden="true">
            d<span>g</span>
          </span>
          design guide<span className="version">v0.1</span>
        </Link>
        <div className="header-note">
          A personal design system
          <span className="green-dot" />
        </div>
      </header>
      <div className="site-grid">
        <aside className="sidebar">
          <nav aria-label="문서 탐색">{navigation}</nav>
          <div className="sidebar-bottom">
            <span className="tiny-label">BUILT WITH INTENTION</span>
            <p>작은 원칙, 일관된 경험.</p>
            <span>Design Guide © 2026</span>
          </div>
        </aside>
        <main id="main" tabIndex={-1}>
          <div className="mobile-tools">
            <details>
              <summary>문서 탐색</summary>
              <nav aria-label="모바일 문서 탐색">{navigation}</nav>
            </details>
            <details>
              <summary>이 페이지에서</summary>
              {toc}
            </details>
          </div>
          <article>
            <div className="breadcrumb">
              {doc.category === 'foundations' ? 'Foundations' : 'Components'}
              <span>/</span>
              {doc.title}
            </div>
            <div className="title-row">
              <h1>{doc.title}</h1>
              <span className="status-badge">
                <span className="green-dot" />
                Stable
              </span>
            </div>
            <p className="lead">{doc.description}</p>
            <div className="doc-meta">
              <span>DESIGN & DEVELOPMENT</span>
              <span>Updated Sep 2026</span>
            </div>
            {children}
            <footer className="doc-footer">
              <span>작은 원칙이 좋은 경험을 만듭니다.</span>
              <a href="#main">맨 위로 ↑</a>
            </footer>
          </article>
        </main>
        <aside className="toc">
          <p>ON THIS PAGE</p>
          {toc}
          <div className="toc-note">
            <span>하나의 기준, 같은 결과</span>
            <p>
              디자인 토큰과 컴포넌트가
              <br />
              같은 언어로 연결됩니다.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
