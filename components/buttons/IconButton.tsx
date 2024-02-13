import PencilImage from '@public/image/pencil-alt.svg';
import ImageImage from '@public/image/images.svg';

export function IconButton({ text, color }: { text: string; color: string }) {
  return (
    <button
      className={`bg-${color} px-[2rem] py-[1.2rem] rounded-[5rem] flex items-center gap-[1rem]`}
    >
      <PencilImage alt='연필 이미지' /> <span className='p1 text-white'>{text}</span>
    </button>
  );
}

export function IconBorderButton({ text, color }: { text: string; color: string }) {
  return (
    <button
      className={`bg-${color} px-[2rem] py-[1.2rem] rounded-[5rem] flex items-center gap-[1rem]`}
    >
      <ImageImage alt='사진 이미지' /> <span className='p1 text-white'>{text}</span>
    </button>
  );
}
