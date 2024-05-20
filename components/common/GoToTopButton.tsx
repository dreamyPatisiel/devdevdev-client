import Image from 'next/image';

import GoToTop from '@public/image/goToTopIcon.svg';

export default function GoToTopButton() {
  return (
    <div className='fixed right-0 bottom-0 z-50'>
      {typeof window !== 'undefined' && window.scrollY !== 0 && (
        <Image
          src={GoToTop}
          alt='페이지 상단 이동 버튼'
          onClick={() => window.scrollTo(0, 0)}
          className='cursor-pointer'
        />
      )}
    </div>
  );
}
