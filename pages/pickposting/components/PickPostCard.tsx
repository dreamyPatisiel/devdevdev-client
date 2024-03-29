import { useRef, useState } from 'react';

import dynamic from 'next/dynamic';

import IconPhoto from '@public/image/images.svg';

import { MainButton } from '@/components/buttons/mainButtons';

const MarkdownEditor = dynamic(() => import('@pages/pickposting/components/MarkdownEditor'), {
  ssr: false,
});

export default function PickPostCard() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  const [pickImages, setPickImages] = useState<File[]>([]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('e', e.target.files);
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    console.log('fileArray', fileArray);

    setPickImages([...pickImages, ...fileArray]);
    console.log('pickImages', pickImages);
  };

  return (
    <div className='border-solid border-gray3 border-[0.1rem] rounded-[1.6rem] p-[4rem] mt-[4rem] flex flex-col gap-[3.2rem]'>
      <div>
        <p className='st2 font-bold mb-[1.6rem]'>선택지 중 하나를 작성해주세요</p>
        <input
          type='text'
          className='bg-gray1 py-[1.6rem] px-[2rem] st1 text-white rounded-[1.6rem] w-[100%] border-[0.1rem] border-gray1 focus:outline-none focus:border-primary2'
          placeholder='선택지를 입력해주세요.'
        />
      </div>

      <div>
        <p className='st2 font-bold mb-[1.6rem]'>선택지에 대한 설명을 작성해주세요</p>
        <MarkdownEditor />
      </div>

      <label htmlFor='input-image' className='ml-auto'>
        <MainButton
          text='이미지'
          icon={<IconPhoto alt='사진 아이콘' />}
          variant='black'
          onClick={handleImageButtonClick}
        />
      </label>

      <input
        type='file'
        id='input-image'
        onChange={handleImageUpload}
        multiple
        accept='image/*'
        className='hidden'
        ref={fileInputRef}
      />
    </div>
  );
}
