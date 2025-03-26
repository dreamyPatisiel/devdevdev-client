import React, { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import MyInfo from '../index.page';
import BookmarkSection from './BookmarkSection';

export default function BookMark() {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['techBlogBookmark'] });
  }, []);

  return (
    <MyInfo>
      <BookmarkSection />
    </MyInfo>
  );
}
