import { useEffect, useRef, useState } from 'react';
import { Control, Controller, FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form';

import dynamic from 'next/dynamic';
import Image from 'next/image';

import { PickOptionData } from '@pages/pickpickpick/[id]/types/pickDetailData';
import { useDeletePickImage } from '@pages/pickposting/api/useDeletePickImage';
import { usePostPickImages } from '@pages/pickposting/api/usePostPickImages';
import { MAX_IMAGE_COUNT } from '@pages/pickposting/constants/pickPostConstants';

import { useToastVisibleStore } from '@stores/toastVisibleStore';

import { MainButton } from '@components/common/buttons/mainButtons';
import { ValidationMessage } from '@components/common/validationMessage';

import IconPhoto from '@public/image/images.svg';
import Xbutton from '@public/image/pickpickpick/xbutton.svg';

import { MutatePickProps, PickOrder } from './types/formPicks';

const MarkdownEditor = dynamic(() => import('./MarkdownEditor'), {
  ssr: false,
});

export default function PickCard({
  order,
  control,
  errors,
  setValue,
  pickDetailOptionData,
  watch,
}: {
  order: PickOrder;
  control: Control<MutatePickProps, any>;
  errors: FieldErrors<MutatePickProps>;
  setValue: UseFormSetValue<MutatePickProps>;
  pickDetailOptionData?: PickOptionData;
  watch: UseFormWatch<MutatePickProps>;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  const { mutate: pickImagesMutate } = usePostPickImages();
  const [showImages, setShowImages] = useState<string[]>(
    pickDetailOptionData?.pickDetailOptionImages.map((image) => image.imageUrl) || [],
  );

  const [pickImageIds, setPickImageIds] = useState<number[]>(
    pickDetailOptionData?.pickDetailOptionImages.map((image) => image.id) || [],
  );

  useEffect(() => {
    if (pickDetailOptionData != undefined) {
      setShowImages(pickDetailOptionData?.pickDetailOptionImages.map((image) => image.imageUrl));
      setPickImageIds(pickDetailOptionData?.pickDetailOptionImages.map((image) => image.id));
    }
  }, [pickDetailOptionData]);

  useEffect(() => {
    setValue(`pickOptions.${order}PickOption.pickOptionImageIds`, pickImageIds);
  }, [pickImageIds, setValue, order]);

  const { setToastVisible } = useToastVisibleStore();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) return;

    if (showImages.length + files.length > MAX_IMAGE_COUNT) {
      return setToastVisible(`이미지는 ${MAX_IMAGE_COUNT}개 이하만 가능합니다.`, 'error');
    }

    const fileArray = Array.from(files);

    pickImagesMutate(
      { pickImages: fileArray, optionOrder: order },
      {
        onSuccess: (data) => {
          data.data.pickOptionImages.map(
            (value: { pickOptionImageId: number; imageKey: string; imageUrl: string }) => {
              if (value.imageKey === 'UPLOAD_FAIL') {
                setShowImages((prevImages) => [
                  ...prevImages,
                  'image/pickpickpick/imageUploadFail.svg',
                ]);
              } else setShowImages((prevImage) => [...prevImage, value.imageUrl]);

              const id = value.pickOptionImageId;

              setPickImageIds((prevIds) => [...prevIds, id]);
            },
          );
        },
      },
    );
  };

  const { mutate: deletePickImageMutate } = useDeletePickImage();

  const handleDeleteImage = (index: number) => {
    const deletePickImage = (
      pickImageIds: number[],
      setPickImageIds: (newImageIds: number[]) => void,
    ) => {
      deletePickImageMutate(
        { pickOptionImageId: pickImageIds[index] },
        {
          onSuccess: () => {
            const newImageIds = pickImageIds.filter((_, idx) => idx !== index);

            setPickImageIds(newImageIds);
            setShowImages((prevImage) => prevImage.filter((_, idx) => idx !== index));
          },
        },
      );
    };

    deletePickImage(pickImageIds, setPickImageIds);
  };

  const pickTitleValue = watch(`pickOptions.${order}PickOption.pickOptionTitle`);

  return (
    <div className='border-solid border-gray3 border-[0.1rem] rounded-[1.6rem] p-[4rem] mt-[4rem] flex flex-col gap-[2.2rem]'>
      <div>
        <p className='st2 font-bold mb-[1.6rem]'>
          선택지 중 하나를 작성해주세요<span className='text-point1'> *</span>
        </p>
        <Controller
          name={`pickOptions.${order}PickOption.pickOptionTitle`}
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange } }) => (
            <input
              type='text'
              className='bg-gray1 py-[1.6rem] px-[2rem] st2 text-white rounded-[1.6rem] w-[100%] border-[0.1rem] border-gray1 focus:outline-none focus:border-primary2'
              placeholder='선택지를 입력해주세요.'
              onChange={onChange}
              defaultValue={pickDetailOptionData?.title}
            />
          )}
        />
        {(errors?.pickOptions?.[`${order}PickOption`]?.pickOptionTitle ||
          pickTitleValue === '') && <ValidationMessage message={'내용을 작성해주세요'} />}
      </div>

      <div>
        <p className='st2 font-bold mb-[1.6rem]'>선택지에 대한 설명을 작성해주세요</p>
        <MarkdownEditor
          control={control}
          order={order}
          markdownContent={pickDetailOptionData?.content}
        />
      </div>

      <label htmlFor='input-image' className='ml-auto'>
        <MainButton
          text='이미지'
          type='button'
          icon={<Image src={IconPhoto} alt='사진 아이콘' />}
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
              field.onChange(pickImageIds ?? []);
            }}
            multiple
            accept='image/jpeg, image/png'
            className='hidden'
            ref={fileInputRef}
          />
        )}
      />

      {showImages.length !== 0 && (
        <div>
          <p className='st2 font-bold mb-[1.6rem]'>첨부된 이미지</p>
          <div className='grid grid-cols-3 gap-[2.4rem] '>
            {showImages?.map((value, index) => (
              <div key={index}>
                <Image
                  src={Xbutton}
                  className='ml-auto cursor-pointer'
                  alt='이미지 삭제 버튼'
                  onClick={() => handleDeleteImage(index)}
                />

                <div className='rounded-[1.2rem] overflow-hidden relative mt-[1rem] h-[18rem]'>
                  <img
                    src={value}
                    alt={`이미지-${index}`}
                    width={100}
                    height={100}
                    className='object-cover object-top w-full h-full'
                    defaultValue={value}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
