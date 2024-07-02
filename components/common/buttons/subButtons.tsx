import { cn } from '@utils/mergeStyle';

import { Spinner } from '@chakra-ui/spinner';

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

export function ModalButton({ text, variant, disabled, onClick, isPending }: ModalButtonProps) {
  return (
    <button
      className={cn(
        ModalButtonVariants({ variant }),
        'flex items-center gap-[1rem]',
        `${isPending && 'pl-[1.9rem] bg-primary5'}`,
      )}
      onClick={onClick}
      disabled={disabled || isPending}
    >
      {isPending && <Spinner width={16} height={16} color='var(--primary-3)' />}
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
