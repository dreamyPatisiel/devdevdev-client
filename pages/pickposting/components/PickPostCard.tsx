import { MainBorderButton } from '@/components/buttons/mainButtons';

import dynamic from 'next/dynamic';

const MarkdownEditor = dynamic(() => import('@pages/pickposting/components/MarkdownEditor'), {
  ssr: false,
});

export default function PickPostCard() {
  return (
    <div className='border-solid border-gray3 border-[0.1rem] rounded-[1.6rem] p-[4rem] mt-[4rem] flex flex-col gap-[3.2rem]'>
      <div>
        <p className='st2 font-bold mb-[1.6rem]'>선택지 중 하나를 작성해주세요</p>
        <input
          type='text'
          className='bg-gray1 py-[1.6rem] px-[2rem] st1 text-white rounded-[1.6rem] w-[100%]'
          placeholder='선택지를 입력해주세요.'
        />
      </div>

      <div>
        <p className='st2 mb-[1.6rem]'>선택지에 대한 설명을 작성해주세요</p>
        <MarkdownEditor />
      </div>
      <div className='ml-auto'>
        <MainBorderButton text='이미지' bgcolor='black' icon={true} boderColor='gray5' />
      </div>
    </div>
  );
}
