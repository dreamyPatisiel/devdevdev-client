import { VariantProps, cva } from 'class-variance-authority';

import React, { HTMLAttributes } from 'react';

import { cn } from '@utils/mergeStyle';

export const SubButtonVariants = cva(
  'p2 font-bold px-[1.9rem] py-[0.8rem] rounded-[1rem] w-min-[10.2rem]',
  {
    variants: {
      variant: {
        primary: 'bg-primary1 disabled:bg-primary5 disabled:text-primary3 hover:bg-primary2',
        gray: 'bg-gray3 disabled:bg-gray3 disabled:text-gray4 hover:bg-gray4',
        black: 'bg-black disabled:text-gray4 hover:bg-gray1 hover:text-gray5',
      },
    },
  },
);

interface SubButtonProps
  extends HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof SubButtonVariants> {
  text: string;
  variant: 'primary' | 'gray' | 'black';
  disabled?: boolean;
}

export function SubButton({ text, variant, disabled }: SubButtonProps) {
  return (
    <button className={cn(SubButtonVariants({ variant }))} disabled={disabled}>
      {text}
    </button>
  );
}

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

type SubModalButtonBgColor = 'primary1' | 'gray2';
export function SubModalButton({
  text,
  bgColor,
  onClick,
}: {
  text: string;
  bgColor: SubModalButtonBgColor;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      className={`bg-${bgColor} p1 px-[3.3rem] py-[0.9rem] rounded-[0.8rem] tracking-[-0.32px] font-bold`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
