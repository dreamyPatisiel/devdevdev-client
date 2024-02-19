import { SubButton } from '@components/buttons/subButton';

export default function WritableComment() {
  return (
    <div className='px-[2.4rem] py-[1.6rem] bg-gray1 rounded-[1.6rem]'>
      <div className='flex justify-between p-[1rem]'>
        <span className='p2 font-bold text-gray5'>명탐정코난(det*******)</span>
        <span className='p2 font-light text-gray4'>115/3000</span>
      </div>
      <textarea
        name='commentMessage'
        rows={3}
        className='bg-gray1 p2 placeholder:text-gray4 px-[1rem] py-[1.6rem] w-full resize-none outline-none'
        placeholder='나도 의견 남기기 광고 혹은 도배글을 작성할 시에는 관리자 권한으로 삭제할 수 있습니다.'
        aria-label='댓글 입력란'
      >
        나도 의견 남기기 광고 혹은 도배글을 작성할 시에는 관리자 권한으로 삭제할 수 있습니다. 이런
        공지도 여기다가 써주는거에요. 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라
        만세
      </textarea>
      <div className='flex justify-end items-end gap-[1.6rem]'>
        <span className='text-p2 font-bold text-primary3'>미래는 백엔드다</span>
        <span className='text-c1 font-bold text-gray5 flex'>
          <label htmlFor='myvote-check' className='cursor-pointer flex items-center gap-[0.9rem]'>
            <input
              type='checkbox'
              id='myvote-check'
              className='appearance-none w-[1.1rem] h-[1.1rem] bg-[url("/image/pickpickpick/square.svg")] checked:bg-[url("/image/pickpickpick/check-square.svg")] bg-no-repeat bg-center cursor-pointer'
            />
            <span>내 투표 공개</span>
          </label>
        </span>
        <SubButton text='댓글 남기기' bgColor='primary1' />
      </div>
    </div>
  );
}
