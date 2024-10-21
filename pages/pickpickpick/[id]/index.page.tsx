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

  const { isModalOpen, modalType, contents, setModalType, closeModal, openModal } = useModalStore();
  const isMobile = useIsMobile();

  const { data: similarPicks } = useGetSimilarPick(id as string);

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

          <WritableComment />
          <div>
            <div className='flex gap-[1.6rem]'>
              <CommentCheckFilter checkOptionTitle='PICK A' />
              <CommentCheckFilter checkOptionTitle='PICK B' />
            </div>
            <div>
              <CommentSet
                isPickAuthor={true}
                isDeleted={true}
                author='지루한 댑댑이'
                maskedEmail='det*******'
                createdAt='2024-09-26 11:22:33'
                isCommentAuthor={true}
                contents='댓글 작성자에 의해 삭제된 댓글입니다.'
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
                  {
                    isPickAuthor: true,
                    isDeleted: false,
                    author: '지루한 댑댑이',
                    maskedEmail: 'det*******',
                    createdAt: '2024-09-26 11:22:33',
                    isCommentAuthor: true,
                    contents: '뭐해?',
                    pickCommentId: 3,
                    memberId: 2,
                    pickCommentParentId: 1,
                    pickCommentOriginParentId: 1,
                  },
                ]}
              />
              <CommentSet
                isPickAuthor={true}
                isDeleted={false}
                author='지루한 댑댑이'
                maskedEmail='det*******'
                createdAt='2024-09-26 11:22:33'
                isCommentAuthor={true}
                contents='내가 누울 자린 아마도 한참 더 위로
아니 적당히 미끈한 곳에 뿌리내리긴 싫어
내 뒤로 착착 따라붙어 다 예쁘게 줄지어
난 기어코 하늘에 필래, what a tiny leader, le-leader
아슬아슬히 나는 홀씨 하나 또 다른
길을 향해서 fly high to bloom
혹시 나의 안부를 묻는 누군가 있거든 전해줘
걔는 홀씨가 됐다고
날 따라, gonna go to win
날 따라, 날아가 꼭대기로
You say, "후", I may fly
You say, "후", then I fly
날 따라 even without wings
날 따라, 떠올라 공중으로
You say, "후", I may fly
You say, "후" (후), then I fly
다 날 볼 수 있게 날아 줄게 한가운데
시력을 위해 꼭 지참해 네 sunglass
올려보면 눈부셔, 고소공포 하나도 안 무셔
따가운 태양과 무지 가까운 거리
까지 올라가 난 무심히 내려보리
구름을 골라타 간만에 한바탕
싹 어질러볼까
빙글빙그르 나는 홀씨 하나 가파른
바람을 타고 fly high to bloom
혹시 나의 안부를 묻는 누군가 있거든 전해줘
걔는 홀씨가 됐다고
날 따라, gonna go to win
날 따라, 날아가 꼭대기로
You say, "후", I may fly
You say, "후", then I fly
날 따라 even without wings
날 따라, 떠올라 공중으로
You say, "후", I may fly
You say, "후" (후), then I fly
앞길이 만만치 않아도 엄살은 뒤로
내 선택이야 늘 그랬듯이 쉬울 확률은 zero
남은 거 탈탈 털어줄게 모두 행운을 빌어
구태여 인사하고 갈래, may god be with ya
See, see ya'
                votedPickOption='secondPickOption'
                votedPickOptionTitle='걔는 홀씨가 됐다구!'
                pickCommentId={1}
                replies={[]}
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
