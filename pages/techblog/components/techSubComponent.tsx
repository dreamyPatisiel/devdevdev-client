import { twMerge } from 'tailwind-merge';

import { cn } from '@utils/mergeStyle';

export const ImgWrapper = ({
  width,
  height,
  children,
}: {
  width: string;
  height: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        `overflow-hidden bg-gray1 rounded-[2rem] flex justify-center items-center ${width} ${height}`,
      )}
    >
      {children}
    </div>
  );
};

export const TagWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className='flex gap-[0.6rem]'>{children}</div>;
};

export const TechCardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <li className='w-full h-hull grid grid-flow-col border-white gap-[3.2rem] text-white py-[3.2rem] border-b border-b-gray1 border-solid select-none'>
      {children}
    </li>
  );
};

export const TechTitle = ({ title, maxWidth }: { title: string; maxWidth: string }) => {
  return (
    <div className='flex flex-row items-center gap-8 font-bold st2 text-white border-white py-[0.7rem] '>
      <p className={`${maxWidth} truncate`}>{title}</p>
    </div>
  );
};

export const TechContent = ({
  content,
  maxLines,
  className,
}: {
  content: string;
  maxLines: number;
  className?: string;
}) => {
  const TechCntClasses = twMerge(`p2 text-gray5 mr-[4rem] ${className}`);
  return (
    <p
      className={TechCntClasses}
      style={{
        display: '-webkit-box',
        wordWrap: 'break-word',
        WebkitLineClamp: maxLines,
        WebkitBoxOrient: 'vertical',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
      }}
    >
      {content}
    </p>
  );
};

export const TechInfo = ({
  author,
  date,
  company,
}: {
  author: string;
  date: string;
  company: string;
}) => {
  return (
    <>
      <div className='p2 flex gap-[1.6rem] pb-[0.7rem]'>
        <p className='text-primary3 font-bold'> {company}</p>
        <p className='text-gray3'> | </p>
        <p className='text-gray4'>by. {author ? author : company}</p>
        <time className='text-gray4' dateTime={date}>
          {date}
        </time>
      </div>
    </>
  );
};
