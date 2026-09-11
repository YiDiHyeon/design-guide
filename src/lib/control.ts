export const controlSizes = ['sm', 'md', 'lg', 'xl'] as const;
export type ControlSize = (typeof controlSizes)[number];

export const destinationOptions = [
  { value: 'seoul', label: '서울' },
  { value: 'busan', label: '부산' },
  { value: 'jeju', label: '제주' },
  { value: 'closed', label: '준비 중', disabled: true },
] as const;
