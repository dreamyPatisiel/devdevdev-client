import { Modal } from '@/components/modals/modal';
import { useModalStore } from '@/store/modalStore';

export default function Index() {
  const { isModalOpen, openModal } = useModalStore();

  return (
    <>
      <div className=''>
        <h1>DEVDEVDEV</h1>
        <h2 className='font-bold '>ddd</h2>
        <p className='text-st1 font-light leading-st' onClick={openModal}>
          hello
        </p>
        <p className='c2'>hihi</p>
      </div>
      {isModalOpen && (
        <Modal
          title='모달의 제목을 작성합니다'
          contents='모달의 상세 내용을 작성합니다. 없으면 생략이 가능합니다.'
          size='l'
          submitText='등록하기'
          submitFn={() => console.log('hi')}
        />
      )}
    </>
  );
}
