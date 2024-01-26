import PickAnswer from './PickAnswer';

export default function PickContainer() {
  return (
    <div className='rounded-2xl border-gray2 border-solid border pt-8 pb-8 px-6 py-6'>
      <p className='pb-8'>
        이러이러한 보안 프로세스가 포함된 개발환경에서는 어떤 프로그램이 적절할까요?
      </p>
      <PickAnswer
        answers={[
          '사용자가 결제를 진행 후 확인받는 프로세스에서는 Toss의 방식이 적합하다',
          '사용자가 결제를 진행 후 확인받는 프로세스에서는 Kakao의 방식이 적합하다.',
        ]}
      />

      <div className='mt-9'>
        <span>투표</span>
        <span>댓글</span>
      </div>
    </div>
  );
}
