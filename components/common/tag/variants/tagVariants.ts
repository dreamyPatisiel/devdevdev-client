import { twMerge } from 'tailwind-merge';

import { TagColor, TagSize, TagStatus, TypeTagClasses } from '../type/tagType';

const TagClasses: TypeTagClasses = {
  Primary: {
    Main: 'bg-primary200 text-black',
    Sub: 'bg-primary600 text-white',
    Line: 'border border-primary200 text-primary200',
  },
  Secondary: {
    Main: 'bg-secondary400 text-black',
    Sub: 'bg-secondary600 text-white',
    Line: 'border border-secondary400 text-secondary400',
  },
  Red: {
    Main: 'bg-red100 text-black',
    Sub: 'bg-red400 text-white',
    Line: 'border border-red100 text-red100',
  },
};

export const TagVariants = ({
  color,
  status,
  size,
}: {
  color: TagColor;
  status: TagStatus;
  size: TagSize;
}) => {
  const baseClass = 'py-[0.4rem] rounded-[10rem] flex items-center';
  const sizeClass = size === 'Small' ? 'text-c2 px-[0.8rem]' : 'text-c1 px-[1rem]';
  const colorClass = TagClasses[color][status];

  return twMerge(`${baseClass} ${sizeClass} ${colorClass}`);
};
