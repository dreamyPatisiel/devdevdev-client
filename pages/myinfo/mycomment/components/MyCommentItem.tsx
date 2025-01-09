import Image from 'next/image';
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
  commentType = 'PICK',
  author = '아이유짱',
  maskedEmail = 'iuu*******',
  postId = 222,
  commentId = 123,
  postTitle = '아이유는 국민가수인데요. 여러분은 아이유의 노래 중 무엇이 가장 아이유의 성장에 큰 도움을 줬다고 생각하시나요?!',
  commentCreatedAt = '2023-05-11',
  commentContents = '여러모로 그는 K-팝 아티스트 중 아티스트 라는 호칭의 고전적 의미에 가장 가까운 스타다. 음악가로서 그가 본업에 충실하고, 단호하되 과격하지 않게 대중과 소통함으로써 존경을 쌓아온 한편, 인간 이지은의 성공 신화와 미담은 한국인이 숭배하는 또 다른 가치를 드러낸다.',
  commentLikedCount = 12344,
  pickOptionTitle = '사용자가 결제를 진행 후 확인받는 프로세스에서는 Kakao의 방법이 더 서버의 비용을 절감하고 유용합니다.',
  pickOptionType = 'firstPickOption',
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

        <SelectedPick votedPickOption={pickOptionType} votedPickOptionTitle={pickOptionTitle} />

        <p className='p2 text-gray50'>{commentContents}</p>

        <StatisticsItem icon={thumbsUp} alt='내 댓글의 추천 수' count={commentLikedCount} />
      </div>
    </div>
  );
}
