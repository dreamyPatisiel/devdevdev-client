import Image from 'next/image';
import PickAnswer from './PickAnswer';

import fire from '@public/image/fire-alt.svg';
import comment from '@public/image/comment-dots.svg';
import right from '@public/image/angle-right.svg';

export default function PickContainer() {
  return (
    <div className='rounded-2xl border-gray2 border-solid border px-10 py-12'>
      <div className='flex items-baseline gap-6'>
        <p className='pb-11 text-gray5 p1 font-bold'>
          이러이러한 보안 프로세스가 포함된 개발환경에서는 어떤 프로그램이 적절할까요?
        </p>
        <Image src={right} alt='오른쪽 화살표' />
      </div>
      <PickAnswer
        answers={[
          '사용자가 결제를 진행 후 확인받는 프로세스에서는 Toss의 방식이 적합하다',
          '사용자가 결제를 진행 후 확인받는 프로세스에서는 Kakao의 방식이 적합하다.',
        ]}
      />

      <div className='mt-12 flex items-center gap-8'>
        <span className='flex items-center'>
          <Image src={fire} alt='투표 이미지' />
          <span className='c1 font-medium text-gray5 ml-2 mr-4'>투표</span>
          <span className='c1 font-bold text-gray5'>1345</span>
        </span>
        <span className='flex items-center'>
          <Image src={comment} alt='댓글 이미지' />
          <span className='c1 font-medium text-gray5 ml-2 mr-4'>댓글</span>
          <span className='c1 font-bold text-gray5'>324</span>
        </span>
      </div>
    </div>
  );
}
