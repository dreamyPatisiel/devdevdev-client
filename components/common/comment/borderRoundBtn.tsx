import React, { MouseEventHandler, ReactElement, useState } from 'react';

import Image from 'next/image';

import thumbsUpGreen from '@public/image/comment/thumbs-up-green.png';
import thumbsUpWhite from '@public/image/comment/thumbs-up-white.png';

export default function BorderRoundBtn({
  text,
  icon,
  onClick,
  disabled,
  isLiked,
}: {
  text: string;
  icon?: ReactElement;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
  isLiked?: boolean;
}) {
  const [isActived, setIsActived] = useState(isLiked ? isLiked : false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsActived(!isActived);
    if (onClick) {
      onClick(e);
    }
  };

  const defaultBtnClass = 'border border-gray3 text-gray5';
  const activeBtnClass = 'border border-point3 text-point3';

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`flex items-center c1 font-bold px-[1.6rem] py-[0.7rem] rounded-[0.8rem] ${isActived ? activeBtnClass : defaultBtnClass}`}
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
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
}) => {
  const thumbsWhiteIcon = <Image src={thumbsUpWhite} alt='좋아요비활성화버튼' />;
  const thumbsGreenIcon = <Image src={thumbsUpGreen} alt='좋아요활성화버튼' />;
  const curIcon = isLiked ? thumbsGreenIcon : thumbsWhiteIcon;

  return (
    <>
      <BorderRoundBtn isLiked={isLiked} text={String(likeCount)} icon={curIcon} />
    </>
  );
};

export const ReplyButton = ({
  onClick,
  disabled,
}: {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
}) => {
  return (
    <>
      <BorderRoundBtn text='답글' onClick={onClick} disabled={disabled} />
    </>
  );
};

export const ReplyCountButton = ({
  replyCount,
  onClick,
  disabled,
}: {
  replyCount: number;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
}) => {
  return (
    <>
      <BorderRoundBtn text={`답글 ${replyCount}개`} onClick={onClick} disabled={disabled} />
    </>
  );
};
