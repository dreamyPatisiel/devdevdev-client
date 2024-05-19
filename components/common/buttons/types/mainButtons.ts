import { VariantProps } from 'class-variance-authority';

import { HTMLAttributes, ReactElement } from 'react';

import { MainButtonVariants } from '../variants/mainButtons';

export interface MainButtonProps
  extends HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof MainButtonVariants> {
  text: string;
  variant: 'primary' | 'black';
  disabled?: boolean;
  icon?: ReactElement;
  type?: 'button' | 'reset' | 'submit';
}
