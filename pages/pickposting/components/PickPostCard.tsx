import { useRef, useState } from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';

import dynamic from 'next/dynamic';
import Image from 'next/image';

import { PostPicksProps } from '@pages/types/postPicks';

import { usePickImageIdsStore } from '@stores/pickImageIdsStore';

import { ValidationMessage } from '@components/validationMessage';

import IconPhoto from '@public/image/images.svg';

import { MainButton } from '@/components/buttons/mainButtons';

import { usePostPickImages } from '../api/usePostPickImages';
import { MAX_IMAGE_COUNT } from '../constants/pickPostConstants';
import { postPickOrder } from '../types/postPickOrder';

const MarkdownEditor = dynamic(() => import('@pages/pickposting/components/MarkdownEditor'), {
  ssr: false,
});

export default function PickPostCard({
  order,
  control,
  errors,
}: {
  order: postPickOrder;
  control: Control<PostPicksProps, any>;
  errors: FieldErrors<PostPicksProps>;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  const { mutate: pickImagesMutate } = usePostPickImages();
  const [showImages, setShowImages] = useState<string[]>([]);

  const { firstPickImageIds, secondPickImageIds } = usePickImageIdsStore();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) return;

    if (showImages.length + files.length > MAX_IMAGE_COUNT) {
      return alert(`이미지는 ${MAX_IMAGE_COUNT}개 이하만 가능합니다.`);
    }

    const fileArray = Array.from(files);

    pickImagesMutate(
      { pickImages: fileArray, optionOrder: order },
      {
        onSuccess: (data) => {
          fileArray.forEach((file) => {
            // 이미지 화면에 띄우기
            const reader = new FileReader();
            // 파일을 불러오는 메서드, 종료되는 시점에 readyState는 Done(2)이 되고 onLoad 시작
            reader.readAsDataURL(file);
            reader.onload = (e: ProgressEvent<FileReader>) => {
              if (reader.readyState === 2) {
                // 파일 onLoad가 성공하면 2, 진행 중은 1, 실패는 0 반환
                setShowImages((prevImage) => [...prevImage, e.target?.result as string]);
              }
            };
          });

          data.data.pickOptionImages.map((value: { pickOptionImageId: number }) => {
            const id = value.pickOptionImageId;

            if (order === 'first') {
              firstPickImageIds.push(id);
            }

            if (order === 'second') {
              secondPickImageIds.push(id);
            }
          });
        },
      },
    );
  };

  return (
    <div className='border-solid border-gray3 border-[0.1rem] rounded-[1.6rem] p-[4rem] mt-[4rem] flex flex-col gap-[3.2rem]'>
      <div>
        <p className='st2 font-bold mb-[1.6rem]'>선택지 중 하나를 작성해주세요</p>
        <Controller
          name={`pickOptions.${order}PickOption.pickOptionTitle`}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <input
              type='text'
              className='bg-gray1 py-[1.6rem] px-[2rem] st2 text-white rounded-[1.6rem] w-[100%] border-[0.1rem] border-gray1 focus:outline-none focus:border-primary2'
              placeholder='선택지를 입력해주세요.'
              onChange={field.onChange}
            />
          )}
        />
        {errors?.pickOptions?.[`${order}PickOption`]?.pickOptionTitle && (
          <ValidationMessage message={'내용을 작성해주세요'} />
        )}
      </div>

      <div>
        <p className='st2 font-bold mb-[1.6rem]'>선택지에 대한 설명을 작성해주세요</p>
        <MarkdownEditor control={control} order={order} />
      </div>

      <label htmlFor='input-image' className='ml-auto'>
        <MainButton
          text='이미지'
          type='button'
          icon={<IconPhoto alt='사진 아이콘' />}
          variant='black'
          onClick={handleImageButtonClick}
        />
      </label>

      <Controller
        name={`pickOptions.${order}PickOption.pickOptionImageIds`}
        control={control}
        render={({ field }) => (
          <input
            type='file'
            id='input-image'
            onChange={(e) => {
              handleImageUpload(e);
              field.onChange(
                order === 'first' ? firstPickImageIds ?? [] : secondPickImageIds ?? [],
              );
            }}
            multiple
            accept='image/jpeg, image/png'
            className='hidden'
            ref={fileInputRef}
          />
        )}
      />

      {showImages.length !== 0 && (
        <>
          <p className='st2 font-bold'>첨부된 이미지</p>
          <div className='grid grid-cols-3 gap-[2.4rem] h-[18rem]'>
            {showImages?.map((value, index) => (
              <div key={index} className='rounded-[1.2rem] overflow-hidden relative'>
                <Image
                  src={value}
                  alt={`이미지-${index}`}
                  width={100}
                  height={100}
                  className=' object-cover object-top w-full h-full'
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
