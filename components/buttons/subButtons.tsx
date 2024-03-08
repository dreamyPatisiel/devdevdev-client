import { cn } from '@utils/mergeStyle';

import { ModalButtonProps, SubButtonProps } from './types/subButtons';
import { ModalButtonVariants, SubButtonVariants } from './variants/subButtons';

export function SubButton({ text, variant, disabled, onClick }: SubButtonProps) {
  return (
    <button className={cn(SubButtonVariants({ variant }))} disabled={disabled} onClick={onClick}>
      {text}
    </button>
  );
}

export function ModalButton({ text, variant, onClick }: ModalButtonProps) {
  return (
    <button className={cn(ModalButtonVariants({ variant }))} onClick={onClick}>
      {text}
    </button>
  );
}

//FIXME: 로그아웃 버튼이랑 서브버튼이랑 다른가? 쓰이는 곳이 없음
export function LogoutButton({
  text,
  bgColor,
  onClick,
}: {
  text: string;
  bgColor: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      className={`bg-${bgColor} st2 font-bold py-[0.9rem] rounded-[0.8rem] w-[14.2rem]`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
