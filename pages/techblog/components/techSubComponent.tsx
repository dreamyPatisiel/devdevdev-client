import { cn } from '@utils/mergeStyle';

import Arrow from '@public/image/techblog/angle-right_primary3.svg';

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
      className={cn(`bg-gray1 rounded-[2rem] flex justify-center items-center ${width} ${height}`)}
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
    <li className='w-full h-hull grid grid-flow-col border-white gap-[3.2rem] text-white py-[3.2rem] border-b border-b-gray3 border-solid select-none'>
      {children}
    </li>
  );
};

export const TechTitle = ({ type, title }: { type: string; title: string }) => {
  return (
    <div className='flex flex-row items-center gap-8 font-bold text-st1 text-white border-white py-[0.9rem] '>
      <span className='text-primary3'>{type}</span>
      <Arrow priority alt='화살표' />
      <p className='w-[62.7rem] truncate'>{title}</p>
    </div>
  );
};

export const TechContent = ({ content }: { content: string }) => {
  const TechCntClasses = 'text-p1 text-gray5 border-white border-solid pt-[1.3rem] mr-[4rem]';
  return (
    <p
      className={TechCntClasses}
      style={{
        display: '-webkit-box',
        wordWrap: 'break-word',
        WebkitLineClamp: 4,
        WebkitBoxOrient: 'vertical',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
      }}
    >
      {content}
    </p>
  );
};

// FIXME: date타입은 서버에서 정해지면 바꿈
export const TechInfo = ({ author, date }: { author: string; date: string }) => {
  return (
    <>
      <div className='text-p2 flex gap-[1.6rem] '>
        <p>{author}</p>
        <p className='text-gray4'>{date}</p>
      </div>
    </>
  );
};
