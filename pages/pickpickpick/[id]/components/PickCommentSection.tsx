import { useState } from 'react';

import { PickCommentDropdownProps, useDropdownStore } from '@stores/dropdownStore';

import useIsMobile from '@hooks/useIsMobile';

import WritableComment from '@components/common/comment/WritableComment';
import CommentCheckFilter from '@components/common/comments/CommentCheckFilter';
import { Dropdown } from '@components/common/dropdowns/dropdown';
import MobileDropdown from '@components/common/dropdowns/mobileDropdown';

import { useGetBestComments } from '../apiHooks/comment/useGetBestComments';
import { useInfinitePickComments } from '../apiHooks/comment/useInfinitePickComments';
import { usePostPickComment } from '../apiHooks/comment/usePostPickComment';
import BestComments from './BestComments';
import CommentSet, { CommentsProps } from './CommentSet';

type PickOptionType = 'firstPickOption' | 'secondPickOption' | '';

export default function PickCommentSection({ pickId }: { pickId: string }) {
  const [currentPickOptionTypes, setCurrentPickOptionTypes] = useState<PickOptionType[]>([]);

  const { sortOption } = useDropdownStore();
  const isMobile = useIsMobile();

  const { data: bestCommentsData } = useGetBestComments({ pickId, size: 3 });

  const { pickCommentsData } = useInfinitePickComments({
    pickId: pickId,
    pickOptionType:
      currentPickOptionTypes.length === 0
        ? ''
        : currentPickOptionTypes.length === 1
          ? currentPickOptionTypes[0]
          : `${currentPickOptionTypes[0]}&pickOptionType=${currentPickOptionTypes[1]}`, // FIXME: 추후에 둘 다 선택시 요청 부분 수정하기
    pickCommentSort: sortOption as PickCommentDropdownProps,
  });
  const PICK_COMMENT_TOTAL_COUNT = pickCommentsData?.pages[0].data.totalElements;

  const { mutate: postPickCommentMutate } = usePostPickComment();

  const handleFilterChange = (optionType: PickOptionType) => {
    if (optionType === '') {
      return setCurrentPickOptionTypes([]);
    }

    if (optionType === 'firstPickOption' || optionType === 'secondPickOption') {
      setCurrentPickOptionTypes((prev) =>
        prev.includes(optionType)
          ? prev.filter((option) => option !== optionType)
          : [...prev, optionType],
      );
    }
  };

  const handleWritableCommentButonClick = ({
    contents: commentContents,
    isPickVotePublic,
    onSuccess,
  }: {
    contents: string;
    isPickVotePublic?: boolean;
    onSuccess: () => void;
  }) => {
    postPickCommentMutate(
      {
        pickId,
        contents: commentContents,
        isPickVotePublic: isPickVotePublic as boolean,
      },
      {
        onSuccess: onSuccess,
      },
    );
  };

  return (
    <>
      <WritableComment
        type='pickpickpick'
        mode='register'
        writableCommentButtonClick={handleWritableCommentButonClick}
      />
      <div className='flex flex-col gap-[3.2rem]'>
        <div className={`flex  ${isMobile ? 'flex-col ' : 'items-center justify-between'}`}>
          <span className={`p1 font-bold text-gray5 ${isMobile ? 'mb-[1.6rem]' : ''}`}>
            <span className={`text-point3`}>{PICK_COMMENT_TOTAL_COUNT}</span>
            개의 댓글
          </span>

          <div className={`flex gap-[1.6rem]`}>
            <CommentCheckFilter
              checkOptionTitle='전체'
              onFilterChange={() => handleFilterChange('')}
              isChecked={currentPickOptionTypes.length === 0}
            />
            <CommentCheckFilter
              checkOptionTitle='PICK A'
              onFilterChange={() => handleFilterChange('firstPickOption')}
              isChecked={currentPickOptionTypes.includes('firstPickOption')}
            />
            <CommentCheckFilter
              checkOptionTitle='PICK B'
              onFilterChange={() => handleFilterChange('secondPickOption')}
              isChecked={currentPickOptionTypes.includes('secondPickOption')}
            />
            {isMobile ? <MobileDropdown type='pickComment' /> : <Dropdown type='pickComment' />}
          </div>
        </div>

        <div>
          {bestCommentsData?.datas.map((bestComment: CommentsProps) => (
            <BestComments key={bestComment.pickCommentId} {...bestComment} pickId={pickId} />
          ))}
          {PICK_COMMENT_TOTAL_COUNT === 0 ? (
            <p className='p1 text-[#94A0B0] text-center my-[14rem]'>
              작성된 댓글이 없어요! 첫댓글을 작성해주세요
            </p>
          ) : (
            pickCommentsData?.pages[0].data.content.map((pickComment: CommentsProps) => (
              <CommentSet key={pickComment.pickCommentId} {...pickComment} pickId={pickId} />
            ))
          )}
        </div>
      </div>
    </>
  );
}
