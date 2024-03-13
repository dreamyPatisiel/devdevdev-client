import dynamic from 'next/dynamic';

import IconPhoto from '@public/image/images.svg';

import { MainButton } from '@/components/buttons/mainButtons';

const MarkdownEditor = dynamic(() => import('@pages/pickposting/components/MarkdownEditor'), {
  ssr: false,
});

export default function PickPostCard() {
  // const onUploadImage = async (blob: Blob | File) => {
  //   // blob은 base64 인코딩된 이미지 파일
  //   // formData에 담아 서버로 보내고, 서버에서는 s3에 이미지 저장후 s3에서 url을 받아 다시 프론트로 값 전송
  //   console.log('blob', blob);
  // };

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
      <span className='ml-auto'>
        <MainButton text='이미지' icon={<IconPhoto alt='사진 아이콘' />} variant='black' />
      </span>
    </div>
  );
}
