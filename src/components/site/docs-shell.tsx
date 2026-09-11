'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  Palette,
  Type,
  Ruler,
  MousePointerClick,
  TextCursorInput,
  ChevronDownSquare,
  CheckSquare,
  CircleDot,
  BadgeCheck,
  Box,
  ArrowUp,
} from 'lucide-react';
import { documents, sectionId, type Doc } from '@/lib/docs';

function getNavIcon(slug: string) {
  switch (slug) {
    case 'colors':
      return <Palette size={16} strokeWidth={1.75} />;
    case 'typography':
      return <Type size={16} strokeWidth={1.75} />;
    case 'spacing':
      return <Ruler size={16} strokeWidth={1.75} />;
    case 'button':
      return <MousePointerClick size={16} strokeWidth={1.75} />;
    case 'input':
      return <TextCursorInput size={16} strokeWidth={1.75} />;
    case 'select':
      return <ChevronDownSquare size={16} strokeWidth={1.75} />;
    case 'checkbox':
      return <CheckSquare size={16} strokeWidth={1.75} />;
    case 'radio':
      return <CircleDot size={16} strokeWidth={1.75} />;
    case 'badge':
      return <BadgeCheck size={16} strokeWidth={1.75} />;
    default:
      return <Box size={16} strokeWidth={1.75} />;
  }
}

export function DocsShell({
  doc,
  children,
}: {
  doc: Doc;
  children: React.ReactNode;
}) {
  const [active, setActive] = useState('overview');
  const isManualScroll = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollToTop = (behavior: ScrollBehavior = 'instant') => {
    window.scrollTo({ top: 0, left: 0, behavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  useEffect(() => {
    scrollToTop('instant');
  }, [doc.slug]);

  useEffect(() => {
    const updateActiveSection = () => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>('article section[id]'),
      );
      if (sections.length === 0) return;

      const scrollBottom = window.innerHeight + window.scrollY;
      const isBottom =
        scrollBottom >= document.documentElement.scrollHeight - 60;
      if (isBottom) {
        const lastSection = sections[sections.length - 1];
        if (lastSection) {
          setActive(lastSection.id);
          return;
        }
      }

      const targetOffset = 120;
      let currentSectionId = sections[0].id;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= targetOffset) {
          currentSectionId = section.id;
        } else {
          break;
        }
      }

      setActive(currentSectionId);
    };

    updateActiveSection();

    let ticking = false;
    const onScroll = () => {
      if (isManualScroll.current) return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    const unlockManualScroll = () => {
      isManualScroll.current = false;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    window.addEventListener('wheel', unlockManualScroll, { passive: true });
    window.addEventListener('touchmove', unlockManualScroll, { passive: true });

    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('wheel', unlockManualScroll);
      window.removeEventListener('touchmove', unlockManualScroll);
    };
  }, [doc]);
  const navigation = (
    <>
      {['foundations', 'components'].map((category) => {
        const categoryDocs = documents.filter((d) => d.category === category);
        const firstDoc = categoryDocs[0];
        return (
          <div className="nav-group" key={category}>
            <p>
              {firstDoc ? (
                <Link
                  href={`/${firstDoc.category}/${firstDoc.slug}`}
                  className="nav-category-link"
                  onClick={(e) => {
                    const details = (e.target as HTMLElement).closest(
                      'details',
                    );
                    if (details) details.removeAttribute('open');
                    if (firstDoc.slug === doc.slug) {
                      scrollToTop('smooth');
                    }
                  }}
                >
                  {category}
                </Link>
              ) : (
                category
              )}
            </p>
            {categoryDocs.map((d) => (
              <Link
                key={d.slug}
                href={`/${d.category}/${d.slug}`}
                aria-current={d.slug === doc.slug ? 'page' : undefined}
                onClick={(e) => {
                  const details = (e.target as HTMLElement).closest('details');
                  if (details) details.removeAttribute('open');
                  if (d.slug === doc.slug) {
                    scrollToTop('smooth');
                  }
                }}
              >
                <span className="nav-icon" aria-hidden="true">
                  {getNavIcon(d.slug)}
                </span>
                {d.title}
                {d.slug === doc.slug && <span className="nav-dot" />}
              </Link>
            ))}
          </div>
        );
      })}
    </>
  );
  const handleTocClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    s: string,
  ) => {
    e.preventDefault();
    const id = sectionId(s);
    const target = document.getElementById(id);
    if (!target) return;

    setActive(id);
    history.pushState(null, '', `#${id}`);

    isManualScroll.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });

    scrollTimeoutRef.current = setTimeout(() => {
      isManualScroll.current = false;
    }, 800);
  };

  const toc = (
    <nav aria-label="현재 문서 목차">
      {doc.sections.map((s) => (
        <a
          key={s}
          href={`#${sectionId(s)}`}
          aria-current={active === sectionId(s) ? 'location' : undefined}
          onClick={(e) => handleTocClick(e, s)}
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
        <Link
          href="/"
          className="brand"
          onClick={() => {
            if (doc.category === 'components' && doc.slug === 'button') {
              scrollToTop('smooth');
            }
          }}
        >
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
              <Link
                href={`/${doc.category}/${documents.find((d) => d.category === doc.category)?.slug ?? doc.slug}`}
                className="breadcrumb-category"
                onClick={() => {
                  const first = documents.find(
                    (d) => d.category === doc.category,
                  )?.slug;
                  if (first === doc.slug) {
                    scrollToTop('smooth');
                  }
                }}
              >
                {doc.category === 'foundations' ? 'Foundations' : 'Components'}
              </Link>
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
              <a
                href="#main"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTop('smooth');
                }}
              >
                맨 위로{' '}
                <ArrowUp
                  size={12}
                  aria-hidden="true"
                  style={{ display: 'inline', verticalAlign: '-1px' }}
                />
              </a>
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
