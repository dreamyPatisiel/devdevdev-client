import { cva, VariantProps } from 'class-variance-authority';

import { FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import AngleRight from '@public/image/angle-right.svg';

import { cn } from '@/utils/mergeStyle';

const ARROW_TITLE_CLASSES = ['font-bold', 'p1', 'text-gray5'];

export const ArrowTitleVariants = cva(ARROW_TITLE_CLASSES, {
  variants: {
    version: {
      pickPagePickTitle: ['pb-11'],
      mainPagePickTitle: ['pb-[1.6rem]'],
      mainTitle: ['pb-[2.45rem]', 'text-gray4', 'st2'],
    },
  },
});

interface ArrowTitleProps extends VariantProps<typeof ArrowTitleVariants> {
  title: string;
  iconText?: string;
  routeURL?: string;
}

const ArrowTitle: FC<ArrowTitleProps> = ({ title, version, iconText, routeURL }) => {
  return (
    <div className='flex items-baseline gap-6 justify-between'>
      <p className={cn(ArrowTitleVariants({ version }))}>{title}</p>

      <div className='flex items-center'>
        {iconText && routeURL && (
          <Link href={routeURL} className='p2 text-primary3 mr-3'>
            {iconText}
          </Link>
        )}
        <Image src={AngleRight} alt={'오른쪽 화살표'} className='w-4' />
      </div>
    </div>
  );
};

export default ArrowTitle;
