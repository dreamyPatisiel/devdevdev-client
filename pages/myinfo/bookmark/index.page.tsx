import React, { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import DynamicTechBlogComponent from '@components/features/main/dynamicTechBlogComponent';

import MyInfo from '../index.page';

export default function BookMark() {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['techBlogBookmark'] });
  }, []);

  return (
    <MyInfo>
      <DynamicTechBlogComponent skeletonCnt={10} isScroll={true} type='myinfo' />
    </MyInfo>
  );
}
