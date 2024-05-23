import Image from 'next/image';
import Link from 'next/link';

import Tooltip from '@components/common/tooltips/tooltip';

import DevLogo from '@public/image/devdevdevLogo.svg';

import { MAINCARD_CONSTANT } from '@/constants/MainCardConstants';

export const MainPageLogo = () => {
  return (
    <div className='flex flex-col justify-center items-center mb-[8rem]'>
      <Image src={DevLogo} width={200} priority alt='devdevdev로고' />
      <h1 className='p1 font-bold mt-[3.2rem]'>힘들고 막힐 때는 댑댑댑</h1>
    </div>
  );
};

export const MainCardText = ({
  paragraph1,
  paragraph2,
}: {
  paragraph1: string;
  paragraph2: string;
}) => {
  return (
    <div className='mb-[8.6rem]'>
      <p className='st1 '>{paragraph1}</p>
      <p className='st1 font-bold'>{paragraph2}</p>
    </div>
  );
};

export const MainCardLink = ({ path }: { path: '/pickpickpick' | 'techblog' }) => {
  const LinkText = path === '/pickpickpick' ? '픽픽픽 💖' : '기술블로그 🧪';
  return (
    <p>
      <Link href={path} className='font-bold mr-[2rem]'>
        {LinkText}
      </Link>
      에서 확인하세요!
    </p>
  );
};

export default function Index() {
  return (
    <>
      <div className='px-[20.3rem] py-[6.4rem]'>
        {/* 영역1 */}
        <MainPageLogo />
        {/* 영역2 - 카드 */}
        {/* opacity-50 */}
        <div
          className='w-full h-[51.8rem] px-[3.2rem] py-[8.8rem] rounded-3xl text-white'
          style={{ backgroundColor: 'rgba(41,42,46, 0.5)' }}
        >
          {/* 0 */}
          <div className='mb-[5rem] c1'>
            <div style={{ position: 'relative', top: 0 }}>
              <Tooltip variant='purpleTt' direction='left' isVisible>
                컴포넌트 어떻게 설계하세요?
              </Tooltip>
            </div>

            <div style={{ position: 'relative', top: 40 }}>
              <Tooltip variant='purpleTt' direction='left' isVisible>
                일단 구현하고 재사용이 되면, 리팩토링 합시다!
              </Tooltip>
            </div>

            <div style={{ position: 'relative', top: 80 }}>
              <Tooltip variant='purpleTt' direction='left' isVisible>
                재사용성을 최대한 고려한뒤 코드를 작성해야죠!
              </Tooltip>
            </div>
          </div>

          <div className='st1 px-4 flex flex-col space-y-10'>
            {/* 1 */}
            <MainCardText
              paragraph1={MAINCARD_CONSTANT.PICK[0]}
              paragraph2={MAINCARD_CONSTANT.PICK[1]}
            />

            {/* 2 */}
            <MainCardLink path='/pickpickpick' />
          </div>
        </div>
      </div>
    </>
  );
}
