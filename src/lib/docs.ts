export const documents = [
  {
    category: 'foundations',
    slug: 'colors',
    title: 'Colors',
    description: '색에 역할을 부여해 일관되고 명확한 경험을 만듭니다.',
    sections: [
      'Overview',
      'Primitive palette',
      'Semantic colors',
      'Token hierarchy',
      'Guidelines',
    ],
  },
  {
    category: 'foundations',
    slug: 'typography',
    title: 'Typography',
    description: '명확한 위계와 편안한 읽기 흐름을 위한 타이포그래피입니다.',
    sections: ['Overview', 'Type scale', 'Usage', 'Guidelines'],
  },
  {
    category: 'foundations',
    slug: 'spacing',
    title: 'Spacing',
    description: '원본 Space 스케일과 반응형 sp·gap 역할을 정의합니다.',
    sections: ['Overview', 'Spacing scale', 'Semantic spacing', 'Guidelines'],
  },
  {
    category: 'components',
    slug: 'button',
    title: 'Button',
    description:
      '사용자가 행동을 시작하거나 선택을 완료할 때 사용하는 컴포넌트입니다.',
    sections: [
      'Overview',
      'Anatomy',
      'Variants',
      'Sizes',
      'States',
      'Guidelines',
      'API',
      'Code Example',
    ],
  },
  {
    category: 'components',
    slug: 'input',
    title: 'Input',
    description: '사용자가 텍스트를 입력하고 수정할 수 있는 필드입니다.',
    sections: [
      'Overview',
      'Anatomy',
      'Variants',
      'Sizes',
      'States',
      'Guidelines',
      'API',
      'Code Example',
    ],
  },
  {
    category: 'components',
    slug: 'select',
    title: 'Select',
    description: '미리 정의한 옵션 중 하나를 선택하는 필드입니다.',
    sections: [
      'Overview',
      'Anatomy',
      'Variants',
      'Sizes',
      'States',
      'Guidelines',
      'API',
      'Code Example',
    ],
  },
] as const;
export type Doc = (typeof documents)[number];
export const sectionId = (title: string) =>
  title.toLowerCase().replaceAll(' ', '-');
