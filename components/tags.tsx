import { cva } from 'class-variance-authority';

import { cn } from '@utils/mergeStyle';

type StatusTagBgColor = 'point1' | 'primary3' | 'gray5';

export function StatusTag({ text, bgColor }: { text: string; bgColor?: StatusTagBgColor }) {
  const StatusTagVariants = cva(
    'c2 font-bold text-black border rounded-[10rem] border-point1 px-[0.5rem] py-[0.1rem] ml-[0.8rem]',
    {
      variants: {
        bgColor: {
          point1: 'bg-point1',
          primary3: 'bg-primary3',
          gray5: 'bg-gray5',
        },
      },
    },
  );

  return <span className={cn(StatusTagVariants({ bgColor }))}>{text}</span>;
}

export function Tag({ text }: { text: string }) {
  return (
    <span className='c2 font-bold text-point1 hover:bg-point1 hover:text-black border rounded-[10rem] border-point1 px-[0.8rem] py-[0.3rem]'>
      {text}
    </span>
  );
}
