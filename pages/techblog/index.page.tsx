import React, { useEffect, useRef } from 'react';

import dynamic from 'next/dynamic';

import { TechBlogDropdownProps, useDropdownStore } from '@stores/dropdownStore';
import { useCompanyIdStore, useSearchKeywordStore } from '@stores/techBlogStore';
import { useToastVisibleStore } from '@stores/toastVisibleStore';

import { useObserver } from '@hooks/useObserver';

import { Dropdown } from '@components/common/dropdown';
import SearchInput from '@components/common/searchInput';
import { TechSkeletonList } from '@components/common/skeleton/techBlogSkeleton';
import MetaHead from '@components/meta/MetaHead';

import { META } from '@/constants/metaData';

import { useInfiniteTechBlogData } from './api/useInfiniteTechBlog';
import SearchNotFound from './components/searchNotFound';
import { TechCardProps } from './types/techBlogType';

const DynamicTechCard = dynamic(() => import('@/pages/techblog/components/techCard'));

export default function Index() {
  const bottomDiv = useRef(null);

  const { sortOption } = useDropdownStore();
  const { searchKeyword, setSearchKeyword } = useSearchKeywordStore();
  const { companyId, setCompanyId } = useCompanyIdStore();
  const { setToastInvisible } = useToastVisibleStore();

  const { title, description, keyword, url } = META.TECH;

  const { techBlogData, isFetchingNextPage, hasNextPage, status, onIntersect } =
    useInfiniteTechBlogData(sortOption as TechBlogDropdownProps, searchKeyword, companyId);

  const totalArticleCnt = techBlogData?.pages[0].data.totalElements;

  useObserver({
    target: bottomDiv,
    onIntersect,
  });

  useEffect(() => {
    setToastInvisible();
  }, []);

  const getStatusComponent = () => {
    switch (status) {
      case 'pending':
        return <TechSkeletonList itemsInRows={10} />;

      default:
        return (
          <>
            <div>
              {techBlogData?.pages?.map((group, index) => (
                <React.Fragment key={index}>
                  {group.data.content.map((data: TechCardProps) => (
                    <DynamicTechCard key={data.id} techData={data} />
                  ))}
                </React.Fragment>
              ))}
            </div>

            {/* 스켈레톤 */}
            {isFetchingNextPage && hasNextPage && (
              <div className='mt-[2rem]'>
                <TechSkeletonList itemsInRows={10} />
              </div>
            )}

            {totalArticleCnt === 0 && <SearchNotFound />}
          </>
        );
    }
  };

  const refreshTechArticleParams = () => {
    setSearchKeyword('');
    setCompanyId(undefined);
  };

  return (
    <>
      <MetaHead title={title} description={description} keyword={keyword} url={url} />
      <div className='px-[20.4rem] pb-[16.5rem]'>
        <div className='pt-[6.4rem] pb-[2.4rem]'>
          <div className='flex items-center justify-between '>
            <h1 onClick={refreshTechArticleParams} className='h3 font-bold cursor-pointer'>
              기술블로그 🧪
            </h1>
            <SearchInput />
          </div>
        </div>
        <div className='flex justify-between items-center'>
          <p className='p1'>
            총 <span className='text-point3 font-bold'>{totalArticleCnt}</span>건
          </p>
          <Dropdown type='techblog' />
        </div>
        {getStatusComponent()}
        <div ref={bottomDiv} />
      </div>
    </>
  );
}
