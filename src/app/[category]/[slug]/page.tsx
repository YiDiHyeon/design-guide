import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { documents } from '@/lib/docs';
import { DocsShell } from '@/components/site/docs-shell';
import { OverviewDoc } from '@/components/docs/overview-doc';
import { GettingStartedDoc } from '@/components/docs/getting-started-doc';
import { FieldDoc } from '@/components/docs/field-doc';
import { FieldComponentDoc } from '@/components/docs/field-component-doc';
import { ButtonDoc } from '@/components/docs/button-doc';
import { CheckboxDoc } from '@/components/docs/checkbox-doc';
import { RadioDoc } from '@/components/docs/radio-doc';
import { SwitchDoc } from '@/components/docs/switch-doc';
import { BadgeDoc } from '@/components/docs/badge-doc';
import { FoundationDoc } from '@/components/docs/foundation-doc';
import { TextareaDoc } from '@/components/docs/textarea-doc';
import { SelectDoc } from '@/components/docs/select-doc';
import { DocJsonLd } from '@/components/site/json-ld';

export function generateStaticParams() {
  return documents.map(({ category, slug }) => ({ category, slug }));
}
export const dynamicParams = false;

type Props = { params: Promise<{ category: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const doc = documents.find((d) => d.category === category && d.slug === slug);
  if (!doc) return { title: 'Not found' };

  const categoryLabel = category.charAt(0).toUpperCase() + category.slice(1);
  const title = `${doc.title} · ${categoryLabel}`;
  const url = `/${category}/${slug}`;

  return {
    title,
    description: doc.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} · Cabinet Design`,
      description: doc.description,
      url,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} · Cabinet Design`,
      description: doc.description,
    },
  };
}

export default async function Page({ params }: Props) {
  const { category, slug } = await params;
  const doc = documents.find((d) => d.category === category && d.slug === slug);
  if (!doc) notFound();
  return (
    <>
      <DocJsonLd doc={doc} />
      <DocsShell doc={doc}>
        {slug === 'overview' ? (
          <OverviewDoc />
        ) : slug === 'getting-started' ? (
          <GettingStartedDoc />
        ) : slug === 'button' ? (
          <ButtonDoc />
        ) : slug === 'field' ? (
          <FieldComponentDoc />
        ) : slug === 'select' ? (
          <SelectDoc />
        ) : slug === 'input' ? (
          <FieldDoc kind={slug} />
        ) : slug === 'textarea' ? (
          <TextareaDoc />
        ) : slug === 'checkbox' ? (
          <CheckboxDoc />
        ) : slug === 'radio' ? (
          <RadioDoc />
        ) : slug === 'switch' ? (
          <SwitchDoc />
        ) : slug === 'badge' ? (
          <BadgeDoc />
        ) : (
          <FoundationDoc slug={slug} />
        )}
      </DocsShell>
    </>
  );
}
