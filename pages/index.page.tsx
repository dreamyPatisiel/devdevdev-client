import { useLoginModalStore } from '@stores/modalStore';

import { LoginModal } from '@components/modals/modal';

export default function Index() {
  const { isModalOpen } = useLoginModalStore();
  return (
    <>
      <div>
        <h1>DEVDEVDEV</h1>
        <h2 className='font-bold '>ddd</h2>
        <p className='text-st1 font-light leading-st'>hello</p>
        <p className='c2'>hihi</p>
      </div>

      {isModalOpen && <LoginModal />}
    </>
  );
}
