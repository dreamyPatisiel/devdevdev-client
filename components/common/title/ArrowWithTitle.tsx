import { cva, VariantProps } from 'class-variance-authority';

import { FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import AngleRight from '@public/image/angle-right.svg';

import { cn } from '@/utils/mergeStyle';

const ARROW_TITLE_CLASSES = ['font-bold', 'p1', 'text-gray5'];

export const ArrowWithTitleVariants = cva(ARROW_TITLE_CLASSES, {
  variants: {
    variant: {
      mainTitle: ['text-gray4', 'st2'],
    },
  },
});

interface ArrowWithTitleProps extends VariantProps<typeof ArrowWithTitleVariants> {
  title: string;
  iconText?: string;
  routeURL?: string;
  className?: string;
  iconSize?: string;
}

const ArrowWithTitle: FC<ArrowWithTitleProps> = ({
  title,
  variant,
  iconText,
  routeURL,
  iconSize = 'w-4 h-4',
  className,
}) => {
  return (
    <div className='flex items-baseline gap-6 justify-between'>
      <p className={cn(className, ArrowWithTitleVariants({ variant }))}>{title}</p>

      <div className='flex items-center'>
        {iconText && routeURL && (
          <Link href={routeURL} className='p2 text-primary3 mr-3'>
            {iconText}
          </Link>
        )}
        <Image src={AngleRight} alt={'오른쪽 화살표'} className={iconSize} />
      </div>
    </div>
  );
};

export default ArrowWithTitle;
