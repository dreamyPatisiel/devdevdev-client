import axios from 'axios';

export const postPickImages = async ({ pickImages }: { pickImages: File[] }) => {
  const formData = new FormData();

  pickImages.forEach((file) => {
    formData.append('pickOptionImages', file);
  });

  const endPoint = `/devdevdev/api/v1/pick/image?name=firstPickOptionImage`;
  try {
    const res = await axios.post(endPoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return console.log('res', res);
  } catch (err) {
    console.log('err', err);
  }
};

const usePostPickImages = () => {};
