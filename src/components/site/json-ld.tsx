import type { Doc } from '@/lib/docs';

export function WebSiteJsonLd() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://cabinet-design.vercel.app';

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'Cabinet Design',
        description:
          '개인 웹서비스와 토이 프로젝트에서 재사용하는 중립적이고 접근성 높은 디자인 시스템.',
        inLanguage: 'ko-KR',
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Cabinet Design System',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function DocJsonLd({ doc }: { doc: Doc }) {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://cabinet-design.vercel.app';
  const categoryLabel =
    doc.category.charAt(0).toUpperCase() + doc.category.slice(1);
  const docUrl = `${siteUrl}/${doc.category}/${doc.slug}`;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: categoryLabel,
            item: `${siteUrl}/${doc.category}/${doc.slug}`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: doc.title,
            item: docUrl,
          },
        ],
      },
      {
        '@type': 'TechArticle',
        headline: `${doc.title} - Cabinet Design`,
        description: doc.description,
        url: docUrl,
        inLanguage: 'ko-KR',
        articleSection: categoryLabel,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
