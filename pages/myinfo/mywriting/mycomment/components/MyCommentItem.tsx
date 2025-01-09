import { useRouter } from 'next/router';

import { formatDate } from '@utils/formatDate';

import useIsMobile from '@hooks/useIsMobile';

import NicknameWithMaskedEmail from '@components/common/NicknameWithMaskedEmail';
import SelectedPick from '@components/common/comments/SelectedPick';
import Tag from '@components/common/tag/tag';
import StatisticsItem from '@components/features/pickpickpick/StatisticsItem';

import AngleRightIcon from '@public/assets/AngleRightIcon';
import thumbsUp from '@public/image/thumbs-up.svg';

interface MyCommentItemProps {
  author: string;
  maskedEmail: string;
  postId: number;
  commentId: number;
  commentType: 'PICK' | 'TECH';
  postTitle: string;
  commentContents: string;
  commentCreatedAt: string;
  commentLikedCount: number;
  pickOptionTitle?: string;
  pickOptionType?: 'firstPickOption' | 'secondPickOption';
}

export default function MyCommentItem({
  commentType,
  author,
  maskedEmail,
  postId,
  commentId,
  postTitle,
  commentCreatedAt,
  commentContents,
  commentLikedCount,
  pickOptionTitle,
  pickOptionType,
}: MyCommentItemProps) {
  const router = useRouter();
  const isMobile = useIsMobile();

  const handleMyCommentClick = ({ type }: { type: 'PICK' | 'TECH' }) => {
    if (type === 'PICK') {
      router.push(`/pickpickpick/${postId}`);
    }

    if (type === 'TECH') {
      router.push(`/techblog/${postId}`);
    }

    return;
  };

  return (
    <div
      onClick={() => handleMyCommentClick({ type: commentType })}
      className={`flex gap-[2.4rem] px-[3.2rem] py-[2.4rem] border border-gray500 rounded-Radius16 cursor-pointer ${isMobile ? 'flex-wrap' : ''}`}
    >
      <div className={`${isMobile ? 'basis-[100%]' : 'basis-[30%]'}`}>
        <div className='flex justify-between mb-[1.2rem]'>
          {commentType === 'PICK' ? (
            <Tag status='line' size='small' color='primary' content='픽픽픽' />
          ) : (
            <Tag status='line' size='small' color='secondary' content='기술블로그' />
          )}
          {isMobile && <button>삭제</button>}
        </div>
        <div className={`flex items-baseline gap-[1.6rem] ${isMobile ? 'justify-between' : ''}`}>
          <p className='p1 font-bold text-gray50 '>{postTitle}</p>
          <AngleRightIcon
            color={`${commentType === 'PICK' ? 'var(--primary300)' : 'var(--secondary300)'} `}
          />
        </div>
      </div>

      <div
        className={`flex flex-col gap-[1.6rem] 
          ${isMobile ? 'border-t border-t-gray500 pt-[2.4rem]' : 'basis-[70%] border-l border-l-gray500 pl-[2.4rem]'}`}
      >
        <div className='flex justify-between'>
          <span>
            <NicknameWithMaskedEmail author={author} maskedEmail={maskedEmail} />
            <span className={`c1 text-gray300 ml-[1.6rem]`}>
              {formatDate(commentCreatedAt || '')}
            </span>
          </span>
          {!isMobile && <button>삭제</button>}
        </div>

        {pickOptionType && pickOptionTitle && (
          <SelectedPick votedPickOption={pickOptionType} votedPickOptionTitle={pickOptionTitle} />
        )}
        <p className='p2 text-gray50'>{commentContents}</p>

        <StatisticsItem icon={thumbsUp} alt='내 댓글의 추천 수' count={commentLikedCount} />
      </div>
    </div>
  );
}
