import Image from 'next/image';
import PickAnswer from './PickAnswer';

import fire from '@public/image/fire-alt.svg';
import comment from '@public/image/comment-dots.svg';

export default function PickContainer() {
  return (
    <div className='rounded-2xl border-gray2 border-solid border px-6 py-8'>
      <p className='pb-8 text-gray5'>
        이러이러한 보안 프로세스가 포함된 개발환경에서는 어떤 프로그램이 적절할까요?
      </p>
      <PickAnswer
        answers={[
          '사용자가 결제를 진행 후 확인받는 프로세스에서는 Toss의 방식이 적합하다',
          '사용자가 결제를 진행 후 확인받는 프로세스에서는 Kakao의 방식이 적합하다.',
        ]}
      />

      <div className='mt-9 flex items-center gap-5'>
        <span className='flex items-center'>
          <Image src={fire} alt='투표 이미지' />
          <span className='text-xs text-gray5 ml-1 mr-2'>투표</span>
          <span className='text-xs text-gray5 font-bold'>1345</span>
        </span>
        <span className='flex items-center'>
          <Image src={comment} alt='댓글 이미지' />
          <span className='text-xs text-gray5 ml-1 mr-2'>댓글</span>
          <span className='text-xs text-gray5 font-bold'>324</span>
        </span>
      </div>
    </div>
  );
}
