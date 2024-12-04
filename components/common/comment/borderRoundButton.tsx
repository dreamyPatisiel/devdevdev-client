import React, { MouseEventHandler, ReactElement, SetStateAction } from 'react';

import Image from 'next/image';

import { useLoginStatusStore } from '@stores/loginStore';
import { useLoginModalStore } from '@stores/modalStore';
import { useToastVisibleStore } from '@stores/toastVisibleStore';
import { useCommentLikeStore } from '@stores/commentLikeStore';

import thumbsUpDisabled from '@public/image/comment/thumbs-up-disabled.svg';
import thumbsUpGreen from '@public/image/comment/thumbs-up-green.svg';
import thumbsUpWhite from '@public/image/comment/thumbs-up-white.svg';

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
  const defaultButtonClass = 'border border-[#677485] text-[#B8C3D2]';
  const activeButtonClass = 'border border-[#40FF81] text-[#40FF81]';
  const disabledButtonClass = 'border border-[#4B5766] text-[#4B5766]';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center c1 font-bold px-[1.6rem] py-[0.7rem] rounded-[0.8rem] bg-[#1A1B23]
        ${isActived ? activeButtonClass : disabled ? disabledButtonClass : defaultButtonClass} `}
    >
      <span className={`font-bold ${icon && 'mr-2'}`}>{text}</span>
      {icon}
    </button>
  );
}

export const LikeButton = ({
  isLiked,
  likeCount,
  onClick,
  disabled,
  commentId,
}: {
  isLiked: boolean;
  likeCount: number;
  onClick?: () => void;
  disabled?: boolean;
  commentId: number;
}) => {
  const { loginStatus } = useLoginStatusStore();
  const { setToastVisible } = useToastVisibleStore();


  const { likedComments, setCommentLike } = useCommentLikeStore();
  const isLikedState = commentId ? likedComments[commentId] ?? isLiked : isLiked;


  const thumbsWhiteIcon = <Image src={thumbsUpWhite} alt='좋아요비활성화버튼' />;
  const thumbsGreenIcon = <Image src={thumbsUpGreen} alt='좋아요활성화버튼' />;
  const thumbsDisabledIcon = <Image src={thumbsUpDisabled} alt='좋아요비활성화버튼' />;
  const curIcon = disabled ? thumbsDisabledIcon : isLikedState ? thumbsGreenIcon : thumbsWhiteIcon;

  const handleLikeButtonClick = () => {
    if (loginStatus === 'logout') {
      setToastVisible('비회원은 현재 해당 기능을 이용할 수 없습니다.', 'error');
      return;
    }
    if (commentId) {
      setCommentLike(commentId, !isLikedState);
    }
    onClick?.();
  };

  return (
    <BorderRoundButton
      isActived={isLikedState}
      text={String(likeCount)}
      icon={curIcon}
      onClick={handleLikeButtonClick}
      disabled={disabled}
    />
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
  const { loginStatus } = useLoginStatusStore();
  const { openLoginModal } = useLoginModalStore();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (loginStatus === 'logout') {
      openLoginModal();
      return;
    }
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
