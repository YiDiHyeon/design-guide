import { notFound } from 'next/navigation';
import { documents } from '@/lib/docs';
import { DocsShell } from '@/components/docs-shell';
import { ButtonDoc } from '@/components/button-doc';
import { FoundationDoc } from '@/components/foundation-doc';
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
      {slug === 'button' ? <ButtonDoc /> : <FoundationDoc slug={slug} />}
    </DocsShell>
  );
}
