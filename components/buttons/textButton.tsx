import { useModalStore } from '@stores/modalStore';

export default function TextButton({
  buttonType,
  comment,
  isModal,
}: {
  buttonType: string;
  comment: string;
  isModal: boolean;
}) {
  const { openModal, isModalOpen, setModalType, setContents } = useModalStore();

  const handleModal = () => {
    setModalType(buttonType);
    if (!isModalOpen && isModal) {
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
