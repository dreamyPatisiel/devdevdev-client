import { twMerge } from 'tailwind-merge';

import { cn } from '@utils/mergeStyle';

import { useCompanyIdStore } from '@stores/techBlogStore';
import { useToastVisibleStore } from '@stores/toastVisibleStore';

import useIsMobile from '@hooks/useIsMobile';

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
  const isMobile = useIsMobile();

  const baseStyle =
    'border-white text-white py-[3.2rem] border-b border-b-gray1 border-solid select-none';
  const mobileStyle = 'grid grid-flow-row';
  const desktopStyle = 'w-full h-full grid grid-flow-col grid-cols-[200px_auto] gap-[3.2rem]';

  return <li className={`${baseStyle} ${isMobile ? mobileStyle : desktopStyle}`}>{children}</li>;
};

export const TechTitle = ({ title, width }: { title: string; width: string }) => {
  const isMobile = useIsMobile();
  const baseStyle = 'flex flex-row items-center gap-8 font-bold st2 text-white border-white ';
  const mobileStyle = 'max-w-[80vw] pt-[2.4rem] pb-[1.2rem]';
  const desktopStyle = 'py-[0.7rem]';
  return (
    <div className={`${baseStyle} ${isMobile ? mobileStyle : desktopStyle}`}>
      <p className={`${width} truncate`}>{title}</p>
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
  const isMobile = useIsMobile();
  const baseStyle = `w-full p2 text-gray5 `;

  return (
    <div
      className={cn(`${isMobile ? 'max-w-[100vw]' : 'max-w-[80vw]'} ${className ? className : ''}`)}
    >
      <p
        className={baseStyle}
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
    </div>
  );
};

export const TechInfo = ({
  type = 'tech',
  author,
  date,
  company,
  companyId,
}: {
  type?: 'main' | 'tech';
  author: string;
  date: string;
  company: string;
  companyId: number;
}) => {
  const { setCompanyId } = useCompanyIdStore();
  const { setToastVisible } = useToastVisibleStore();

  const handleCompanyClick = () => {
    if (type === 'main') return;
    setCompanyId(companyId);
    setToastVisible(`‘${company}’에서 제공한 게시물이에요`);
  };

  return (
    <>
      <div className='p2 flex gap-[1.6rem] pb-[0.7rem]'>
        <p
          className={`text-primary3 font-bold ${type === 'main' ? '' : 'cursor-pointer'}`}
          onClick={handleCompanyClick}
        >
          {company}
        </p>
        <p className='text-gray3'> | </p>
        <p className='text-gray4'>by. {author ? author : company}</p>
        <time className='text-gray4' dateTime={date}>
          {date}
        </time>
      </div>
    </>
  );
};
