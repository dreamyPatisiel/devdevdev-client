import React from 'react';

import { cn } from '@utils/mergeStyle';

import { TagProps } from './type/tagType';
import { TagVariants } from './variants/tagVariants';

const Tag: React.FC<TagProps> = ({ status, size, color, content, className }) => {
  const tagClassName = TagVariants({ color, status, size });

  return <span className={cn(tagClassName, className)}>{content}</span>;
};

export default Tag;
