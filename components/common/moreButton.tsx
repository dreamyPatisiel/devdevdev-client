import { useState } from 'react';

import Image from 'next/image';

import { useModalStore } from '@stores/modalStore';

import ThreeballButton from '@public/image/pickpickpick/ellipsis-v.svg';

export default function MoreButton({ moreButtonList }: { moreButtonList: string[] }) {
  const [onMoreButton, setMoreButton] = useState(false);

  const { openModal, setModalType } = useModalStore();

  const handleModalButton = (type: string) => () => {
    setModalType(type);
    openModal();
  };

  return (
    <div className='relative'>
      <button onClick={() => setMoreButton(!onMoreButton)}>
        <Image src={ThreeballButton} alt='원 세개 버튼' />
      </button>

      {onMoreButton && (
        <ul className='bg-gray1 border-[0.1rem] border-gray3 rounded-[0.4rem] py-[0.4rem] c1 text-gray4 w-[7.2rem] flex flex-col absolute top-0 left-[2rem]'>
          {moreButtonList.map((menuItem, index) => (
            <li
              key={index}
              onClick={handleModalButton(`투표${menuItem}`)}
              className='w-full text-left hover:text-gray5 cursor-pointer px-[1.2rem] py-[0.6rem]'
            >
              {menuItem}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
