import { notFound } from 'next/navigation';
import { documents } from '@/lib/docs';
import { DocsShell } from '@/components/site/docs-shell';
import { OverviewDoc } from '@/components/docs/overview-doc';
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
    <DocsShell doc={doc}>
      {slug === 'overview' ? (
        <OverviewDoc />
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
  );
}
