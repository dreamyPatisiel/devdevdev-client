import { useEffect } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import DevLoadingComponent from '@pages/loading/index.page';

import { formatDate } from '@utils/formatDate';

import { useSelectedStore } from '@stores/dropdownStore';
import { useModalStore } from '@stores/modalStore';

import useIsMobile from '@hooks/useIsMobile';

import WritableComment from '@components/common/comment/WritableComment';
import CommentCheckFilter from '@components/common/comments/CommentCheckFilter';
import { Dropdown } from '@components/common/dropdowns/dropdown';
import MobileToListButton from '@components/common/mobile/mobileToListButton';
import MoreButton from '@components/common/moreButton';

import { ROUTES } from '@/constants/routes';

import { useInfinitePickComments } from './apiHooks/comment/useInfinitePickComments';
import { usePostPickComment } from './apiHooks/comment/usePostPickComment';
import { useDeletePick } from './apiHooks/useDeletePick';
import { useGetSimilarPick } from './apiHooks/useGetSimilarPick';
import { useGetPickDetailData } from './apiHooks/usePickDetailData';
import CommentSet, { CommentsProps } from './components/CommentSet';
import Modals from './components/Modals';
import SimilarPick from './components/SimilarPick';
import VoteCard from './components/VoteCard';

export default function Index() {
  const router = useRouter();
  const { id } = router.query;

  const { data: pickDetailData, status } = useGetPickDetailData(id as string);
  const { data: similarPicks } = useGetSimilarPick(id as string);
  const { pickCommentsData } = useInfinitePickComments({ pickId: id as string });

  const { mutate: deletePickMutate } = useDeletePick();
  const { mutate: postPickCommentMutate } = usePostPickComment();

  const { isModalOpen, modalType, contents, setModalType, closeModal, openModal } = useModalStore();
  const { selected, setSelected } = useSelectedStore();
  const isMobile = useIsMobile();

  useEffect(() => {
    !isModalOpen && setSelected('신고 사유 선택');
  }, [isModalOpen]);

  const formatPickDate = formatDate(pickDetailData?.pickCreatedAt.split(' ')[0] || '');

  const PICK_DETAIL_MORE_BUTTON_TYPE = ['수정하기', '삭제하기'];

  const handleModalButton = (type: string) => () => {
    setModalType(type);
    openModal();
  };

  // TODO: 동작원리 정확히 알아보기
  const modalSubmitFn = () => {
    if (modalType === '수정하기') {
      router.push(`/pickpickpick/modify/${id}`);
    }

    if (modalType === '신고') {
      setModalType('신고완료');
    }

    if (modalType === '삭제하기') {
      deletePickMutate(id as string);
    }

    return closeModal();
  };

  // const [modalSubmitFn, setModalSubmitFn] = useState<() => any>();

  // useEffect(() => {
  //   switch (modalType) {
  //     case '투표수정':
  //       setModalSubmitFn(() => pickRouter);

  //       break;

  //     case '신고':
  //       setModalSubmitFn(() => setModalType('신고완료'));
  //       closeModal();
  //       break;

  //     default:
  //       setModalSubmitFn(null);
  //   }
  // }, [modalType]);

  if (status === 'pending' || !id) {
    return <DevLoadingComponent />;
  }

  return (
    <>
      <div
        className={`flex flex-col gap-[4rem] ${isMobile ? 'px-[1.6rem]' : 'px-[20.4rem] pt-[6.4rem] pb-[12.2rem]'}`}
      >
        <div className='border-b-[0.1rem] border-b-gray3 flex justify-between items-baseline pb-[1.6rem] pl-[1rem]'>
          <div>
            <h3 className='h3 font-bold mb-[0.8rem]'>{pickDetailData?.pickTitle}</h3>

            <div>
              <span className='p2 text-gray5 font-bold'>
                {pickDetailData?.nickname}({pickDetailData?.userId})
              </span>
              <span className='p2 text-gray4 ml-[2rem] mr-[1rem]'>{formatPickDate}</span>
              {/* {!pickDetailData?.isAuthor && <span className='p2 text-gray4'>신고</span>} */}
            </div>
          </div>

          {pickDetailData?.isAuthor && (
            <MoreButton
              moreButtonList={PICK_DETAIL_MORE_BUTTON_TYPE.map((type) => ({
                buttonType: type,
                moreButtonOnclick: handleModalButton(type),
              }))}
            />
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

        <div className='py-[6.4rem]'>
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

        <div className='flex flex-col gap-[3.2rem]'>
          <div className='flex items-center justify-between'>
            <span className='p1 font-bold text-gray5'>
              <span className='text-point3'>1224</span>개의 댓글
            </span>
            <Dropdown />
          </div>

          <WritableComment
            type='pickpickpick'
            mode='register'
            writableCommentButtonClick={({
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
                  pickId: id as string,
                  contents: commentContents,
                  isPickVotePublic: isPickVotePublic as boolean,
                },
                {
                  onSuccess: onSuccess,
                },
              );
            }}
          />

          <div>
            <div className='flex gap-[1.6rem]'>
              <CommentCheckFilter checkOptionTitle='PICK A' />
              <CommentCheckFilter checkOptionTitle='PICK B' />
            </div>
            <div>
              {pickCommentsData?.pages[0].data.content.map((pickComment: CommentsProps) => (
                <CommentSet
                  key={pickComment.pickCommentId}
                  {...pickComment}
                  pickId={id as string}
                />
              ))}
            </div>
          </div>
        </div>

        {isMobile && <MobileToListButton route={ROUTES.PICKPICKPICK.MAIN} />}
      </div>

      {isModalOpen && (
        <Modals
          modalType={modalType}
          contents={contents}
          selected={selected}
          modalSubmitFn={modalSubmitFn}
        />
      )}
    </>
  );
}
