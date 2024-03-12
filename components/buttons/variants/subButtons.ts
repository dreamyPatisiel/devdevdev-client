import { cva } from 'class-variance-authority';

export const SubButtonVariants = cva(
  'p2 font-bold px-[1.9rem] py-[0.8rem] rounded-[1rem] w-min-[10.2rem]',
  {
    variants: {
      variant: {
        primary: 'bg-primary1 disabled:bg-primary5 disabled:text-primary3 hover:bg-primary2',
        gray: 'bg-gray3 disabled:bg-gray3 disabled:text-gray4 hover:bg-gray4',
        black: 'bg-black disabled:text-gray4 hover:bg-gray1 hover:text-gray5',
      },
    },
  },
);

export const ModalButtonVariants = cva(
  'p1 px-[3.3rem] py-[0.9rem] rounded-[0.8rem] tracking-[-0.32px] font-bold',
  {
    variants: {
      variant: {
        primary: 'bg-primary1 disabled:bg-primary5 disabled:text-primary3',
        gray: 'bg-gray2',
      },
    },
  },
);
