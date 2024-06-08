import React from 'react';

import Link from 'next/link';

import { useInfiniteTechBlogData } from '@pages/techblog/api/useInfiniteTechBlog';
import { ArticleViewBtn } from '@pages/techblog/components/techDetailCardSubComponent';
import { TechContent, TechInfo } from '@pages/techblog/components/techSubComponent';
import { TechCardProps } from '@pages/techblog/types/techBlogType';

import { useDropdownStore } from '@stores/dropdownStore';

import { MainTechSkeletonList } from '@components/common/skeleton/techBlogSkeleton';

import TechBlogImg from '../techblog/techBlogImg';
import GradientDiv from './gradientDiv';

export default function DynamicTechBlogComponent() {
  const { sortOption } = useDropdownStore();

  const { techBlogData, status } = useInfiniteTechBlogData(sortOption);

  const getStatusComponent = () => {
    switch (status) {
      case 'pending':
        return <MainTechSkeletonList itemsInRows={2} />;

      default:
        return (
          <>
            <div className='relative overflow-y-scroll scrollbar-hide max-h-[50rem]'>
              {techBlogData?.pages?.map((group, index) => (
                <React.Fragment key={index}>
                  {group.data.content.map((data: TechCardProps) => (
                    <div
                      key={data.id}
                      className='grid grid-flow-col border-white gap-[3.2rem] text-white py-[2.8rem] border-b border-b-gray1 border-solid select-none '
                    >
                      <div>
                        <TechBlogImg
                          id={data.id}
                          thumbnailUrl={data.thumbnailUrl}
                          rounded='rounded-[0.8rem]'
                          size='small'
                        />

                        <ArticleViewBtn
                          techArticleUrl={data.techArticleUrl}
                          fontSize='c1'
                          textIconGap={'mr-[0.8rem]'}
                          paddingY='pt-[1.6rem]'
                          iconSize='w-[6px] h-[20px]'
                        />
                      </div>
                      <div>
                        <div className='flex items-center justify-between border-white'>
                          <Link href={`/techblog/${data.id}`}>
                            <p className='font-bold st2 py-[0.7rem]'>{data.title}</p>
                          </Link>
                        </div>
                        <TechInfo
                          author={data.author}
                          date={data.regDate}
                          company={data.company?.name}
                          companyId={data?.id}
                        />
                        <Link href={`/techblog/${data.id}`}>
                          <TechContent content={data.contents} maxLines={4} className='mr-4' />
                        </Link>
                      </div>
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
            <GradientDiv />
          </>
        );
    }
  };

  return <>{getStatusComponent()}</>;
}
