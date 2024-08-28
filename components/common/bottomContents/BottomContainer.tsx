import { ReactNode } from 'react';

export default function BottomContainer({
  onClose,
  children,
}: {
  onClose: () => void;
  onButtonClick?: () => void;
  children: ReactNode;
}) {
  return (
    <div className='fixed z-[70] inset-0'>
      <div className='absolute inset-0 bg-black bg-opacity-50 ' onClick={() => onClose()}>
        <div className='fixed bg-gray1 left-0 right-0 w-full bottom-0  rounded-t-[2.4rem] px-[2rem] py-[4rem] flex flex-col gap-[1.2rem]'>
          {children}
        </div>
      </div>
    </div>
  );
}
