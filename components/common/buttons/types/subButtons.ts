import { VariantProps } from 'class-variance-authority';

import { HTMLAttributes } from 'react';

import {
  LogoutButtonVariants,
  ModalButtonVariants,
  SubButtonVariants,
} from '../variants/subButtons';

export interface SubButtonProps
  extends HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof SubButtonVariants> {
  text: string;
  variant: 'primary' | 'primary_border' | 'gray' | 'black';
  disabled?: boolean;
}

export interface ModalButtonProps
  extends HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ModalButtonVariants> {
  text: string;
  variant: 'primary' | 'gray' | 'secondary';
  disabled?: boolean;
  isPending?: boolean;
}

export interface LogoutButtonProps
  extends HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof LogoutButtonVariants> {
  text: string;
  variant: 'primary' | 'gray';
}
