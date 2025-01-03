import { cva } from 'class-variance-authority';

import { cn } from '@utils/mergeStyle';

type StatusTagBgColor = 'secondary400' | 'primary3' | 'gray5';

// TODO: StatusTag 컴포넌트 사용안하는 것 같아서 확인 필요!!
export function StatusTag({ text, bgColor }: { text: string; bgColor?: StatusTagBgColor }) {
  const StatusTagVariants = cva(
    'c2 font-bold text-black border rounded-[10rem] border-secondary400 px-[0.5rem] ml-[0.8rem]',
    {
      variants: {
        bgColor: {
          secondary400: 'bg-secondary400',
          primary3: 'bg-primary200',
          gray5: 'bg-gray5',
        },
      },
    },
  );

  return <span className={cn(StatusTagVariants({ bgColor }))}>{text}</span>;
}

export function Tag({ text }: { text: string }) {
  return (
    <span className='c2 font-bold text-secondary400 hover:bg-secondary400 hover:text-black border rounded-[10rem] border-secondary400 px-[0.8rem] py-[0.3rem]'>
      {text}
    </span>
  );
}
