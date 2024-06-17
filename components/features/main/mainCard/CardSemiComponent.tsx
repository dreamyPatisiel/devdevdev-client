import Link from 'next/link';

export const MainCardText = ({
  paragraph1,
  paragraph2,
}: {
  paragraph1: string;
  paragraph2: string;
}) => {
  return (
    <div className='mb-[8.6rem]'>
      <p className='st1 leading-[3.2rem]'>{paragraph1}</p>
      <p className='st1 font-bold leading-[3.2rem]'>{paragraph2}</p>
    </div>
  );
};

export const MainCardLink = ({ path }: { path: '/pickpickpick' | '/techblog' }) => {
  const type = path === '/pickpickpick' ? 'pick' : 'tech';

  const LinkText = type === 'pick' ? '픽픽픽 💘' : '기술블로그 🧪';
  const BorderColor = type === 'pick' ? 'var(--primary-1)' : 'var(--point-1)';

  return (
    <p>
      <Link
        href={path}
        className={`font-bold mr-[2rem] px-5 pb-4`}
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
