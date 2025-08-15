import { SetStateAction, useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { formatDate } from '@utils/formatDate';

import { useLoginStatusStore } from '@stores/loginStore';

import { EllipsisGradientText } from '@components/common/EllipsisGradientText';
import { MainButtonV2 } from '@components/common/buttons/mainButtonsV2';
import TextButton from '@components/common/buttons/textButton';
import Tooltip from '@components/common/tooltips/tooltip';

import AngleRightIcon from '@public/image/arrow-right-thin-Secondary400.svg';
import ThumbsUpBlack from '@public/image/comment/thumbs-up-black.svg';
import ThumbsUpWhite from '@public/image/comment/thumbs-up-white.svg';

import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import { usePostRecommendArticle } from '../api/usePostRecommendArticle';
import { BOOKMARK_MENTION } from '../constants/bookmarkConstants';
import BookmarkIcon from './bookmarkIcon';

export const TechDetailInfo = ({
  company,
  author,
  date,
}: {
  company: string;
  author: string;
  date: string;
}) => {
  const { isMobile } = useMediaQueryContext();

  return (
    <div className='p1 flex border-white gap-[1.6rem] select-none'>
      <div>{company}</div>
      <span className='text-gray200'>|</span>
      <div>by. {author || company}</div>
      {!isMobile && (
        <>
          <span className='text-gray200'>|</span>
          <time dateTime={date}>{formatDate(date)}</time>
        </>
      )}
    </div>
  );
};

export const TechMainContent = ({ content }: { content: string }) => {
  const { isMobile } = useMediaQueryContext();

  return (
    <EllipsisGradientText
      startPercent='60%'
      endPercent='100%'
      className={`${isMobile ? 'p2 my-[2.4rem]' : 'p1 py-[1.7rem]'} `}
    >
      {content}
    </EllipsisGradientText>
  );
};

/** 1차 아티클전체보기 버튼스타일 */
export const ArticleViewTextButton = ({
  techArticleUrl,
  paddingY = 'pt-[6.4rem]',
}: {
  techArticleUrl: string;
  paddingY?: string;
}) => {
  return (
    <Link href={techArticleUrl} target='_blank' className={`${paddingY}`}>
      <TextButton
        buttonContent='아티클 전체 보기'
        size='small'
        line='false'
        color='secondary'
        fontWeight='medium'
        rightIcon={<Image src={AngleRightIcon} alt='아티클 전체 보기 아이콘' />}
      />
    </Link>
  );
};

/** 2차 아티클전체보기 버튼 */

export const ArticleViewRoundButton = ({
  techArticleUrl,
  className,
}: {
  techArticleUrl: string;
  className?: string;
}) => {
  return (
    <Link href={techArticleUrl} target='_blank'>
      <MainButtonV2
        className={className}
        color='secondary'
        text='아티클 전체보기'
        line
        radius='rounded'
        size='medium'
      />
    </Link>
  );
};

export const TechBookMarkAndToolTip = ({
  techArticleId,
  isBookmarkActive,
  setBookmarkActive,
}: {
  techArticleId: string;
  isBookmarkActive: boolean;
  setBookmarkActive: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const { isMobile } = useMediaQueryContext();
  const { loginStatus } = useLoginStatusStore();
  const [tooltipMessage, setTooltipMessage] = useState('');

  useEffect(() => {
    if (!isBookmarkActive) {
      switch (loginStatus) {
        case 'login':
          setTooltipMessage(BOOKMARK_MENTION.BOOKMARK_HINT);
          break;
        case 'logout':
        case 'loading':
        default:
          setTooltipMessage(BOOKMARK_MENTION.NON_MEMBER);
          break;
      }
    }
  }, [isBookmarkActive, loginStatus]);

  return (
    <div className='grid grid-flow-row items-center gap-6 relative'>
      <Tooltip
        variant='greenTt'
        direction='right'
        isVisible={tooltipMessage !== ''}
        className={isMobile ? 'right-[11rem]' : 'right-[12rem]'}
      >
        {tooltipMessage}
      </Tooltip>
      <div className='p-[1rem]'>
        <BookmarkIcon
          type='techblogDetail'
          id={Number(techArticleId)}
          tooltipMessage={tooltipMessage}
          isBookmarkActive={isBookmarkActive}
          setBookmarkActive={setBookmarkActive}
          setTooltipMessage={setTooltipMessage}
        />
      </div>
    </div>
  );
};
/** 기술블로그 추천 버튼 */
export const ArticleRecommendButton = ({
  techArticleId,
  recommendTotalCount,
  isRecommended,
}: {
  techArticleId: string;
  recommendTotalCount: number;
  isRecommended: boolean;
}) => {
  const { mutate: recommendArticleMutation, isPending } = usePostRecommendArticle(techArticleId);

  const handleRecommendArticleClick = () => {
    recommendArticleMutation({
      techArticleId: techArticleId,
    });
  };

  return (
    <>
      <MainButtonV2
        text={`${recommendTotalCount}`}
        color={`${isRecommended ? 'secondary' : 'gray'}`}
        line={!isRecommended}
        radius='rounded'
        size='medium'
        icon={
          isRecommended ? (
            <Image src={ThumbsUpBlack} alt='기술블로그 추천 아이콘' />
          ) : (
            <Image src={ThumbsUpWhite} alt='기술블로그 추천 아이콘' />
          )
        }
        iconPosition='left'
        onClick={handleRecommendArticleClick}
      />
    </>
  );
};
