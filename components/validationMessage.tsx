import ExclamationCircle from '@public/image/exclamation-circle.svg';

export function ValidationMessage({ message }: { message: string }) {
  return (
    <div className='flex items-center gap-[1rem] mt-[0.8rem] py-[1rem]'>
      <ExclamationCircle alt='주의 아이콘' />
      <span className='p2 text-point1'>{message}</span>
    </div>
  );
}
