import IconPhoto from '@public/image/images.svg';
import IconPencil from '@public/image/pencil-alt.svg';

type MainButtonColor = 'white' | 'primary4' | 'gray3' | 'gray5';
type MainButtonBgColor = 'primary1' | 'primary5' | 'primary2' | 'black' | 'gray2';
type MainButtonBoderColor = 'gray5' | 'gray3';

export function MainButton({
  text,
  color,
  bgcolor,
  icon = false,
}: {
  text: string;
  color?: MainButtonColor;
  bgcolor: MainButtonBgColor;
  icon?: boolean;
}) {
  return (
    <button
      className={`bg-${bgcolor} px-[1.9rem] py-[0.9rem] rounded-[5rem] flex items-center gap-[1rem]`}
    >
      {icon && <IconPencil alt='연필 이미지' />}
      <span className={`p1 ${color ? `text-${color}` : 'text-white'}`}>{text}</span>
    </button>
  );
}

export function MainBorderButton({
  text,
  color,
  bgcolor,
  icon = false,
  boderColor,
}: {
  text: string;
  color?: MainButtonColor;
  bgcolor: MainButtonBgColor;
  icon?: boolean;
  boderColor?: MainButtonBoderColor;
}) {
  return (
    <button
      className={`bg-${bgcolor} px-[1.9rem] py-[0.9rem] rounded-[5rem] flex items-center gap-[1rem] border-[0.1rem] border-${boderColor} border-solid`}
    >
      {icon && <IconPhoto alt='사진 이미지' />}
      <span className={`p1 ${color ? `text-${color}` : 'text-white'}`}>{text}</span>
    </button>
  );
}
