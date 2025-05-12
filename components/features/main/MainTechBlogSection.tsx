import dynamic from 'next/dynamic';

import { useInfiniteTechBlogData } from '@pages/techblog/api/useInfiniteTechBlog';
import {
  MOBILE_MAIN_TECH_VIEW_SIZE,
  TECH_VIEW_SIZE,
} from '@pages/techblog/constants/techBlogConstants';

import { useMediaQueryContext } from '@/contexts/MediaQueryContext';
import { TechInfiniteDataType } from '@/types/infiniteQueryType';

const DynamicTechBlogComponent = dynamic(
  () => import('@components/features/main/dynamicTechBlogComponent'),
);

export default function MainTechBlogSection() {
  const { isMobile } = useMediaQueryContext();

  const VIEW_SIZE = isMobile ? MOBILE_MAIN_TECH_VIEW_SIZE : TECH_VIEW_SIZE;

  const techblogData = useInfiniteTechBlogData(
    'LATEST',
    undefined,
    undefined,
    VIEW_SIZE,
  ) as TechInfiniteDataType;

  return (
    <DynamicTechBlogComponent data={techblogData} skeletonCnt={2} type='main' isScroll={true} />
  );
}
