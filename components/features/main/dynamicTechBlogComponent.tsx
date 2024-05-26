import React from 'react';

import Link from 'next/link';

import { useInfiniteTechBlogData } from '@pages/techblog/api/useInfiniteTechBlog';
import { ArticleViewBtn } from '@pages/techblog/components/techDetailCardSubComponent';
import { TechContent, TechInfo } from '@pages/techblog/components/techSubComponent';
import { TechCardProps } from '@pages/techblog/types/techBlogType';

import { useDropdownStore } from '@stores/dropdownStore';

import { TechRootSkeletonList } from '@components/common/skeleton/techBlogSkeleton';

import TechBlogImg from '../techblog/techBlogImg';

export default function DynamicTechBlogComponent() {
  const { sortOption } = useDropdownStore();

  const { techBlogData, status, error } = useInfiniteTechBlogData(sortOption);

  const getStatusComponent = () => {
    switch (status) {
      case 'pending':
        return <TechRootSkeletonList itemsInRows={2} />;

      case 'error':
        return <p>Error: {error?.message}</p>;

      default:
        return (
          <>
            <div className='overflow-y-scroll max-h-[47rem]'>
              {techBlogData?.pages?.map((group, index) => (
                <React.Fragment key={index}>
                  {group.data.content.map((data: TechCardProps) => (
                    <div
                      key={data.id}
                      className='grid grid-flow-col border-white gap-[3.2rem] text-white py-[3.2rem] border-b border-b-gray1 border-solid select-none '
                    >
                      <div>
                        <TechBlogImg
                          id={data.id}
                          thumbnailUrl={data.thumbnailUrl}
                          width={'w-[12rem]'}
                          height={'h-[8rem]'}
                          rounded='rounded-[0.8rem]'
                        />

                        <ArticleViewBtn
                          techArticleUrl={data.techArticleUrl}
                          fontSize='c1'
                          textIconGap={'mr-[0.8rem]'}
                          paddingY='pt-[1.6rem]'
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
          </>
        );
    }
  };

  return <>{getStatusComponent()}</>;
}
