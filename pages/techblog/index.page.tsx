import React, { useEffect, useRef } from 'react';

import dynamic from 'next/dynamic';

import { InfiniteData, useQueryClient, QueryClient, dehydrate } from '@tanstack/react-query';

import { TechBlogDropdownProps, useTechblogDropdownStore } from '@stores/dropdownStore';
import { useLoginStatusStore } from '@stores/loginStore';
import { useCompanyInfoStore, useSearchKeywordStore } from '@stores/techBlogStore';
import { useToastVisibleStore } from '@stores/toastVisibleStore';

import { useObserver } from '@hooks/useObserver';

import QueryErrorBoundary from '@components/common/QueryErrorBoundary';
import { Dropdown } from '@components/common/dropdowns/dropdown';
import MobileDropdown from '@components/common/dropdowns/mobileDropdown';
import GetCompanyListError from '@components/common/error/GetCompanyListError';
import {
  MobileTechSkeletonList,
  TechSkeletonList,
} from '@components/common/skeleton/techBlogSkeleton';
import SearchInput from '@components/common/techSearchInput/searchInput';
import MetaHead from '@components/meta/MetaHead';

import { INITIAL_TECH_SORT_OPTION, techBlogDropdownOptions } from '@/constants/DropdownOption';
import { ONE_DAY_IN_SECONDS } from '@/constants/TimeConstants';
import { META } from '@/constants/metaData';
import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import { useInfiniteTechBlogData, getTechBlogData } from './api/useInfiniteTechBlog';
import TechCompanySelector from './components/TechCompanySelector';
import SearchNotFound from './components/searchNotFound';
import {
  INITIAL_TECH_COMPANY_ID,
  INITIAL_TECH_SEARCH_KEYWORD,
  TECH_VIEW_SIZE,
} from './constants/techBlogConstants';
import { TechCardProps } from './types/techBlogType';

const DynamicTechCard = dynamic(() => import('@/pages/techblog/components/TechCard'));

const renderSkeletonList = (isMobile: boolean | null) => {
  return isMobile ? (
    <MobileTechSkeletonList itemsInRows={TECH_VIEW_SIZE} />
  ) : (
    <TechSkeletonList itemsInRows={TECH_VIEW_SIZE} />
  );
};

export default function Index() {
  const bottomDiv = useRef(null);
  const queryClient = useQueryClient();
  const { isMobile } = useMediaQueryContext();

  const { loginStatus } = useLoginStatusStore();

  const { sortOption, setSort } = useTechblogDropdownStore();
  const { searchKeyword, setSearchKeyword } = useSearchKeywordStore();
  const { companyId, resetCompanyInfo } = useCompanyInfoStore();
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

  useEffect(() => {
    // 회원일 경우 프리패치를 사용하지 않음
    if (loginStatus === 'login') {
      queryClient.invalidateQueries({ queryKey: ['techBlogData'] });
    }
  }, [loginStatus]);

  const getStatusComponent = (
    CurTechBlogData: InfiniteData<any, unknown> | undefined,
    status: 'success' | 'error' | 'pending',
  ) => {
    switch (status) {
      case 'pending':
        return renderSkeletonList(isMobile);

      default:
        return (
          <>
            <div>
              {CurTechBlogData?.pages?.map((group, index) => (
                <React.Fragment key={index}>
                  {group.data.content.map((data: TechCardProps) => (
                    <DynamicTechCard key={data.id} techData={data} type='techblog' />
                  ))}
                </React.Fragment>
              ))}
            </div>

            {/* 스켈레톤 */}
            {isFetchingNextPage && hasNextPage && (
              <div className='mt-[2rem]'>
                <TechSkeletonList itemsInRows={TECH_VIEW_SIZE} />
              </div>
            )}

            {totalArticleCnt === 0 && <SearchNotFound type={companyId ? 'company' : 'keyword'} />}
          </>
        );
    }
  };

  const refreshTechArticleParams = () => {
    setSearchKeyword('');
    resetCompanyInfo();
    queryClient.invalidateQueries({ queryKey: ['techBlogData'] });
    setSort('LATEST');
  };

  return (
    <>
      <MetaHead title={title} description={description} keyword={keyword} url={url} />
      <div className={isMobile ? 'px-[1.6rem] pb-[4.0rem]' : 'px-[20.4rem] pb-[16.5rem]'}>
        <div className={`pb-[4rem] ${isMobile ? '' : 'pt-[6.4rem]'}`}>
          <div className={`${isMobile ? '' : 'flex flex-row items-center justify-between'}`}>
            <h1
              onClick={refreshTechArticleParams}
              className={`${isMobile ? 'st1 inline-block mb-[2.4rem]' : 'h3'} font-bold cursor-pointer`}
            >
              기술블로그 🧪
            </h1>
            <SearchInput />
          </div>
        </div>
        {/* 구독영역 */}
        <QueryErrorBoundary
          fallbackRender={({ handleRetryClick }) => (
            <GetCompanyListError handleRetryClick={handleRetryClick} />
          )}
        >
          <TechCompanySelector />
        </QueryErrorBoundary>
        {/* 총갯수 & 드롭다운 영역 */}
        <div className='flex justify-between items-center pt-[4rem]'>
          <p className='p1'>
            총 <span className='text-secondary500 font-bold'>{totalArticleCnt}</span>건
          </p>
          {isMobile ? <MobileDropdown type='techblog' /> : <Dropdown type='techblog' />}
        </div>
        {/* 게시글 목록 */}
        {getStatusComponent(techBlogData, status)}
        <div ref={bottomDiv} />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchInfiniteQuery({
      queryKey: ['techBlogData', 'LATEST', '', null, null],
      queryFn: ({ pageParam = '' }) => {
        const isValidSortOption = techBlogDropdownOptions.includes(INITIAL_TECH_SORT_OPTION);
        let elasticId = '';
        let score = 0;

        if (pageParam) {
          const parsedParam = JSON.parse(pageParam);
          elasticId = parsedParam.elasticId;
          score = parsedParam.score;
        }
        if (!isValidSortOption) {
          return Promise.resolve({ data: { content: [], last: true } });
        }
        return getTechBlogData({
          elasticId,
          techSort: INITIAL_TECH_SORT_OPTION,
          keyword: INITIAL_TECH_SEARCH_KEYWORD,
          companyId: INITIAL_TECH_COMPANY_ID,
          score,
          size: TECH_VIEW_SIZE,
        });
      },
      initialPageParam: '',
      pages: 1, // 첫 페이지만 프리페치
      getNextPageParam: (lastPage) => lastPage.cursor,
    });

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
      revalidate: ONE_DAY_IN_SECONDS, // 페이지를 하루(24시간)마다 다시 생성
    };
  } catch (error) {
    console.error('Error prefetching tech blog data:', error);
    throw new Error('데이터를 프리패치 하는중 오류가 발생했습니다.');
  }
}
