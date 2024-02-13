import PencilImage from '@public/image/pencil-alt.svg';
import ImageImage from '@public/image/images.svg';

export function MainButton({
  text,
  color,
  bgcolor,
  icon = false,
}: {
  text: string;
  color?: string;
  bgcolor: string;
  icon?: boolean;
}) {
  return (
    <button
      className={`bg-${bgcolor} px-[2rem] py-[1.2rem] rounded-[5rem] flex items-center gap-[1rem]`}
    >
      {icon && <PencilImage alt='연필 이미지' />}
      <span className={`p1 ${color ? `text-${color}` : 'text-white'}`}>{text}</span>
    </button>
  );
}

export function MainBorderButton({
  text,
  color,
  bgcolor,
  icon = false,
}: {
  text: string;
  color: string;
  bgcolor: string;
  icon?: boolean;
}) {
  return (
    <button
      className={`bg-${bgcolor} px-[2rem] py-[1.2rem] rounded-[5rem] flex items-center gap-[1rem]`}
    >
      {icon && <ImageImage alt='사진 이미지' />}
      <span className={`p1 ${color ? `text-${color}` : 'text-white'}`}>{text}</span>
    </button>
  );
}
