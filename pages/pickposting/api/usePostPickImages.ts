import axios from 'axios';

import { useMutation } from '@tanstack/react-query';

import { ErrorRespone } from '@/types/errorResponse';

export const postPickImages = async ({
  pickImages,
  optionOrder,
}: {
  pickImages: File[];
  optionOrder: string;
}) => {
  const formData = new FormData();

  pickImages.forEach((file) => {
    formData.append('pickOptionImages', file);
  });

  const endPoint = `/devdevdev/api/v1/picks/image?name=${optionOrder}PickOptionImage`;

  const res = await axios.post(endPoint, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res?.data;
};

export const usePostPickImages = () => {
  return useMutation({
    mutationFn: postPickImages,
    onError: (error: ErrorRespone) => {
      const errorMessage = error.response.data.message;

      if (errorMessage == null) {
        return alert('알 수 없는 에러입니다.');
      }

      return alert(errorMessage);
    },
  });
};
