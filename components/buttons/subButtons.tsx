import { cn } from '@utils/mergeStyle';

import { LogoutButtonProps, ModalButtonProps, SubButtonProps } from './types/subButtons';
import {
  LogoutButtonVariants,
  ModalButtonVariants,
  SubButtonVariants,
} from './variants/subButtons';

export function SubButton({ text, variant, disabled, onClick }: SubButtonProps) {
  return (
    <button className={cn(SubButtonVariants({ variant }))} disabled={disabled} onClick={onClick}>
      {text}
    </button>
  );
}

export function ModalButton({ text, variant, disabled, onClick }: ModalButtonProps) {
  return (
    <button className={cn(ModalButtonVariants({ variant }))} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
}

export function LogoutButton({ text, variant, onClick }: LogoutButtonProps) {
  return (
    <button className={cn(LogoutButtonVariants({ variant }))} onClick={onClick}>
      {text}
    </button>
  );
}
