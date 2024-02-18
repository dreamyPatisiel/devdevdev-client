import React from 'react';

type SubModalButtonBgColor = 'primary1' | 'gray2';

export function SubButton({
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
      className={`bg-${bgColor} text-st2 py-[0.9rem] rounded-[0.8rem] w-[14.2rem]`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

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
