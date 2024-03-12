import { VariantProps } from 'class-variance-authority';

import { HTMLAttributes } from 'react';

import { ModalButtonVariants, SubButtonVariants } from '../variants/subButtons';

export interface SubButtonProps
  extends HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof SubButtonVariants> {
  text: string;
  variant: 'primary' | 'gray' | 'black';
  disabled?: boolean;
}

export interface ModalButtonProps
  extends HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ModalButtonVariants> {
  text: string;
  variant: 'primary' | 'gray';
  disabled?: boolean;
}
