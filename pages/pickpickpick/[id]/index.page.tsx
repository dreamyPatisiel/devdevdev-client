import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import DevLoadingComponent from '@pages/loading/index.page';

import { formatDate } from '@utils/formatDate';

import { useSelectedStore } from '@stores/dropdownStore';
import { useModalStore } from '@stores/modalStore';

import useIsMobile from '@hooks/useIsMobile';

import CommentCheckFilter from '@components/common/comments/CommentCheckFilter';
import { Dropdown } from '@components/common/dropdowns/dropdown';
import MobileToListButton from '@components/common/mobile/mobileToListButton';
import MoreButton from '@components/common/moreButton';

import { ROUTES } from '@/constants/routes';

import { useDeletePick } from './apiHooks/useDeletePick';
import { useGetSimilarPick } from './apiHooks/useGetSimilarPick';
import { useGetPickDetailData } from './apiHooks/usePickDetailData';
import CommentSet from './components/CommentSet';
import Modals from './components/Modals';
import SimilarPick from './components/SimilarPick';
import VoteCard from './components/VoteCard';
import WritableComment from './components/WritableComment';

export default function Index() {
  const router = useRouter();
  const { id } = router.query;

  const { data: pickDetailData, status } = useGetPickDetailData(id as string);
  const { mutate: deletePickMutate } = useDeletePick();

  const { isModalOpen, modalType, contents, setModalType, closeModal } = useModalStore();
  const { selected, setSelected } = useSelectedStore();
  const isMobile = useIsMobile();

  useEffect(() => {
    !isModalOpen && setSelected('신고 사유 선택');
  }, [isModalOpen]);

  const { data: similarPicks } = useGetSimilarPick(id as string);

  const formatPickDate = formatDate(pickDetailData?.pickCreatedAt.split(' ')[0] || '');

  // TODO: 동작원리 정확히 알아보기
  const modalSubmitFn = () => {
    if (modalType === '투표수정') {
      router.push(`/pickpickpick/modify/${id}`);
    }

    if (modalType === '신고') {
      setModalType('신고완료');
    }

    if (modalType === '투표삭제') {
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

          {pickDetailData?.isAuthor && <MoreButton moreButtonList={['수정', '삭제']} />}
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

          <WritableComment />
          <div>
            <div className='flex gap-[1.6rem]'>
              <CommentCheckFilter checkOptionTitle='PICK A' />
              <CommentCheckFilter checkOptionTitle='PICK B' />
            </div>
            <div className='py-[1.6rem] border-b-[0.1rem] border-b-gray3'>
              <CommentSet
                isPickAuthor={true}
                isDeleted={false}
                author='지루한 댑댑이'
                maskedEmail='det*******'
                createdAt='2024-09-26 11:22:33'
                isCommentAuthor={true}
                contents='뭐해? 라는 두 글자에 네가 보고 싶어 나의 속마음을 담아 우 이모티콘 하나하나 속에 달라지는 내 미묘한 심리를 알까 우 아니 바쁘지 않아 nothing no no 잠들어 있지 않아 insomnia-nia-nia 지금 다른 사람과 함께이지 않아 응, 나도 너를 생각 중우리의 네모칸은 blue 엄지손가락으로 장미꽃을 피워 향기에 취할 것 같아 우 오직 둘만의 비밀의 정원 I feel blue~ I feel blue~ 너에게 한 송이를 더 보내 밤샘 작업으로 업데이트 흥미로운 이 작품의 지은이 thats me 우 어쩜 이 관계의 climax 2막으로 넘어가기엔 지금이 good timing 우 같은 맘인 걸 알아 realize-la-lize 말을 고르지 말아 just reply-la-la-ly 조금 장난스러운 나의 은유에 네 해석이 궁금해 우리의 색은 gray and blue 엄지손가락으로 말풍선을 띄워 금세 터질 것 같아 우 호흡이 가빠져 어지러워 I feel blue, I feel blue, I feel blue 너에게 가득히 채워 띄어쓰기없이 보낼게 사랑인 것 같애 백만송이 장미꽃을, 나랑 피워볼래? 꽃잎의 색은 우리 마음 가는 대로 칠해 시들 때도 예쁘게 우리의 네모 칸은 bloom 엄지손가락으로 장미꽃을 피워 향기에 취할 것 같아 우 오직 둘만의 비밀의 정원 I feel bloom, I feel bloom, I feel bloom 너에게 한 송이를 더 보내'
                votedPickOption='firstPickOption'
                votedPickOptionTitle='아이유의 블루밍'
                pickCommentId={1}
                replies={[
                  {
                    isPickAuthor: true,
                    isDeleted: false,
                    author: '지루한 댑댑이',
                    maskedEmail: 'det*******',
                    createdAt: '2024-09-26 11:22:33',
                    isCommentAuthor: true,
                    contents:
                      '뭐해? 라는 두 글자에 네가 보고 싶어 나의 속마음을 담아 우 이모티콘 하나하나 속에 달라지는 내 미묘한 심리를 알까 우 아니 바쁘지 않아 nothing no no 잠들어 있지 않아 insomnia-nia-nia 지금 다른 사람과 함께이지 않아 응, 나도 너를 생각 중우리의 네모칸은 blue 엄지손가락으로 장미꽃을 피워 향기에 취할 것 같아 우 오직 둘만의 비밀의 정원 I feel blue~ I feel blue~ 너에게 한 송이를 더 보내 밤샘 작업으로 업데이트 흥미로운 이 작품의 지은이 thats me 우 어쩜 이 관계의 climax 2막으로 넘어가기엔 지금이 good timing 우 같은 맘인 걸 알아 realize-la-lize 말을 고르지 말아 just reply-la-la-ly 조금 장난스러운 나의 은유에 네 해석이 궁금해 우리의 색은 gray and blue 엄지손가락으로 말풍선을 띄워 금세 터질 것 같아 우 호흡이 가빠져 어지러워 I feel blue, I feel blue, I feel blue 너에게 가득히 채워 띄어쓰기없이 보낼게 사랑인 것 같애 백만송이 장미꽃을, 나랑 피워볼래? 꽃잎의 색은 우리 마음 가는 대로 칠해 시들 때도 예쁘게 우리의 네모 칸은 bloom 엄지손가락으로 장미꽃을 피워 향기에 취할 것 같아 우 오직 둘만의 비밀의 정원 I feel bloom, I feel bloom, I feel bloom 너에게 한 송이를 더 보내',
                    pickCommentId: 2,
                    memberId: 2,
                    pickCommentParentId: 1,
                    pickCommentOriginParentId: 1,
                  },
                ]}
              />
            </div>
            {/* <div className='py-[1.6rem] border-b-[0.1rem] border-b-gray3'>
              
              {modalType === '수정' ? (
                <ModifyComment comment='1미래는 백엔드다   마음 울적한 날에 거리를 걸어보고, 어쩌고 저쩌고 더미 텍스트 얼마나 써야하는지 진짜 모르겠다 아니 네이버 웹툰은 폰트 사이즈가 13px 이더라고요. 살짝 작아보이면서도 읽히는 정도인 거 같아서 그런 것 같습니다. 근데 사용자들의 댓글 길이가 어느정도일지 살짝 감이 안오네요?' />
              ) : (
                <Comments
                  id={1}
                  comment='1미래는 백엔드다   마음 울적한 날에 거리를 걸어보고, 어쩌고 저쩌고 더미 텍스트 얼마나 써야하는지 진짜 모르겠다 아니 네이버 웹툰은 폰트 사이즈가 13px 이더라고요. 살짝 작아보이면서도 읽히는 정도인 거 같아서 그런 것 같습니다. 근데 사용자들의 댓글 길이가 어느정도일지 살짝 감이 안오네요?'
                  isPickAuthor={true}
                  isModified={true}
                />
              )}
            </div>
            <div className='py-[1.6rem] border-b-[0.1rem] border-b-gray3'>
              <Comments
                id={2}
                comment='2미래는 백엔드다   마음 울적한 날에 거리를 걸어보고, 어쩌고 저쩌고 더미 텍스트 얼마나 써야하는지 진짜 모르겠다 아니 네이버 웹툰은 폰트 사이즈가 13px 이더라고요. 살짝 작아보이면서도 읽히는 정도인 거 같아서 그런 것 같습니다. 근데 사용자들의 댓글 길이가 어느정도일지 살짝 감이 안오네요?'
                subCommentInfo={[
                  {
                    id: 1,
                    subComment:
                      '2-1미래는 백엔드다   어쩌구저쩌구 당연히 이러니까 백엔드가 짱이라고 생각합니다. 댓글인데 이렇게 이렇게 해볼까요.',
                    isModified: false,
                    isPickAuthor: false,
                  },
                  {
                    id: 2,
                    subComment:
                      '2-2미래는 백엔드다   마음 울적한 날에 거리를 걸어보고, 어쩌고 저쩌고 더미 텍스트 얼마나 써야하는지 진짜 모르겠다 아니 네이버 웹툰은 폰트 사이즈가 13px 이더라고요. 살짝 작아보이면서도 읽히는 정도인 거 같아서 그런 것 같습니다. 근데 사용자들의 댓글 길이가 어느정도일지 살짝 감이 안오네요?  ',
                    isModified: true,
                    isPickAuthor: false,
                  },
                  {
                    id: 3,
                    subComment:
                      '2-3미래는 백엔드다   마음 울적한 날에 거리를 걸어보고, 어쩌고 저쩌고 더미 텍스트 얼마나 써야하는지 진짜 모르겠다 아니 네이버 웹툰은 폰트 사이즈가 13px 이더라고요. 살짝 작아보이면서도 읽히는 정도인 거 같아서 그런 것 같습니다. 근데 사용자들의 댓글 길이가 어느정도일지 살짝 감이 안오네요?  ',
                    isModified: false,
                    isPickAuthor: false,
                  },
                  {
                    id: 4,
                    subComment:
                      '2-4미래는 백엔드다   마음 울적한 날에 거리를 걸어보고, 어쩌고 저쩌고 더미 텍스트 얼마나 써야하는지 진짜 모르겠다 아니 네이버 웹툰은 폰트 사이즈가 13px 이더라고요. 살짝 작아보이면서도 읽히는 정도인 거 같아서 그런 것 같습니다. 근데 사용자들의 댓글 길이가 어느정도일지 살짝 감이 안오네요?  ',
                    isModified: false,
                    isPickAuthor: false,
                  },
                  {
                    id: 5,
                    subComment:
                      '2-5미래는 백엔드다   마음 울적한 날에 거리를 걸어보고, 어쩌고 저쩌고 더미 텍스트 얼마나 써야하는지 진짜 모르겠다 아니 네이버 웹툰은 폰트 사이즈가 13px 이더라고요. 살짝 작아보이면서도 읽히는 정도인 거 같아서 그런 것 같습니다. 근데 사용자들의 댓글 길이가 어느정도일지 살짝 감이 안오네요?  ',
                    isModified: false,
                    isPickAuthor: false,
                  },
                  {
                    id: 6,
                    subComment:
                      '2-6미래는 백엔드다   마음 울적한 날에 거리를 걸어보고, 어쩌고 저쩌고 더미 텍스트 얼마나 써야하는지 진짜 모르겠다 아니 네이버 웹툰은 폰트 사이즈가 13px 이더라고요. 살짝 작아보이면서도 읽히는 정도인 거 같아서 그런 것 같습니다. 근데 사용자들의 댓글 길이가 어느정도일지 살짝 감이 안오네요?  ',
                    isModified: true,
                    isPickAuthor: false,
                  },
                ]}
                isPickAuthor={false}
                isModified={true}
              />
            </div>
            <div className='py-[1.6rem] border-b-[0.1rem] border-b-gray3'>
              <Comments
                id={3}
                comment='3미래는 백엔드다   마음 울적한 날에 거리를 걸어보고, 어쩌고 저쩌고 더미 텍스트 얼마나 써야하는지 진짜 모르겠다 아니 네이버 웹툰은 폰트 사이즈가 13px 이더라고요. 살짝 작아보이면서도 읽히는 정도인 거 같아서 그런 것 같습니다. 근데 사용자들의 댓글 길이가 어느정도일지 살짝 감이 안오네요?'
                isPickAuthor={true}
                isModified={false}
              />
            </div>
            <div className='py-[1.6rem] border-b-[0.1rem] border-b-gray3'>
              <Comments
                id={4}
                isDeleted={{ byAdmin: true }}
                comment='4미래는 백엔드다   마음 울적한 날에 거리를 걸어보고, 어쩌고 저쩌고 더미 텍스트 얼마나 써야하는지 진짜 모르겠다 아니 네이버 웹툰은 폰트 사이즈가 13px 이더라고요. 살짝 작아보이면서도 읽히는 정도인 거 같아서 그런 것 같습니다. 근데 사용자들의 댓글 길이가 어느정도일지 살짝 감이 안오네요?'
                isPickAuthor={false}
                isModified={false}
              />
            </div>
            <div className='py-[1.6rem] border-b-[0.1rem] border-b-gray3'>
              <Comments
                id={5}
                comment='5미래는 백엔드다   마음 울적한 날에 거리를 걸어보고, 어쩌고 저쩌고 더미 텍스트 얼마나 써야하는지 진짜 모르겠다 아니 네이버 웹툰은 폰트 사이즈가 13px 이더라고요. 살짝 작아보이면서도 읽히는 정도인 거 같아서 그런 것 같습니다. 근데 사용자들의 댓글 길이가 어느정도일지 살짝 감이 안오네요?'
                isPickAuthor={false}
                isModified={false}
                isDeleted={{ byWriter: true }}
                subCommentInfo={[
                  {
                    id: 1,
                    subComment:
                      '5-1미래는 백엔드다   어쩌구저쩌구 당연히 이러니까 백엔드가 짱이라고 생각합니다. 댓글인데 이렇게 이렇게 해볼까요.',
                    isModified: false,
                    isPickAuthor: true,
                  },
                  {
                    id: 2,
                    subComment:
                      '5-2미래는 백엔드다   마음 울적한 날에 거리를 걸어보고, 어쩌고 저쩌고 더미 텍스트 얼마나 써야하는지 진짜 모르겠다 아니 네이버 웹툰은 폰트 사이즈가 13px 이더라고요. 살짝 작아보이면서도 읽히는 정도인 거 같아서 그런 것 같습니다. 근데 사용자들의 댓글 길이가 어느정도일지 살짝 감이 안오네요?  ',
                    isModified: false,
                    isPickAuthor: false,
                  },
                ]}
              />
            </div> */}
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
