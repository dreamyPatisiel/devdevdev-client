import { useEffect } from 'react';

import { useSelectedStore } from '@stores/dropdownStore';
import { useModalStore } from '@stores/modalStore';
import { useVotedStore } from '@stores/votedStore';

import { Dropdown } from '@components/dropdown';
import MoreButton from '@components/moreButton';

import AnotherPick from './components/AnotherPick';
import Comments from './components/Comments';
import Modals from './components/Modals';
import ModifyComment from './components/ModifyComment';
import VoteCard from './components/VoteCard';
import WritableComment from './components/WritableComment';

export default function Index() {
  const { firstVote, secondVote } = useVotedStore();

  const { isModalOpen, modalType, contents, setModalType } = useModalStore();
  const { selected, setSelected } = useSelectedStore();

  useEffect(() => {
    !isModalOpen && setSelected('신고 사유 선택');
  }, [isModalOpen]);

  return (
    <>
      <div className='flex flex-col gap-[4rem] pt-[6.4rem] pb-[12.2rem] px-[20.4rem]'>
        <div className='border-b-[0.1rem] border-b-gray3 flex justify-between items-baseline pb-[1.6rem] pl-[1rem]'>
          <div>
            <h3 className='h3 font-bold mb-[0.8rem]'>
              토픽을 정리할 수 있는 제목입니다. 제목을 써주세요.
            </h3>

            <div>
              <span className='p2 text-gray5 font-bold'>성실한 댑댑이(det*******)</span>
              <span className='p2 text-gray3 ml-[2rem] mr-[1rem]'>2023.05.11</span>
              <span className='p2 text-gray4'>신고</span>
            </div>
          </div>

          <MoreButton moreButtonList={['수정', '삭제']} />
        </div>

        <VoteCard onClick={firstVote} voted={'first'} />
        <VoteCard onClick={secondVote} voted={'second'} />

        <div className='py-[6.4rem]'>
          <h3 className='h3 mb-[2.4rem] font-bold'>나도 고민했는데! 다른 픽픽픽 💖</h3>
          <div className='flex gap-[2rem] overflow-hidden'>
            <AnotherPick />
            <AnotherPick />
            <AnotherPick />
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
            <div className='py-[1.6rem] border-b-[0.1rem] border-b-gray3'>
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
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && Modals(modalType, contents, setModalType, selected)}
    </>
  );
}
