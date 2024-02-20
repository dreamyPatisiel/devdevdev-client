import { useState } from 'react';

import { useModalStore } from '@stores/modalStore';

import ThreeballButton from '@public/image/pickpickpick/ellipsis-v.svg';

import { Modal } from './modals/modal';

export default function MoreButton({ moreButtonList }: { moreButtonList: string[] }) {
  const [onMoreButton, setMoreButton] = useState(false);
  const [modalType, setModalType] = useState('');

  const { isModalOpen, openModal } = useModalStore();

  const handleModalButton = (type: string) => () => {
    setModalType(type);
    openModal();
  };

  return (
    <>
      <div className='relative'>
        <button onClick={() => setMoreButton(!onMoreButton)}>
          <ThreeballButton alt='원 세개 버튼' />
        </button>

        {onMoreButton && (
          <ul className='bg-gray1 border-[0.1rem] border-gray3 rounded-[0.4rem] px-[0.8rem] py-[1rem] c1 text-gray4 w-[8rem] flex flex-col gap-[0.2rem] absolute top-0 left-[2rem]'>
            {moreButtonList.map((menuItem, index) => (
              <li
                key={index}
                onClick={handleModalButton(menuItem)}
                className='w-full text-left hover:text-gray5 cursor-pointer'
              >
                {menuItem}
              </li>
            ))}
          </ul>
        )}
      </div>

      {isModalOpen && modalType === '수정' && (
        <Modal
          title='투표를 수정할까요?'
          contents='타인을 비방하거나 광고가 포함된 게시물은 관리자에 의해 삭제될 수 있어요.'
          submitText='수정하기'
        />
      )}
      {isModalOpen && modalType === '삭제' && (
        <Modal
          title='투표를 삭제할까요?'
          contents='이 투표가 누군가의 한줄기 빛일지도 몰라요. 🥲'
          submitText='삭제하기'
        />
      )}
    </>
  );
}
