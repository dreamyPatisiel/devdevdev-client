import { SubButton } from '@components/common/buttons/subButtons';

export default function Quit() {
  return (
    <div className='border border-gray3 rounded-[1.6rem] p-[3.2rem] flex items-center justify-between'>
      <p className='st2 font-bold'>
        <span className='text-point1'>게으른 댑댑이</span>님, 저희 정말 여기까지인가요? 😢
      </p>
      <SubButton text='네 탈퇴할게요' variant='primary' />
    </div>
  );
}
