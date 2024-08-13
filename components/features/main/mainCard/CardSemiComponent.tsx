import Link from 'next/link';

import useIsMobile from '@hooks/useIsMobile';

export const MainCardText = ({
  paragraph1,
  paragraph2,
}: {
  paragraph1: string;
  paragraph2: string;
}) => {
  const isMobile = useIsMobile();
  const baseStyle = 'st1';
  const mobileStyle = '';
  const desktopStyle = 'leading-[3.2rem]';
  return (
    <div className={`${isMobile ? 'mb-[5rem]' : 'mb-[8.6rem]'}`}>
      <p className={`${baseStyle} ${isMobile ? mobileStyle : desktopStyle}`}>{paragraph1}</p>
      <p className={`font-bold ${baseStyle} ${isMobile ? mobileStyle : desktopStyle}`}>
        {paragraph2}
      </p>
    </div>
  );
};

export const MainCardLink = ({ path }: { path: '/pickpickpick' | '/techblog' }) => {
  const isMobile = useIsMobile();

  const type = path === '/pickpickpick' ? 'pick' : 'tech';
  const LinkText = type === 'pick' ? '픽픽픽 💘' : '기술블로그 🧪';
  const BorderColor = type === 'pick' ? 'var(--primary-1)' : 'var(--point-1)';

  return (
    <p className='st1'>
      <Link
        href={path}
        className={`font-bold mr-[2rem]  pb-4 ${isMobile ? 'px-4' : 'px-5'} `}
        style={{
          borderBottom: `1px solid ${BorderColor}`,
        }}
      >
        {LinkText}
      </Link>
      에서 확인하세요!
    </p>
  );
};
