import Image from 'next/image';
import Link from 'next/link';

import TextButton from '@components/common/buttons/textButton';

import AngleRightIcon from '@public/image/arrow-right-thin-Secondary400.svg';

export function MyInfoArticleViewTextButton({ techArticleUrl }: { techArticleUrl: string }) {
  return (
    <Link href={techArticleUrl} target='_blank'>
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
}
