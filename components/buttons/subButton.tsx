import React from 'react';

export default function SubButton({
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
