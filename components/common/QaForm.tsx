import Image from 'next/image';

import sendIcon from '@public/image/sendIcon.png';

interface QabotProps {
  qaFormPosition: { x: number; y: number };
  setQaText: (text: string) => void;
  sendQaToSlack: () => void;
}

export default function QaForm({ qaFormPosition, setQaText, sendQaToSlack }: QabotProps) {
  return (
    <>
      <div
        className='absolute bg-white z-50 text-black rounded-[10px] text-[14px] p-[10px] flex flex-col'
        style={{
          left: `${qaFormPosition.x}px`,
          top: `${qaFormPosition.y}px`,
        }}
      >
        <textarea
          name='QaTextArea'
          id='QaTextArea'
          placeholder='QA 내용을 입력해주세요'
          onChange={(e) => setQaText(e.target.value)}
          className='w-[20rem] h-[10rem] rounded-[10px] outline-none resize-none p-[10px]'
        />
        <button className='ml-auto' onClick={sendQaToSlack}>
          <Image src={sendIcon} alt='슬랙으로 QA 전송 아이콘' width={20} height={20} />
        </button>
      </div>
    </>
  );
}
