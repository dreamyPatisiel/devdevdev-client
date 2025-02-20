import Link from 'next/link';

import TextButton from '@components/common/buttons/textButton';

import AngleRightIcon from '@public/assets/AngleRightIcon';

export function MyInfoArticleViewTextButton({ techArticleUrl }: { techArticleUrl: string }) {
  return (
    <Link href={techArticleUrl} target='_blank'>
      <TextButton
        buttonContent='아티클 전체 보기'
        size='small'
        line='false'
        color='secondary'
        fontWeight='medium'
        rightIcon={<AngleRightIcon color='var(--secondary300)' />}
      />
    </Link>
  );
}
