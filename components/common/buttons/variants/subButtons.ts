import { cva } from 'class-variance-authority';

export const SubButtonVariants = cva(
  'p2 font-bold px-[1.9rem] py-[0.8rem] rounded-[1rem] w-min-[10.2rem]',
  {
    variants: {
      variant: {
        primary: 'bg-primary1 disabled:bg-primary5 disabled:text-primary3 hover:bg-primary2',
        primary_border: 'border border-[#A448FF] text-[#BD79FF] font-bold',
        gray: 'bg-gray3 disabled:bg-gray3 disabled:text-gray4 hover:bg-gray4',
        black: 'bg-black disabled:text-gray4 hover:bg-gray1 hover:text-gray5',
      },
    },
  },
);

export const mobileModalButtonBaseStyle = 'p2 px-[3.2rem] w-full justify-center';
export const desktopModalButtonBaseStyle = 'p1 px-[3.3rem] w-full justify-center';

export const ModalButtonVariants = cva(
  'py-[0.9rem] rounded-[0.8rem] tracking-[-0.32px] font-bold',
  {
    variants: {
      variant: {
        primary: 'bg-primary1 disabled:bg-primary5 disabled:text-primary3 hover:bg-primary2',
        gray: 'bg-gray2 hover:bg-gray3',
      },
    },
  },
);

export const LogoutButtonVariants = cva('st2 font-bold py-[0.9rem] rounded-[0.8rem] w-[14.2rem]', {
  variants: {
    variant: {
      primary: 'bg-primary1',
      gray: 'bg-gray3',
    },
  },
});
