import axios from 'axios';

import { useMutation } from '@tanstack/react-query';

export const postPickImages = async ({ pickImages }: { pickImages: File[] }) => {
  const formData = new FormData();

  pickImages.forEach((file) => {
    formData.append('pickOptionImages', file);
  });

  const endPoint = `/devdevdev/api/v1/picks/image?name=firstPickOptionImage`;

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
    onError: (error) => console.error(error),
  });
};
