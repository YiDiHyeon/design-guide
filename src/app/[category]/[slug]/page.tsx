import { notFound } from 'next/navigation';
import { documents } from '@/lib/docs';
import { DocsShell } from '@/components/site/docs-shell';
import { FieldDoc } from '@/components/docs/field-doc';
import { ButtonDoc } from '@/components/docs/button-doc';
import { CheckboxDoc } from '@/components/docs/checkbox-doc';
import { RadioDoc } from '@/components/docs/radio-doc';
import { BadgeDoc } from '@/components/docs/badge-doc';
import { FoundationDoc } from '@/components/docs/foundation-doc';
export function generateStaticParams() {
  return documents.map(({ category, slug }) => ({ category, slug }));
}
export const dynamicParams = false;
type Props = { params: Promise<{ category: string; slug: string }> };
export async function generateMetadata({ params }: Props) {
  const { category, slug } = await params;
  const doc = documents.find((d) => d.category === category && d.slug === slug);
  return { title: doc?.title ?? 'Not found' };
}
export default async function Page({ params }: Props) {
  const { category, slug } = await params;
  const doc = documents.find((d) => d.category === category && d.slug === slug);
  if (!doc) notFound();
  return (
    <DocsShell key={doc.slug} doc={doc}>
      {slug === 'button' ? (
        <ButtonDoc />
      ) : slug === 'input' || slug === 'select' ? (
        <FieldDoc kind={slug} />
      ) : slug === 'checkbox' ? (
        <CheckboxDoc />
      ) : slug === 'radio' ? (
        <RadioDoc />
      ) : slug === 'badge' ? (
        <BadgeDoc />
      ) : (
        <FoundationDoc slug={slug} />
      )}
    </DocsShell>
  );
}
