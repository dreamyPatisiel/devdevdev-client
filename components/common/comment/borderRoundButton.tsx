import React, { MouseEventHandler, ReactElement, SetStateAction } from 'react';

import Image from 'next/image';

import thumbsUpGreen from '@public/image/comment/thumbs-up-green.png';
import thumbsUpWhite from '@public/image/comment/thumbs-up-white.png';

export default function BorderRoundButton({
  text,
  icon,
  onClick,
  disabled,
  isActived,
}: {
  text: string;
  icon?: ReactElement;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
  isActived: boolean;
}) {
  const defaultButtonClass = 'border border-gray3 text-gray5';
  const activeButtonClass = 'border border-point3 text-point3';
  const disabledButtonClass = 'border border-[#4B5766] text-[#4B5766]';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center c1 font-bold px-[1.6rem] py-[0.7rem] rounded-[0.8rem] 
        ${disabled ? disabledButtonClass : ''}
        ${isActived ? activeButtonClass : defaultButtonClass} `}
    >
      {icon}
      <span className={`${icon && 'ml-3'}`}>{text}</span>
    </button>
  );
}

export const LikeButton = ({
  isLiked,
  likeCount,
  onClick,
  disabled,
}: {
  isLiked: boolean;
  likeCount: number;
  onClick?: () => void;
  disabled?: boolean;
}) => {
  const thumbsWhiteIcon = <Image src={thumbsUpWhite} alt='좋아요비활성화버튼' />;
  const thumbsGreenIcon = <Image src={thumbsUpGreen} alt='좋아요활성화버튼' />;
  const curIcon = isLiked ? thumbsGreenIcon : thumbsWhiteIcon;

  return (
    <>
      <BorderRoundButton
        isActived={isLiked}
        text={String(likeCount)}
        icon={curIcon}
        onClick={() => onClick?.()}
        disabled={disabled}
      />
    </>
  );
};

export const ReplyButton = ({
  onClick,
  disabled,
  isActived,
  setIsActived,
}: {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
  isActived: boolean;
  setIsActived: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsActived(!isActived);
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <>
      <BorderRoundButton
        isActived={isActived}
        text='답글'
        onClick={handleClick}
        disabled={disabled}
      />
    </>
  );
};

export const ReplyCountButton = ({
  replyCount,
  onClick,
  disabled,
  isActived,
  setIsActived,
}: {
  isActived: boolean;
  setIsActived: React.Dispatch<SetStateAction<boolean>>;
  replyCount: number;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsActived(!isActived);
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <>
      <BorderRoundButton
        isActived={isActived}
        text={`답글 ${replyCount}개`}
        onClick={handleClick}
        disabled={disabled}
      />
    </>
  );
};
