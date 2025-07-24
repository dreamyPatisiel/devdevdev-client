import { cva, VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';

import { ButtonHTMLAttributes, FC } from 'react';

import Image from 'next/image';

import polygonTopGray from '@public/image/polygon-top-gray.svg';
import polygonTopGreen from '@public/image/polygon-top-green.svg';

import { cn } from '@/utils/mergeStyle';

import { tooltipVariants } from './tooltipVariants';

const LEFT_RIGHT_ARROW_CLASSES = [
  'absolute',
  'w-3',
  'h-4',
  'transform',
  'rotate-[-60deg]',
  'skew-y-[35deg]',
];

const TOP_BOTTOM_ARROW_CLASSES = ['left-[50%]', 'relative'];

const TOOLTIP_WRAPPER_CLASSES = [
  'c1',
  'px-[1.3rem]',
  'pt-[0.5rem]',
  'pb-[0.4rem]',
  'rounded-[0.8rem]',
  'font-bold',
  'w-full',
];

const SHORT_CHARACTERS = ['.', ',', '!', '(', ')', ' ', "'", '"', ';', ':'];

export const TooltipArrowVariants = cva('', {
  variants: {
    direction: {
      right: [...LEFT_RIGHT_ARROW_CLASSES, '-right-[0.35rem]', 'top-[0.9rem]'],
      left: [...LEFT_RIGHT_ARROW_CLASSES, '-left-[0.4rem]', 'top-[0.9rem]'],
      top: [...TOP_BOTTOM_ARROW_CLASSES, 'top-[0.1rem]'],
      bottom: [...TOP_BOTTOM_ARROW_CLASSES, 'bottom-[-3.4rem]', 'rotate-180'],
    },
    variant: {
      grayTt: ['bg-gray500'],
      greenTt: ['bg-secondary400'],
      purpleTt: ['bg-primary500'],
    },
  },
});

export const TooltipWrapperVariants = cva(TOOLTIP_WRAPPER_CLASSES, {
  variants: {
    variant: {
      grayTt: ['bg-gray500', 'text-secondary400'],
      greenTt: ['bg-secondary400', 'text-black'],
      purpleTt: ['bg-primary500', 'text-white'],
    },
  },
});

interface TooltipProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof TooltipArrowVariants>,
    VariantProps<typeof TooltipWrapperVariants> {
  isVisible: boolean;
}

/** 텍스트 길이에 따른 width 계산 */
const calculateTooltipWidth = (text: string): string => {
  const AVERAGE_CHARACTER_WIDTH = 11;
  const SPECIAL_CHARACTER_WIDTH = 3;
  const MARGIN_PADDING = 24; // x축 마진값 12px씩

  let tooltipWidth = 0;

  for (const char of text) {
    if (SHORT_CHARACTERS.includes(char)) {
      tooltipWidth += SPECIAL_CHARACTER_WIDTH;
    } else {
      tooltipWidth += AVERAGE_CHARACTER_WIDTH;
    }
  }

  return `${tooltipWidth + MARGIN_PADDING}px`;
};

const Tooltip: FC<TooltipProps> = ({ variant, direction, isVisible, className, children }) => {
  if (!children) return null;

  const toolTipWidth = typeof children === 'string' ? calculateTooltipWidth(children) : undefined;
  const isSvgDirection = direction === 'top' || direction === 'bottom';

  return (
    <motion.div
      initial={false}
      variants={tooltipVariants}
      animate={isVisible ? 'visible' : 'hidden'}
      exit='exit'
      className={cn('absolute right-[4.5rem] select-none text-center', className)}
      style={{
        width: toolTipWidth,
      }}
    >
      {isSvgDirection ? (
        <Image
          width={8}
          height={8}
          src={variant === 'greenTt' ? polygonTopGreen.src : polygonTopGray.src}
          alt='tooltip arrow'
          className={cn(TooltipArrowVariants({ direction }))}
        />
      ) : (
        <div className={cn(TooltipArrowVariants({ direction, variant }))} />
      )}
      <div className={cn(TooltipWrapperVariants({ variant }))}>{children}</div>
    </motion.div>
  );
};

export default Tooltip;
