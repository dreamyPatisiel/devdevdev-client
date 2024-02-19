import Dropdown from '@components/dropdown';

import AnotherPick from './components/AnotherPick';
import Comment from './components/Comment';
import VoteCard from './components/VoteCard';
import WritableComment from './components/WritableComment';

export default function index() {
  return (
    <div className='flex flex-col gap-[4rem] mt-[4rem] mb-[10.6rem]'>
      <div className='border-b-[0.1rem] border-b-gray3'>
        <h3 className='h3 font-bold p-[1rem]'>
          토픽을 정리할 수 있는 제목입니다. 제목을 써주세요.
        </h3>
        <div className='p-[1rem]'>
          <span className='p2 text-gray5 font-bold'>명탐정코난(det*******)</span>
          <span className='p2 text-gray3 ml-[2rem] mr-[1rem]'>2023.05.11</span>
          <span className='p2 text-gray4'>신고</span>
        </div>
      </div>

      <VoteCard />
      <VoteCard />

      <div>
        <div>
          <h3 className='h3 mb-[2.4rem]'>나도 고민했는데! 다른 픽픽픽 💖</h3>
          <div className='flex gap-[2rem] overflow-hidden'>
            <AnotherPick />
            <AnotherPick />
            <AnotherPick />
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-[3.2rem]'>
        <div className='flex items-center justify-between'>
          <span className='p1 font-bold text-gray5'>
            <span className='text-point3'>1224</span>개의 댓글
          </span>
          <Dropdown dropdownMenu={['인기순']} />
        </div>

        <WritableComment />
        <div>
          <Comment />
          <Comment />
        </div>
      </div>
    </div>
  );
}
