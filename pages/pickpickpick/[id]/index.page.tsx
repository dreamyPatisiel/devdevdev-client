import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import DevLoadingComponent from '@pages/loading/index.page';

import { formatDate } from '@utils/formatDate';

import { useLoginStatusStore } from '@stores/loginStore';
import { useModalStore } from '@stores/modalStore';

import NicknameWithMaskedEmail from '@components/common/NicknameWithMaskedEmail';
import MobileToListButton from '@components/common/mobile/mobileToListButton';
import {
  PICK_VOTE_BLAME_MODAL,
  PICK_VOTE_DELETE_MODAL,
  PICK_VOTE_MODIFIED_MODAL,
} from '@components/common/modals/modalConfig/pickVote';
import MoreButton from '@components/common/moreButton';
import StatisticsItem from '@components/features/pickpickpick/StatisticsItem';
import type { MetaHeadProps } from '@components/meta/MetaHead';

import GrayComment from '@public/image/comment-dots.svg';
import GrayFire from '@public/image/fire-alt.svg';

import { META } from '@/constants/metaData';
import { ROUTES } from '@/constants/routes';
import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import { useGetSimilarPick } from './apiHooks/useGetSimilarPick';
import { useGetPickDetailData } from './apiHooks/usePickDetailData';
import PickCommentSection from './components/PickCommentSection';
import SimilarPick from './components/SimilarPick';
import VoteCardV2 from './components/VoteCardV2';
import usePickDetailHandlers from './handlers/usePickDetailHandlers';

type NextPageWithMeta = NextPage & { meta?: MetaHeadProps };

const PickDetailPage: NextPageWithMeta = () => {
  const router = useRouter();
  const { id } = router.query;

  const { pushModal, popModal, setShowDropdown } = useModalStore();
  const { loginStatus } = useLoginStatusStore();
  const { isMobile } = useMediaQueryContext();

  const { data: pickDetailData, status } = useGetPickDetailData(id as string);
  const { data: similarPicks } = useGetSimilarPick(id as string);

  const formatPickDate = formatDate(pickDetailData?.pickCreatedAt.split(' ')[0] || '');

  const PICK_DETAIL_MORE_BUTTON_TYPE = ['수정하기', '삭제하기'];

  const { handleModifySubmit, handleDeleteSubmit, handleBlameSubmit } = usePickDetailHandlers(id);

  const handleVoteMoreButtonClick = (type: string) => () => {
    if (type === '수정하기') {
      pushModal({
        ...PICK_VOTE_MODIFIED_MODAL,
        submitFunction: handleModifySubmit,
        cancelFunction: popModal,
      });
    }

    if (type === '삭제하기') {
      pushModal({
        ...PICK_VOTE_DELETE_MODAL,
        submitFunction: handleDeleteSubmit,
        cancelFunction: popModal,
      });
    }
  };

  const handleBlameButtonClick = () => {
    pushModal({
      ...PICK_VOTE_BLAME_MODAL,
      submitFunction: handleBlameSubmit,
      cancelFunction: popModal,
    });
    setShowDropdown?.();
  };

  if (status === 'pending' || !id) {
    return <DevLoadingComponent />;
  }

  return (
    <>
      <div
        className={`flex flex-col gap-[4rem]
          ${isMobile ? 'px-[1.6rem]' : 'px-[20.4rem] pt-[6.4rem] pb-[12.2rem]'}
          `}
      >
        <div className='flex flex-col items-center'>
          <div
            className={`w-full border-b-[0.1rem] border-b-gray400 flex justify-between items-start ${isMobile ? 'pb-[1.6rem] mb-[2rem]' : 'min-w-[77.5rem] py-[1.6rem] px-[3.2rem] bg-gray800 rounded-t-[1.2rem]'}`}
          >
            <div className='w-full'>
              <div className={`flex items-baseline gap-[1.2rem] `}>
                <h3 className={`font-bold mb-[0.8rem] flex w-full ${isMobile ? 'st2' : 'h3'}`}>
                  {pickDetailData?.pickTitle}
                </h3>
                {pickDetailData?.isAuthor && (
                  <div className='mr-0'>
                    <MoreButton
                      moreButtonList={PICK_DETAIL_MORE_BUTTON_TYPE.map((type) => ({
                        buttonType: type,
                        moreButtonOnclick: handleVoteMoreButtonClick(type),
                      }))}
                    />
                  </div>
                )}
              </div>

              <div className={`${isMobile ? 'flex flex-col gap-[0.4rem]' : ''}`}>
                <span className='p2 text-gray100 font-bold mr-[2rem] '>
                  <NicknameWithMaskedEmail
                    author={pickDetailData?.nickname ?? ''}
                    maskedEmail={pickDetailData?.userId ?? ''}
                    textSize='p2'
                  />
                </span>
                <span>
                  <span className='p2 text-gray200 mr-[1rem]'>{formatPickDate}</span>
                  {loginStatus === 'login' && !pickDetailData?.isAuthor && (
                    <span
                      className='p2 text-gray200 cursor-pointer'
                      onClick={() => handleBlameButtonClick()}
                    >
                      신고
                    </span>
                  )}
                </span>
              </div>
              {!isMobile && (
                <div className='flex mt-[1rem] gap-[2rem]'>
                  <StatisticsItem
                    icon={GrayFire}
                    alt='투표 이미지'
                    text='투표'
                    count={pickDetailData?.voteTotalCount ?? 0}
                    textColor='text-gray100'
                  />
                  <StatisticsItem
                    icon={GrayComment}
                    alt='댓글 이미지'
                    text='댓글'
                    count={pickDetailData?.commentTotalCount ?? 0}
                    textColor='text-gray100'
                  />
                </div>
              )}
            </div>
          </div>

          <div
            className={`w-full flex ${isMobile ? 'flex-col gap-[4rem]' : 'min-w-[77.5rem] gap-[2.4rem] p-[4rem] bg-gray800 rounded-b-[1.2rem]'}`}
          >
            <VoteCardV2
              pickDetailOptionData={pickDetailData?.pickOptions.firstPickOption}
              dataIsVoted={pickDetailData?.isVoted}
              pickOrder='first'
            />
            <VoteCardV2
              pickDetailOptionData={pickDetailData?.pickOptions.secondPickOption}
              dataIsVoted={pickDetailData?.isVoted}
              pickOrder='second'
            />
          </div>
        </div>

        <div className='py-[4.8rem]'>
          <h3 className='h3 mb-[2.4rem] font-bold'>나도 고민했는데! 다른 픽픽픽 💘</h3>
          <div className={`flex gap-[2rem] ${isMobile && 'flex-col'}`}>
            {similarPicks?.map((similarData) => (
              <Link
                href={`${ROUTES.PICKPICKPICK.MAIN}/${similarData.id}`}
                key={similarData.id}
                className='flex-1'
              >
                <SimilarPick data={similarData} />
              </Link>
            ))}
          </div>
        </div>

        <PickCommentSection pickId={id as string} dataIsVoted={pickDetailData?.isVoted} />

        {isMobile && <MobileToListButton route={ROUTES.PICKPICKPICK.MAIN} />}
      </div>
    </>
  );
};

PickDetailPage.meta = META.PICK;

export default PickDetailPage;
