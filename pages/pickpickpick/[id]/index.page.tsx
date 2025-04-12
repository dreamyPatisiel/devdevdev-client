import Link from 'next/link';
import { useRouter } from 'next/router';

import DevLoadingComponent from '@pages/loading/index.page';

import { formatDate } from '@utils/formatDate';

import { useBlameReasonStore, useSelectedStore } from '@stores/dropdownStore';
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

import { usePostBlames } from '@/api/usePostBlames';
import { ROUTES } from '@/constants/routes';
import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import { useDeletePick } from './apiHooks/useDeletePick';
import { useGetSimilarPick } from './apiHooks/useGetSimilarPick';
import { useGetPickDetailData } from './apiHooks/usePickDetailData';
import PickCommentSection from './components/PickCommentSection';
import SimilarPick from './components/SimilarPick';
import VoteCard from './components/VoteCard';

export default function Index() {
  const router = useRouter();
  const { id } = router.query;

  const { pushModal, popModal, setShowDropdown } = useModalStore();
  const { loginStatus } = useLoginStatusStore();
  const { isMobile } = useMediaQueryContext();

  const { data: pickDetailData, status } = useGetPickDetailData(id as string);
  const { data: similarPicks } = useGetSimilarPick(id as string);

  const { mutate: deletePickMutate } = useDeletePick();

  const { mutate: postBlamesMutate } = usePostBlames();

  const formatPickDate = formatDate(pickDetailData?.pickCreatedAt.split(' ')[0] || '');

  const PICK_DETAIL_MORE_BUTTON_TYPE = ['수정하기', '삭제하기'];

  const handleVoteMoreButtonClick = (type: string) => () => {
    if (type === '수정하기') {
      pushModal({
        ...PICK_VOTE_MODIFIED_MODAL,
        submitFunction: () => {
          if (id) {
            router.push(`/pickpickpick/modify/${id}`);
            popModal();
          }
        },
        cancelFunction: popModal,
      });
    }

    if (type === '삭제하기') {
      pushModal({
        ...PICK_VOTE_DELETE_MODAL,
        submitFunction: () => {
          if (id) {
            deletePickMutate(id as string, {
              onSuccess: () => {
                popModal();
              },
            });
          }
        },
        cancelFunction: popModal,
      });
    }
  };

  const handleBlameButtonClick = () => {
    pushModal({
      ...PICK_VOTE_BLAME_MODAL,
      submitFunction: () => {
        const { selectedBlameData } = useSelectedStore.getState();
        const { blameReason } = useBlameReasonStore.getState();

        if (selectedBlameData) {
          postBlamesMutate({
            blamePathType: 'PICK',
            params: {
              blameTypeId: selectedBlameData?.id,
              customReason: blameReason === '' ? null : blameReason,
              pickId: Number(id),
            },
          });
        }
      },
      cancelFunction: popModal,
    });
    setShowDropdown?.();
  };

  // 기존 모달 submit 함수
  // const modalSubmitFn = () => {
  //   if (modalType === '수정하기') {
  //     router.push(`/pickpickpick/modify/${id}`);
  //   }

  //   if (modalType === '삭제하기') {
  //     deletePickMutate(id as string);
  //   }

  //   if (modalType === '댓글삭제') {
  //     deletePickCommentMutate({ pickId: id as string, pickCommentId: selectedCommentId as number });
  //   }

  //   if (modalType === '신고') {
  //     if (selectedBlameData) {
  //       postBlamesMutate({
  //         blamePathType: 'PICK',
  //         params: {
  //           blameTypeId: selectedBlameData?.id,
  //           customReason: blameReason === '' ? null : blameReason,
  //           pickCommentId: selectedCommentId,
  //           pickId: Number(id),
  //         },
  //       });
  //     }
  //   }

  //   return closeModal();
  // };

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
        <div className='border-b-[0.1rem] border-b-gray400 flex justify-between items-baseline pb-[1.6rem] pl-[1rem]'>
          <div>
            <h3 className='h3 font-bold mb-[0.8rem]'>{pickDetailData?.pickTitle}</h3>

            <div>
              <span className='p2 text-gray100 font-bold'>
                <NicknameWithMaskedEmail
                  author={pickDetailData?.nickname ?? ''}
                  maskedEmail={pickDetailData?.userId ?? ''}
                  textSize='p2'
                />
              </span>
              <span className='p2 text-gray200 ml-[2rem] mr-[1rem]'>{formatPickDate}</span>
              {loginStatus === 'login' && !pickDetailData?.isAuthor && (
                <span
                  className='p2 text-gray200 cursor-pointer'
                  onClick={() => handleBlameButtonClick()}
                >
                  신고
                </span>
              )}
            </div>
          </div>

          {pickDetailData?.isAuthor && (
            <div className='flex-shrink-0 ml-[2.1rem]'>
              <MoreButton
                moreButtonList={PICK_DETAIL_MORE_BUTTON_TYPE.map((type) => ({
                  buttonType: type,
                  moreButtonOnclick: handleVoteMoreButtonClick(type),
                }))}
              />
            </div>
          )}
        </div>

        <VoteCard
          pickDetailOptionData={pickDetailData?.pickOptions.firstPickOption}
          dataIsVoted={pickDetailData?.isVoted}
        />
        <VoteCard
          pickDetailOptionData={pickDetailData?.pickOptions.secondPickOption}
          dataIsVoted={pickDetailData?.isVoted}
        />

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

        <PickCommentSection pickId={id as string} />

        {isMobile && <MobileToListButton route={ROUTES.PICKPICKPICK.MAIN} />}
      </div>

      {/* {isModalOpen && (
        <Modals
          modalType={modalType}
          contents={contents}
          // selected={selected}
          modalSubmitFn={modalSubmitFn}
        />
      )} */}
    </>
  );
}
