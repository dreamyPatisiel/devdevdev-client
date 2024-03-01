import { cva, VariantProps } from 'class-variance-authority';

import { ButtonHTMLAttributes, FC } from 'react';

import { CN } from '@/utils/mergeStyles';

const TOOLTIP_ARROW_CLASSES = ['absolute', 'w-3', 'h-3', 'transform', 'rotate-45'];
const TOOLTIP_WRAPPER_CLASSES = [
  'c1',
  'px-[1.3rem]',
  'py-[0.5rem]',
  'rounded-[0.8rem]',
  'font-bold',
];

export const TooltipArrowVariants = cva(TOOLTIP_ARROW_CLASSES, {
  variants: {
    direction: {
      right: ['-right-[0.4rem]', 'top-[0.9rem]'],
      left: ['-left-[0.4rem]', 'top-[0.9rem]'],
      top: ['left-[50%]', '-top-[0.4rem]'],
      bottom: ['left-[50%]', '-bottom-[0.4rem]'],
    },
    bgColor: {
      grayTt: ['bg-gray2'],
      greenTt: ['bg-point1'],
    },
  },
});

export const TooltipWrapperVariants = cva(TOOLTIP_WRAPPER_CLASSES, {
  variants: {
    bgColor: {
      grayTt: ['bg-gray2', 'text-point1'],
      greenTt: ['bg-point1', 'text-black'],
    },
  },
});
interface TooltipProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof TooltipArrowVariants>,
    VariantProps<typeof TooltipWrapperVariants> {}

const Tooltip: FC<TooltipProps> = ({ bgColor, direction, children }) => {
  return (
    <div className='relative select-none'>
      <div className={CN(TooltipArrowVariants({ direction, bgColor }))} />
      <div className={CN(TooltipWrapperVariants({ bgColor }))}>{children}</div>
    </div>
  );
};

export default Tooltip;
