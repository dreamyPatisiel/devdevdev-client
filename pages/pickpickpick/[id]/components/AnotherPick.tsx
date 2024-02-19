import AngleRight from '@public/image/angle-right.svg';
import Comment from '@public/image/comment-dots.svg';
import Fire from '@public/image/fire-alt.svg';

export default function AnotherPick() {
  return (
    <div className='rounded-[1.6rem] border-gray3 border px-[2.4rem] py-[3.2rem]'>
      <div className='flex items-baseline gap-6'>
        <p className='st2 font-bold'>
          {'이러이러한 보안 프로세스가 포함된 개발환경에서는 어떤 프로그램이 적절할까요?'}
        </p>
        <AngleRight alt={'오른쪽 화살표'} className='w-4' />
      </div>

      <div className='mt-[3.2rem] flex items-center gap-8 flex-wrap'>
        <span className='flex items-center'>
          <Fire alt='투표 이미지' />
          <span className='c1 font-medium text-gray5 ml-2 mr-4'>투표</span>
          <span className='c1 font-bold text-gray5' data-testid='투표'>
            {'1345'}
          </span>
        </span>
        <span className='flex items-center'>
          <Comment alt='댓글 이미지' />
          <span className='c1 font-medium text-gray5 ml-2 mr-4'>댓글</span>
          <span className='c1 font-bold text-gray5'>{'324'}</span>
        </span>
      </div>
    </div>
  );
}
