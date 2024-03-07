import { useModalStore } from '@stores/modalStore';

export default function TextButton({
  buttonType,
  comment,
}: {
  buttonType: string;
  comment: string;
}) {
  const { openModal, isModalOpen, setModalType, setContents } = useModalStore();

  const handleModal = () => {
    if (!isModalOpen) {
      setModalType(buttonType);
      openModal();
      setContents(comment);
    }
  };

  return (
    <button onClick={handleModal} className='ml-[0.8rem]'>
      {buttonType}
    </button>
  );
}
