import { formatDate } from '@utils/formatDate';
import { cn } from '@utils/mergeStyle';

import { useCompanyInfoStore } from '@stores/techBlogStore';
import { useToastVisibleStore } from '@stores/toastVisibleStore';

import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

export const TechImgBackgroundWrapper = ({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        `overflow-hidden bg-gray700 rounded-[2rem] flex justify-center items-center ${className}`,
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
  const { isMobile } = useMediaQueryContext();

  const baseStyle =
    'border-white text-white py-[3.2rem] border-b border-b-gray700 border-solid select-none';
  const mobileStyle = 'grid grid-flow-row';
  const desktopStyle = 'w-full h-full grid grid-flow-col grid-cols-[200px_auto] gap-[3.2rem]';

  return <li className={`${baseStyle} ${isMobile ? mobileStyle : desktopStyle}`}>{children}</li>;
};

export const TechTitle = ({ title }: { title: string }) => {
  const { isMobile } = useMediaQueryContext();
  const baseStyle = 'font-bold st2 text-white border-white';
  const mobileStyle = 'pt-[2.4rem] pb-[1.2rem]';
  const desktopStyle = 'py-[0.7rem]';
  return (
    <div className={`${baseStyle} ${isMobile ? mobileStyle : desktopStyle}`}>
      <p className='line-clamp-1'>{title}</p>
    </div>
  );
};

export const TechContent = ({
  content,
  maxLines,
  className = '',
}: {
  content: string;
  maxLines: number;
  className?: string;
}) => {
  const baseStyle = `p2 text-gray100 truncate-multiline`;
  return (
    <section className={className}>
      <p
        className={baseStyle}
        style={{
          WebkitLineClamp: maxLines,
        }}
      >
        {content}
      </p>
    </section>
  );
};

export const TechInfo = ({
  type = 'tech',
  author,
  date,
  company,
  companyId,
  className,
}: {
  type?: 'main' | 'tech';
  author: string;
  date: string;
  company: string;
  companyId: number;
  className?: string;
}) => {
  const { setCompanyInfo } = useCompanyInfoStore();
  const { setToastVisible } = useToastVisibleStore();

  const handleCompanyClick = () => {
    if (type === 'main') return;
    setCompanyInfo({ id: companyId, name: company });
    setToastVisible({ message: `'${company}'에서 제공한 게시물이에요` });
  };

  return (
    <div className={cn(`p2 flex gap-[1.6rem]`, className)}>
      <p
        className={`text-primary300 font-bold ${type === 'main' ? '' : 'cursor-pointer'}`}
        onClick={handleCompanyClick}
      >
        {company}
      </p>
      <p className='text-gray500'> | </p>
      <p className='text-gray300'>by. {author ? author : company}</p>

      <time className='text-gray300' dateTime={date}>
        {formatDate(date)}
      </time>
    </div>
  );
};
