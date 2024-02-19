import AngleDownPoint from '@public/image/pickpickpick/angle-down-point.svg';

export default function VoteCard() {
  return (
    <div className='flex gap-[4rem] px-[4rem]'>
      <div className='px-[4rem] py-[1.6rem] rounded-[1.6rem] border border-gray3 flex flex-col gap-[2.4rem]'>
        <p className='pt-[2.4rem] pb-[3.2rem] text-st1 leading-[2.8rem] font-semibold border-b-[0.1rem] border-b-gray1'>
          사용자가 결제를 진행 후 확인받는 프로세스에서는 Toss의 방법이 더 서버의 비용을 절감하고
          유용합니다.
        </p>
        <p className='text-p2 leading-[2.2rem]'>
          Node.js 기술로 CA 개발, Node 서버 개발 등을 진행하며 유저경험 혁신을 함께하실 거예요.
          토스는 일반적인 가상브라우저를 사용하는 방식이 아니라 직접 Low level 까지 요청을
          컨트롤하며, Automation 기술로 특허도 가지고 있을 정도로 상당히 기술적이고 고도화되어
          있어요. 토스가 한국에서는 이 분야 최고라고 장담할 수 있어요. 단순히 API를 연동하거나
        </p>
        <button className='p2 font-bold text-point1 flex items-center gap-[0.8rem] justify-center'>
          내용 전체보기
          <AngleDownPoint alt='아래 방향 화살표' />
        </button>
      </div>

      <button className='px-[4rem] py-[1.6rem] rounded-[1.6rem] border border-gray3'>
        <span className='p-[1rem] text-h3 text-gray5'>?? %</span>
        <span className='p-[1rem] text-p2 font-bold text-gray4'>👈 PICK?</span>
      </button>
    </div>
  );
}
